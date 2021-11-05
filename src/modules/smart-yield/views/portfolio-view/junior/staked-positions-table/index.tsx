import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import { AprLabel } from 'components/custom/label';
import { Hint, Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { SYRewardPoolEntity } from 'modules/smart-yield/models/syRewardPoolEntity';
import { getKnownMarketById } from 'modules/smart-yield/providers/markets';
import { usePools } from 'modules/smart-yield/providers/pools-provider';
import { useWallet } from 'wallets/walletProvider';

export type StakedPositionsTableEntity = SYRewardPoolEntity;

const Columns: ColumnsType<StakedPositionsTableEntity> = [
  {
    title: 'Token Name',
    render: function Render(_, entity) {
      const { getEtherscanAddressUrl } = useWeb3();
      const { getToken } = useTokens();
      const { projectToken } = useKnownTokens();

      const market = getKnownMarketById(entity.meta.protocolId ?? '');
      const token = getToken(entity.meta.underlyingSymbol);

      return (
        <div className="flex flow-col align-center">
          <TokenIcon
            name={token?.icon as TokenIconNames}
            bubble1Name={projectToken.icon}
            bubble2Name={market?.icon.active as TokenIconNames}
            className="mr-16"
          />
          <div className="flex flow-row">
            <ExternalLink href={getEtherscanAddressUrl(entity.smartYield.address)} className="flex flow-col mb-4">
              <Text type="p1" weight="semibold" color="blue" className="mr-4">
                {entity.meta.underlyingSymbol}
              </Text>
              <Icon name="arrow-top-right" width={8} height={8} color="blue" />
            </ExternalLink>
            <Text type="small" weight="semibold">
              {market?.name}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'My pool balance',
    width: '20%',
    align: 'right',
    render: function PoolBalanceRender(_, entity) {
      const knownTokensCtx = useKnownTokens();
      const walletCtx = useWallet();
      const val = entity.rewardPool.getBalanceFor(walletCtx.account!)?.unscaleBy(entity.meta.poolTokenDecimals);
      const uVal = val?.multipliedBy(entity.smartYield.price ?? 0);
      const valInUSD = knownTokensCtx.convertTokenInUSD(uVal, entity.meta.underlyingSymbol);

      return (
        <>
          <Tooltip
            title={formatToken(val, {
              tokenName: entity.smartYield.symbol,
              decimals: entity.smartYield.decimals,
            })}>
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(val, {
                tokenName: entity.smartYield.symbol,
              })}
            </Text>
          </Tooltip>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(valInUSD)}
          </Text>
        </>
      );
    },
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
        APY
      </Hint>
    ),
    render: function APYRender(_, entity) {
      const { bondToken, stkAaveToken } = useKnownTokens();
      const poolsCtx = usePools();
      const pool = poolsCtx.pools.find(
        pool => pool.protocolId === entity.meta.protocolId && pool.underlyingAddress === entity.meta.underlyingAddress,
      );

      if (!pool) {
        return null;
      }

      const hasZeroBondRewardLeft = entity.rewardPool.getRewardLeftFor(bondToken.address)?.isZero();
      const apyr = entity.apy?.plus(hasZeroBondRewardLeft ? 0 : entity.apr ?? 0) ?? 0;

      return (
        <div>
          <Text type="p1" weight="semibold" color="purple">
            {formatPercent(pool.state.juniorApy)}
          </Text>
          {entity.rewardPool?.rewardTokensCount! > 1 ? (
            <AprLabel icons={[bondToken.icon!, stkAaveToken.icon!]}>+{formatPercent(apyr)} APR</AprLabel>
          ) : !hasZeroBondRewardLeft && entity.apr ? (
            <AprLabel icons={['bond']}>+{formatPercent(entity.apr ?? 0)} APR</AprLabel>
          ) : null}
        </div>
      );
    },
  },
  {
    title: `My $BOND rewards`,
    width: '20%',
    align: 'right',
    render: function RewardsRender(_, entity) {
      const { bondToken, convertTokenInUSD } = useKnownTokens();
      const bondToClaim = entity.rewardPool.getClaimFor(bondToken.address)?.unscaleBy(bondToken.decimals);
      const bondToClaimInUSD = convertTokenInUSD(bondToClaim, bondToken.symbol!);

      return (
        <>
          <Tooltip
            title={formatToken(bondToClaim, {
              tokenName: bondToken.symbol,
              decimals: bondToken.decimals,
            })}>
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(bondToClaim, {
                tokenName: bondToken.symbol,
              })}
            </Text>
          </Tooltip>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(bondToClaimInUSD)}
          </Text>
        </>
      );
    },
  },
  {
    width: '20%',
    render: (_, entity) => (
      <NavLink
        to={{
          pathname: `/smart-yield/pool`,
          search: `?m=${entity.meta.protocolId}&t=${entity.meta.underlyingSymbol}`,
        }}>
        <Button type="primary" className="ml-auto">
          View pool
        </Button>
      </NavLink>
    ),
  },
];

type Props = {
  loading: boolean;
  data: StakedPositionsTableEntity[];
};

const StakedPositionsTable: React.FC<Props> = props => {
  const { loading, data } = props;

  return (
    <Table<StakedPositionsTableEntity>
      columns={Columns}
      dataSource={data}
      rowKey={entity => entity.meta.poolAddress}
      loading={loading}
      scroll={{
        x: true,
      }}
    />
  );
};

export default StakedPositionsTable;
