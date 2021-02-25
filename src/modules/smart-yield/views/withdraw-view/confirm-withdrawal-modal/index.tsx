import React from 'react';
import * as Antd from 'antd';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import Modal, { ModalProps } from 'components/antd/modal';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
import { WITHDRAW_INSTANT_KEY, WITHDRAW_TWO_STEP_KEY } from 'modules/smart-yield/views/withdraw-view/initiate-withdraw';

import s from './styles.module.scss';

type FormState = {
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: FormState = {
  gasPrice: undefined,
};

type Props = ModalProps & {
  type?: string;
  onConfirm: (gasFee: number) => Promise<void>;
};

type State = {
  submitting: boolean;
};

const InitialState: State = {
  submitting: false,
};

const ConfirmWithdrawalModal: React.FC<Props> = props => {
  const { onConfirm, type, ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();

  const [state, setState] = useMergeState<State>(InitialState);

  async function handleSubmit(values: FormState) {
    const { gasPrice } = values;

    if (!gasPrice) {
      return;
    }

    setState({ submitting: true });

    try {
      await onConfirm(gasPrice.value);
      props.onCancel?.();
    } catch {}

    setState({ submitting: false });
  }

  return (
    <Modal className={s.component} width={560} title="Confirm your withdrawal" {...modalProps}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onFinish={handleSubmit}>
        <Grid flow="col" gap={32} className="pv-32 ph-32">
          <div>
            <Text type="small" weight="semibold" color="secondary">
              Minimum received
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              -
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" color="secondary">
              Withdrawal type
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              -
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" color="secondary">
              Wait time
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              -
            </Text>
          </div>
        </Grid>
        <Divider />
        <Grid flow="row" gap={32} className={s.row}>
          <Form.Item name="gasPrice" label="Gas Fee (Gwei)" rules={[{ required: true, message: 'Required' }]}>
            <GasFeeList disabled={state.submitting} />
          </Form.Item>

          <Button htmlType="submit" type="primary" loading={state.submitting} className={s.actionBtn}>
            {type === WITHDRAW_TWO_STEP_KEY && 'Confirm withdrawal initiation'}
            {type === WITHDRAW_INSTANT_KEY && 'Withdraw'}
          </Button>
        </Grid>
      </Form>
    </Modal>
  );
};

export default ConfirmWithdrawalModal;
