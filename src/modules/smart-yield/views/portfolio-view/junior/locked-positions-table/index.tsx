import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatBigValue, formatUSDValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { mergeState } from 'hooks/useMergeState';
import { useReload } from 'hooks/useReload';
import ConfirmTxModal, { ConfirmTxModalArgs } from 'modules/smart-yield/components/confirm-tx-modal';
import SYJuniorBondContract from 'modules/smart-yield/contracts/syJuniorBondContract';
import SYSmartYieldContract, { SYJuniorBondToken } from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolsSYPool, usePools } from 'modules/smart-yield/views/overview-view/pools-provider';
import { useWallet } from 'wallets/wallet';

import { doSequential, getFormattedDuration } from 'utils';

type TableEntity = {
  pool: PoolsSYPool;
  jBond: SYJuniorBondToken;
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
        Redeemable balance
      </Text>
    ),
    width: '20%',
    align: 'right',
    render: (_, entity) => (
      <>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(getHumanValue(entity.jBond.tokens, entity.pool.underlyingDecimals))}
        </Text>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSDValue(getHumanValue(entity.jBond.tokens, entity.pool.underlyingDecimals))}
        </Text>
      </>
    ),
  },
  {
    title: (
      <Text type="small" weight="semibold">
        Time left
      </Text>
    ),
    width: '40%',
    align: 'right',
    render: (_, entity) => (
      <UseLeftTime end={entity.jBond.maturesAt * 1_000} delay={1_000}>
        {leftTime => (
          <Text type="p1" weight="semibold" color="primary">
            {leftTime > 0 ? getFormattedDuration(0, entity.jBond.maturesAt * 1_000) : 'Redeem now'}
          </Text>
        )}
      </UseLeftTime>
    ),
  },
  {
    title: null,
    width: '20%',
    render: (_, entity) => (
      <Button
        type="ghost"
        className="ml-auto"
        disabled={entity.jBond.maturesAt * 1_000 > Date.now()}
        onClick={entity.redeem}>
        Redeem
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

const LockedPositionsTable: React.FC = () => {
  const wallet = useWallet();
  const pools = usePools();
  const [reload, version] = useReload();

  const [state, setState] = React.useState<State>(InitialState);
  const [redeemModal, setRedeemModal] = React.useState<TableEntity | undefined>();

  function handleRedeemCancel() {
    setRedeemModal(undefined);
  }

  function handleRedeemConfirm(args: ConfirmTxModalArgs): Promise<void> {
    if (!redeemModal) {
      return Promise.reject();
    }

    const { pool, jBond } = redeemModal;

    const contract = new SYSmartYieldContract(pool.smartYieldAddress);
    contract.setProvider(wallet.provider);
    contract.setAccount(wallet.account);

    return contract.redeemJuniorBondSend(jBond.jBondId, args.gasPrice).then(() => {
      reload();
    });
  }

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
      const result = await doSequential<PoolsSYPool>(pools.pools, async pool => {
        return new Promise<any>(async resolve => {
          const juniorBondContract = new SYJuniorBondContract(pool.juniorBondAddress);
          juniorBondContract.setProvider(wallet.provider);
          juniorBondContract.setAccount(wallet.account);

          const jBondIds = await juniorBondContract.getJuniorBondIds();

          if (jBondIds.length === 0) {
            return resolve(undefined);
          }

          const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
          smartYieldContract.setProvider(wallet.provider);

          const jBonds = await smartYieldContract.getJuniorBonds(jBondIds);

          if (jBonds.length === 0) {
            return resolve(undefined);
          }

          const items = jBonds.map(jBond => {
            const item = {
              pool,
              jBond,
              redeem: () => {
                setRedeemModal(item);
              },
            };

            return item;
          });

          resolve(items);
        });
      });

      setState(
        mergeState<State>({
          loading: false,
          data: result.flat().filter(Boolean),
        }),
      );
    })();
  }, [wallet.account, pools, version]);

  return (
    <>
      <Table<TableEntity>
        columns={Columns}
        dataSource={state.data}
        rowKey={row => `${row.pool.protocolId}:${row.jBond.jBondId}`}
        loading={state.loading}
        scroll={{
          x: true,
        }}
      />

      {redeemModal && (
        <ConfirmTxModal
          visible
          title="Redeem your senior bond"
          header={
            <div className="grid flow-col col-gap-32">
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Redeemable amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  -
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Deposited amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  -
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Maturity in
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  -
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  APY
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  -
                </Text>
              </div>
            </div>
          }
          submitText="Redeem"
          onCancel={handleRedeemCancel}
          onConfirm={handleRedeemConfirm}
        />
      )}
    </>
  );
};

export default LockedPositionsTable;
