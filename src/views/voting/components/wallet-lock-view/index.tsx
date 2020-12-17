import React from 'react';
import * as Antd from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import moment from 'moment';
import { Moment } from 'moment';

import Form from 'components/form';
import DatePicker from 'components/datepicker';
import GasFeeList from 'components/gas-fee-list';
import Button from 'components/button';

import { getFormattedDuration, isValidAddress } from 'utils';
import { formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import { ReactComponent as BondSvg } from 'resources/svg/tokens/bond.svg';

import s from './styles.module.scss';

type LockFormData = {
  lockEndDate?: Moment;
  gasFee?: number;
};

const InitialFormValues: LockFormData = {
  lockEndDate: undefined,
  gasFee: undefined,
};

const DURATION_OPTIONS: string[] = [
  '1w', '1m', '3m', '6m', '1y',
];

const WalletLockView: React.FunctionComponent<{}> = () => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<LockFormData>();
  const [, setValues] = React.useState<{}>({});
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const disabledSubmit = React.useMemo<boolean>(() => {
    if (isValidAddress(web3c.daoDiamond.userDelegatedTo)) {
      return true;
    }

    return false;
  }, [web3c.daoDiamond.userDelegatedTo]);

  function handleDurationChange(ev: RadioChangeEvent) {
    const duration = ev.target.value;
    const now = moment();
    let lockEndDate = undefined;

    switch (duration) {
      case '1w':
        lockEndDate = now.add(7, 'days');
        break;
      case '1m':
        lockEndDate = now.add(1, 'months');
        break;
      case '3m':
        lockEndDate = now.add(3, 'months');
        break;
      case '6m':
        lockEndDate = now.add(6, 'months');
        break;
      case '1y':
        lockEndDate = now.add(365, 'days');
        break;
    }

    form.setFieldsValue({
      lockEndDate,
    });
  }

  function disabledDate(date: Moment) {
    const now = moment();

    if (date.isBefore(now, 'seconds') || date.isAfter(now.add(365, 'days'), 'seconds')) {
      return true;
    }

    return false;
  }

  async function handleSubmit(values: LockFormData) {
    setSubmitting(true);

    try {
      await web3c.daoDiamond.actions.lock(values.lockEndDate!.unix(), values.gasFee!);
      form.setFieldsValue(InitialFormValues);
      web3c.daoDiamond.reload();
    } catch {
      //
    }

    setSubmitting(false);
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
            <Form.Item label="Lock duration">
              <Antd.Radio.Group
                className={s.lockOptions}
                disabled={submitting}
                onChange={handleDurationChange}>
                {DURATION_OPTIONS.map(opt => (
                  <Antd.Radio.Button
                    key={opt}
                    className={s.lockOption}
                    value={opt}>{opt}</Antd.Radio.Button>
                ))}
              </Antd.Radio.Group>
            </Form.Item>
            <Form.Item
              name="lockEndDate"
              label="Manual choose your lock end date"
              rules={[{ required: true, message: 'Required' }]}>
              <DatePicker
                showTime
                showNow={false}
                disabledDate={disabledDate}
                format="DD/MM/YYYY HH:mm"
                disabled={submitting} />
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
              <GasFeeList disabled={submitting} />
            </Form.Item>
          </div>
        </div>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={submitting}
          disabled={disabledSubmit}
          className={s.lockBtn}>
          Lock
        </Button>
      </Form>
    </div>
  );
};

export default WalletLockView;
