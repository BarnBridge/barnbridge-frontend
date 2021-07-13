import React, { FC } from 'react';
import AntdSpin from 'antd/lib/spin';
import BigNumber from 'bignumber.js';
import format from 'date-fns/format';
import { useContractManager } from 'web3/components/contractManagerProvider';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Divider from 'components/antd/divider';
import Tabs from 'components/antd/tabs';
import Tooltip from 'components/antd/tooltip';
import { SquareBadge } from 'components/custom/badge';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';
import TxConfirmModal, { ConfirmTxModalArgs } from 'modules/smart-yield/components/tx-confirm-modal';
import SYJuniorBondContract from 'modules/smart-yield/contracts/syJuniorBondContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolsSYPool, usePools } from 'modules/smart-yield/providers/pools-provider';
import RewardPoolsProvider, { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';
import StakedPositionsTable from 'modules/smart-yield/views/portfolio-view/junior/staked-positions-table';
import { useWallet } from 'wallets/walletProvider';

import ActivePositionsTable, { ActivePositionsTableEntity } from './active-positions-table';
import LockedPositionsTable, { LockedPositionsTableEntity } from './locked-positions-table';
import PastPositionsTable from './past-positions-table';
import PositionsFilter, { PositionsFilterValues } from './positions-filter';

import { doSequential } from 'utils';

import s from './s.module.scss';

type State = {
  loadingActive: boolean;
  dataActive: ActivePositionsTableEntity[];
  loadingLocked: boolean;
  dataLocked: LockedPositionsTableEntity[];
};

const InitialState: State = {
  loadingActive: false,
  dataActive: [],
  loadingLocked: false,
  dataLocked: [],
};

const InitialFiltersMap: Record<string, PositionsFilterValues> = {
  active: {
    originator: 'all',
    token: 'all',
    withdrawType: 'all',
  },
  staked: {
    originator: 'all',
    token: 'all',
    withdrawType: 'all',
  },
  locked: {
    originator: 'all',
    token: 'all',
    withdrawType: 'all',
  },
  past: {
    originator: 'all',
    token: 'all',
    withdrawType: 'all',
  },
};

const JuniorPortfolioInner: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('active');

  const knownTokensCtx = useKnownTokens();
  const walletCtx = useWallet();
  const poolsCtx = usePools();
  const rewardPoolsCtx = useRewardPools();
  const { getContract } = useContractManager();

  const { pools } = poolsCtx;

  const [reloadLocked, versionLocked] = useReload();
  const [state, setState] = React.useState(InitialState);
  const [redeemModal, setRedeemModal] = React.useState<LockedPositionsTableEntity | undefined>();
  const [filtersMap, setFiltersMap] = React.useState(InitialFiltersMap);

  React.useEffect(() => {
    if (!walletCtx.account) {
      return;
    }

    setState(
      mergeState<State>({
        loadingActive: true,
      }),
    );

    (async () => {
      const result = await doSequential<PoolsSYPool>(pools, async pool => {
        const smartYieldContract = getContract<SYSmartYieldContract>(pool.smartYieldAddress, () => {
          return new SYSmartYieldContract(pool.smartYieldAddress);
        });

        return new Promise<any>(resolve => {
          (async () => {
            const [, , smartYieldAbond] = await Promise.all([
              smartYieldContract.loadCommon(),
              smartYieldContract.loadBalance(),
              smartYieldContract.getAbond(),
            ]);

            if (smartYieldContract.balance?.isGreaterThan(BigNumber.ZERO)) {
              resolve({
                ...pool,
                smartYieldBalance: smartYieldContract.balance,
                smartYieldAbond,
              });
            } else {
              resolve(undefined);
            }
          })();
        });
      });

      setState(
        mergeState<State>({
          loadingActive: false,
          dataActive: result.filter(Boolean),
        }),
      );
    })();
  }, [walletCtx.account, pools]);

  React.useEffect(() => {
    if (!walletCtx.account) {
      return;
    }

    setState(
      mergeState<State>({
        loadingLocked: true,
      }),
    );

    (async () => {
      const result = await doSequential<PoolsSYPool>(pools, async pool => {
        const juniorBondContract = getContract<SYJuniorBondContract>(pool.juniorBondAddress, () => {
          return new SYJuniorBondContract(pool.juniorBondAddress);
        });

        return new Promise<any>(resolve => {
          (async () => {
            const jBondIds = await juniorBondContract.getJuniorBondIds();

            if (jBondIds.length === 0) {
              return resolve(undefined);
            }

            const smartYieldContract = getContract<SYSmartYieldContract>(pool.smartYieldAddress, () => {
              return new SYSmartYieldContract(pool.smartYieldAddress);
            });

            const jBonds = await smartYieldContract.getJuniorBonds(jBondIds);

            if (jBonds.length === 0) {
              return resolve(undefined);
            }

            const items = jBonds.map(jBond => {
              const item = {
                pool,
                jBond,
                redeem: () => {
                  setRedeemModal(item);
                },
              };

              return item;
            });

            return resolve(items);
          })();
        });
      });

      setState(
        mergeState<State>({
          loadingLocked: false,
          dataLocked: result.flat().filter(Boolean),
        }),
      );
    })();
  }, [walletCtx.account, pools, versionLocked]);

  const dataStaked = rewardPoolsCtx.pools.filter(pool =>
    pool.rewardPool.getBalanceFor(walletCtx.account!)?.gt(BigNumber.ZERO),
  );

  function handleFiltersApply(values: PositionsFilterValues) {
    setFiltersMap(prevState => ({
      ...prevState,
      [activeTab]: {
        ...prevState[activeTab],
        ...values,
      },
    }));
  }

  function handleRedeemCancel() {
    setRedeemModal(undefined);
  }

  function handleRedeemConfirm(args: ConfirmTxModalArgs): Promise<void> {
    if (!redeemModal) {
      return Promise.reject();
    }

    const { pool, jBond } = redeemModal;
    setRedeemModal(undefined);

    return poolsCtx.redeemJuniorBond(pool.smartYieldAddress, jBond.jBondId, args.gasPrice).then(() => {
      pool.contracts.smartYield?.loadBalance();
      reloadLocked();
    });
  }

  const activeBalance = state.dataActive?.reduce((sum, c) => {
    const val = c.smartYieldBalance.unscaleBy(c.underlyingDecimals);
    const uVal = val?.multipliedBy(c.state.jTokenPrice);
    const valInUSD = knownTokensCtx.convertTokenInUSD(uVal, c.underlyingSymbol);
    // const valInUSD = knownTokensCtx.convertTokenInUSD(val, c.contracts.smartYield?.symbol!);
    return sum.plus(valInUSD ?? 0);
  }, BigNumber.ZERO);

  const lockedBalance = state.dataLocked?.reduce((sum, c) => {
    const val = c.jBond.tokens.unscaleBy(c.pool.underlyingDecimals);
    const uVal = val?.multipliedBy(c.pool.state.jTokenPrice);
    const valInUSD = knownTokensCtx.convertTokenInUSD(uVal, c.pool.underlyingSymbol);
    // const valInUSD = knownTokensCtx.convertTokenInUSD(val, c.pool.contracts.smartYield?.symbol!);
    return sum.plus(valInUSD ?? 0);
  }, BigNumber.ZERO);

  const stakedBalance = dataStaked?.reduce((sum, c) => {
    const val = c.rewardPool.getBalanceFor(walletCtx.account!)?.unscaleBy(c.smartYield.decimals);
    const pool = pools.find(pool => pool.smartYieldAddress === c.meta.poolTokenAddress);
    const uVal = val?.multipliedBy(pool?.state.jTokenPrice ?? 0);
    const valInUSD = knownTokensCtx.convertTokenInUSD(uVal, c.meta.underlyingSymbol);
    // const valInUSD = knownTokensCtx.convertTokenInUSD(val, c.smartYield.symbol!);
    return sum.plus(valInUSD ?? BigNumber.ZERO);
  }, BigNumber.ZERO);

  const apySum = state.dataActive.reduce((sum, c) => {
    const val = c.smartYieldBalance.unscaleBy(c.underlyingDecimals);
    const uVal = val?.multipliedBy(c.state.jTokenPrice);
    const valInUSD = knownTokensCtx.convertTokenInUSD(uVal, c.underlyingSymbol);
    // const valInUSD = knownTokensCtx.convertTokenInUSD(val, c.contracts.smartYield?.symbol!);
    return sum.plus(valInUSD?.multipliedBy(c.state.juniorApy) ?? 0);
  }, BigNumber.ZERO);

  const stakedApySum = dataStaked.reduce((sum, c) => {
    const item = pools.find(p => p.smartYieldAddress === c.smartYield.address);

    if (!item) {
      return sum;
    }

    const val = c.rewardPool.getBalanceFor(walletCtx.account!)?.unscaleBy(c.smartYield.decimals);
    const pool = pools.find(pool => pool.smartYieldAddress === c.meta.poolTokenAddress);
    const uVal = val?.multipliedBy(pool?.state.jTokenPrice ?? 0);
    const valInUSD = knownTokensCtx.convertTokenInUSD(uVal, c.meta.underlyingSymbol);
    // const valInUSD = knownTokensCtx.convertTokenInUSD(val, c.smartYield.symbol!);
    return sum.plus(valInUSD?.multipliedBy(item.state.juniorApy) ?? 0);
  }, BigNumber.ZERO);

  const stakedAprSum = dataStaked.reduce((sum, c) => {
    const val = c.rewardPool.getBalanceFor(walletCtx.account!)?.unscaleBy(c.smartYield.decimals);
    const pool = pools.find(pool => pool.smartYieldAddress === c.meta.poolTokenAddress);
    const uVal = val?.multipliedBy(pool?.state.jTokenPrice ?? 0);
    const valInUSD = knownTokensCtx.convertTokenInUSD(uVal, c.meta.underlyingSymbol);
    // const valInUSD = knownTokensCtx.convertTokenInUSD(val, c.smartYield.symbol!);
    return sum.plus(valInUSD?.multipliedBy(c.apr ?? 0) ?? 0);
  }, BigNumber.ZERO);

  const totalBalance = activeBalance?.plus(lockedBalance ?? BigNumber.ZERO).plus(stakedBalance ?? BigNumber.ZERO);
  const pTotalBalance = activeBalance?.plus(stakedBalance ?? BigNumber.ZERO);
  const apy = pTotalBalance?.gt(BigNumber.ZERO) ? apySum.plus(stakedApySum).dividedBy(pTotalBalance).toNumber() : 0; /// calculate by formula
  const apr = stakedBalance?.gt(BigNumber.ZERO) ? stakedAprSum.dividedBy(stakedBalance).toNumber() : 0;

  const dataActiveFilters = React.useMemo(() => {
    const filter = filtersMap.active;

    return state.dataActive.filter(
      item =>
        ['all', item.protocolId].includes(filter.originator) && ['all', item.underlyingAddress].includes(filter.token),
    );
  }, [state.dataActive, filtersMap, activeTab]);

  const dataLockedFilters = React.useMemo(() => {
    const filter = filtersMap.locked;

    return state.dataLocked.filter(
      item =>
        ['all', item.pool.protocolId].includes(filter.originator) &&
        ['all', item.pool.underlyingAddress].includes(filter.token),
    );
  }, [state.dataLocked, filtersMap, activeTab]);

  const dataStakedFilters = React.useMemo(() => {
    const filter = filtersMap.staked;

    return dataStaked.filter(
      item =>
        ['all', item.meta.protocolId].includes(filter.originator) &&
        ['all', item.meta.underlyingAddress].includes(filter.token),
    );
  }, [dataStaked, filtersMap, activeTab]);

  return (
    <>
      <div className={s.portfolioContainer}>
        <AntdSpin spinning={state.loadingActive || state.loadingLocked}>
          <PortfolioBalance
            total={totalBalance?.toNumber()}
            aggregated={apy}
            aggregatedApr={apr}
            aggregatedColor="purple"
            aggregatedText={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  The Junior APY is estimated based on the current state of the pool. The actual APY you get for your
                  positions might differ. This number shows a weighted average of these APYs for your active positions.
                </Text>
                <ExternalLink href="https://docs.barnbridge.com/beginners-guide-to-smart-yield#junior-apy">
                  Learn more
                </ExternalLink>
              </Grid>
            }
            data={[
              ['Active balance ', activeBalance?.plus(stakedBalance)?.toNumber(), 'var(--theme-purple-color)'],
              ['Locked balance', lockedBalance?.toNumber(), 'var(--theme-purple700-color)'],
            ]}
          />
        </AntdSpin>
        <PortfolioValue type="junior" />
      </div>
      <Text type="h1" weight="bold" color="primary" className="mb-32">
        Positions
      </Text>

      <div className="card mb-32">
        <Tabs
          simple
          className={s.tabs}
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarExtraContent={
            <PositionsFilter
              originators={pools}
              showWithdrawTypeFilter={false}
              value={filtersMap[activeTab]}
              onChange={handleFiltersApply}
            />
          }>
          <Tabs.Tab key="active" tab="Active">
            <Divider />
            <ActivePositionsTable loading={state.loadingActive} data={dataActiveFilters} />
          </Tabs.Tab>
          <Tabs.Tab
            key="staked"
            tab={
              <>
                Staked
                <SquareBadge>{dataStakedFilters.length}</SquareBadge>
              </>
            }>
            <Divider />
            <StakedPositionsTable loading={rewardPoolsCtx.loading} data={dataStakedFilters} />
          </Tabs.Tab>
          <Tabs.Tab
            key="locked"
            tab={
              <>
                Locked
                <SquareBadge>{state.dataLocked.length}</SquareBadge>
              </>
            }>
            <Divider />
            <LockedPositionsTable loading={state.loadingLocked} data={dataLockedFilters} />
            {redeemModal && (
              <TxConfirmModal
                title="Redeem your junior bond"
                header={
                  <div className="grid flow-col col-gap-32">
                    <div className="grid flow-row row-gap-4">
                      <Text type="small" weight="semibold" color="secondary">
                        Redeemable balance
                      </Text>
                      <Tooltip
                        title={formatBigValue(
                          getHumanValue(redeemModal.jBond.tokens, redeemModal.pool.underlyingDecimals),
                          redeemModal.pool.underlyingDecimals,
                        )}>
                        <Text type="p1" weight="semibold" color="primary">
                          {formatBigValue(getHumanValue(redeemModal.jBond.tokens, redeemModal.pool.underlyingDecimals))}
                          {` ${redeemModal.pool.contracts.smartYield?.symbol}`}
                        </Text>
                      </Tooltip>
                    </div>
                    <div className="grid flow-row row-gap-4">
                      <Text type="small" weight="semibold" color="secondary">
                        Maturity date
                      </Text>
                      <Text type="p1" weight="semibold" color="primary">
                        {format(redeemModal.jBond.maturesAt * 1_000, 'dd.MM.yyyy')}
                      </Text>
                    </div>
                  </div>
                }
                submitText="Redeem"
                onCancel={handleRedeemCancel}
                onConfirm={handleRedeemConfirm}
              />
            )}
          </Tabs.Tab>
          <Tabs.Tab key="past" tab="Past">
            <Divider />
            <PastPositionsTable
              originatorFilter={filtersMap.past.originator}
              tokenFilter={filtersMap.past.token}
              transactionTypeFilter={filtersMap.past.withdrawType}
            />
          </Tabs.Tab>
        </Tabs>
      </div>
    </>
  );
};

const JuniorPortfolio: FC = () => (
  <RewardPoolsProvider>
    <JuniorPortfolioInner />
  </RewardPoolsProvider>
);

export default JuniorPortfolio;
