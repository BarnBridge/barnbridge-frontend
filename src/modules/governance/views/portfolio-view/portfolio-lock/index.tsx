import React, { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import addDays from 'date-fns/addDays';
import addMinutes from 'date-fns/addMinutes';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import getUnixTime from 'date-fns/getUnixTime';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import DatePicker from 'components/antd/datepicker';
import { Form, FormItem, useForm } from 'components/custom/form';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useDAO } from 'modules/governance/components/dao-provider';

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
  lockEndDate: Date | undefined;
};

const PortfolioLock: FC = () => {
  const { projectToken } = useKnownTokens();
  const daoCtx = useDAO();

  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const { balance: stakedBalance, userLockedUntil } = daoCtx.daoBarn;

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
    },
    onSubmit: () => {
      setConfirmModalVisible(true);
    },
  });

  async function loadData() {
    setLoading(true);

    try {
      await daoCtx.daoBarn.loadUserData();
      const { userLockedUntil } = daoCtx.daoBarn;
      let lockEndDate = userLockedUntil ? new Date(userLockedUntil * 1_000) : undefined;

      if (lockEndDate && lockEndDate.valueOf() <= Date.now()) {
        lockEndDate = undefined;
      }

      form.reset({
        lockEndDate,
      });
    } catch {}

    setLoading(false);
  }

  useEffect(() => {
    loadData().catch(Error);
  }, []);

  const { formState, watch } = form;
  const lockEndDate = watch('lockEndDate');

  const canSubmit = formState.isDirty && !isSubmitting;

  async function doLock(lockUntil: Date | undefined, gasPrice?: number) {
    setSubmitting(true);

    try {
      if (lockUntil) {
        const timestamp = getUnixTime(lockUntil);

        if (timestamp && timestamp > 0) {
          await daoCtx.daoBarn.lock(timestamp, gasPrice);
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
    setConfirmModalVisible(false);
    await doLock(lockEndDate, gasPrice);
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
        <Alert message="All locked balances will be unavailable for withdrawal until the lock timer ends. All future deposits will be locked for the same time." />
        <div className="flex flow-col col-gap-12 align-center justify-end">
          <button type="submit" className="button-primary" disabled={!canSubmit}>
            {isSubmitting && <Spinner className="mr-4" />}
            Lock
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
                  {formatToken(stakedBalance)} {projectToken.symbol}
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

export default PortfolioLock;
