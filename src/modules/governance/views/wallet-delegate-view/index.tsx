import React from 'react';
import * as Antd from 'antd';
import { useWeb3Contracts } from 'web3/contracts';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Form from 'components/antd/form';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import TokenInput from 'components/custom/token-input';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';

import { isValidAddress } from 'utils';

type DelegateFormData = {
  delegateAddress?: string;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: DelegateFormData = {
  delegateAddress: undefined,
  gasPrice: undefined,
};

type WalletDelegateViewState = {
  saving: boolean;
};

const InitialState: WalletDelegateViewState = {
  saving: false,
};

const WalletDelegateView: React.FC = () => {
  const [form] = Antd.Form.useForm<DelegateFormData>();

  const web3c = useWeb3Contracts();
  const [state, setState] = useMergeState<WalletDelegateViewState>(InitialState);

  const { balance: stakedBalance, userDelegatedTo, userLockedUntil } = web3c.daoBarn;
  const isDelegated = isValidAddress(userDelegatedTo);
  const isLocked = (userLockedUntil ?? 0) > Date.now();
  const hasStakedBalance = stakedBalance?.gt(ZERO_BIG_NUMBER);
  const formDisabled = !hasStakedBalance;

  React.useEffect(() => {
    form.setFieldsValue({
      delegateAddress: isValidAddress(userDelegatedTo) ? userDelegatedTo : undefined,
    });
  }, [userDelegatedTo]);

  async function handleSubmit(values: DelegateFormData) {
    const { delegateAddress, gasPrice } = values;

    if (!delegateAddress || !gasPrice) {
      return;
    }

    setState({ saving: true });

    try {
      if (delegateAddress !== userDelegatedTo) {
        await web3c.daoBarn.actions.delegate(delegateAddress, gasPrice.value);
      } else {
        await web3c.daoBarn.actions.stopDelegate(gasPrice.value);
      }

      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
    } catch {}

    setState({ saving: false });
  }

  return (
    <div className="card">
      <Grid className="card-header" flow="col" gap={24} colsTemplate="auto" align="start">
        <Grid flow="col" gap={12}>
          <Icon name="bond-token" width={40} height={40} />
          <Text type="p1" weight="semibold" color="primary">
            BOND
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Current Voting Type
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {isDelegated ? 'Delegate voting' : 'Manual voting'}
          </Text>
        </Grid>

        {isDelegated && (
          <Grid flow="row" gap={4}>
            <Text type="small" weight="semibold" color="secondary">
              Delegated Address
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {userDelegatedTo}
            </Text>
          </Grid>
        )}

        <div />
      </Grid>
      <Form
        className="p-24"
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={32}>
          <Grid flow="col" gap={64} colsTemplate="1fr 1fr">
            <Grid flow="row" gap={32}>
              <Form.Item
                name="delegateAddress"
                label="Delegate address"
                rules={[{ required: true, message: 'Required' }]}>
                <TokenInput disabled={formDisabled || state.saving} />
              </Form.Item>
              <Alert message="Delegating your voting power to this address means that they will be able to vote in your place. You can’t delegate the voting bonus, only the staked balance." />
              {isLocked && (
                <Alert message="Switching back to manual voting while a lock is active will put the amount back under lock. Delegation does not stop the lock timer." />
              )}
            </Grid>
            <Grid flow="row">
              <Form.Item
                name="gasPrice"
                label="Gas Fee (Gwei)"
                hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
                rules={[{ required: true, message: 'Required' }]}>
                <GasFeeList disabled={state.saving} />
              </Form.Item>
            </Grid>
          </Grid>
          <Form.Item shouldUpdate>
            {({ getFieldsValue }) => {
              const { delegateAddress } = getFieldsValue();

              return (
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={state.saving}
                  disabled={formDisabled || !delegateAddress}
                  style={{ justifySelf: 'start' }}>
                  {userDelegatedTo === delegateAddress ? 'Stop Delegate' : 'Delegate'}
                </Button>
              );
            }}
          </Form.Item>
        </Grid>
      </Form>
    </div>
  );
};

export default WalletDelegateView;
