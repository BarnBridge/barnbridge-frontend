import React, { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classnames from 'classnames';
import addDays from 'date-fns/addDays';
import addMinutes from 'date-fns/addMinutes';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import getUnixTime from 'date-fns/getUnixTime';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import DatePicker from 'components/antd/datepicker';
import { Form, FormItem, useForm } from 'components/custom/form';
import Icon from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { Input } from 'components/input';
import { useConfig } from 'components/providers/configProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useDAO } from 'modules/governance/components/dao-provider';
import { useWallet } from 'wallets/walletProvider';

import { getFormattedDuration } from 'utils';

const DURATION_1_WEEK = '1 w';
const DURATION_1_MONTH = '1 mo';
const DURATION_3_MONTH = '3 mo';
const DURATION_6_MONTH = '6 mo';
const DURATION_1_YEAR = '1 y';

const DURATION_OPTIONS: string[] = [
  DURATION_1_WEEK,
  DURATION_1_MONTH,
  DURATION_3_MONTH,
  DURATION_6_MONTH,
  DURATION_1_YEAR,
];

const NETWORK: string[] = ['BTC_ETH', 'BTC_BSC'];

function getNetworkID(network: string): number {
  if (network === 'BTC_ETH') {
    return 1;
  }
  if (network === 'BTC_BSC') {
    return 2;
  }
  return 0;
}

function getLockEndDate(startDate: Date, duration: string): Date | undefined {
  switch (duration) {
    case DURATION_1_WEEK:
      return addDays(startDate, 7);
    case DURATION_1_MONTH:
      return addMonths(startDate, 1);
    case DURATION_3_MONTH:
      return addMonths(startDate, 3);
    case DURATION_6_MONTH:
      return addMonths(startDate, 6);
    case DURATION_1_YEAR:
      return addDays(startDate, 365);
    default:
      return undefined;
  }
}

type FormType = {
  amount: string;
  lockEndDate: Date | undefined;
  p2pKey: string;
  dataType: number;
};

const PortfolioDeposit: FC = () => {
  const config = useConfig();
  const { projectToken } = useKnownTokens();
  const daoCtx = useDAO();
  const wallet = useWallet();

  const [isLoading, setLoading] = useState(false);
  const [isEnabling, setEnabling] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const { balance: stakedBalance, userLockedUntil } = daoCtx.daoBarn;
  const projectTokenContract = projectToken.contract as Erc20Contract;
  const bondBalance = projectTokenContract.balance?.unscaleBy(projectToken.decimals);
  const barnAllowance = projectTokenContract.getAllowanceOf(config.contracts.dao?.barn!);
  const isLocked = (userLockedUntil ?? 0) > Date.now();

  const form = useForm<FormType>({
    validationScheme: {
      lockEndDate: {
        rules: {
          required: true,
          min: (value: Date | undefined) => {
            return addMinutes(Date.now(), 1).valueOf() < (value?.valueOf() ?? 0);
          },
          max: (value: Date | undefined) => {
            return addYears(Date.now(), 1).valueOf() > (value?.valueOf() ?? 0);
          },
        },
        messages: {
          required: 'Required',
          min: 'Should be more than 1 minute',
          max: 'Should be less than 1 year',
        },
      },
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
      p2pkey: {
        rules: {
          required: false,
        },
        messages: {},
      },
      dataType: {
        rules: {
          required: false,
        },
        messages: {},
      },
    },
    onSubmit: () => {
      if (isLocked) {
        setConfirmModalVisible(false);
        return;
      }
      setConfirmModalVisible(true);
    },
  });
  async function loadTimelock(type: number) {
    if (!wallet.account) return;
    console.log(wallet.account, type);
    const timelockData = await daoCtx.daoBarn.checkTimeLock(wallet.account, type);
    console.log(timelockData);
    form.updateValue('dataType', type);
    form.updateValue('p2pKey', timelockData.data.slice(2));
  }
  async function loadData() {
    setLoading(true);

    try {
      await projectTokenContract.loadBalance();
      await daoCtx.daoBarn.loadUserData();
      const { userLockedUntil } = daoCtx.daoBarn;
      let lockEndDate = userLockedUntil ? new Date(userLockedUntil * 1_000) : undefined;

      if (lockEndDate && lockEndDate.valueOf() <= Date.now()) {
        lockEndDate = undefined;
      }
      form.reset({
        lockEndDate,
        p2pKey: '',
        dataType: 1,
      });
    } catch {}

    setLoading(false);
  }

  useEffect(() => {
    loadData().catch(Error);
  }, []);

  const { formState, watch } = form;
  const amount = watch('amount');
  const bnAmount = BigNumber.from(amount);
  const nextStakeBalance = stakedBalance?.plus(amount);
  const lockEndDate = watch('lockEndDate');
  const p2pKey = watch('p2pKey');
  const dataType = watch('dataType');

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

  async function doDepositAndLock(
    amount: BigNumber,
    lockUntil: Date | undefined,
    type: number,
    p2pkey: string,
    gasPrice?: number,
  ) {
    setSubmitting(true);

    try {
      const depositAmount = amount.scaleBy(projectToken.decimals);

      if (depositAmount && lockUntil) {
        const timestamp = getUnixTime(lockUntil);

        if (timestamp && timestamp > 0) {
          // todo:
          await daoCtx.daoBarn.addOrAdjusttimelock(
            depositAmount,
            timestamp,
            type,
            '0x' + p2pkey, // 0x + hexstirng
            gasPrice,
          );
          await loadData();
        }
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
    await doDepositAndLock(bnAmount, lockEndDate, dataType, p2pKey, gasPrice);
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
          <div className="flex flow-row row-gap-4">
            <Text type="small" weight="semibold" color="secondary">
              Lock duration
            </Text>
            <div className="flex flow-col col-gap-8 align-center">
              <UseLeftTime end={(userLockedUntil ?? getUnixTime(new Date())) * 1_000} delay={1_000}>
                {leftTime => (
                  <Text type="p1" weight="bold" color="primary">
                    {getFormattedDuration(leftTime / 1_000)?.trim() || '0s'}
                  </Text>
                )}
              </UseLeftTime>
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
        <FormItem name="lockEndDate" label="Lock end date">
          {({ field: { ref, ...field } }) => (
            <div className="flex flow-row row-gap-16">
              <DatePicker showTime showNow={false} format="DD/MM/YYYY HH:mm" size="large" {...field} />
              <div className="flexbox-grid" style={{ '--gap': '8px' } as React.CSSProperties}>
                {DURATION_OPTIONS.map(item => (
                  <button
                    key={item}
                    type="button"
                    className={classnames(
                      'flex justify-center ph-24 pv-16',
                      field.value?.valueOf() === getLockEndDate(new Date(), item)?.valueOf()
                        ? 'button-primary'
                        : 'button-ghost-monochrome',
                    )}
                    onClick={() => {
                      form.updateValue('lockEndDate', getLockEndDate(new Date(), item));
                    }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </FormItem>
        <FormItem
          name="dataType"
          label="DataType (optional)"
          labelProps={{ hint: 'What DataType for your node. 1 => BTC_ETH network, 2 => BTC_BSC network' }}
          className="flex-grow">
          {({ field }) => (
            <>
              <div className="flexbox-grid" style={{ '--gap': '8px' } as React.CSSProperties}>
                {NETWORK.map(item => (
                  <button
                    key={item}
                    type="button"
                    className={classnames('flex justify-center ph-24 pv-16 button-ghost-monochrome')}
                    onClick={() => {
                      loadTimelock(getNetworkID(item));
                      form.updateValue('dataType', getNetworkID(item));
                    }}>
                    {item}
                  </button>
                ))}
              </div>
              <Input
                placeholder="0"
                dimension="large"
                className="flex-grow"
                disabled={isSubmitting}
                value={dataType}
                onChange={field.onChange}
              />
            </>
          )}
        </FormItem>
        <FormItem
          name="p2pKey"
          label="Node P2Pkey (optional)"
          labelProps={{ hint: 'What is p2p key (32bytes hexstring) is on your node' }}
          className="flex-grow">
          {({ field }) => (
            <Input
              placeholder="18c9c5..."
              dimension="large"
              className="flex-grow"
              disabled={isSubmitting}
              value={p2pKey}
              onChange={field.onChange}
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
            Timelock
          </button>
        </div>
      </Form>
      {confirmModalVisible && (
        <TxConfirmModal
          title="Are you sure you want to lock your balance?"
          header={
            <div className="flex flow-row row-gap-16">
              <Text type="p2" weight="bold" color="secondary">
                You are about to lock{' '}
                <span className="primary-color">
                  {formatToken(nextStakeBalance)} {projectToken.symbol}
                </span>{' '}
                for{' '}
                <span className="primary-color">{getFormattedDuration(Date.now(), lockEndDate?.valueOf() ?? 0)}</span>.
                You cannot undo this or partially lock your balance. Locked tokens will be unavailable for withdrawal
                until the lock timer ends. All future deposits you make will be locked for the same time.
              </Text>
              <Text type="p2" weight="bold" color="primary">
                The multiplier you get for locking tokens only applies to your voting power, it does not earn more
                rewards.
              </Text>
            </div>
          }
          submitText="Lock balance"
          onCancel={handleCancel}
          onConfirm={({ gasPrice }) => handleConfirm(gasPrice)}
        />
      )}
    </>
  );
};

export default PortfolioDeposit;
