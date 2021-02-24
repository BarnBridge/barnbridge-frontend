import React from 'react';
import { useHistory } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Select from 'components/antd/select';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Icons, { IconNames } from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import TabCard from 'modules/smart-yield/components/tab-card';

import { mergeState } from 'hooks/useMergeState';
import { formatBigValue, formatUSDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import {
  SYMarketType,
  SYOriginatorType,
  useSYPools
} from 'modules/smart-yield/providers/sy-pools-provider';
import { SYContract } from 'modules/smart-yield/providers/sy-pools-provider/sy/contract';

type State = {
  activeMarket?: SYMarketType;
};

const InitialState: State = {
  activeMarket: undefined,
};

type TableEntity = SYOriginatorType & {
  contract?: SYContract;
  goDeposit: () => void;
};

const TableColumns: ColumnsType<TableEntity> = [
  {
    title: () => (
      <Text type="small" weight="semibold">
        Originator
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.icon} bubbleName={entity.market.icon} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            {entity.name}
          </Text>
          <Text type="small" weight="semibold">
            {entity.market.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Senior Liquidity
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(entity.contract?.underlyingSeniors)}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSDValue(entity.contract?.underlyingSeniorsPrice)}
        </Text>
      </Grid>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Senior APY
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        -%
      </Text>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Junior Liquidity
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(entity.contract?.underlyingJuniors)}
        </Text>
        <Text type="small" weight="semibold">
          {formatUSDValue(entity.contract?.underlyingJuniorsPrice)}
        </Text>
      </Grid>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Junior APY
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="purple">
        -%
      </Text>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Originator APY
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        -%
      </Text>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        jToken conversion rate
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          1 {entity.contract?.pool?.uToken?.symbol}
        </Text>
        <Text type="small" weight="semibold">
          = ${formatBigValue(entity.contract?.price)} {entity.contract?.pool?.cToken?.symbol}
        </Text>
      </Grid>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Wallet balance
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(entity.contract?.pool?.uToken?.balance)}
        </Text>
        <Text type="small" weight="semibold">
          $ -
        </Text>
      </Grid>
    ),
  },
  {
    title: () => null,
    render: (_, entity) => (
      <Button
        type="primary"
        onClick={() => entity.goDeposit()}>
        Deposit
      </Button>
    ),
  },
];

const OriginatorOptions = [
  { value: '', label: 'All originators' },
];

const OverviewView: React.FunctionComponent = () => {
  const history = useHistory();
  const syPools = useSYPools();

  const { markets, originators, contracts } = syPools.state;
  const [state, setState] = React.useState<State>(InitialState);

  const tableSource = React.useMemo<TableEntity[]>(() => {
    return originators
      .filter(originator => originator.market === state.activeMarket)
      .map<TableEntity>(originator => ({
        ...originator,
        contract: contracts.get(originator.address),
        goDeposit: () => {
          history.push(`/smart-yield/${originator.address}/deposit`);
        },
      }));
  }, [originators, contracts, state.activeMarket]);

  React.useEffect(() => {
    if (markets.length > 0) {
      setState(mergeState<State>({
        activeMarket: markets[0],
      }));
    }
  }, [markets]);

  return (
    <>
      <Grid flow="col" gap={24} className="mb-64">
        {markets.map(market => (
          <TabCard
            key={market.name}
            title={market.name}
            subtitle="Markets"
            icon={<Icons name={market.icon as IconNames} width={40} height={40} />}
            active={state.activeMarket === market}
            onClick={() => {
              setState(mergeState<State>({
                activeMarket: market,
              }));
            }}
          />
        ))}
      </Grid>
      {state.activeMarket && (
        <>
          <Text type="p1" weight="semibold" color="secondary" className="mb-8">
            {state.activeMarket.name} total liquidity
          </Text>
          <Text type="h2" color="primary" className="mb-40">
            {formatUSDValue(ZERO_BIG_NUMBER)}
          </Text>
        </>
      )}
      <Card
        title={
          <Select
            options={OriginatorOptions}
            disabled={syPools.state.loading}
            value=""
          />
        }
        noPaddingBody>
        <Table<TableEntity>
          columns={TableColumns}
          dataSource={tableSource}
          rowKey="address"
          loading={syPools.state.loading}
        />
      </Card>
    </>
  );
};

export default OverviewView;
