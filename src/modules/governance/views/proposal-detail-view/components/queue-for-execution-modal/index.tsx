import React from 'react';
import * as Antd from 'antd';

import Modal, { ModalProps } from 'components/antd/modal';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import GasFeeList from 'components/custom/gas-fee-list';
import { useDAO } from '../../../../components/dao-provider';
import { useProposal } from '../../providers/ProposalProvider';

import useMergeState from 'hooks/useMergeState';

import s from './styles.module.scss';

type FormState = {
  gasPrice?: {
    value: number,
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

const QueueForExecutionModal: React.FunctionComponent<QueueForExecutionModalProps> = props => {
  const { ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();
  const daoCtx = useDAO();
  const proposalCtx = useProposal();

  const [state, setState] = useMergeState<QueueForExecutionModalState>(InitialState);

  async function handleSubmit(values: FormState) {
    if (!proposalCtx.proposal) {
      return;
    }

    setState({ submitting: true });

    const { gasPrice } = values;

    try {
      await form.validateFields();
      await proposalCtx.queueProposalForExecution(gasPrice?.value!);

      proposalCtx.reload();
      props.onCancel?.();
    } catch {
    }

    setState({ submitting: false });
  }

  return (
    <Modal
      className={s.component}
      width={560}
      title="Queue for execution"
      {...modalProps}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={16} className={s.row}>
          <Paragraph type="p2" semiBold color="secondary">
            Once a proposal is accepted, it will have to wait in the queue before it can be executed.
            During this time it can only be cancelled by an abrogation proposal
          </Paragraph>
          <ul>
            <li>
              <Paragraph type="p2" semiBold color="secondary">
                the creator
              </Paragraph>
            </li>
            <li>
              <Paragraph type="p2" semiBold color="secondary">
                anyone if the creator’s balance falls below the {daoCtx.minThreshold}% threshold
              </Paragraph>
            </li>
            <li>
              <Paragraph type="p2" semiBold color="secondary">
                cancellation proposal
              </Paragraph>
            </li>
          </ul>
        </Grid>
        <div className={s.delimiter} />
        <Grid flow="row" gap={32} className={s.row}>
          <Form.Item
            name="gasPrice"
            label="Gas Fee (Gwei)"
            rules={[{ required: true, message: 'Required' }]}>
            <GasFeeList disabled={state.submitting} />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            loading={state.submitting}
            className={s.actionBtn}>
            Queue proposal for execution
          </Button>
        </Grid>
      </Form>
    </Modal>
  );
};

export default QueueForExecutionModal;
