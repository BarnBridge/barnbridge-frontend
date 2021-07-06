import React from 'react';
import AntdSpin from 'antd/lib/spin';
import BigNumber from 'bignumber.js';
import { useContractManager } from 'web3/components/contractManagerProvider';
import { getHumanValue } from 'web3/utils';

import Tabs from 'components/antd/tabs';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';
import SYSeniorBondContract from 'modules/smart-yield/contracts/sySeniorBondContract';
import SYSmartYieldContract, { SYSeniorBondToken } from 'modules/smart-yield/contracts/sySmartYieldContract';
import ActivePosition from 'modules/smart-yield/views/portfolio-view/senior/active-position';
import { useWallet } from 'wallets/walletProvider';

import PortfolioBalance from '../../../components/portfolio-balance';
import { PoolsSYPool, usePools } from '../../../providers/pools-provider';
import PastPositionsList from './past-positions-list';
import PositionsFilter, { PositionsFilterValues } from './positions-filter';

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

const InitialFiltersMap: Record<string, PositionsFilterValues> = {
  active: {
    originator: 'all',
    token: 'all',
  },
  past: {
    originator: 'all',
    token: 'all',
  },
};

const SeniorPortfolio: React.FC = () => {
  const wallet = useWallet();
  const poolsCtx = usePools();
  const [reload, version] = useReload();
  const { getContract } = useContractManager();
  const { pools } = poolsCtx;

  const [state, setState] = React.useState<State>(InitialState);
  const [activeTab, setActiveTab] = React.useState<string>('active');
  const [filtersMap, setFiltersMap] = React.useState(InitialFiltersMap);

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
        const seniorBondContract = getContract<SYSeniorBondContract>(pool.seniorBondAddress, () => {
          return new SYSeniorBondContract(pool.seniorBondAddress);
        });

        return new Promise<any>(resolve => {
          (async () => {
            const sBondIds = await seniorBondContract.getSeniorBondIds();

            if (sBondIds.length === 0) {
              return resolve(undefined);
            }

            const smartYieldContract = getContract<SYSmartYieldContract>(pool.smartYieldAddress, () => {
              return new SYSmartYieldContract(pool.smartYieldAddress);
            });

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

  const dataActiveFilters = React.useMemo(() => {
    const filter = filtersMap.active;

    return state.data.filter(
      item =>
        ['all', item.pool.protocolId].includes(filter.originator) &&
        ['all', item.pool.underlyingAddress].includes(filter.token),
    );
  }, [state.data, filtersMap, activeTab]);

  const totalPrincipal = state.data?.reduce((a, c) => {
    return a.plus(getHumanValue(c.sBond.principal, c.pool.underlyingDecimals)?.multipliedBy(1) ?? BigNumber.ZERO);
  }, BigNumber.ZERO);

  const totalGain = state.data?.reduce((a, c) => {
    return a.plus(getHumanValue(c.sBond.gain, c.pool.underlyingDecimals)?.multipliedBy(1) ?? BigNumber.ZERO);
  }, BigNumber.ZERO);

  const total = totalPrincipal?.plus(totalGain ?? BigNumber.ZERO);

  const totalRedeemable = state.data?.reduce((a, c) => {
    return a.plus(getHumanValue(c.sBond.principal.plus(c.sBond.gain), c.pool.underlyingDecimals) ?? BigNumber.ZERO);
  }, BigNumber.ZERO);

  const aggregatedAPY = React.useMemo(() => {
    return state.data
      .reduce((a, c) => {
        const { gain, principal, maturesAt, issuedAt } = c.sBond;

        const apy = gain
          .dividedBy(principal)
          .dividedBy(maturesAt - issuedAt)
          .multipliedBy(365 * 24 * 60 * 60)
          .dividedBy(10 ** c.pool.underlyingDecimals);

        return a.plus(principal.plus(gain).multipliedBy(apy));
      }, BigNumber.ZERO)
      .dividedBy(totalRedeemable);
  }, [state.data, totalRedeemable]);

  function handleFiltersApply(values: PositionsFilterValues) {
    setFiltersMap(prevState => ({
      ...prevState,
      [activeTab]: {
        ...prevState[activeTab],
        ...values,
      },
    }));
  }

  return (
    <>
      <div className={s.portfolioContainer}>
        <AntdSpin spinning={state.loading}>
          <PortfolioBalance
            total={total?.toNumber()}
            totalHint="This number includes the gains from the senior bonds that have not yet reached their maturity date."
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
      <Text type="h1" weight="bold" color="primary" className="mb-32">
        Positions
      </Text>
      <Tabs
        simple
        activeKey={activeTab}
        onChange={setActiveTab}
        tabBarExtraContent={
          <PositionsFilter originators={pools} value={filtersMap[activeTab]} onChange={handleFiltersApply} />
        }>
        <Tabs.Tab key="active" tab="Active">
          <AntdSpin spinning={state.loading}>
            <div className={s.cards}>
              {dataActiveFilters.map(entity => (
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
        <Tabs.Tab key="past" tab="Past">
          <PastPositionsList originatorFilter={filtersMap.past.originator} tokenFilter={filtersMap.past.token} />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default SeniorPortfolio;
