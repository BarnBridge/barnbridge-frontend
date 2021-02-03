import React from 'react';
import * as Antd from 'antd';

import Form from 'components/antd/form';
import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Select from 'components/antd/select';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import TokenInput from 'components/custom/token-input';
import GasFeeList from 'components/custom/gas-fee-list';
import { Paragraph, Small } from 'components/custom/typography';

import { isValidAddress } from 'utils';
import { useWeb3Contracts } from 'web3/contracts';
import useMergeState from 'hooks/useMergeState';
import Alert from 'components/antd/alert';

const MANUAL_VOTING_KEY = 'manual';
const DELEGATE_VOTING_KEY = 'delegate';

const VOTING_TYPE_OPTIONS = [
  {
    value: MANUAL_VOTING_KEY,
    label: 'Manual voting',
  },
  {
    value: DELEGATE_VOTING_KEY,
    label: 'Delegate voting',
  },
];

type DelegateFormData = {
  votingType?: string;
  delegateAddress?: string;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: DelegateFormData = {
  votingType: MANUAL_VOTING_KEY,
  delegateAddress: undefined,
  gasPrice: undefined,
};

type WalletDelegateViewState = {
  saving: boolean;
  votingType?: string;
  initialVotingType?: string;
  delegateAddress?: string;
};

const InitialState: WalletDelegateViewState = {
  saving: false,
  votingType: undefined,
  initialVotingType: undefined,
  delegateAddress: undefined,
};

const WalletDelegateView: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<DelegateFormData>();

  const [state, setState] = useMergeState<WalletDelegateViewState>(
    InitialState,
  );

  const { userDelegatedTo } = web3c.daoBarn;
  const isDelegated =
    state.votingType === DELEGATE_VOTING_KEY && isValidAddress(userDelegatedTo);

  const disabledDelegate = React.useMemo<boolean>(() => {
    if (state.votingType === MANUAL_VOTING_KEY) {
      if (!isValidAddress(userDelegatedTo)) {
        return true;
      }
    } else if (state.votingType === DELEGATE_VOTING_KEY) {
      if (userDelegatedTo === state.delegateAddress) {
        return true;
      }
    }

    return false;
  }, [state.votingType, state.delegateAddress, userDelegatedTo]);

  React.useEffect(() => {
    if (isValidAddress(userDelegatedTo)) {
      form.setFieldsValue({
        votingType: DELEGATE_VOTING_KEY,
        delegateAddress: userDelegatedTo,
      });

      setState({
        votingType: DELEGATE_VOTING_KEY,
        initialVotingType: DELEGATE_VOTING_KEY,
        delegateAddress: userDelegatedTo,
      });
    } else {
      form.setFieldsValue({
        votingType: MANUAL_VOTING_KEY,
        delegateAddress: undefined,
      });

      setState({
        votingType: MANUAL_VOTING_KEY,
        initialVotingType: MANUAL_VOTING_KEY,
        delegateAddress: undefined,
      });
    }
  }, [userDelegatedTo]);

  function handleValuesChange(values: Partial<DelegateFormData>) {
    Object.keys(values).forEach(fieldName => {
      const value = values[fieldName as keyof DelegateFormData];

      if (fieldName === 'votingType') {
        setState({
          votingType: value as string,
          delegateAddress: undefined,
        });

        form.setFieldsValue({
          delegateAddress: undefined,
        });
      } else if (fieldName === 'delegateAddress') {
        setState({
          delegateAddress: value as string,
        });
      }
    });
  }

  async function handleSubmit(values: DelegateFormData) {
    setState({ saving: true });

    const { gasPrice, delegateAddress } = values;
    const gasFee = gasPrice?.value!;

    try {
      if (values.votingType === DELEGATE_VOTING_KEY) {
        await web3c.daoBarn.actions.delegate(
          delegateAddress!,
          gasFee,
        );
      } else {
        await web3c.daoBarn.actions.stopDelegate(gasFee);
      }

      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
    } catch {}

    setState({ saving: false });
  }

  const CardTitle = (
    <Grid flow="col" gap={24} colsTemplate="auto" align="center">
      <Grid flow="col" gap={12} align="center">
        <Icons name="bond-token" width={40} height={40} />
        <Paragraph type="p1" semiBold color="grey900">
          BOND
        </Paragraph>
      </Grid>

      <Grid flow="row" gap={4}>
        <Small semiBold color="grey500">
          Current Voting Type
        </Small>
        <Paragraph type="p1" semiBold color="grey900">
          {state.initialVotingType === MANUAL_VOTING_KEY && 'Manual voting'}
          {state.initialVotingType === DELEGATE_VOTING_KEY && 'Delegate voting'}
        </Paragraph>
      </Grid>

      {isDelegated && (
        <Grid flow="row" gap={4}>
          <Small semiBold color="grey500">
            Delegated Address
          </Small>
          <Paragraph type="p1" semiBold color="grey900">
            {web3c.daoBarn.userDelegatedTo}
          </Paragraph>
        </Grid>
      )}

      <div />
    </Grid>
  );

  return (
    <Card title={CardTitle}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onValuesChange={handleValuesChange}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={32}>
          <Grid flow="col" gap={64} colsTemplate="1fr 1fr">
            <Grid flow="row" gap={32}>
              <Form.Item
                name="votingType"
                label="Voting type"
                rules={[{ required: true, message: 'Required' }]}>
                <Select options={VOTING_TYPE_OPTIONS} disabled={state.saving} />
              </Form.Item>
              {state.votingType === DELEGATE_VOTING_KEY && (
                <Form.Item
                  name="delegateAddress"
                  label="Delegate address"
                  rules={[{ required: true, message: 'Required' }]}>
                  <TokenInput disabled={state.saving} />
                </Form.Item>
              )}
              {state.votingType === MANUAL_VOTING_KEY && (
                <Alert message="Switching back to manual voting while a lock is active will put the amount back under lock. Delegation does not stop the lock timer." />
              )}
              {state.votingType === DELEGATE_VOTING_KEY && (
                <Alert message="Delegating your voting power to this address means that they will be able to vote in your place. You can’t delegate the voting bonus, only the staked balance." />
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
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={state.saving}
            disabled={disabledDelegate}
            style={{ justifySelf: 'start' }}>
            {isDelegated ? 'Stop Delegate' : 'Delegate'}
          </Button>
        </Grid>
      </Form>
    </Card>
  );
};

export default WalletDelegateView;
