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

import { useProposal } from '../../providers/ProposalProvider';

import s from './s.module.scss';

type FormState = {
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: FormState = {
  gasPrice: undefined,
};

export type QueueForExecutionModalProps = ModalProps;

type QueueForExecutionModalState = {
  submitting: boolean;
};

const InitialState: QueueForExecutionModalState = {
  submitting: false,
};

const QueueForExecutionModal: React.FC<QueueForExecutionModalProps> = props => {
  const { ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();
  const proposalCtx = useProposal();

  const [state, setState] = useMergeState<QueueForExecutionModalState>(InitialState);

  async function handleSubmit(values: FormState) {
    const { gasPrice } = values;

    if (!proposalCtx.proposal || !gasPrice) {
      return;
    }

    setState({ submitting: true });

    try {
      await form.validateFields();
      await proposalCtx.queueProposalForExecution(gasPrice.value);

      props.onCancel?.();
    } catch {}

    setState({ submitting: false });
  }

  return (
    <Modal className={s.component} width={560} title="Queue for execution" {...modalProps}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={16} className={s.row}>
          <Text type="p2" weight="semibold" color="secondary">
            Once a proposal is accepted, it will have to wait in the queue before it can be executed. During this time
            it can only be cancelled by an abrogation proposal.
          </Text>
        </Grid>
        <Divider />
        <Grid flow="row" gap={32} className={s.row}>
          <Form.Item name="gasPrice" label="Gas Fee (Gwei)" rules={[{ required: true, message: 'Required' }]}>
            <GasFeeList disabled={state.submitting} />
          </Form.Item>

          <Button htmlType="submit" type="primary" loading={state.submitting} className={s.actionBtn}>
            Queue proposal for execution
          </Button>
        </Grid>
      </Form>
    </Modal>
  );
};

export default QueueForExecutionModal;
