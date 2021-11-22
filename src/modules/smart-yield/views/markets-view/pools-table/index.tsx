import { useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { formatBigValue, formatPercent, formatToken, formatUSD, formatUSDValue, getHumanValue } from 'web3/utils';

import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import { AprLabel } from 'components/custom/label';
import { ColumnType, Table } from 'components/custom/table';
import { Hint, Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { MarketMeta } from 'modules/smart-yield/providers/markets';
import { PoolsSYPool, usePools } from 'modules/smart-yield/providers/pools-provider';
import { useRewardPools } from 'modules/smart-yield/providers/reward-pools-provider';
import { useWallet } from 'wallets/walletProvider';

type PoolEntity = PoolsSYPool;

function getMarketInsuranceLink(marketTokenSymbol?: string): string {
  switch (marketTokenSymbol) {
    case 'bb_cUSDC':
      return 'https://app.riskharbor.com/pool/mainnet/0x6c6531b77831166ae657d586f9a466370775730b';
    case 'bb_amDAI':
      return 'https://app.riskharbor.com/pool/matic/0x3e114057bb7b0fceaf53f3254c084f3de16e5dab';
    case 'bb_amUSDC':
      return 'https://app.riskharbor.com/pool/matic/0xc25ab272e83e7b5105299e32bdc61e34598e094c';
    case 'bb_amUSDT':
      return 'https://app.riskharbor.com/pool/matic/0x326b4a921c61dd98cf80592323a9ab0df45e4604';
    default:
      return '';
  }
}

function getTableColumns(showWalletBalance: boolean, activeMarket: MarketMeta): ColumnType<PoolEntity>[] {
  return [
    {
      heading: 'Token Name',
      render: entity => {
        const marketInsuranceLink = getMarketInsuranceLink(entity.contracts.smartYield?.symbol);

        return (
          <div className="flex flow-col col-gap-16 align-center">
            <TokenIcon
              name={entity.token?.icon as TokenIconNames}
              bubble1Name={entity.market?.icon.active as TokenIconNames}
            />
            <div>
              <div className="mb-4 flex align-center">
                <Text type="p1" weight="semibold" wrap={false} color="primary" className="mr-4">
                  {entity.underlyingSymbol}
                </Text>
                {marketInsuranceLink ? (
                  <Tooltip
                    title={
                      <>
                        This market is covered by: <br /> - Nexus Mutual,{' '}
                        <a
                          href="https://app.nexusmutual.io/cover/buy/get-quote?address=0x4B8d90D68F26DEF303Dcb6CFc9b63A1aAEC15840"
                          rel="noopener noreferrer"
                          target="_blank">
                          click here
                        </a>{' '}
                        to purchase coverage <br /> - Bridge Mutual,{' '}
                        <a
                          href="https://app.bridgemutual.io/user/cover/0xdb9A242cfD588507106919051818e771778202e9"
                          rel="noopener noreferrer"
                          target="_blank">
                          click here
                        </a>{' '}
                        to purchase coverage <br /> - Risk Harbor,{' '}
                        <a href={marketInsuranceLink} rel="noopener noreferrer" target="_blank">
                          click here
                        </a>{' '}
                        to purchase coverage
                      </>
                    }>
                    <Icon name="insured" color="green" size={24} />
                  </Tooltip>
                ) : null}
              </div>
              <Text type="small" weight="semibold" wrap={false}>
                {entity.token?.name}
              </Text>
            </div>
          </div>
        );
      },
    },
    {
      heading: 'Senior Liquidity',
      render: function Render(entity) {
        const { getToken } = useTokens();
        const token = getToken(entity.underlyingSymbol);
        const sum =
          BigNumber.from(entity.state.seniorLiquidity)
            ?.multipliedBy(token?.price ?? 0)
            .toString() ?? '0';

        return (
          <Tooltip
            title={
              <>
                <Text type="p1" weight="semibold" color="primary" className="mb-4">
                  {formatToken(entity.state.seniorLiquidity, {
                    tokenName: entity.underlyingSymbol,
                  })}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {formatUSD(sum)}
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
              {formatUSD(sum, {
                compact: true,
              })}
            </Text>
          </Tooltip>
        );
      },
    },
    {
      heading: (
        <Hint
          text={
            <Text type="p2" className="mb-8">
              The Senior APY shown is the maximum theoretically possible daily rate for senior bonds.
            </Text>
          }>
          Senior (Fixed) APY
        </Hint>
      ),
      render: entity => (
        <Text type="p1" weight="semibold" color="green">
          {formatPercent(entity.state.seniorApy)}
        </Text>
      ),
    },
    {
      heading: 'Junior Liquidity',
      render: function Render(entity) {
        const { getToken } = useTokens();
        const token = getToken(entity.underlyingSymbol);
        const sum =
          BigNumber.from(entity.state.juniorLiquidity)
            ?.multipliedBy(token?.price ?? 0)
            .toString() ?? '0';

        return (
          <Tooltip
            title={
              <>
                <Text type="p1" weight="semibold" color="primary" className="mb-4">
                  {formatToken(entity.state.juniorLiquidity, {
                    tokenName: entity.underlyingSymbol,
                  })}
                </Text>
                <Text type="small" weight="semibold" color="secondary">
                  {formatUSD(sum)}
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
              {formatUSD(sum, {
                compact: true,
              })}
            </Text>
          </Tooltip>
        );
      },
    },
    {
      heading: (
        <Hint
          text={
            <>
              <Text type="p2" className="mb-16">
                The Junior (Variable) APY is estimated based on the current state of the pool. The actual APY you get
                for your positions might differ.
              </Text>
              <Text type="p2" className="mb-8">
                The number next to it is the SMART Yield junior rewards APR. You can add that by staking tokens in
                Pools. Below it, is the average Junior (Variable) APY for the past 30 days.
              </Text>
              <ExternalLink href="https://docs.barnbridge.com/beginners-guide-to-smart-yield#junior-apy">
                Learn more
              </ExternalLink>
            </>
          }>
          Junior (Variable) / 30d avg APY
        </Hint>
      ),
      render: function Render(entity) {
        const { bondToken, stkAaveToken } = useKnownTokens();
        const { pools } = useRewardPools();

        const hasZeroBondRewardLeft = pools.find(
          pool =>
            pool.rewardPool.address === entity.rewardPoolAddress &&
            Array.from(pool.rewardTokens.values()).some(
              rewardToken =>
                !!(rewardToken === bondToken && pool.rewardPool.getRewardLeftFor(rewardToken.address)?.isZero()),
            ),
        );

        return (
          <>
            <div className="flex align-center col-gap-8">
              <Text type="p1" weight="semibold" color="purple">
                {formatPercent(entity.state.juniorApy)}
              </Text>
              {entity.contracts.rewardPool?.rewardTokensCount! > 1 ? (
                <AprLabel icons={[bondToken.icon!, stkAaveToken.icon!]}>
                  +{formatPercent(entity.apy?.plus(hasZeroBondRewardLeft ? 0 : entity.apr ?? 0) ?? 0)} APR
                </AprLabel>
              ) : !hasZeroBondRewardLeft && entity.apr ? (
                <AprLabel icons={['bond']}>+{formatPercent(entity.apr ?? 0)} APR</AprLabel>
              ) : null}
            </div>
            <Text type="small" weight="semibold">
              TBD
            </Text>
          </>
        );
      },
    },
    {
      heading: (
        <Hint
          text={
            <Text type="p2" className="mb-8">
              The originator APY is the APY that deposits get on the 3rd party lending provider. This number includes
              any governance token rewards.
            </Text>
          }>
          {activeMarket.name} APY
        </Hint>
      ),
      render: entity => (
        <Text type="p1" weight="semibold" color="primary">
          {formatPercent(entity.state.originatorNetApy)}
        </Text>
      ),
    },
    {
      heading: 'jToken conversion rate',
      render: entity => (
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
    ...(showWalletBalance
      ? ([
          {
            heading: 'Wallet balance',
            render: entity => (
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
        ] as ColumnType<PoolEntity>[])
      : []),
  ];
}

type Props = {
  activeMarket?: MarketMeta;
};

const PoolsTable: React.FC<Props> = props => {
  const { activeMarket } = props;

  const wallet = useWallet();
  const poolsCtx = usePools();
  const { pools, loading } = poolsCtx;

  const entities = useMemo<PoolEntity[]>(() => {
    return pools.filter(pool => !activeMarket || pool.protocolId === activeMarket.id);
  }, [pools, activeMarket]);

  const columns = useMemo<ColumnType<PoolEntity>[]>(() => {
    return getTableColumns(wallet.isActive, activeMarket!);
  }, [wallet, activeMarket]);

  return (
    <Table<PoolEntity>
      columns={columns}
      data={entities}
      variation="separated"
      loading={loading}
      link={item => `/smart-yield/stats?m=${item.protocolId}&t=${item.underlyingSymbol}`}
    />
  );
};

export default PoolsTable;
