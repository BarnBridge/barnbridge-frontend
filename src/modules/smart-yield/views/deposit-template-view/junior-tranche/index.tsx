import * as Antd from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import Icon from 'components/custom/icon';
import Grid from 'components/custom/grid';
import { Heading, Paragraph, Small } from 'components/custom/typography';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';
import PoolDetails from 'modules/smart-yield/components/pool-details';
// import Grid from "components/custom/grid";
// import s from './s.module.scss';

type FormData = {
  amount?: BigNumber;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: FormData = {
  amount: undefined,
  gasPrice: undefined,
};

export default function JuniorTranche() {
  const history = useHistory();
  const { id } = useParams<{ id: string; tranche: string }>();
  const [form] = Antd.Form.useForm<FormData>();

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
        <Button type="primary" onClick={() => console.log('Le junior deposit')}>
          Deposit
        </Button>
      </Grid>
    </>
  );
}
