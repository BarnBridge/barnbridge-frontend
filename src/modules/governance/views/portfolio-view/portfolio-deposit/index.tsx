import React, { FC, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AntdSwitch from 'antd/lib/switch';
import BigNumber from 'bignumber.js';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import FieldLabel from 'components/antd/field-label';
import { Form, FormItem, useForm } from 'components/custom/form';
import Grid from 'components/custom/grid';
import Icon, { IconNames, TokenIconNames } from 'components/custom/icon';
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

  const [enabling, setEnabling] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [depositConfirmModal, showDepositConfirmModal] = useState(false);

  const { balance: stakedBalance, userLockedUntil } = daoCtx.daoBarn;
  const projectTokenContract = projectToken.contract as Erc20Contract;
  const bondBalance = projectTokenContract.balance?.unscaleBy(projectToken.decimals);
  const barnAllowance = projectTokenContract.getAllowanceOf(config.contracts.dao?.barn!);
  const isLocked = (userLockedUntil ?? 0) > Date.now();

  const form = useForm<{ amount: string }>({
    validationScheme: {
      amount: {
        rules: {
          required: true,
          min: 0,
        },
        messages: {
          required: 'Value is required.',
          min: 'Should be a positive value.',
        },
      },
    },
    onSubmit: () => {
      if (isLocked) {
        showDepositConfirmModal(true);
        return;
      }

      setConfirmModalVisible(true);
    },
  });

  const { formState, watch } = form;
  const amount = watch('amount');
  const bnAmount = BigNumber.from(amount);

  const isEnabled = useMemo(() => barnAllowance?.gt(BigNumber.ZERO) ?? false, [barnAllowance]);
  const canSubmit = isEnabled && formState.isDirty && formState.isValid && !isSubmitting;

  async function handleSwitchChange(checked: boolean) {
    setEnabling(true);

    try {
      await projectTokenContract.approve(config.contracts.dao?.barn!, checked);
    } catch {}

    setEnabling(false);
  }

  function handleCancel() {
    setConfirmModalVisible(false);
  }

  async function handleConfirm(gasPrice: number) {
    if (bnAmount) {
      setConfirmModalVisible(false);
      await doDeposit(bnAmount, gasPrice);
    }
  }

  async function doDeposit(amount: BigNumber, gasPrice: number) {
    setSubmitting(true);

    try {
      const depositAmount = amount.scaleBy(18)!;
      await daoCtx.daoBarn.deposit(depositAmount, gasPrice);
      projectTokenContract.loadBalance().catch(Error);
      daoCtx.daoBarn.loadUserData().catch(Error);
    } catch (e) {
      console.error(e);
    }

    setSubmitting(false);
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

      <Form form={form} className="flex flow-row row-gap-32 p-24">
        <FieldLabel label="Amount">
          <FormItem name="amount">
            {({ field }) => (
              <TokenAmount
                before={<Icon name={projectToken.icon as TokenIconNames} />}
                max={bondBalance?.toNumber() ?? 0}
                disabled={isSubmitting}
                decimals={projectToken.decimals}
                slider
                {...field}
              />
            )}
          </FormItem>
        </FieldLabel>
        <Alert message="Deposits made after you have an ongoing lock will be added to the locked balance and will be subjected to the same lock timer." />
        <button type="submit" className="button-primary align-self-start" disabled={!canSubmit}>
          {isSubmitting && <Spinner className="mr-4" />}
          Deposit
        </button>
      </Form>

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
            <div className="container-box flex flow-row row-gap-4">
              <Text type="small" weight="semibold" color="secondary">
                Deposit amount
              </Text>
              <div className="flex flow-col col-gap-8 align-center">
                <Text type="p1" weight="bold" color="primary">
                  {formatToken(bnAmount, {
                    decimals: projectToken.decimals,
                  })}
                </Text>
                <Icon name={projectToken.icon as IconNames} />
              </div>
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
