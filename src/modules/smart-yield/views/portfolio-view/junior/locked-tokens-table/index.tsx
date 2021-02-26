import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatBigValue } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import { fetchSYJuniorRedeems, SYJuniorRedeem } from 'modules/smart-yield/api';
import SmartYieldContract from 'modules/smart-yield/contracts/smartYieldContract';
import { useWallet } from 'wallets/wallet';

import ConfirmRedeemModal, { ConfirmRedeemModalArgs } from '../../confirm-redeem-modal';

import { getFormattedDuration } from 'utils';

type TableEntity = SYJuniorRedeem & {
  redeem: () => void;
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
        <IconBubble name="usdc-token" bubbleName="compound" />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            -
          </Text>
          <Text type="small" weight="semibold">
            -
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Redeemable balance
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatBigValue(entity.underlyingOut)}
      </Text>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Time left
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        <UseLeftTime end={entity.maturesAt} delay={1_000}>
          {leftTime => (
            <Text type="p1" weight="semibold" color="primary">
              {leftTime > 0 ? getFormattedDuration(0, entity.maturesAt) : 'Redeem now'}
            </Text>
          )}
        </UseLeftTime>
      </Text>
    ),
  },
  {
    title: null,
    width: 'min-content',
    render: (_, entity) => (
      <Button type="ghost" disabled={entity.maturesAt > Date.now()} onClick={() => entity.redeem()}>
        Redeem
      </Button>
    ),
  },
];

type State = {
  loading: boolean;
  data: TableEntity[];
  total: number;
  pageSize: number;
  page: number;
};

const InitialState: State = {
  loading: false,
  data: [],
  total: 0,
  pageSize: 10,
  page: 1,
};

const LockedTokensTable: React.FC = () => {
  const [redeemModal, setRedeemModal] = React.useState<SYJuniorRedeem | undefined>();

  const wallet = useWallet();
  const [reload, version] = useReload();

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
        const redeems = await fetchSYJuniorRedeems(wallet.account, state.page, state.pageSize);

        setState(
          mergeState<State>({
            loading: false,
            data: redeems.data.map(redeem => ({
              ...redeem,
              redeem: () => {
                setRedeemModal(redeem);
              },
            })),
            total: redeems.meta.count,
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
  }, [wallet.account, state.page, version]);

  function handlePageChange(page: number) {
    setState(
      mergeState<State>({
        page,
      }),
    );
  }

  function handleRedeemConfirm(args: ConfirmRedeemModalArgs): Promise<void> {
    if (!redeemModal) {
      return Promise.reject();
    }

    const { smartYieldAddress, juniorBondId } = redeemModal;

    const contract = new SmartYieldContract(smartYieldAddress, smartYieldAddress);
    contract.setProvider(wallet.provider);
    contract.setAccount(wallet.account);

    return contract.redeemJuniorBondSend(juniorBondId, args.gasFee).then(() => {
      reload();
    });
  }

  function handleRedeemCancel() {
    setRedeemModal(undefined);
  }

  return (
    <>
      <Table<TableEntity>
        columns={Columns}
        dataSource={state.data}
        rowKey="juniorBondId"
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

      {redeemModal && <ConfirmRedeemModal visible onConfirm={handleRedeemConfirm} onCancel={handleRedeemCancel} />}
    </>
  );
};

export default LockedTokensTable;
