import React from 'react';
import BigNumber from 'bignumber.js';
import format from 'date-fns/format';
import { useContractManager } from 'web3/components/contractManagerProvider';
import { formatBigValue, formatPercent, formatUSDValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import Progress from 'components/antd/progress';
import Tooltip from 'components/antd/tooltip';
import IconBubble from 'components/custom/icon-bubble';
import StatusTag from 'components/custom/status-tag';
import TokenInput from 'components/custom/token-input';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import TxConfirmModal, { ConfirmTxModalArgs } from 'modules/smart-yield/components/tx-confirm-modal';
import SYControllerContract from 'modules/smart-yield/contracts/syControllerContract';
import { SYSeniorBondToken } from 'modules/smart-yield/contracts/sySmartYieldContract';
import { PoolsSYPool, usePools } from 'modules/smart-yield/providers/pools-provider';
import { useWallet } from 'wallets/walletProvider';

import { getFormattedDuration } from 'utils';

type ActivePositionProps = {
  pool: PoolsSYPool;
  sBond: SYSeniorBondToken;
  onRefresh: () => void;
};

type TransferConfirmArgs = ConfirmTxModalArgs & {
  address: string;
};

const ActivePosition: React.FC<ActivePositionProps> = props => {
  const { pool, sBond, onRefresh } = props;

  const { getContract } = useContractManager();
  const poolsCtx = usePools();
  const wallet = useWallet();
  const [redeemModalVisible, showRedeemModal] = React.useState<boolean>(false);
  const [transferModalVisible, showTransferModal] = React.useState<boolean>(false);
  const [saving, setSaving] = React.useState<boolean>(false);
  const [seniorRedeemFee, setSeniorRedeemFee] = React.useState<BigNumber | undefined>();

  React.useEffect(() => {
    if (!pool) {
      return;
    }

    const controllerContract = getContract<SYControllerContract>(pool.controllerAddress, () => {
      return new SYControllerContract(pool.controllerAddress);
    });
    controllerContract.getSeniorRedeemFee().then(setSeniorRedeemFee);
  }, [pool?.controllerAddress]);

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

    setSaving(true);
    showRedeemModal(false);

    return poolsCtx
      .redeemBond(pool.smartYieldAddress, sBond.sBondId, args.gasPrice)
      .then(() => {
        onRefresh();
        setSaving(false);
      })
      .catch(() => {
        setSaving(false);
      });
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

    setSaving(true);
    showTransferModal(false);

    return poolsCtx
      .transferFrom(pool.seniorBondAddress, args.address, sBond.sBondId, args.gasPrice)
      .then(() => {
        onRefresh();
        setSaving(false);
      })
      .catch(() => {
        setSaving(false);
      });
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
    .multipliedBy(365 * 24 * 60 * 60 * 1_000);
  const completed = 100 - ((maturesAt - Math.min(Date.now(), maturesAt)) * 100) / (maturesAt - issuedAt);
  const canTransfer = !sBond.liquidated;
  const gainedFee = gained.multipliedBy(seniorRedeemFee?.dividedBy(1e18) ?? BigNumber.ZERO);
  const toGetAmount = deposited.plus(gained).minus(gainedFee);

  return (
    <div className="card">
      <div className="p-24" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <IconBubble name={pool.meta?.icon} bubbleName={pool.market?.icon} className="mr-16" />
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
        <Tooltip title={formatBigValue(deposited, pool.underlyingDecimals)}>
          <Text type="p1" tag="span" weight="semibold" color="primary">
            {formatBigValue(deposited)}
            {` ${pool.underlyingSymbol}`}
          </Text>
        </Tooltip>
        <Text type="p2" weight="semibold" color="secondary">
          {formatUSDValue(deposited)}
        </Text>
      </div>
      <Divider />
      <div className="p-24">
        <Text type="small" weight="semibold" color="secondary">
          Redeemable
        </Text>
        <Tooltip title={formatBigValue(redeemable, pool.underlyingDecimals)}>
          <Text type="p1" tag="span" weight="semibold" color="primary">
            {formatBigValue(redeemable)}
            {` ${pool.underlyingSymbol}`}
          </Text>
        </Tooltip>
        <Text type="p2" weight="semibold" color="secondary">
          {formatUSDValue(redeemable)}
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
                trailColor="var(--theme-border-color)"
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
        <Text type="p1" weight="semibold" color="green">
          {formatPercent(apy)}
        </Text>
      </div>
      <Divider />
      <div className="flexbox-grid flow-col gap-24 p-24" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Button type="primary" disabled={!canRedeem || saving} onClick={handleRedeemShow}>
          Redeem
        </Button>
        <Button type="ghost" disabled={!canTransfer || saving} onClick={handleTransferShow}>
          Transfer
        </Button>
      </div>

      {redeemModalVisible && (
        <TxConfirmModal
          title="Redeem your senior bond"
          header={
            <div className="grid flow-col col-gap-32">
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Redeemable amount
                </Text>
                <Tooltip title={formatBigValue(redeemable, pool.underlyingDecimals)}>
                  <Text type="p1" weight="semibold" color="primary">
                    {formatBigValue(redeemable)} {pool.underlyingSymbol}
                  </Text>
                </Tooltip>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Protocol fee ({formatPercent(seniorRedeemFee?.dividedBy(1e18))})
                </Text>
                <Tooltip title={formatBigValue(deposited, pool.underlyingDecimals)}>
                  <Text type="p1" weight="semibold" color="primary">
                    {formatBigValue(gainedFee)} {pool.underlyingSymbol}
                  </Text>
                </Tooltip>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  You will get
                </Text>
                <Text type="p1" weight="bold" color="primary">
                  {formatBigValue(toGetAmount)} {pool.underlyingSymbol}
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
        <TxConfirmModal
          title="Transfer your bond"
          width={680}
          header={
            <div className="grid flow-col col-gap-32">
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Redeemable amount
                </Text>
                <Tooltip title={formatBigValue(redeemable, pool.underlyingDecimals)}>
                  <Text type="p1" weight="semibold" color="primary">
                    {formatBigValue(redeemable)} {pool.underlyingSymbol}
                  </Text>
                </Tooltip>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Deposited amount
                </Text>
                <Tooltip title={formatBigValue(deposited, pool.underlyingDecimals)}>
                  <Text type="p1" weight="semibold" color="primary">
                    {formatBigValue(deposited)} {pool.underlyingSymbol}
                  </Text>
                </Tooltip>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Maturity date
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {format(maturesAt, 'dd.MM.yyyy')}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  APY
                </Text>
                <Text type="p1" weight="semibold" color="green">
                  {formatPercent(apy)}
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
        </TxConfirmModal>
      )}
    </div>
  );
};

export default ActivePosition;
