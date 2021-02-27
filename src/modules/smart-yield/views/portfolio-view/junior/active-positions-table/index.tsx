import React from 'react';
import { useHistory } from 'react-router';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, formatBigValue, formatUSDValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { mergeState } from 'hooks/useMergeState';
import SYSmartYieldContract, { SYAbond } from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolsSYPool, usePools } from 'modules/smart-yield/views/overview-view/pools-provider';
import { useWallet } from 'wallets/wallet';

import { doSequential, getFormattedDuration } from 'utils';

type TableEntity = {
  pool: PoolsSYPool;
  balance: BigNumber;
  abond: SYAbond;
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
            {entity.pool.underlyingSymbol}
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
    width: '20%',
    align: 'right',
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(entity.balance)}
        </Text>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSDValue(entity.balance)}
        </Text>
      </>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        APY
      </Text>
    ),
    width: '20%',
    align: 'right',
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatBigValue(entity.pool.state.juniorApy * 100)}%
      </Text>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Withdraw wait time
      </Text>
    ),
    width: '20%',
    align: 'right',
    render: (_, entity) => (
      <UseLeftTime end={entity.abond.maturesAt * 1_000} delay={1_000}>
        {leftTime => (
          <Text type="p1" weight="semibold" color="primary">
            {leftTime > 0 ? getFormattedDuration(0, entity.abond.maturesAt * 1_000) : ''}
          </Text>
        )}
      </UseLeftTime>
    ),
  },
  {
    title: null,
    width: '20%',
    render: (_, entity) => (
      <Button type="primary" className="ml-auto" onClick={entity.goWithdraw}>
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

const ActivePositionsTable: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const poolsCtx = usePools();

  const { pools } = poolsCtx;

  const [state, setState] = React.useState<State>(InitialState);

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
        return new Promise<any>(async resolve => {
          const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
          smartYieldContract.setProvider(wallet.provider);
          smartYieldContract.setAccount(wallet.account);

          const balance = await smartYieldContract.getBalance();
          const abond = await smartYieldContract.getAbond();

          if (balance.isGreaterThan(ZERO_BIG_NUMBER)) {
            resolve({
              pool,
              balance: getHumanValue(balance, pool.underlyingDecimals),
              abond,
              goWithdraw: () => {
                history.push(`/smart-yield/${pool.smartYieldAddress}/withdraw`);
              },
            });
          } else {
            resolve(undefined);
          }
        });
      });

      setState(
        mergeState<State>({
          loading: false,
          data: result.filter(Boolean),
        }),
      );
    })();
  }, [wallet.account, pools]);

  return (
    <Table<TableEntity>
      columns={Columns}
      dataSource={state.data}
      rowKey={row => `${row.pool.smartYieldAddress}`}
      loading={state.loading}
      scroll={{
        x: true,
      }}
    />
  );
};

export default ActivePositionsTable;
