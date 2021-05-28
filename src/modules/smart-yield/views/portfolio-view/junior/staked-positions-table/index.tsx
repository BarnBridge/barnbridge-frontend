import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatToken, formatUSD, getEtherscanAddressUrl } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { BondToken, useKnownTokens } from 'components/providers/known-tokens-provider';
import { Markets, Pools } from 'modules/smart-yield/api';
import { SYRewardPoolEntity } from 'modules/smart-yield/models/syRewardPoolEntity';
import { useWallet } from 'wallets/wallet';

export type StakedPositionsTableEntity = SYRewardPoolEntity;

const Columns: ColumnsType<StakedPositionsTableEntity> = [
  {
    title: 'Token Name',
    render: (_, entity) => {
      const market = Markets.get(entity.meta.protocolId ?? '');
      const meta = Pools.get(entity.meta.underlyingSymbol ?? '');

      return (
        <div className="flex flow-col align-center">
          <IconBubble
            name={meta?.icon}
            bubbleName="static/token-bond"
            secondBubbleName={market?.icon}
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
    sorter: (a, b) => 0,
    render: function PoolBalanceRender(_, entity) {
      const knownTokensCtx = useKnownTokens();
      const walletCtx = useWallet();
      const stakedBalance = entity.rewardPool.getBalanceFor(walletCtx.account!)?.unscaleBy(entity.smartYield.decimals);
      const stakedBalanceInUSD = knownTokensCtx.convertTokenInUSD(stakedBalance, entity.smartYield.symbol!);

      return (
        <>
          <Tooltip
            title={formatToken(stakedBalance, {
              tokenName: entity.smartYield.symbol,
              decimals: entity.smartYield.decimals,
            })}>
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(stakedBalance, {
                tokenName: entity.smartYield.symbol,
              })}
            </Text>
          </Tooltip>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(stakedBalanceInUSD)}
          </Text>
        </>
      );
    },
  },
  {
    title: 'My $BOND rewards',
    width: '20%',
    align: 'right',
    sorter: (a, b) => 0,
    render: function BondRewardsRender(_, entity) {
      const knownTokensCtx = useKnownTokens();
      const bondToClaim = entity.rewardPool.getClaimFor(BondToken.address)?.unscaleBy(BondToken.decimals);
      const bondToClaimInUSD = knownTokensCtx.convertTokenInUSD(bondToClaim, BondToken.symbol!);

      return (
        <>
          <Tooltip
            title={formatToken(bondToClaim, {
              tokenName: BondToken.symbol,
              decimals: BondToken.decimals,
            })}>
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(bondToClaim, {
                tokenName: BondToken.symbol,
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
      rowKey="poolAddress"
      loading={loading}
      scroll={{
        x: true,
      }}
    />
  );
};

export default StakedPositionsTable;
