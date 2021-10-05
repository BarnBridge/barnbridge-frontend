import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken, formatUSD } from 'web3/utils';

import Spin from 'components/antd/spin';
import Tabs from 'components/antd/tabs';
import Tooltip from 'components/antd/tooltip';
import { VFormValidationResolver } from 'components/custom/form';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon } from 'components/token-icon';
import { FCx } from 'components/types.tx';
import { useWeb3Contract } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { KpiOptionType } from 'modules/smart-alpha/api';
import KpiRewardPoolContract from 'modules/smart-alpha/contracts/kpiRewardPoolContract';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

type StakeFormValues = {
  amount: string;
};

type StakeFormProps = {
  kpiOption: KpiOptionType;
  kpiContract: KpiRewardPoolContract;
  poolTokenContract: Erc20Contract;
};

const StakeForm: FC<StakeFormProps> = ({ kpiOption, kpiContract, poolTokenContract }) => {
  const walletCtx = useWallet();

  const [enabling, setEnabled] = useState(false);
  const [visibleConfirm, showConfirm] = useState(false);

  const maxAmountUnscaled = poolTokenContract.balance?.unscaleBy(kpiOption.poolToken.decimals);

  const formCtx = useForm<StakeFormValues>({
    defaultValues: {
      amount: '0',
    },
    mode: 'onChange',
    resolver: VFormValidationResolver,
    context: {
      scheme: {
        amount: {
          rules: {
            required: true,
            min: 0,
            max: maxAmountUnscaled?.toNumber(),
          },
          messages: {
            required: 'Value is required.',
            min: 'Should be a positive value.',
            max: 'Should be less than maximum allowed',
          },
        },
      },
    },
  });

  const notAllowed = poolTokenContract.isAllowedOf(kpiOption.poolAddress) === false;
  const amount = formCtx.watch('amount');
  const bnAmount = BigNumber.from(amount);
  const formDisabled = formCtx.formState.isSubmitting || enabling;
  const stakeDisabled = notAllowed || formDisabled || !formCtx.formState.isValid || bnAmount?.eq(BigNumber.ZERO);

  async function handleEnable() {
    setEnabled(true);

    try {
      await poolTokenContract.approve(kpiOption.poolAddress, true);
    } catch (e) {
      console.error('StakeForm:handleEnable', e);
    }

    setEnabled(false);
  }

  function handleConfirm({ gasPrice }: ConfirmTxModalArgs): Promise<void> {
    return formCtx.handleSubmit(values => handleSubmit(values, gasPrice).then(() => formCtx.setValue('amount', '0')))();
  }

  async function handleSubmit(values: StakeFormValues, gasPrice?: number) {
    const bnAmount = BigNumber.from(values.amount);

    if (!bnAmount) {
      return;
    }

    showConfirm(false);

    try {
      const amount = bnAmount.scaleBy(kpiOption.poolToken.decimals);

      if (amount) {
        await kpiContract.sendDeposit(amount, gasPrice);
        kpiContract.loadCommon().catch(Error);

        if (walletCtx.account) {
          poolTokenContract.loadBalance(walletCtx.account).catch(Error);
          kpiContract.loadBalanceFor(walletCtx.account).catch(Error);
        }
        formCtx.reset();
      }
    } catch (e) {
      console.error('StakeForm:handleSubmit', e);
    }
  }

  return (
    <>
      <form className="flex flow-row full-height">
        <Text type="small" weight="semibold" color="secondary">
          Amount
        </Text>
        <Controller
          name="amount"
          control={formCtx.control}
          render={({ field, fieldState }) => (
            <>
              <TokenAmount
                {...field}
                className="mb-12"
                before={
                  <TokenIcon name="unknown" bubble1Name="unknown" bubble2Name="unknown" size={32} className="mr-8" />
                }
                disabled={formDisabled}
                max={maxAmountUnscaled}
                decimals={kpiOption.poolToken.decimals}
                slider
                placeholder={`0 (Max ${maxAmountUnscaled?.toNumber() ?? 0})`}
              />
              <Text type="small" weight="semibold" color="red">
                {(fieldState.error as any)?.message}
              </Text>
            </>
          )}
        />

        <div className="flex align-center mt-auto">
          {walletCtx.isActive && notAllowed && (
            <button type="button" className="button-primary mr-16" disabled={enabling} onClick={handleEnable}>
              {enabling && <Spin spinning />}
              Enable {kpiOption.poolToken.symbol}
            </button>
          )}

          <button type="button" className="button-primary" disabled={stakeDisabled} onClick={() => showConfirm(true)}>
            {formCtx.formState.isSubmitting && <Spin spinning />}
            Stake
          </button>
        </div>
      </form>

      {visibleConfirm && (
        <TxConfirmModal
          title="Confirm your stake"
          header={
            <div className="flex col-gap-8 align-center justify-center">
              <Text type="h2" weight="semibold" color="primary">
                {formatToken(bnAmount) ?? '-'}
              </Text>
              <TokenIcon name="unknown" bubble1Name="unknown" bubble2Name="unknown" size={32} className="mr-8" />
            </div>
          }
          submitText="Stake"
          onCancel={() => showConfirm(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

type UnstakeFormValues = {
  amount: string;
};

type UnstakeFormProps = {
  kpiOption: KpiOptionType;
  kpiContract: KpiRewardPoolContract;
  poolTokenContract: Erc20Contract;
};

const UnstakeForm: FC<UnstakeFormProps> = ({ kpiOption, kpiContract, poolTokenContract }) => {
  const walletCtx = useWallet();
  const { getTokenBySymbol } = useKnownTokens();

  const [isClaimUnstake, setClaimUnstake] = useState(false);
  const [visibleConfirm, showConfirm] = useState(false);

  const maxAmountUnscaled = poolTokenContract.balance?.unscaleBy(kpiOption.poolToken.decimals);

  const formCtx = useForm<UnstakeFormValues>({
    defaultValues: {
      amount: '0',
    },
    mode: 'onChange',
    resolver: VFormValidationResolver,
    context: {
      scheme: {
        amount: {
          rules: {
            required: true,
            min: 0,
            max: maxAmountUnscaled?.toNumber(),
          },
          messages: {
            required: 'Value is required.',
            min: 'Should be a positive value.',
            max: 'Should be less than maximum allowed',
          },
        },
      },
    },
  });

  const amount = formCtx.watch('amount');
  const bnAmount = BigNumber.from(amount);
  const formDisabled = formCtx.formState.isSubmitting;
  const unstakeDisabled = formDisabled || !formCtx.formState.isValid || bnAmount?.eq(BigNumber.ZERO);

  function handleConfirm({ gasPrice }: ConfirmTxModalArgs): Promise<void> {
    return formCtx.handleSubmit(values => handleSubmit(values, gasPrice).then(() => formCtx.setValue('amount', '0')))();
  }

  async function handleSubmit(values: StakeFormValues, gasPrice?: number) {
    const bnAmount = BigNumber.from(values.amount);

    if (!bnAmount) {
      return;
    }

    showConfirm(false);

    try {
      const amount = bnAmount.scaleBy(kpiOption.poolToken.decimals);

      if (amount) {
        if (isClaimUnstake) {
          await kpiContract.sendWithdrawAndClaim(amount, gasPrice);
        } else {
          await kpiContract.sendWithdraw(amount, gasPrice);
        }

        kpiContract.loadCommon().catch(Error);

        if (walletCtx.account) {
          poolTokenContract.loadBalance(walletCtx.account).catch(Error);
          kpiContract.loadBalanceFor(walletCtx.account).catch(Error);
        }

        formCtx.reset();
      }
    } catch (e) {
      console.error('UnstakeForm:handleSubmit', e);
    }
  }

  return (
    <>
      <form className="flex flow-row full-height">
        <Text type="small" weight="semibold" color="secondary">
          Amount
        </Text>
        <Controller
          name="amount"
          control={formCtx.control}
          render={({ field, fieldState }) => (
            <>
              <TokenAmount
                {...field}
                className="mb-12"
                before={
                  <TokenIcon name="unknown" bubble1Name="unknown" bubble2Name="unknown" size={32} className="mr-8" />
                }
                disabled={formDisabled}
                max={maxAmountUnscaled}
                decimals={kpiOption.poolToken.decimals}
                slider
                placeholder={`0 (Max ${maxAmountUnscaled?.toNumber() ?? 0})`}
              />
              <Text type="small" weight="semibold" color="red">
                {(fieldState.error as any)?.message}
              </Text>
            </>
          )}
        />

        <div className="flex align-center mt-auto">
          <button
            type="button"
            className="button-primary mr-16"
            disabled={unstakeDisabled}
            onClick={() => {
              setClaimUnstake(false);
              showConfirm(true);
            }}>
            {formCtx.formState.isSubmitting && !isClaimUnstake && <Spin spinning />}
            Unstake
          </button>
          <button
            type="button"
            className="button-primary"
            disabled={unstakeDisabled}
            onClick={() => {
              setClaimUnstake(true);
              showConfirm(true);
            }}>
            {formCtx.formState.isSubmitting && isClaimUnstake && <Spin spinning />}
            Claim & Unstake
          </button>
        </div>
      </form>

      {visibleConfirm && (
        <TxConfirmModal
          title={isClaimUnstake ? 'Confirm your claim and unstake' : 'Confirm your unstake'}
          header={
            <div className="flex col-gap-64 align-center justify-center">
              <div>
                <Text type="p1" weight="semibold" color="secondary">
                  Unstake
                </Text>
                <div className="flex col-gap-8 align-center justify-center">
                  <Text type="h2" weight="semibold" color="primary">
                    {formatToken(bnAmount) ?? '-'}
                  </Text>
                  <TokenIcon name="unknown" bubble1Name="unknown" bubble2Name="unknown" size={32} className="mr-8" />
                </div>
              </div>

              {isClaimUnstake && (
                <div>
                  <Text type="p1" weight="semibold" color="secondary">
                    Claim
                  </Text>
                  {kpiOption.rewardTokens.map(token => {
                    const rewardToken = getTokenBySymbol(token.symbol);

                    return rewardToken ? (
                      <div key={rewardToken.symbol} className="flex col-gap-8 align-center justify-center">
                        <Text type="h2" weight="semibold" color="primary">
                          {formatToken(kpiContract.getClaimFor(rewardToken.address), {
                            scale: rewardToken.decimals,
                          }) ?? '-'}
                        </Text>
                        <TokenIcon name={rewardToken.icon} size={32} />
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          }
          submitText={isClaimUnstake ? 'Claim and unstake' : 'Unstake'}
          onCancel={() => showConfirm(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

type StakeProps = {
  kpiOption: KpiOptionType;
  kpiContract: KpiRewardPoolContract;
};

const Stake: FCx<StakeProps> = ({ className, kpiOption, kpiContract }) => {
  const walletCtx = useWallet();
  const { convertTokenInUSD } = useKnownTokens();
  const [reload] = useReload();

  const [activeTab, setActiveTab] = useState('stake');

  const poolTokenContract = useWeb3Contract(
    () => {
      return new Erc20Contract([], kpiOption.poolToken.address);
    },
    {
      afterInit: contract => {
        contract.onUpdateData(reload);
        contract.loadAllowance(kpiOption.poolAddress);

        if (walletCtx.account) {
          contract.loadBalance(walletCtx.account);
        }
      },
    },
  );

  const walletBalance = poolTokenContract.balance?.unscaleBy(kpiOption.poolToken.decimals);
  const stakedBalance = walletCtx.account
    ? kpiContract.getBalanceFor(walletCtx.account)?.unscaleBy(kpiOption.poolToken.decimals)
    : undefined;

  return (
    <div className={cn('card', className)}>
      <Tabs className={s.tabs} activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.Tab key="stake" tab="Stake" />
        <Tabs.Tab key="unstake" tab="Unstake" />
      </Tabs>
      <div className="flex flow-row flex-grow p-24">
        <div className={cn('flexbox-list p-16 mb-32', s.stakeBlock)}>
          <div className="flex flow-row mr-16">
            <Text type="small" weight="semibold" color="secondary" className="mb-8">
              Staked balance
            </Text>
            <Tooltip title={formatUSD(convertTokenInUSD(stakedBalance, kpiOption.poolToken.symbol)) ?? '-'}>
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(stakedBalance, {
                  decimals: kpiOption.poolToken.decimals,
                }) ?? '-'}
              </Text>
            </Tooltip>
          </div>
          <div className="flex flow-row">
            <Text type="small" weight="semibold" color="secondary" className="mb-8">
              Wallet balance
            </Text>
            <Tooltip title={formatUSD(convertTokenInUSD(walletBalance, kpiOption.poolToken.symbol)) ?? '-'}>
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(walletBalance, {
                  decimals: kpiOption.poolToken.decimals,
                }) ?? '-'}
              </Text>
            </Tooltip>
          </div>
        </div>

        {activeTab === 'stake' && (
          <StakeForm kpiOption={kpiOption} kpiContract={kpiContract} poolTokenContract={poolTokenContract} />
        )}
        {activeTab === 'unstake' && (
          <UnstakeForm kpiOption={kpiOption} kpiContract={kpiContract} poolTokenContract={poolTokenContract} />
        )}
      </div>
    </div>
  );
};

export default Stake;
