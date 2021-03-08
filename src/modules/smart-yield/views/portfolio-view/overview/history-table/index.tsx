import React, { useState } from 'react';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import format from 'date-fns/format';
import capitalize from 'lodash/capitalize';
import { formatBigValue, formatUSDValue, getEtherscanTxUrl, shortenAddr } from 'web3/utils';

import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Popover from 'components/antd/popover';
import Select from 'components/antd/select';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import { APISYUserTxHistory, HistoryTypes, Markets, Pools, fetchSYUserTxHistory } from 'modules/smart-yield/api';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const originatorFilterOptions = [
  {
    label: 'All originators',
    value: 1,
  },
  {
    label: 'All originators 2',
    value: 2,
  },
];

const tokenFilterOptions = [
  {
    label: 'All tokens',
    value: 1,
  },
  {
    label: 'All tokens 2',
    value: 2,
  },
];

const transactionFilterOptions = [
  {
    label: 'All transactions',
    value: 1,
  },
  {
    label: 'All transactions 2',
    value: 2,
  },
];

type FormValues = {
  originator?: string;
  token?: string;
  transactionType?: string;
};

const Filters: React.FC = () => {
  const [form] = Antd.Form.useForm<FormValues>();

  const handleFinish = React.useCallback((values: FormData) => {
    console.log(values);
  }, []);

  return (
    <Form
      form={form}
      initialValues={{
        originator: originatorFilterOptions[0].value,
        token: tokenFilterOptions[0].value,
        transactionType: transactionFilterOptions[0].value,
      }}
      validateTrigger={['onSubmit']}
      onFinish={handleFinish}>
      <Form.Item label="Originator" name="originator" className="mb-32">
        <Select
          loading={false}
          disabled={false}
          options={originatorFilterOptions}
          fixScroll
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Token" name="token" className="mb-32">
        <Select loading={false} disabled={false} options={tokenFilterOptions} fixScroll style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Transaction type" name="transactionType" className="mb-32">
        <Select
          loading={false}
          disabled={false}
          options={transactionFilterOptions}
          fixScroll
          style={{ width: '100%' }}
        />
      </Form.Item>

      <div className="grid flow-col align-center justify-space-between">
        <button type="button" onClick={() => form.resetFields()} className="button-text">
          Reset filters
        </button>
        <button type="submit" className="button-primary">
          Apply filters
        </button>
      </div>
    </Form>
  );
};

type TableEntity = APISYUserTxHistory;

const Columns: ColumnsType<TableEntity> = [
  {
    title: 'Token Name',
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble
          name={Pools.get(entity.underlyingTokenSymbol)?.icon}
          bubbleName={Markets.get(entity.protocolId)?.icon}
        />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {entity.underlyingTokenSymbol}
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            {Markets.get(entity.protocolId)?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: 'Transaction Hash',
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <ExternalLink href={getEtherscanTxUrl(entity.transactionHash)}>
          <Text type="p1" weight="semibold" color="blue">
            {shortenAddr(entity.transactionHash)}
          </Text>
        </ExternalLink>
      </Grid>
    ),
  },
  {
    title: 'Date',
    sorter: (a, b) => a.blockTimestamp - b.blockTimestamp,
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy')}
        </Text>
        <Text type="small" weight="semibold">
          {format(entity.blockTimestamp * 1_000, 'HH:mm')}
        </Text>
      </>
    ),
  },
  {
    title: 'Amount',
    sorter: (a, b) => {
      const diff = a.amount - b.amount;

      if (diff < 0) {
        return -1;
      }

      if (diff > 0) {
        return 1;
      }

      return 0;
    },
    render: (_, entity) => (
      <Grid flow="row" gap={4}>
        <Tooltip title={formatBigValue(entity.amount, 18)}>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(entity.amount)}
          </Text>
        </Tooltip>
        <Text type="small" weight="semibold">
          {formatUSDValue(new BigNumber(entity.amount))}
        </Text>
      </Grid>
    ),
  },
  {
    title: 'Tranche',
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {capitalize(entity.tranche)}
      </Text>
    ),
  },
  {
    title: 'Transaction type',
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {HistoryTypes.get(entity.transactionType)}
      </Text>
    ),
  },
];

type State = {
  loading: boolean;
  data: TableEntity[];
  total: number;
  pageSize: number;
  page: number;
  originatorFilter: string;
  tokenFilter: string;
  transactionTypeFilter: string;
};

const InitialState: State = {
  loading: false,
  data: [],
  total: 0,
  pageSize: 10,
  page: 1,
  originatorFilter: 'all',
  tokenFilter: 'all',
  transactionTypeFilter: 'all',
};

const HistoryTable: React.FC = () => {
  const wallet = useWallet();
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    (async () => {
      if (!wallet.account) {
        return;
      }

      setState(
        mergeState<State>({
          loading: true,
        }),
      );

      try {
        const history = await fetchSYUserTxHistory(
          wallet.account,
          state.page,
          state.pageSize,
          state.originatorFilter,
          state.tokenFilter,
          state.transactionTypeFilter,
        );

        setState(
          mergeState<State>({
            loading: false,
            data: history.data,
            total: history.meta.count,
          }),
        );
      } catch {
        setState(
          mergeState<State>({
            loading: false,
            data: [],
            total: 0,
          }),
        );
      }
    })();
  }, [wallet.account, state.page]);

  function handlePageChange(page: number) {
    setState(
      mergeState<State>({
        page,
      }),
    );
  }

  return (
    <Card
      className={s.card}
      title={
        <Grid flow="col" colsTemplate="1fr max-content" align="center">
          <Text type="p1" weight="semibold" color="primary">
            Transaction history
          </Text>

          <Popover
            title="Filters"
            overlayStyle={{ width: 348 }}
            content={<Filters />}
            visible={filtersVisible}
            onVisibleChange={setFiltersVisible}
            placement="bottomRight">
            <button type="button" className="button-ghost-monochrome ml-auto">
              <Icon name="filter" className="mr-8" color="inherit" />
              Filters
            </button>
          </Popover>
        </Grid>
      }
      noPaddingBody>
      <Table
        columns={Columns}
        dataSource={state.data}
        rowKey="transactionHash"
        loading={state.loading}
        pagination={{
          total: state.total,
          pageSize: state.pageSize,
          current: state.page,
          position: ['bottomRight'],
          showTotal: (total: number, [from, to]: [number, number]) => (
            <Text type="p2" weight="semibold" color="secondary">
              Showing {from} to {to} out of {total} entries
            </Text>
          ),
          onChange: handlePageChange,
        }}
        scroll={{
          x: true,
        }}
      />
    </Card>
  );
};

export default HistoryTable;
