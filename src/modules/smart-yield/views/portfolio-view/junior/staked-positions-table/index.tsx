import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken, formatUSD, getEtherscanAddressUrl } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { APISYRewardPool, Markets, Pools } from 'modules/smart-yield/api';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';

export type StakedPositionsTableEntity = APISYRewardPool & {
  pool: SYRewardPoolContract;
  poolToken: SYSmartYieldContract;
  rewardToken: Erc20Contract;
  rewardPrice?: BigNumber;
};

const Columns: ColumnsType<StakedPositionsTableEntity> = [
  {
    title: 'Token Name',
    render: (_, entity) => {
      const market = Markets.get(entity.protocolId ?? '');
      const meta = Pools.get(entity.underlyingSymbol ?? '');

      return (
        <div className="flex flow-col align-center">
          <IconBubble
            name={meta?.icon}
            bubbleName="static/token-bond"
            secondBubbleName={market?.icon}
            className="mr-16"
          />
          <div className="flex flow-row">
            <ExternalLink href={getEtherscanAddressUrl(entity.poolTokenAddress)} className="flex flow-col mb-4">
              <Text type="p1" weight="semibold" color="blue" className="mr-4">
                {entity.underlyingSymbol}
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
    render: (_, entity) => (
      <>
        <Tooltip
          title={formatToken(entity.pool.balance?.unscaleBy(entity.poolToken.decimals), {
            tokenName: entity.poolToken.symbol,
            decimals: entity.poolToken.decimals,
          })}>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(entity.pool.balance?.unscaleBy(entity.poolToken.decimals), {
              tokenName: entity.poolToken.symbol,
            })}
          </Text>
        </Tooltip>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSD(
            entity.pool.balance?.unscaleBy(entity.poolToken.decimals)?.multipliedBy(entity.poolToken.price ?? 0),
          )}
        </Text>
      </>
    ),
  },
  {
    title: 'My $BOND rewards',
    width: '20%',
    align: 'right',
    sorter: (a, b) => 0,
    render: (_, entity) => (
      <>
        <Tooltip
          title={formatToken(entity.pool.toClaim?.unscaleBy(entity.rewardToken.decimals), {
            tokenName: entity.rewardToken.symbol,
            decimals: entity.rewardToken.decimals,
          })}>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(entity.pool.toClaim?.unscaleBy(entity.rewardToken.decimals), {
              tokenName: entity.rewardToken.symbol,
            })}
          </Text>
        </Tooltip>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSD(
            entity.pool.toClaim?.unscaleBy(entity.rewardToken.decimals)?.multipliedBy(entity.rewardPrice ?? 0),
          )}
        </Text>
      </>
    ),
  },
  {
    width: '20%',
    render: (_, entity) => (
      <NavLink
        to={{
          pathname: `/smart-yield/pool`,
          search: `?m=${entity.protocolId}&t=${entity.underlyingSymbol}`,
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
