import React, { FC, FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AntdSwitch from 'antd/lib/switch';
import BigNumber from 'bignumber.js';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import FieldLabel from 'components/antd/field-label';
import Grid from 'components/custom/grid';
import Icon, { TokenIconNames } from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useDAO } from 'modules/governance/components/dao-provider';
import WalletDepositConfirmModal from 'modules/governance/views/portfolio-view/portfolio-deposit/components/wallet-deposit-confirm-modal';

const PortfolioDeposit: FC = () => {
  const config = useConfig();
  const { projectToken } = useKnownTokens();
  const daoCtx = useDAO();

  const [amount, setAmount] = useState('');
  const [enabling, setEnabling] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [depositConfirmModal, showDepositConfirmModal] = useState(false);

  const { balance: stakedBalance, userLockedUntil } = daoCtx.daoBarn;
  const bondBalance = (projectToken.contract as Erc20Contract).balance?.unscaleBy(projectToken.decimals);
  const barnAllowance = (projectToken.contract as Erc20Contract).getAllowanceOf(config.contracts.dao?.barn!);
  const isLocked = (userLockedUntil ?? 0) > Date.now();

  const isEnabled = useMemo(() => barnAllowance?.gt(BigNumber.ZERO) ?? false, [barnAllowance]);
  const bnAmount = useMemo(() => BigNumber.from(amount), [amount]);

  async function handleSwitchChange(checked: boolean) {
    setEnabling(true);

    try {
      await (projectToken.contract as Erc20Contract).approve(config.contracts.dao?.barn!, checked);
    } catch {}

    setEnabling(false);
  }

  async function doDeposit(amount: BigNumber, gasPrice: number) {
    setSaving(true);

    try {
      const depositAmount = amount.scaleBy(18)!;
      await daoCtx.daoBarn.deposit(depositAmount, gasPrice);
      setAmount('');
      // daoCtx.daoBarn.reload(); /// TODO: check
      (projectToken.contract as Erc20Contract).loadBalance().catch(Error);
    } catch (e) {
      console.error(e);
    }

    setSaving(false);
  }

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (isLocked) {
      showDepositConfirmModal(true);
      return;
    }

    setConfirmModalVisible(true);
  }

  function handleCancel() {
    setConfirmModalVisible(false);
  }

  async function handleConfirm(gasPrice: number) {
    if (bnAmount) {
      setConfirmModalVisible(false);
      return doDeposit(bnAmount, gasPrice);
    }
  }

  return (
    <div className="card">
      <div className="card-header flex wrap col-gap-64">
        <Grid flow="col" gap={12}>
          <Icon name={projectToken.icon!} width={40} height={40} />
          <Text type="p1" weight="semibold" color="primary">
            BOND
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Staked Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(stakedBalance)}
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Wallet Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(bondBalance)}
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Enable Token
          </Text>
          <AntdSwitch
            style={{ justifySelf: 'flex-start' }}
            checked={isEnabled}
            loading={isEnabled === undefined || enabling}
            onChange={handleSwitchChange}
          />
        </Grid>
        {config.features.faucets && (
          <Link to="/faucets" className="button-ghost ml-auto">
            Faucets
          </Link>
        )}
      </div>

      <form className="flex flow-row row-gap-32 p-24" onSubmit={handleSubmit}>
        <FieldLabel label="Amount">
          <TokenAmount
            before={<Icon name={projectToken.icon as TokenIconNames} />}
            max={bondBalance?.toNumber() ?? 0}
            disabled={saving}
            decimals={projectToken.decimals}
            value={amount}
            onChange={setAmount}
            slider
          />
        </FieldLabel>
        <Alert message="Deposits made after you have an ongoing lock will be added to the locked balance and will be subjected to the same lock timer." />
        <button type="submit" className="button-primary align-self-start" disabled={!isEnabled}>
          {saving && <Spinner />}
          Deposit
        </button>
      </form>

      {depositConfirmModal && (
        <WalletDepositConfirmModal
          deposit={bnAmount}
          lockDuration={userLockedUntil}
          onCancel={() => showDepositConfirmModal(false)}
          onOk={() => {
            showDepositConfirmModal(false);
            // return handleSubmit();
          }}
        />
      )}
      {confirmModalVisible && (
        <TxConfirmModal
          title="Confirm deposit"
          header={
            <div className="flex align-center justify-center">
              <Text type="h2" weight="bold" color="primary" className="mr-8">
                {formatToken(bnAmount)}
              </Text>
            </div>
          }
          submitText="Confirm your deposit"
          onCancel={handleCancel}
          onConfirm={({ gasPrice }) => handleConfirm(gasPrice)}
        />
      )}
    </div>
  );
};

export default PortfolioDeposit;
