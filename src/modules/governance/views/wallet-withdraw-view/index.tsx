import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import Form from 'components/antd/form';
import Slider from 'components/antd/slider';
import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';

import { formatBONDValue, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as BondSvg } from 'resources/svg/tokens/bond.svg';

import s from './styles.module.scss';

type WithdrawFormData = {
  amount?: BigNumber;
  gasFee?: number;
};

const InitialFormValues: WithdrawFormData = {
  amount: undefined,
  gasFee: undefined,
};

const WalletWithdrawView: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<WithdrawFormData>();
  const [, setValues] = React.useState<WithdrawFormData>(InitialFormValues);
  const [saving, setSaving] = React.useState<boolean>(false);

  async function handleSubmit(values: WithdrawFormData) {
    setSaving(true);

    try {
      await web3c.daoBarn.actions.withdraw(values.amount!, values.gasFee!);
      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
      web3c.bond.reload();
    } catch {
      //
    }

    setSaving(false);
  }

  return (
    <div className={s.component}>
      <div className={s.headerRow}>
        <div className={s.tokenCol}>
          <BondSvg /> BOND
        </div>
        <div>
          <label>STAKED BALANCE</label>
          <div>{formatBONDValue(web3c.daoBarn.balance)}</div>
        </div>
        <div>
          <label>WALLET BALANCE</label>
          <div>{formatBONDValue(web3c.bond.balance)}</div>
        </div>
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
              name="amount"
              label="Amount"
              rules={[{ required: true, message: 'Required' }]}>
              <TokenAmount
                tokenIcon={<BondSvg />}
                tokenLabel="BOND"
                placeholder={`0 (Max ${formatBONDValue(web3c.daoBarn.balance ?? ZERO_BIG_NUMBER)})`}
                disabled={saving}
                maximumFractionDigits={2}
                maxProps={{
                  disabled: saving,
                  onClick: () => {
                    form.setFieldsValue({
                      amount: web3c.daoBarn.balance ?? ZERO_BIG_NUMBER,
                    });
                  },
                }}
              />
            </Form.Item>
            <Form.Item name="amount">
              <Slider
                min={0}
                max={web3c.daoBarn.balance?.toNumber() ?? 0}
                step={1}
                disabled={saving}
                tipFormatter={value =>
                  <span>{value ? formatBONDValue(new BigNumber(value)) : 0}</span>
                }
                tooltipPlacement="bottom"
              />
            </Form.Item>
            <Alert message="Withdrawal before the end of the epoch means you can't harvest the rewards." />
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
          loading={saving}
          className={s.withdrawBtn}>
          Withdraw
        </Button>
      </Form>
    </div>
  );
};

export default WalletWithdrawView;
