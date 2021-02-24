import React from 'react';
import * as Antd from 'antd';

import Button from 'components/antd/button';
import Form from 'components/antd/form';
import Modal, { ModalProps } from 'components/antd/modal';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import useMergeState from 'hooks/useMergeState';
import { SYContract } from 'modules/smart-yield/providers/sy-pools-provider/sy/contract';

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
  redeemId?: number;
  contract?: SYContract;
  type: 'senior' | 'junior';
};

type State = {
  submitting: boolean;
};

const InitialState: State = {
  submitting: false,
};

const ConfirmRedeemModal: React.FC<Props> = props => {
  const { type, redeemId, contract, ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();

  const [state, setState] = useMergeState<State>(InitialState);

  async function handleSubmit(values: FormState) {
    if (!redeemId) {
      return Promise.reject();
    }

    setState({ submitting: true });

    const { gasPrice } = values;

    try {
      await form.validateFields();

      if (type === 'junior') {
        await contract?.redeemJuniorBondSend(
          redeemId,
          gasPrice?.value ?? 0,
        );
      } else if (type === 'senior') {
        await contract?.redeemBondSend(
          redeemId,
          gasPrice?.value ?? 0,
        );
      }

      props.onCancel?.();
    } catch {
    }

    setState({ submitting: false });
  }

  return (
    <Modal className={s.component} width={560} title="Confirm your redeem" {...modalProps}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={32} className={s.row}>
          <Form.Item name="gasPrice" label="Gas Fee (Gwei)" rules={[{ required: true, message: 'Required' }]}>
            <GasFeeList disabled={state.submitting} />
          </Form.Item>

          <Button htmlType="submit" type="primary" loading={state.submitting} className={s.actionBtn}>
            Confirm redeem
          </Button>
        </Grid>
      </Form>
    </Modal>
  );
};

export default ConfirmRedeemModal;
