import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import * as Antd from 'antd';
import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import { Paragraph, Small, Heading } from 'components/custom/typography';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import MarketCoinCard from 'modules/smart-yield/components/market-coin-card';
import RadioCard from 'modules/smart-yield/components/radio-card';

type FormData = {
  from?: BigNumber;
  to?: BigNumber;
};

const initialFormValues: FormData = {
  from: undefined,
  to: undefined,
};

export default function Withdraw() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [form] = Antd.Form.useForm<FormData>();
  const [withdrawType, setWithdrawType] = useState<
    'regular' | 'instant' | undefined
  >();

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
      <Grid flow="col" gap={64} align="center" className="mb-64">
        <MarketCoinCard />
        <div>
          <Small semiBold className="mb-4">
            Wallet balance
          </Small>
          <Paragraph type="p1" semiBold color="primary">
            25,381.3247
          </Paragraph>
        </div>
        <div>
          <Small semiBold className="mb-4">
            Portfolio balance
          </Small>
          <Paragraph type="p1" semiBold color="primary">
            5,230.9971
          </Paragraph>
        </div>
      </Grid>
      <Card>
        <Heading type="h3" semiBold color="primary">
          Initiate Withdraw
        </Heading>
        <Paragraph type="p2" semiBold>
          You can choose between fixed, or variable interest.
          <br />
          Be aware of the risk involved and read the warnings before going
          further
        </Paragraph>

        <Form
          form={form}
          initialValues={initialFormValues}
          validateTrigger={['onSubmit']}
          onFinish={handleFinish}>
          <Form.Item
            name="from"
            label="From"
            rules={[{ required: true, message: 'Required' }]}
            className="mb-40">
            <TokenAmount
              tokenIcon="usdc-token"
              max={1000}
              maximumFractionDigits={4}
              displayDecimals={4}
              disabled={false}
            />
          </Form.Item>
          <Form.Item
            name="to"
            label="To"
            rules={[{ required: true, message: 'Required' }]}
            className="mb-32">
            <TokenAmount
              tokenIcon="usdc-token"
              max={1000}
              maximumFractionDigits={4}
              displayDecimals={4}
              disabled={false}
            />
          </Form.Item>

          <Grid flow="col" gap={32} colsTemplate="1fr 1fr" className="mb-32">
            <RadioCard
              selected={withdrawType === 'regular'}
              onClick={() => setWithdrawType('regular')}>
              <Icon name="withdrawal_regular" width={64} height={64} />
              <Paragraph type="p1" semiBold color="primary">Regular withdraw</Paragraph>
              <Small semiBold>Wait time</Small>
              <Paragraph type="p1" semiBold color="primary">60 days</Paragraph>
              <Small semiBold>Total withdrawable amount</Small>
              <Paragraph type="p1" semiBold color="primary">5,318.4489 USDC</Paragraph>
            </RadioCard>
            <RadioCard
              selected={withdrawType === 'instant'}
              onClick={() => setWithdrawType('instant')}>
              <Icon name="withdrawal_instant" width={64} height={64} />
              <br />
              <Paragraph type="p1" semiBold color="primary">Instant withdraw</Paragraph>
              <Small semiBold>Wait time</Small>
              <Paragraph type="p1" semiBold color="primary">None</Paragraph>
              <Small semiBold>Total withdrawable amount</Small>
              <Paragraph type="p1" semiBold color="primary">5,000.0000 USDC</Paragraph>
            </RadioCard>
          </Grid>
        </Form>
        <Grid flow="col" gap={64} align="center" justify="space-between">
          <Button
            type="light"
            onClick={() => history.push(`/smart-yield/${id}/deposit`)}>
            <Icon name="left-arrow" width={9} height={8} />
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => console.log('Le initiate withdraw')}>
              Initiate withdraw
          </Button>
        </Grid>
      </Card>
    </>
  );
}
