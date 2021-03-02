import React from 'react';
import * as Antd from 'antd';
import { ZERO_BIG_NUMBER, getHumanValue } from 'web3/utils';

import Tabs from 'components/antd/tabs';
import { mergeState } from 'hooks/useMergeState';
import { fetchSYSeniorPortfolioValues } from 'modules/smart-yield/api';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';
import SYSeniorBondContract from 'modules/smart-yield/contracts/sySeniorBondContract';
import SYSmartYieldContract, { SYSeniorBondToken } from 'modules/smart-yield/contracts/sySmartYieldContract';
import ActivePosition from 'modules/smart-yield/views/portfolio-view/senior/active-position';
import { useWallet } from 'wallets/wallet';

import PortfolioBalance from '../../../components/portfolio-balance';
import PoolsProvider, { PoolsSYPool, usePools } from '../../overview-view/pools-provider';
import FiltersPopup from './filters-popup';
import PastPositionsList from './past-positions-list';

import { doSequential } from 'utils';

import s from './s.module.scss';

type ListEntity = {
  pool: PoolsSYPool;
  sBond: SYSeniorBondToken;
};

type ChartEntity = {
  timestamp: Date;
  value: number;
};

type State = {
  loading: boolean;
  data: ListEntity[];
  loadingChart: boolean;
  dataChart: ChartEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
  loadingChart: false,
  dataChart: [],
};

const SeniorPortfolioInner: React.FC = () => {
  const wallet = useWallet();
  const poolsCtx = usePools();

  const [state, setState] = React.useState<State>(InitialState);
  const [activeTab, setActiveTab] = React.useState<string>('active');

  React.useEffect(() => {
    (async () => {
      if (!wallet.account) {
        return;
      }

      setState(
        mergeState<State>({
          loadingChart: true,
        }),
      );

      try {
        const portfolioValues = await fetchSYSeniorPortfolioValues(wallet.account);

        setState(
          mergeState<State>({
            loadingChart: false,
            dataChart: portfolioValues.map(item => ({
              timestamp: item.timestamp,
              value: item.seniorValue,
            })),
          }),
        );
      } catch {
        setState(
          mergeState<State>({
            loadingChart: false,
            dataChart: [],
          }),
        );
      }
    })();
  }, [wallet.account]);

  React.useEffect(() => {
    if (!wallet.account) {
      return;
    }

    setState(
      mergeState<State>({
        loading: true,
      }),
    );

    (async () => {
      const result = await doSequential<PoolsSYPool>(poolsCtx.pools, async pool => {
        return new Promise<any>(async resolve => {
          const seniorBondContract = new SYSeniorBondContract(pool.seniorBondAddress);
          seniorBondContract.setProvider(wallet.provider);
          seniorBondContract.setAccount(wallet.account);

          const sBondIds = await seniorBondContract.getSeniorBondIds();

          if (sBondIds.length === 0) {
            return resolve(undefined);
          }

          const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
          smartYieldContract.setProvider(wallet.provider);

          const sBonds = await smartYieldContract.getSeniorBonds(sBondIds);

          if (sBonds.length === 0) {
            return resolve(undefined);
          }

          resolve(
            sBonds.map(sBond => ({
              pool,
              sBond,
            })),
          );
        });
      });

      setState(
        mergeState<State>({
          loading: false,
          data: result.flat().filter(Boolean),
        }),
      );
    })();
  }, [wallet.account, poolsCtx]);

  const principal = state.data?.reduce((a, c) => {
    return a.plus(getHumanValue(c.sBond.principal, c.pool.underlyingDecimals) ?? ZERO_BIG_NUMBER);
  }, ZERO_BIG_NUMBER);

  const gain = state.data?.reduce((a, c) => {
    return a.plus(getHumanValue(c.sBond.gain, c.pool.underlyingDecimals) ?? ZERO_BIG_NUMBER);
  }, ZERO_BIG_NUMBER);

  const total = principal?.plus(gain ?? ZERO_BIG_NUMBER);

  return (
    <>
      <div className={s.portfolioContainer}>
        <Antd.Spin spinning={state.loading}>
          <PortfolioBalance
            total={total?.toNumber()}
            aggregated={null}
            aggregatedColor="green"
            data={[
              ['Principal', principal?.toNumber(), 'var(--theme-green700-color)'],
              ['Gain', gain?.toNumber(), 'var(--theme-green-color)'],
            ]}
          />
        </Antd.Spin>
        <Antd.Spin spinning={state.loadingChart}>
          <PortfolioValue
            title="Senior Portfolio balance"
            data={state.dataChart}
            color="var(--theme-green-color)"
            gradientColor="var(--theme-green-color-rgb)"
          />
        </Antd.Spin>
      </div>
      <Tabs simple activeKey={activeTab} onChange={setActiveTab} tabBarExtraContent={<FiltersPopup />}>
        <Tabs.Tab key="active" tab="Active positions">
          <Antd.Spin spinning={state.loading}>
            <div className={s.cards}>
              {state.data.map(entity => (
                <ActivePosition key={entity.sBond.sBondId} pool={entity.pool} sBond={entity.sBond} />
              ))}
            </div>
          </Antd.Spin>
        </Tabs.Tab>
        <Tabs.Tab key="past" tab="Past positions">
          <PastPositionsList />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

const SeniorPortfolio: React.FC = () => {
  return (
    <PoolsProvider>
      <SeniorPortfolioInner />
    </PoolsProvider>
  );
};

export default SeniorPortfolio;
