import { useMemo } from 'react';
import * as Antd from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import {
  addSeconds,
  addDays,
  isBefore,
  isAfter,
} from 'date-fns';
import { useWeb3Contracts } from 'web3/contracts';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import DatePicker from 'components/antd/datepicker';
import Icon from 'components/custom/icon';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';
import { DURATION_OPTIONS, getLockEndDate } from 'utils/date';
import TransactionDetails from 'modules/smart-yield/components/transaction-details';

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
  const { userLockedUntil } = web3c.daoBarn;

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
        onFinish={handleFinish}
        className="mb-32"
      >
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
                    <Paragraph type="p1" semiBold color="primary">
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
      <TransactionDetails className="mb-32" />
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
