import React from 'react';
import * as Antd from 'antd';
import moment from 'moment';
import { Moment } from 'moment';

import Form from 'components/form';
import DatePicker from 'components/datepicker';
import GasFeeList from 'components/gas-fee-list';
import Button from 'components/button';

import { formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as BondSvg } from 'resources/svg/tokens/bond.svg';

import s from './styles.module.scss';
import { getFormattedDuration, isValidAddress } from 'utils';

type LockFormData = {
  duration?: number;
  lockEndDate?: Moment;
  gasFee?: number;
};

const InitialFormValues: LockFormData = {
  duration: undefined,
  lockEndDate: undefined,
  gasFee: undefined,
};

const WalletLockView: React.FunctionComponent<{}> = () => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<LockFormData>();
  const currentValue = form.getFieldsValue();
  const [, setValues] = React.useState<{}>({});
  const [saving, setSaving] = React.useState<boolean>(false);

  const disabledSubmit = React.useMemo<boolean>(() => {
    if (isValidAddress(web3c.daoDiamond.userDelegatedTo)) {
      return true;
    }

    return false;
  }, [web3c.daoDiamond.userDelegatedTo]);

  React.useEffect(() => {
    let duration = Number(currentValue.duration);
    let lockEndDate = undefined;

    switch (duration) {
      case 7:
        lockEndDate = moment(new Date()).add(7, 'days');
        break;
      case 1:
        lockEndDate = moment(new Date()).add(1, 'months');
        break;
      case 3:
        lockEndDate = moment(new Date()).add(3, 'months');
        break;
      case 6:
        lockEndDate = moment(new Date()).add(6, 'months');
        break;
      case 365:
        lockEndDate = moment(new Date()).add(365, 'days');
        break;
      default:
        lockEndDate = moment(new Date()).add(7, 'days');
        duration = 7;
    }

    form.setFieldsValue({
      duration,
      lockEndDate,
    });
  }, [currentValue.duration]);

  async function handleSubmit(values: LockFormData) {
    setSaving(true);

    try {
      await web3c.daoDiamond.actions.lock(values.lockEndDate!.unix(), values.gasFee!);
      form.setFieldsValue(InitialFormValues);
      web3c.daoDiamond.reload();
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
          <div>{formatBONDValue(web3c.daoDiamond.balance)}</div>
        </div>
        <div>
          <label>LOCK DURATION</label>
          <div>{getFormattedDuration(0, web3c.daoDiamond.userLockedUntil)}</div>
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
              name="duration"
              label="Lock duration"
              rules={[{ required: true, message: 'Required' }]}>
              <Antd.Radio.Group className={s.lockOptions} disabled={saving}>
                <Antd.Radio.Button className={s.lockOption} value="7">1w</Antd.Radio.Button>
                <Antd.Radio.Button className={s.lockOption} value="1">1m</Antd.Radio.Button>
                <Antd.Radio.Button className={s.lockOption} value="3">3m</Antd.Radio.Button>
                <Antd.Radio.Button className={s.lockOption} value="6">6m</Antd.Radio.Button>
                <Antd.Radio.Button className={s.lockOption} value="365">1y</Antd.Radio.Button>
              </Antd.Radio.Group>
            </Form.Item>
            <Form.Item
              name="lockEndDate"
              label="Manual choose your lock end date"
              rules={[{ required: true, message: 'Required' }]}>
              <DatePicker showTime={{
                showSecond: false,
              }} disabled={saving} />
            </Form.Item>
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
          disabled={disabledSubmit}
          className={s.lockBtn}>
          Lock
        </Button>
      </Form>
    </div>
  );
};

export default WalletLockView;
