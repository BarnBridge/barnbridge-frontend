import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { formatToken, formatUSD } from 'web3/utils';

import Spin from 'components/antd/spin';
import Tabs from 'components/antd/tabs';
import Tooltip from 'components/antd/tooltip';
import { VFormValidationResolver } from 'components/custom/form';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { FCx } from 'components/types.tx';
import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

type StakeFormValues = {
  amount: string;
};

const StakeForm: FC = () => {
  const walletCtx = useWallet();
  const rewardPoolCtx = useRewardPool();
  const { projectToken } = useKnownTokens();

  const [enabling, setEnabled] = useState(false);
  const [visibleConfirm, showConfirm] = useState(false);

  const { pool, market: poolMarket, uToken } = rewardPoolCtx;

  const walletBalance = pool?.smartYield.balance;
  const maxAmountUnscaled = walletBalance?.unscaleBy(pool?.smartYield.decimals);

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

  if (!pool) {
    return null;
  }

  const { smartYield, rewardPool } = pool;
  const notAllowed = smartYield.isAllowedOf(rewardPool.address) === false;
  const amount = formCtx.watch('amount');
  const bnAmount = BigNumber.from(amount);
  const formDisabled = formCtx.formState.isSubmitting || enabling;
  const stakeDisabled = notAllowed || formDisabled || !formCtx.formState.isValid || bnAmount?.eq(BigNumber.ZERO);

  async function handleEnable() {
    setEnabled(true);

    try {
      await smartYield.approve(rewardPool.address, true);
    } catch (e) {
      console.error('StakeForm:handleEnable', e);
    }

    setEnabled(false);
  }

  function handleConfirm({ gasPrice }: ConfirmTxModalArgs): Promise<void> {
    return formCtx.handleSubmit(values => handleSubmit(gasPrice, values).then(() => formCtx.setValue('amount', '0')))();
  }

  async function handleSubmit(gasPrice: number, values: StakeFormValues) {
    const bnAmount = BigNumber.from(values.amount);

    if (!bnAmount) {
      return;
    }

    showConfirm(false);

    try {
      const amount = bnAmount.scaleBy(smartYield.decimals);

      if (amount) {
        await rewardPool.sendDeposit(amount, gasPrice);
        rewardPool.loadCommon().catch(Error);
        smartYield.loadBalance().catch(Error);
        rewardPool.loadBalanceFor(walletCtx.account!).catch(Error);
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
                  <IconBubble
                    name={uToken?.icon}
                    bubbleName={projectToken.icon}
                    secondBubbleName={poolMarket?.icon.active}
                    width={32}
                    height={32}
                    className="mr-8"
                  />
                }
                disabled={formDisabled}
                max={maxAmountUnscaled}
                decimals={smartYield.decimals}
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
              Enable {smartYield.symbol}
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
              <IconBubble
                name={uToken?.icon}
                bubbleName={projectToken.icon}
                secondBubbleName={poolMarket?.icon.active}
                width={32}
                height={32}
                className="mr-8"
              />
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

const UnstakeForm: FC = () => {
  const walletCtx = useWallet();
  const rewardPoolCtx = useRewardPool();
  const { projectToken } = useKnownTokens();

  const [isClaimUnstake, setClaimUnstake] = useState(false);
  const [visibleConfirm, showConfirm] = useState(false);

  const { pool, market: poolMarket, uToken } = rewardPoolCtx;

  const stakedBalance = pool?.rewardPool.getBalanceFor(walletCtx.account!);
  const maxAmountUnscaled = stakedBalance?.unscaleBy(pool?.smartYield.decimals);

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

  if (!pool) {
    return null;
  }

  const { smartYield, rewardPool } = pool;
  const rewardTokens = Array.from(pool.rewardTokens.values());
  const amount = formCtx.watch('amount');
  const bnAmount = BigNumber.from(amount);
  const formDisabled = formCtx.formState.isSubmitting;
  const unstakeDisabled = formDisabled || !formCtx.formState.isValid || bnAmount?.eq(BigNumber.ZERO);

  function handleConfirm({ gasPrice }: ConfirmTxModalArgs): Promise<void> {
    return formCtx.handleSubmit(values => handleSubmit(values, gasPrice).then(() => formCtx.setValue('amount', '0')))();
  }

  async function handleSubmit(values: StakeFormValues, gasPrice: number) {
    const bnAmount = BigNumber.from(values.amount);

    if (!bnAmount) {
      return;
    }

    showConfirm(false);

    try {
      const amount = bnAmount.scaleBy(smartYield.decimals);

      if (amount) {
        if (isClaimUnstake) {
          await rewardPool.sendWithdrawAndClaim(amount, gasPrice);
        } else {
          await rewardPool.sendWithdraw(amount, gasPrice);
        }
        rewardPool.loadCommon().catch(Error);
        smartYield.loadBalance().catch(Error);
        rewardPool.loadBalanceFor(walletCtx.account!).catch(Error);
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
                  <IconBubble
                    name={uToken?.icon}
                    bubbleName={projectToken.icon}
                    secondBubbleName={poolMarket?.icon.active}
                    width={32}
                    height={32}
                    className="mr-8"
                  />
                }
                disabled={formDisabled}
                max={maxAmountUnscaled}
                decimals={smartYield.decimals}
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
                  <IconBubble
                    name={uToken?.icon}
                    bubbleName={projectToken.icon!}
                    secondBubbleName={poolMarket?.icon.active}
                    width={32}
                    height={32}
                    className="mr-8"
                  />
                </div>
              </div>

              {isClaimUnstake && (
                <div>
                  <Text type="p1" weight="semibold" color="secondary">
                    Claim
                  </Text>
                  {rewardTokens.map(rewardToken => {
                    const toClaim = rewardPool.getClaimFor(rewardToken.address);

                    return (
                      <div className="flex col-gap-8 align-center justify-center">
                        <Text type="h2" weight="semibold" color="primary">
                          {formatToken(toClaim, {
                            scale: rewardToken.decimals,
                          }) ?? '-'}
                        </Text>
                        <Icon name={rewardToken.icon!} width={32} height={32} />
                      </div>
                    );
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

const Stake: FCx = props => {
  const { className } = props;

  const walletCtx = useWallet();
  const [activeTab, setActiveTab] = useState('stake');
  const { convertTokenInUSD } = useKnownTokens();

  const rewardPoolCtx = useRewardPool();
  const { pool } = rewardPoolCtx;

  if (!pool) {
    return null;
  }

  const { smartYield, rewardPool } = pool;

  const walletBalance = smartYield.balance?.unscaleBy(smartYield.decimals);
  const stakedBalance = rewardPool.getBalanceFor(walletCtx.account!)?.unscaleBy(smartYield.decimals);

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
            <Tooltip title={formatUSD(convertTokenInUSD(stakedBalance, smartYield.symbol!)) ?? '-'}>
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(stakedBalance, {
                  decimals: smartYield.decimals,
                }) ?? '-'}
              </Text>
            </Tooltip>
          </div>
          <div className="flex flow-row">
            <Text type="small" weight="semibold" color="secondary" className="mb-8">
              Wallet balance
            </Text>
            <Tooltip title={formatUSD(convertTokenInUSD(walletBalance, smartYield.symbol!)) ?? '-'}>
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(walletBalance, {
                  decimals: smartYield.decimals,
                }) ?? '-'}
              </Text>
            </Tooltip>
          </div>
        </div>

        {activeTab === 'stake' && <StakeForm />}
        {activeTab === 'unstake' && <UnstakeForm />}
      </div>
    </div>
  );
};

export default Stake;
