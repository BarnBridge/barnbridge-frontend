import React from 'react';
import * as Antd from 'antd';

import Form from 'components/antd/form';
import Select from 'components/antd/select';
import TokenInput from 'components/custom/token-input';
import GasFeeList from 'components/custom/gas-fee-list';
import Button from 'components/antd/button';

import { isValidAddress } from 'utils';
import { useWeb3Contracts } from 'web3/contracts';

import s from './styles.module.scss';

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
  gasFee?: number;
};

const InitialFormValues: DelegateFormData = {
  votingType: MANUAL_VOTING_KEY,
  delegateAddress: undefined,
  gasFee: undefined,
};

const WalletDelegateView: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<DelegateFormData>();
  const [, setValues] = React.useState<DelegateFormData>(InitialFormValues);
  const [saving, setSaving] = React.useState<boolean>(false);
  const currentValue = form.getFieldsValue();

  async function handleSubmit(values: DelegateFormData) {
    setSaving(true);

    try {
      if (values.votingType === DELEGATE_VOTING_KEY) {
        await web3c.daoBarn.actions.delegate(values.delegateAddress!, values.gasFee!);
      } else {
        await web3c.daoBarn.actions.stopDelegate(values.gasFee!);
      }

      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
    } catch {
      //
    }

    setSaving(false);
  }

  const votingTypeLabel = React.useMemo(() => {
    return VOTING_TYPE_OPTIONS.find(vt => vt.value === currentValue.votingType)?.label;
  }, [currentValue.votingType]);

  const disabledDelegate = React.useMemo<boolean>(() => {
    if (currentValue.votingType === MANUAL_VOTING_KEY) {
      if (!isValidAddress(web3c.daoBarn.userDelegatedTo)) {
        return true;
      }
    } else if (currentValue.votingType === DELEGATE_VOTING_KEY) {
      if (web3c.daoBarn.userDelegatedTo === currentValue.delegateAddress) {
        return true;
      }
    }

    return false;
  }, [currentValue.votingType, currentValue.delegateAddress, web3c.daoBarn.userDelegatedTo]);

  React.useEffect(() => {
    const { userDelegatedTo } = web3c.daoBarn;

    if (isValidAddress(userDelegatedTo)) {
      form.setFieldsValue({
        votingType: DELEGATE_VOTING_KEY,
        delegateAddress: userDelegatedTo,
      });
      setValues({
        votingType: DELEGATE_VOTING_KEY,
        delegateAddress: userDelegatedTo,
      });
    } else {
      form.setFieldsValue({
        votingType: MANUAL_VOTING_KEY,
        delegateAddress: undefined,
      });
      setValues({
        votingType: MANUAL_VOTING_KEY,
        delegateAddress: undefined,
      });
    }
  }, [web3c.daoBarn.userDelegatedTo]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={s.component}>
      <div className={s.headerRow}>
        <div className={s.headerCol}>
          <label>CURRENT VOTING TYPE</label>
          <span>{votingTypeLabel}</span>
        </div>
        {currentValue.votingType === DELEGATE_VOTING_KEY && isValidAddress(web3c.daoBarn.userDelegatedTo!) && (
          <div className={s.headerCol}>
            <label>DELEGATED ADDRESS</label>
            <span>{web3c.daoBarn.userDelegatedTo!}</span>
          </div>
        )}
      </div>
      <Form
        className={s.contentRow}
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onValuesChange={setValues}
        onFinish={handleSubmit}>
        <div className={s.body}>
          <div className={s.leftCol}>
            <Form.Item
              name="votingType"
              label="Voting type"
              rules={[
                { required: true, message: 'Required' },
              ]}>
              <Select options={VOTING_TYPE_OPTIONS} disabled={saving} />
            </Form.Item>
            {currentValue.votingType === DELEGATE_VOTING_KEY && (
              <Form.Item
                name="delegateAddress"
                label="Delegate address"
                rules={[
                  { required: true, message: 'Required' },
                ]}>
                <TokenInput disabled={saving} />
              </Form.Item>
            )}
          </div>
          <div className={s.rightCol}>
            <Form.Item
              name="gasFee"
              label="Gas Fee (Gwei)"
              hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
              rules={[
                { required: true, message: 'Required' },
              ]}>
              <GasFeeList disabled={saving} />
            </Form.Item>
          </div>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          disabled={disabledDelegate}
          loading={saving}
          className={s.delegateBtn}>
          {currentValue.votingType === MANUAL_VOTING_KEY && isValidAddress(web3c.daoBarn.userDelegatedTo)
            ? 'Stop Delegate'
            : 'Delegate'
          }
        </Button>
      </Form>
    </div>
  );
};

export default WalletDelegateView;
