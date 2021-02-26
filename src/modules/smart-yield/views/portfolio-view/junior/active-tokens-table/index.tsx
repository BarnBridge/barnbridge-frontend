import React from 'react';
import { useHistory } from 'react-router';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { mergeState } from 'hooks/useMergeState';
import JuniorBondContract from 'modules/smart-yield/contracts/juniorBondContract';
import SmartYieldContract, { SYJuniorBondToken } from 'modules/smart-yield/contracts/smartYieldContract';
import PoolsProvider, { PoolsSYPool, usePools } from 'modules/smart-yield/views/overview-view/pools-provider';
import { useWallet } from 'wallets/wallet';

import { doSequential, getFormattedDuration } from 'utils';

type TableEntity = {
  pool: PoolsSYPool;
  jBond: SYJuniorBondToken;
  goWithdraw: () => void;
};

const Columns: ColumnsType<TableEntity> = [
  {
    title: (
      <Text type="small" weight="semibold">
        Token Name
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.pool.meta?.icon!} bubbleName={entity.pool.market?.icon!} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            {entity.pool.meta?.name}
          </Text>
          <Text type="small" weight="semibold">
            {entity.pool.market?.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Current balance
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatBigValue(getHumanValue(entity.jBond.tokens, entity.pool.underlyingDecimals))}
      </Text>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        APY
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatBigValue(entity.pool.state.juniorApy)}%
      </Text>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Withdraw wait time
      </Text>
    ),
    render: (_, entity) => (
      <UseLeftTime end={entity.jBond.maturesAt} delay={1_000}>
        {leftTime => (
          <Text type="p1" weight="semibold" color="primary">
            {leftTime > 0 ? getFormattedDuration(0, entity.jBond.maturesAt) : ''}
          </Text>
        )}
      </UseLeftTime>
    ),
  },
  {
    title: null,
    width: 'min-content',
    render: (_, entity) => (
      <Button type="primary" onClick={entity.goWithdraw}>
        Withdraw
      </Button>
    ),
  },
];

type State = {
  loading: boolean;
  data: TableEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
};

const ActiveTokensTableInner: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const pools = usePools();

  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    setState(
      mergeState<State>({
        loading: true,
      }),
    );

    (async () => {
      const result = await doSequential<PoolsSYPool>(pools.pools, async pool => {
        return new Promise<any>(async resolve => {
          const juniorBondContract = new JuniorBondContract(pool.juniorBondAddress, '');
          juniorBondContract.setProvider(wallet.provider);
          juniorBondContract.setAccount(wallet.account);

          const jBondIds = await juniorBondContract.getJuniorBondIds();

          if (jBondIds.length === 0) {
            return resolve(undefined);
          }

          const smartYieldContract = new SmartYieldContract(pool.smartYieldAddress, '');
          smartYieldContract.setProvider(wallet.provider);

          const jBonds = await smartYieldContract.getJuniorBonds(jBondIds);

          if (jBonds.length === 0) {
            return resolve(undefined);
          }

          resolve(
            jBonds.map(jBond => ({
              pool,
              jBond,
              goWithdraw: () => {
                history.push(`/smart-yield/${pool.smartYieldAddress}/withdraw`);
              },
            })),
          );
        });
      });

      setState(
        mergeState<State>({
          loading: false,
          data: result.flat().filter(Boolean),
        }),
      );
    })();
  }, [wallet.account, pools]);

  return (
    <Card
      noPaddingBody
      title={
        <Grid flow="col" colsTemplate="1fr max-content">
          <Text type="p1" weight="semibold" color="primary">
            Active positions
          </Text>
          <Button type="light">
            <Icons name="filter" />
            Filter
          </Button>
        </Grid>
      }>
      <Table<TableEntity>
        columns={Columns}
        dataSource={state.data}
        rowKey={row => `${row.pool.protocolId}:${row.jBond.jBondId}`}
        loading={state.loading}
        scroll={{
          x: true,
        }}
      />
    </Card>
  );
};

const ActiveTokensTable: React.FC = () => {
  return (
    <PoolsProvider>
      <ActiveTokensTableInner />
    </PoolsProvider>
  );
};

export default ActiveTokensTable;
