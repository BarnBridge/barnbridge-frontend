import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import { Form, FormItem, useForm } from 'components/custom/form';
import Icon from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { useDAO } from 'modules/governance/components/dao-provider';
import WalletDepositConfirmModal from 'modules/governance/views/portfolio-view/portfolio-deposit/components/wallet-deposit-confirm-modal';

type FormType = {
  amount: string;
};

const PortfolioDeposit: FC = () => {
  const config = useConfig();
  const { projectToken } = useKnownTokens();
  const daoCtx = useDAO();

  const [isLoading, setLoading] = useState(false);
  const [isEnabling, setEnabling] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [depositConfirmModal, showDepositConfirmModal] = useState(false);

  const { balance: stakedBalance, userLockedUntil } = daoCtx.daoBarn;
  const projectTokenContract = projectToken.contract as Erc20Contract;
  const bondBalance = projectTokenContract.balance?.unscaleBy(projectToken.decimals);
  const barnAllowance = projectTokenContract.getAllowanceOf(config.contracts.dao?.barn!);
  const isLocked = (userLockedUntil ?? 0) > Date.now();

  const form = useForm<FormType>({
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

  async function loadData() {
    setLoading(true);

    try {
      await projectTokenContract.loadBalance();
      await daoCtx.daoBarn.loadUserData();
    } catch {}

    setLoading(false);
  }

  useEffect(() => {
    loadData().catch(Error);
  }, []);

  const { formState, watch } = form;
  const amount = watch('amount');
  const bnAmount = BigNumber.from(amount);

  const isEnabled = useMemo(() => barnAllowance?.gt(BigNumber.ZERO) ?? false, [barnAllowance]);
  const canSubmit = isEnabled && formState.isDirty && formState.isValid && !isSubmitting;

  async function handleTokenEnable() {
    const barn = config.contracts.dao?.barn;

    if (!barn) {
      return;
    }

    setEnabling(true);

    try {
      await projectTokenContract.approve(barn, true);
    } catch (e) {
      console.error(e);
    }

    setEnabling(false);
  }

  async function doDeposit(amount: BigNumber, gasPrice?: number) {
    setSubmitting(true);

    try {
      const depositAmount = amount.scaleBy(projectToken.decimals);

      if (depositAmount) {
        await daoCtx.daoBarn.deposit(depositAmount, gasPrice);
        await loadData();
      }
    } catch (e) {
      console.error(e);
    }

    setSubmitting(false);
  }

  function handleCancel() {
    setConfirmModalVisible(false);
  }

  async function handleConfirm(gasPrice?: number) {
    if (!bnAmount) {
      return;
    }

    setConfirmModalVisible(false);
    await doDeposit(bnAmount, gasPrice);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-24" style={{ minHeight: '518px' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {config.features.faucets && (
        <Link to="/faucets" className="button-ghost ml-auto">
          Faucets
        </Link>
      )}
      <Form form={form} className="flex flow-row row-gap-32 p-24" disabled={isSubmitting}>
        <div className="container-box flex flow-col col-gap-44">
          <div className="flex flow-row row-gap-4">
            <Text type="small" weight="semibold" color="secondary">
              Portfolio balance
            </Text>
            <div className="flex flow-col col-gap-8 align-center">
              <Text type="p1" weight="bold" color="primary">
                {formatToken(stakedBalance) ?? '-'}
              </Text>
              <TokenIcon name={projectToken.icon as TokenIconNames} />
            </div>
          </div>
          <div className="flex flow-row row-gap-4">
            <Text type="small" weight="semibold" color="secondary">
              Wallet balance
            </Text>
            <div className="flex flow-col col-gap-8 align-center">
              <Text type="p1" weight="bold" color="primary">
                {formatToken(bondBalance) ?? '-'}
              </Text>
              <TokenIcon name={projectToken.icon as TokenIconNames} />
            </div>
          </div>
        </div>
        <FormItem name="amount" label="Amount">
          {({ field }) => (
            <TokenAmount
              before={<TokenIcon name={projectToken.icon as TokenIconNames} />}
              max={bondBalance}
              disabled={isSubmitting}
              decimals={projectToken.decimals}
              slider
              {...field}
            />
          )}
        </FormItem>
        <Alert message="Deposits made after you have an ongoing lock will be added to the locked balance and will be subjected to the same lock timer." />
        <div className="flex flow-col col-gap-12 align-center justify-end">
          {!isEnabled && (
            <>
              <button type="button" className="button-primary align-self-start" onClick={handleTokenEnable}>
                {isEnabling && <Spinner className="mr-4" />}
                Enable {projectToken.symbol}
              </button>
              <Icon name="arrow-forward" />
            </>
          )}
          <button type="submit" className="button-primary align-self-start" disabled={!canSubmit}>
            {isSubmitting && <Spinner className="mr-4" />}
            Deposit
          </button>
        </div>
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
                <TokenIcon name={projectToken.icon as TokenIconNames} />
              </div>
            </div>
          }
          submitText="Confirm your deposit"
          onCancel={handleCancel}
          onConfirm={({ gasPrice }) => handleConfirm(gasPrice)}
        />
      )}
    </>
  );
};

export default PortfolioDeposit;
