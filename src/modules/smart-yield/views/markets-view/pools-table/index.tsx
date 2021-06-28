import React from 'react';
import { isMobile } from 'react-device-detect';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatBigValue, formatPercent, formatToken, formatUSD, formatUSDValue, getHumanValue } from 'web3/utils';

import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import IconBubble from 'components/custom/icon-bubble';
import { AprLabel } from 'components/custom/label';
import { Hint, Text } from 'components/custom/typography';
import { BondToken, StkAaveToken } from 'components/providers/known-tokens-provider';
import { SYMarketMeta } from 'modules/smart-yield/api';
import { PoolsSYPool, usePools } from 'modules/smart-yield/providers/pools-provider';
import { Wallet, useWallet } from 'wallets/wallet';

type PoolEntity = PoolsSYPool;

function getTableColumns(wallet: Wallet): ColumnsType<PoolEntity> {
  return [
    {
      title: 'Token Name',
      fixed: 'left',
      render: (_, entity) => (
        <div className="flex flow-col col-gap-16 align-center">
          <IconBubble name={entity.meta?.icon} bubbleName={entity.market?.icon} />
          <div>
            <Text type="p1" weight="semibold" wrap={false} color="primary" className="mb-4">
              {entity.underlyingSymbol}
            </Text>
            <Text type="small" weight="semibold" wrap={false}>
              {entity.meta?.name}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Senior Liquidity',
      sorter: (a, b) => a.state.seniorLiquidity - b.state.seniorLiquidity,
      render: (_, entity) => (
        <Tooltip
          title={
            <>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                {formatToken(entity.state.seniorLiquidity, {
                  tokenName: entity.underlyingSymbol,
                })}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                {formatUSD(entity.state.seniorLiquidity)}
              </Text>
            </>
          }>
          <Text type="p1" weight="semibold" color="primary" wrap={false} className="mb-4">
            {formatToken(entity.state.seniorLiquidity, {
              tokenName: entity.underlyingSymbol,
              compact: true,
            })}
          </Text>
          <Text type="small" weight="semibold">
            {formatUSD(entity.state.seniorLiquidity, {
              compact: true,
            })}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: (
        <Hint
          text={
            <Text type="p2" className="mb-8">
              The Senior APY shown is the maximum theoretically possible daily rate for senior bonds.
            </Text>
          }>
          Senior APY
        </Hint>
      ),
      sorter: (a, b) => a.state.seniorApy - b.state.seniorApy,
      render: (_, entity) => (
        <Text type="p1" weight="semibold" color="green">
          {formatPercent(entity.state.seniorApy)}
        </Text>
      ),
    },
    {
      title: 'Junior Liquidity',
      sorter: (a, b) => a.state.juniorLiquidity - b.state.juniorLiquidity,
      render: (_, entity) => (
        <Tooltip
          title={
            <>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                {formatToken(entity.state.juniorLiquidity, {
                  tokenName: entity.underlyingSymbol,
                })}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                {formatUSD(entity.state.juniorLiquidity)}
              </Text>
            </>
          }>
          <Text type="p1" weight="semibold" color="primary" wrap={false} className="mb-4">
            {formatToken(entity.state.juniorLiquidity, {
              tokenName: entity.underlyingSymbol,
              compact: true,
            })}
          </Text>
          <Text type="small" weight="semibold">
            {formatUSD(entity.state.juniorLiquidity, {
              compact: true,
            })}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: (
        <Hint
          text={
            <>
              <Text type="p2" className="mb-16">
                The Junior APY is estimated based on the current state of the pool. The actual APY you get for your
                positions might differ.
              </Text>
              <Text type="p2" className="mb-8">
                The number below is the SMART Yield junior rewards APR. You can add that by staking tokens in Pools
              </Text>
              <ExternalLink href="https://docs.barnbridge.com/beginners-guide-to-smart-yield#junior-apy">
                Learn more
              </ExternalLink>
            </>
          }>
          Junior APY
        </Hint>
      ),
      sorter: (a, b) => a.state.juniorApy - b.state.juniorApy,
      render: (_, entity) => (
        <div>
          <Text type="p1" weight="semibold" color="purple">
            {formatPercent(entity.state.juniorApy)}
          </Text>
          {entity.contracts.rewardPool?.rewardTokensCount! > 1 ? (
            <AprLabel icons={[BondToken.icon!, StkAaveToken.icon!]}>
              +{formatPercent(entity.apr?.plus(entity.apy ?? 0))} APR
            </AprLabel>
          ) : entity.apr ? (
            <AprLabel icons={['static/token-bond']}>+{formatPercent(entity.apr)} APR</AprLabel>
          ) : null}
        </div>
      ),
    },
    {
      title: (
        <Hint
          text={
            <Text type="p2" className="mb-8">
              The originator APY is the APY that deposits get on the 3rd party lending provider. This number includes
              any governance token rewards.
            </Text>
          }>
          Originator APY
        </Hint>
      ),
      sorter: (a, b) => a.state.originatorNetApy - b.state.originatorNetApy,
      render: (_, entity) => (
        <Text type="p1" weight="semibold" color="primary">
          {formatPercent(entity.state.originatorNetApy)}
        </Text>
      ),
    },
    {
      title: 'jToken conversion rate',
      render: (_, entity) => (
        <>
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            1 {entity.contracts.smartYield?.symbol}
          </Text>
          <Text type="small" weight="semibold" wrap={false}>
            ={' '}
            {formatToken(entity.state.jTokenPrice, {
              tokenName: entity.underlyingSymbol,
            })}
          </Text>
        </>
      ),
    },
    ...(wallet.isActive
      ? ([
          {
            title: 'Wallet balance',
            sorter: (a, b) =>
              (a.contracts.underlying?.balance?.toNumber() ?? 0) - (b.contracts.underlying?.balance?.toNumber() ?? 0),
            render: (_, entity) => (
              <>
                <div className="flex flow-col col-gap-8">
                  <Text type="p1" weight="semibold" color="primary" className="mb-4">
                    {formatBigValue(getHumanValue(entity.contracts.underlying?.balance, entity.underlyingDecimals))}
                  </Text>
                  <Text type="p1" weight="semibold" color="primary">
                    {entity.underlyingSymbol}
                  </Text>
                </div>

                <Text type="small" weight="semibold">
                  {formatUSDValue(getHumanValue(entity.contracts.underlying?.balance, entity.underlyingDecimals))}
                </Text>
              </>
            ),
          },
        ] as ColumnsType<PoolEntity>)
      : []),
    ...(!isMobile
      ? ([
          {
            fixed: 'right',
            render(_, entity) {
              return (
                <NavLink
                  className="button-ghost"
                  to={{
                    pathname: `/smart-yield/stats`,
                    search: `?m=${entity.protocolId}&t=${entity.underlyingSymbol}`,
                  }}>
                  Details
                </NavLink>
              );
            },
          },
        ] as ColumnsType<PoolEntity>)
      : []),
  ];
}

type Props = {
  activeMarket?: SYMarketMeta;
};

const PoolsTable: React.FC<Props> = props => {
  const { activeMarket } = props;

  const wallet = useWallet();
  const poolsCtx = usePools();
  const { pools, loading } = poolsCtx;

  const entities = React.useMemo<PoolEntity[]>(() => {
    return pools.filter(pool => !activeMarket || pool.protocolId === activeMarket.id);
  }, [pools, activeMarket]);

  const columns = React.useMemo<ColumnsType<PoolEntity>>(() => {
    return getTableColumns(wallet);
  }, [wallet]);

  return (
    <Table<PoolEntity>
      columns={columns}
      dataSource={entities}
      rowKey={entity => entity.smartYieldAddress}
      loading={loading}
      scroll={{
        x: true,
      }}
    />
  );
};

export default PoolsTable;
