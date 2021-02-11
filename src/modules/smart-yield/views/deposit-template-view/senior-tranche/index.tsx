import { useMemo } from 'react';
import * as Antd from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import {
  addSeconds,
  addDays,
  addMonths,
  isBefore,
  isAfter,
  getUnixTime,
} from 'date-fns';
import { useWeb3Contracts } from 'web3/contracts';
import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import DatePicker from 'components/antd/datepicker';
import Icon from 'components/custom/icon';
import Grid from 'components/custom/grid';
import { Heading, Paragraph, Small } from 'components/custom/typography';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';
import PoolDetails from 'modules/smart-yield/components/pool-details';
// import Grid from "components/custom/grid";
// import s from './s.module.scss';

const DURATION_1_WEEK = '1w';
const DURATION_1_MONTH = '1mo';
const DURATION_3_MONTH = '3mo';
const DURATION_6_MONTH = '6mo';
const DURATION_1_YEAR = '1y';

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

type FormData = {
  amount?: BigNumber;
  lockEndDate?: Date;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: FormData = {
  amount: undefined,
  gasPrice: undefined,
};

export default function SeniorTranche() {
  const history = useHistory();
  const { id } = useParams<{ id: string; tranche: string }>();
  const [form] = Antd.Form.useForm<FormData>();
  const web3c = useWeb3Contracts();
  const { balance: stakedBalance, userLockedUntil, userDelegatedTo, multiplier = 1 } = web3c.daoBarn;

  const minAllowedDate = useMemo(() => {
    const min = Math.max(userLockedUntil ?? 0, Date.now());

    return addSeconds(min, 1);
  }, [userLockedUntil]);

  const maxAllowedDate = addSeconds(addDays(Date.now(), 365), 1);

  function handleFinish(values: FormData) {
    console.log(values);
    // if (isLocked) {
    //   setState({ showDepositConfirmModal: true });
    // } else {
    //   return handleSubmit(values);
    // }
  }

  return (
    <>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onFinish={handleFinish}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            tokenIcon="usdc-token"
            max={1000}
            maximumFractionDigits={4}
            displayDecimals={4}
            disabled={false}
            slider
          />
        </Form.Item>
        <Form.Item
          name="lockEndDate"
          label="Lock end date"
          rules={[{ required: true, message: 'Required' }]}>
          <DatePicker
            showTime
            showNow={false}
            disabledDate={
              (date: Date) => isBefore(date, minAllowedDate) || isAfter(date, maxAllowedDate)
            }
            format="DD/MM/YYYY HH:mm"
            size="large"
            disabled={false}
          />
        </Form.Item>
        <Form.Item label="Add lock duration" dependencies={['lockEndDate']}>
          {() => (
            <Grid
              flow="col"
              gap={16}
              colsTemplate={`repeat(${DURATION_OPTIONS.length}, 1fr)`}>
              {DURATION_OPTIONS.map(opt => {
                const targetDate =
                  getLockEndDate(minAllowedDate, opt) ?? new Date();
                const { lockEndDate } = form.getFieldsValue();
                const isActive =
                  lockEndDate?.valueOf() === targetDate?.valueOf();

                return (
                  <Button
                    key={opt}
                    type="select"
                    // className={cx(isActive && s.activeOption)}
                    disabled={
                      // formDisabled ||
                      // state.saving ||
                      targetDate > maxAllowedDate
                    }
                    onClick={() => {
                      form.setFieldsValue({
                        lockEndDate: getLockEndDate(minAllowedDate, opt),
                      });
                      // setState({});
                    }}>
                    <Paragraph type="p1" semiBold color="grey900">
                      {opt}
                    </Paragraph>
                  </Button>
                );
              })}
            </Grid>
          )}
        </Form.Item>
        <Form.Item
          name="gasPrice"
          label="Gas Fee (Gwei)"
          hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
          rules={[{ required: true, message: 'Required' }]}>
          <GasFeeList disabled={false} />
        </Form.Item>
      </Form>
      <Grid flow="col" gap={64} align="center" justify="space-between">
        <Button
          type="light"
          onClick={() => history.push(`/smart-yield/deposit/${id}`)}>
          <Icon name="left-arrow" width={9} height={8} />
          Cancel
        </Button>
        <Button type="primary" onClick={() => console.log('Le senior deposit')}>
          Deposit
        </Button>
      </Grid>
    </>
  );
}
