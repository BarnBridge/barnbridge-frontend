import React from 'react';
import * as Antd from 'antd';

import Modal, { ModalProps } from 'components/antd/modal';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import RadioButton from 'components/antd/radio-button';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import GasFeeList from 'components/custom/gas-fee-list';
import { useProposal } from '../../providers/ProposalProvider';

import { formatBigValue } from 'web3/utils';
import useMergeState from 'hooks/useMergeState';

import s from './styles.module.scss';

export enum VoteState {
  None,
  VoteFor,
  VoteAgainst,
  VoteChange,
  VoteCancel,
}

type FormState = {
  changeOption?: boolean;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: FormState = {
  changeOption: undefined,
  gasPrice: undefined,
};

export type ProposalVoteModalProps = {
  voteState: VoteState;
};

type ProposalVoteModalState = {
  submitting: boolean;
};

const InitialState: ProposalVoteModalState = {
  submitting: false,
};

const ProposalVoteModal: React.FC<ModalProps & ProposalVoteModalProps> = props => {
  const { voteState, ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();
  const proposalCtx = useProposal();

  const [state, setState] = useMergeState<ProposalVoteModalState>(InitialState);

  async function handleSubmit(values: FormState) {
    if (!proposalCtx.proposal) {
      return;
    }

    setState({ submitting: true });

    const { gasPrice } = values;
    const gasFee = gasPrice?.value!;

    try {
      await form.validateFields();

      if (voteState === VoteState.VoteFor) {
        await proposalCtx.proposalCastVote(true, gasFee);
      } else if (voteState === VoteState.VoteAgainst) {
        await proposalCtx.proposalCastVote(false, gasFee);
      } else if (voteState === VoteState.VoteChange) {
        await proposalCtx.proposalCastVote(
          values.changeOption === true,
          gasFee,
        );
      } else if (voteState === VoteState.VoteCancel) {
        await proposalCtx.proposalCancelVote(gasFee);
      }

      proposalCtx.reload();
      props.onCancel?.();
    } catch {
    }

    setState({ submitting: false });
  }

  React.useEffect(() => {
    if (voteState === VoteState.VoteChange) {
      form.setFieldsValue({
        changeOption: proposalCtx.receipt?.support,
      });
    }
  }, [voteState]);

  return (
    <Modal
      className={s.component}
      width={560}
      title={
        <>
          {voteState === VoteState.VoteFor && 'Confirm your vote'}
          {voteState === VoteState.VoteAgainst && 'Confirm your vote'}
          {voteState === VoteState.VoteChange && 'Change your vote'}
          {voteState === VoteState.VoteCancel && 'Cancel your vote'}
        </>
      }
      {...modalProps}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={16} className={s.row}>
          <Grid flow="col" gap={8} align="center">
            <Text type="h2" weight="bold" color="primary">
              {formatBigValue(proposalCtx.votingPower, 2)}
            </Text>
            <Text type="p1" weight="semibold" color="secondary">
              Votes
            </Text>
          </Grid>
          {(voteState === VoteState.VoteFor || voteState === VoteState.VoteAgainst) && (
            <Grid flow="row" gap={8}>
              <Text type="p2" color="secondary">
                You are about to vote on proposal
              </Text>
              <Text type="p2" weight="semibold" color="secondary">
                "{proposalCtx.proposal?.title}"
              </Text>
              <Text type="p2" color="secondary">
                Are you sure you want to continue? You can change your vote later.
              </Text>
            </Grid>
          )}
          {voteState === VoteState.VoteChange && (
            <Grid flow="row" gap={8}>
              <Text type="p2" color="secondary">
                You are about to change your vote on proposal
              </Text>
              <Text type="p2" weight="semibold" color="secondary">
                "{proposalCtx.proposal?.title}"
              </Text>
              <Text type="p2" color="secondary">
                Are you sure you want to continue? You can change your vote again later.
              </Text>
            </Grid>
          )}
          {voteState === VoteState.VoteCancel && (
            <Grid flow="row" gap={8}>
              <Text type="p2" color="secondary">
                You are about to cancel your vote on proposal
              </Text>
              <Text type="p2" weight="semibold" color="secondary">
                "{proposalCtx.proposal?.title}"
              </Text>
              <Text type="p2" color="secondary">
                Are you sure you want to continue? You can change your vote again later.
              </Text>
            </Grid>
          )}
        </Grid>
        <div className={s.delimiter} />
        <Grid flow="row" gap={32} className={s.row}>
          {voteState === VoteState.VoteChange && (
            <Form.Item
              name="changeOption"
              label="Vote"
              rules={[{ required: true, message: 'Required' }]}>
              <Antd.Radio.Group
                className={s.changeGroup}
                disabled={state.submitting}>
                <Grid gap={16} colsTemplate="1fr 1fr">
                  <RadioButton
                    label={
                      <Text type="p1" weight="semibold" color="primary">
                        For
                      </Text>
                    }
                    value={true}
                  />
                  <RadioButton
                    label={
                      <Text type="p1" weight="semibold" color="primary">
                        Against
                      </Text>
                    }
                    value={false}
                  />
                </Grid>
              </Antd.Radio.Group>
            </Form.Item>
          )}
          <Form.Item
            name="gasPrice"
            label="Gas Fee (Gwei)"
            rules={[{ required: true, message: 'Required' }]}>
            <GasFeeList disabled={state.submitting} />
          </Form.Item>

          <Form.Item shouldUpdate>
            {({ getFieldsValue }) => {
              const { changeOption } = getFieldsValue();

              let isDisabled = false;

              if (voteState === VoteState.VoteChange) {
                if (proposalCtx.receipt?.support === changeOption) {
                  isDisabled = true;
                }
              }

              return (
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={state.submitting}
                  disabled={isDisabled}
                  className={s.actionBtn}>
                  {voteState === VoteState.VoteFor && 'Vote for proposal'}
                  {voteState === VoteState.VoteAgainst &&
                  'Vote against proposal'}
                  {voteState === VoteState.VoteCancel && 'Cancel vote'}
                  {voteState === VoteState.VoteChange &&
                  changeOption === true &&
                  'Vote for proposal'}
                  {voteState === VoteState.VoteChange &&
                  changeOption === false &&
                  'Vote against proposal'}
                </Button>
              );
            }}
          </Form.Item>
        </Grid>
      </Form>
    </Modal>
  );
};

export default ProposalVoteModal;
