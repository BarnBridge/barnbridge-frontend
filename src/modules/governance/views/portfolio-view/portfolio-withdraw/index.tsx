import { FC, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import { Form, FormItem, useForm } from 'components/custom/form';
import Icon, { IconNames, TokenIconNames } from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useDAO } from 'modules/governance/components/dao-provider';

type FormType = {
  amount: string;
};

const PortfolioWithdraw: FC = () => {
  const { projectToken } = useKnownTokens();
  const daoCtx = useDAO();

  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const { balance: stakedBalance, userLockedUntil } = daoCtx.daoBarn;
  const projectTokenContract = projectToken.contract as Erc20Contract;
  const bondBalance = projectTokenContract.balance?.unscaleBy(projectToken.decimals);

  const isLocked = (userLockedUntil ?? 0) * 1_000 > Date.now();
  const hasStakedBalance = stakedBalance?.gt(BigNumber.ZERO);

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
      if (bnAmount) {
        setConfirmModalVisible(true);
      }
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

  const canSubmit = formState.isDirty && !isSubmitting && !isLocked;

  async function doWithdraw(amount: BigNumber, gasPrice: number) {
    setSubmitting(true);

    try {
      const withdrawAmount = amount.scaleBy(projectToken.decimals);

      if (withdrawAmount) {
        await daoCtx.daoBarn.withdraw(withdrawAmount, gasPrice);
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

  async function handleConfirm(gasPrice: number) {
    if (!bnAmount) {
      return;
    }

    setConfirmModalVisible(false);
    await doWithdraw(bnAmount, gasPrice);
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
              <Icon name={projectToken.icon as IconNames} />
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
              <Icon name={projectToken.icon as IconNames} />
            </div>
          </div>
        </div>
        <FormItem name="amount" label="Amount">
          {({ field }) => (
            <TokenAmount
              before={<Icon name={projectToken.icon as TokenIconNames} />}
              max={stakedBalance}
              disabled={isSubmitting}
              decimals={projectToken.decimals}
              slider
              {...field}
            />
          )}
        </FormItem>
        <Alert message="Locked balances are not available for withdrawal until the timer ends. Withdrawal means you will stop earning staking rewards for the amount withdrawn." />
        <div className="flex flow-col col-gap-12 align-center justify-end">
          <button type="submit" className="button-primary" disabled={!canSubmit}>
            {isSubmitting && <Spinner className="mr-4" />}
            Withdraw
          </button>
        </div>
      </Form>

      {confirmModalVisible && (
        <TxConfirmModal
          title="Confirm withdraw"
          header={
            <div className="container-box flex flow-row row-gap-4">
              <Text type="small" weight="semibold" color="secondary">
                Withdraw amount
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
          submitText="Confirm your withdraw"
          onCancel={handleCancel}
          onConfirm={({ gasPrice }) => handleConfirm(gasPrice)}
        />
      )}
    </>
  );
};

export default PortfolioWithdraw;
