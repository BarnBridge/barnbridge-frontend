import React from 'react';
import * as Antd from 'antd';

import Button from 'components/antd/button';
import Form from 'components/antd/form';
import Modal, { ModalProps } from 'components/antd/modal';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';

import s from './styles.module.scss';

type FormState = {
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: FormState = {
  gasPrice: undefined,
};

export type ConfirmRedeemModalArgs = {
  gasFee: number;
};

type Props = ModalProps & {
  onConfirm: (args: ConfirmRedeemModalArgs) => Promise<void>;
};

const ConfirmRedeemModal: React.FC<Props> = props => {
  const { onConfirm, ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();

  const [submitting, setSubmitting] = React.useState<boolean>(false);

  async function handleSubmit(values: FormState) {
    const { gasPrice } = values;

    if (!gasPrice) {
      return;
    }

    setSubmitting(true);

    try {
      await props.onConfirm({
        gasFee: gasPrice.value,
      });

      props.onCancel?.();
    } catch {
    }

    setSubmitting(false);
  }

  return (
    <Modal
      className={s.component}
      width={560}
      title="Confirm your redeem"
      {...modalProps}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={32} className={s.row}>
          <Form.Item
            name="gasPrice"
            label="Gas Fee (Gwei)"
            rules={[{ required: true, message: 'Required' }]}>
            <GasFeeList disabled={submitting} />
          </Form.Item>
          <Button
            className={s.actionBtn}
            type="primary"
            htmlType="submit"
            loading={submitting}>
            Confirm redeem
          </Button>
        </Grid>
      </Form>
    </Modal>
  );
};

export default ConfirmRedeemModal;
