import React from 'react';
import * as Antd from 'antd';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import Progress from 'components/antd/progress';
import IconBubble from 'components/custom/icon-bubble';
import StatusTag from 'components/custom/status-tag';
import TokenInput from 'components/custom/token-input';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { mergeState } from 'hooks/useMergeState';
import ConfirmTxModal, { ConfirmTxModalArgs } from 'modules/smart-yield/components/confirm-tx-modal';
import SYSeniorBondContract from 'modules/smart-yield/contracts/sySeniorBondContract';
import SYSmartYieldContract, { SYSeniorBondToken } from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolsSYPool, usePools } from 'modules/smart-yield/views/overview-view/pools-provider';
import { useWallet } from 'wallets/wallet';

import { doSequential, getFormattedDuration } from 'utils';

import s from './s.module.scss';

type ListEntity = {
  pool: PoolsSYPool;
  sBond: SYSeniorBondToken;
};

type State = {
  loading: boolean;
  data: ListEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
};

type ActivePositionProps = {
  pool: PoolsSYPool;
  sBond: SYSeniorBondToken;
};

type TransferConfirmArgs = ConfirmTxModalArgs & {
  address: string;
};

const ActivePosition: React.FC<ActivePositionProps> = props => {
  const { pool, sBond } = props;

  const wallet = useWallet();
  const [redeemModalVisible, showRedeemModal] = React.useState<boolean>();
  const [transferModalVisible, showTransferModal] = React.useState<boolean>();

  function handleRedeemShow() {
    showRedeemModal(true);
  }

  function handleRedeemCancel() {
    showRedeemModal(false);
  }

  function handleRedeemConfirm(args: ConfirmTxModalArgs): Promise<void> {
    if (!wallet.account) {
      return Promise.reject();
    }

    const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);

    return smartYieldContract.redeemBondSend(sBond.sBondId, args.gasPrice);
  }

  function handleTransferShow() {
    showTransferModal(true);
  }

  function handleTransferCancel() {
    showTransferModal(false);
  }

  function handleTransferConfirm(args: TransferConfirmArgs): Promise<void> {
    if (!wallet.account) {
      return Promise.reject();
    }

    const seniorBondContract = new SYSeniorBondContract(pool.seniorBondAddress);
    seniorBondContract.setProvider(wallet.provider);
    seniorBondContract.setAccount(wallet.account);

    return seniorBondContract.transferFromSend(wallet.account, args.address, sBond.sBondId, args.gasPrice);
  }

  const maturesAt = sBond.maturesAt * 1_000;
  const issuedAt = sBond.issuedAt * 1_000;
  const canRedeem = maturesAt <= Date.now();
  const deposited = getHumanValue(sBond.principal, pool.underlyingDecimals)!;
  const gained = getHumanValue(sBond.gain, pool.underlyingDecimals)!;
  const redeemable = deposited.plus(gained);
  const apy = gained
    .dividedBy(deposited)
    .dividedBy(maturesAt - issuedAt)
    .multipliedBy(365 * 24 * 60 * 60 * 1_000)
    .multipliedBy(100);
  const completed = 100 - ((maturesAt - Math.min(Date.now(), maturesAt)) * 100) / (maturesAt - issuedAt);
  const canTransfer = !sBond.liquidated;

  return (
    <Card key={sBond.sBondId} noPaddingBody>
      <div className="flex p-24">
        <IconBubble name={pool.meta?.icon!} bubbleName={pool.market?.icon!} className="mr-16" />
        <div>
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {pool.underlyingSymbol}
          </Text>
          <Text type="small" weight="semibold">
            {pool.market?.name}
          </Text>
        </div>

        <StatusTag text={canRedeem ? 'REDEEMABLE' : 'ONGOING'} color="blue" className="ml-auto" />
      </div>
      <Divider />
      <div className="p-24">
        <Text type="small" weight="semibold" color="secondary">
          Deposited
        </Text>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(deposited)}
        </Text>
      </div>
      <Divider />
      <div className="p-24">
        <Text type="small" weight="semibold" color="secondary">
          Redeemable
        </Text>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(redeemable)}
        </Text>
      </div>
      <Divider />
      <div className="p-24">
        <Text type="small" weight="semibold" color="secondary">
          Time left until maturity
        </Text>
        <UseLeftTime end={maturesAt} delay={1_000}>
          {leftTime => (
            <>
              <Text type="p1" weight="semibold" color="primary">
                {leftTime > 0 ? getFormattedDuration(0, maturesAt) : 'Redeem now'}
              </Text>
              <Progress
                percent={completed}
                trailColor="var(--color-border)"
                strokeWidth={4}
                strokeColor={{
                  '0%': 'var(--theme-blue-color)',
                  '100%': 'var(--theme-green-color)',
                }}
              />
            </>
          )}
        </UseLeftTime>
      </div>
      <Divider />
      <div className="p-24">
        <Text type="small" weight="semibold" color="secondary">
          APY
        </Text>
        <Text type="p1" weight="semibold" color="primary">
          {formatBigValue(apy)}%
        </Text>
      </div>
      <Divider />
      <div className="grid flow-col gap-24 p-24" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Button type="primary" disabled={!canRedeem} onClick={handleRedeemShow}>
          Redeem
        </Button>
        <Button type="ghost" disabled={!canTransfer} onClick={handleTransferShow}>
          Transfer
        </Button>
      </div>

      {redeemModalVisible && (
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
                  {formatBigValue(redeemable)} {pool.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Deposited amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(deposited)} {pool.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Maturity in
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {getFormattedDuration(0, maturesAt)}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  APY
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(apy)}%
                </Text>
              </div>
            </div>
          }
          submitText="Redeem"
          onCancel={handleRedeemCancel}
          onConfirm={handleRedeemConfirm}
        />
      )}
      {transferModalVisible && (
        <ConfirmTxModal
          visible
          title="Transfer your bond"
          header={
            <div className="grid flow-col col-gap-32">
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Redeemable amount
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(redeemable)} {pool.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Maturity date
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {getFormattedDuration(0, maturesAt)} days
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  APY
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(apy)}%
                </Text>
              </div>
            </div>
          }
          submitText="Transfer"
          onCancel={handleTransferCancel}
          onConfirm={handleTransferConfirm as any}>
          {({ submitting }) => (
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Required' }]}>
              <TokenInput disabled={submitting} />
            </Form.Item>
          )}
        </ConfirmTxModal>
      )}
    </Card>
  );
};

const ActivePositionsList: React.FC = () => {
  const wallet = useWallet();
  const pools = usePools();

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
      const result = await doSequential<PoolsSYPool>(pools.pools, async pool => {
        return new Promise<any>(async resolve => {
          const seniorBondContract = new SYSeniorBondContract(pool.seniorBondAddress);
          seniorBondContract.setProvider(wallet.provider);
          seniorBondContract.setAccount(wallet.account);

          const sBondIds = await seniorBondContract.getSeniorBondIds();

          if (sBondIds.length === 0) {
            return resolve(undefined);
          }

          const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
          smartYieldContract.setProvider(wallet.provider);

          const sBonds = await smartYieldContract.getSeniorBonds(sBondIds);

          if (sBonds.length === 0) {
            return resolve(undefined);
          }

          resolve(
            sBonds.map(sBond => ({
              pool,
              sBond,
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
    <>
      <Antd.Spin spinning={state.loading}>
        <div className={s.cards}>
          {state.data.map(entity => (
            <ActivePosition pool={entity.pool} sBond={entity.sBond} />
          ))}
        </div>
      </Antd.Spin>
    </>
  );
};

export default ActivePositionsList;
