import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import Form from 'components/form';
import TokenAmount from 'components/token-amount';
import Slider from 'components/slider';
import InfoBox from 'components/info-box';
import GasFeeList from 'components/gas-fee-list';
import Button from 'components/button';

import { formatBONDValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { CONTRACT_DAO_BARN_ADDR } from 'web3/contracts/daoBarn';

import { ReactComponent as BondSvg } from 'resources/svg/tokens/bond.svg';

import s from './styles.module.scss';

type DepositFormData = {
  amount?: BigNumber;
  gasFee?: number;
};

const InitialFormValues: DepositFormData = {
  amount: undefined,
  gasFee: undefined,
};

const WalletDepositView: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<DepositFormData>();
  const [, setValues] = React.useState<DepositFormData>(InitialFormValues);
  const [enabled, setEnabled] = React.useState<boolean | undefined>();
  const [enabling, setEnabling] = React.useState<boolean>(false);
  const [saving, setSaving] = React.useState<boolean>(false);

  async function handleSwitchChange(checked: boolean) {
    const value = checked ? MAX_UINT_256 : ZERO_BIG_NUMBER;

    setEnabling(true);

    try {
      await web3c.bond.approveSend(CONTRACT_DAO_BARN_ADDR, value);
    } catch (e) {
    }

    setEnabling(false);
  }

  async function handleSubmit(values: DepositFormData) {
    setSaving(true);

    try {
      await web3c.daoBarn.actions.deposit(values.amount!, values.gasFee!);
      form.setFieldsValue(InitialFormValues);
      web3c.daoBarn.reload();
      web3c.bond.reload();
    } catch {
      //
    }

    setSaving(false);
  }

  React.useEffect(() => {
    setEnabled(web3c.bond.barnAllowance?.gt(ZERO_BIG_NUMBER) ?? false);
  }, [web3c]);

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
        <div className={s.switchCol}>
          <label>ENABLE TOKEN</label>
          <div>
            <Antd.Switch
              checked={enabled}
              loading={enabled === undefined || enabling}
              onChange={handleSwitchChange} />
          </div>
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
                placeholder={`0 (Max ${formatBONDValue(web3c.bond.balance ?? ZERO_BIG_NUMBER)})`}
                disabled={saving}
                maximumFractionDigits={2}
                maxProps={{
                  disabled: saving,
                  onClick: () => {
                    form.setFieldsValue({
                      amount: web3c.bond.balance ?? ZERO_BIG_NUMBER,
                    });
                  },
                }}
              />
            </Form.Item>
            <Form.Item name="amount">
              <Slider
                min={0}
                max={web3c.bond.balance?.toNumber() ?? 0}
                step={1}
                disabled={saving}
                tipFormatter={value =>
                  <span>{value ? formatBONDValue(new BigNumber(value)) : 0}</span>
                }
                tooltipPlacement="bottom"
              />
            </Form.Item>
            <InfoBox
              text="Deposits made after an epoch started will be considered as pro-rata figures in relation to the length of the epoch." />
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
          className={s.depositBtn}>
          Deposit
        </Button>
      </Form>
    </div>
  );
};

export default WalletDepositView;
