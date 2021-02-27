import React from 'react';
import { NavLink } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER, formatBigValue, getHumanValue } from 'web3/utils';

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

type TableEntity = PoolsSYPool & {
  smartYieldBalance: BigNumber;
  smartYieldAbond: SYAbond;
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
        <IconBubble name={entity.meta?.icon!} bubbleName={entity.market?.icon!} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            {entity.underlyingSymbol}
          </Text>
          <Text type="small" weight="semibold">
            {entity.market?.name}
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
          {formatBigValue(getHumanValue(entity.smartYieldBalance, entity.underlyingDecimals))}
        </Text>
        <Text type="small" weight="semibold" color="secondary">
          {formatBigValue(getHumanValue(entity.smartYieldBalance, entity.underlyingDecimals))}
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
        {formatBigValue(entity.state.juniorApy * 100)}%
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
      <UseLeftTime end={entity.smartYieldAbond.maturesAt * 1_000} delay={1_000}>
        {leftTime => (
          <Text type="p1" weight="semibold" color="primary">
            {leftTime > 0 ? getFormattedDuration(0, entity.smartYieldAbond.maturesAt * 1_000) : ''}
          </Text>
        )}
      </UseLeftTime>
    ),
  },
  {
    title: null,
    width: '20%',
    render: (_, entity) => (
      <NavLink to={`/smart-yield/${entity.smartYieldAddress}/withdraw`}>
        <Button type="primary" className="ml-auto">
          Withdraw
        </Button>
      </NavLink>
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

          const smartYieldBalance = await smartYieldContract.getBalance();
          const smartYieldAbond = await smartYieldContract.getAbond();

          if (smartYieldBalance.isGreaterThan(ZERO_BIG_NUMBER)) {
            resolve({
              ...pool,
              smartYieldBalance,
              smartYieldAbond,
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
      rowKey="smartYieldAddress"
      loading={state.loading}
      scroll={{
        x: true,
      }}
    />
  );
};

export default ActivePositionsTable;
