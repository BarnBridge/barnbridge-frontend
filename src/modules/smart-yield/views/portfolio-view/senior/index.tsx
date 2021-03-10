import React from 'react';
import AntdSpin from 'antd/lib/spin';
import { ZERO_BIG_NUMBER, getHumanValue } from 'web3/utils';

import Tabs from 'components/antd/tabs';
import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';
import SYSeniorBondContract from 'modules/smart-yield/contracts/sySeniorBondContract';
import SYSmartYieldContract, { SYSeniorBondToken } from 'modules/smart-yield/contracts/sySmartYieldContract';
import ActivePosition from 'modules/smart-yield/views/portfolio-view/senior/active-position';
import { useWallet } from 'wallets/wallet';

import PortfolioBalance from '../../../components/portfolio-balance';
import { PoolsSYPool, usePools } from '../../../providers/pools-provider';
import FiltersPopup from './filters-popup';
import PastPositionsList from './past-positions-list';

import { doSequential } from 'utils';

import s from './s.module.scss';

type ListEntity = {
  pool: PoolsSYPool;
  sBond: SYSeniorBondToken;
};

type State = {
  loading: boolean;
  data: ListEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
};

const SeniorPortfolio: React.FC = () => {
  const wallet = useWallet();
  const poolsCtx = usePools();
  const [reload, version] = useReload();

  const { pools } = poolsCtx;

  const [state, setState] = React.useState<State>(InitialState);
  const [activeTab, setActiveTab] = React.useState<string>('active');

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
      const result = await doSequential<PoolsSYPool>(pools, async pool => {
        const seniorBondContract = new SYSeniorBondContract(pool.seniorBondAddress);
        seniorBondContract.setProvider(wallet.provider);
        seniorBondContract.setAccount(wallet.account);

        return new Promise<any>(resolve => {
          (async () => {
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

            return resolve(
              sBonds.map(sBond => ({
                pool,
                sBond,
              })),
            );
          })();
        });
      });

      setState(
        mergeState<State>({
          loading: false,
          data: result.flat().filter(Boolean),
        }),
      );
    })();
  }, [wallet.account, pools, version]);

  function handleActivePositionRefresh() {
    reload();
  }

  const totalPrincipal = state.data?.reduce((a, c) => {
    return a.plus(getHumanValue(c.sBond.principal, c.pool.underlyingDecimals) ?? ZERO_BIG_NUMBER);
  }, ZERO_BIG_NUMBER);

  const totalGain = state.data?.reduce((a, c) => {
    return a.plus(getHumanValue(c.sBond.gain, c.pool.underlyingDecimals) ?? ZERO_BIG_NUMBER);
  }, ZERO_BIG_NUMBER);

  const total = totalPrincipal?.plus(totalGain ?? ZERO_BIG_NUMBER);

  const totalRedeemable = state.data?.reduce((a, c) => {
    return a.plus(getHumanValue(c.sBond.principal.plus(c.sBond.gain), c.pool.underlyingDecimals) ?? ZERO_BIG_NUMBER);
  }, ZERO_BIG_NUMBER);

  const aggregatedAPY = React.useMemo(() => {
    return state.data
      .reduce((a, c) => {
        const { gain, principal, maturesAt, issuedAt } = c.sBond;

        const apy = gain
          .dividedBy(principal)
          .dividedBy(maturesAt - issuedAt)
          .multipliedBy(365 * 24 * 60 * 60)
          .multipliedBy(100)
          .dividedBy(10 ** c.pool.underlyingDecimals);

        return a.plus(principal.plus(gain).multipliedBy(apy));
      }, ZERO_BIG_NUMBER)
      .dividedBy(totalRedeemable);
  }, [state.data, totalRedeemable]);

  return (
    <>
      <div className={s.portfolioContainer}>
        <AntdSpin spinning={state.loading}>
          <PortfolioBalance
            total={total?.toNumber()}
            aggregated={aggregatedAPY.toNumber()}
            aggregatedText="This number is a weighted average across your active positions."
            aggregatedColor="green"
            data={[
              ['Principal', totalPrincipal?.toNumber(), 'var(--theme-green-color)'],
              ['Gain', totalGain?.toNumber(), 'var(--theme-green700-color)'],
            ]}
          />
        </AntdSpin>
        <PortfolioValue type="senior" />
      </div>
      <Tabs simple activeKey={activeTab} onChange={setActiveTab} tabBarExtraContent={<FiltersPopup />}>
        <Tabs.Tab key="active" tab="Active positions">
          <AntdSpin spinning={state.loading}>
            <div className={s.cards}>
              {state.data.map(entity => (
                <ActivePosition
                  key={entity.sBond.sBondId}
                  pool={entity.pool}
                  sBond={entity.sBond}
                  onRefresh={handleActivePositionRefresh}
                />
              ))}
            </div>
          </AntdSpin>
        </Tabs.Tab>
        <Tabs.Tab key="past" tab="Past positions">
          <PastPositionsList />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default SeniorPortfolio;
