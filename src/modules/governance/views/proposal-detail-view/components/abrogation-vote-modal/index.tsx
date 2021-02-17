import React from 'react';
import * as Antd from 'antd';
import { formatBigValue } from 'web3/utils';

import Button from 'components/antd/button';
import Form from 'components/antd/form';
import Modal, { ModalProps } from 'components/antd/modal';
import RadioButton from 'components/antd/radio-button';
import Textarea from 'components/antd/textarea';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';

import { useAbrogation } from '../../providers/AbrogationProvider';
import { useProposal } from '../../providers/ProposalProvider';

import s from './styles.module.scss';

export enum VoteAbrogationState {
  None,
  VoteInitiate,
  VoteFor,
  VoteAgainst,
  VoteChange,
  VoteCancel,
}

type FormState = {
  changeOption?: boolean;
  description?: string;
  gasPrice?: {
    value: number;
  };
};

const InitialFormValues: FormState = {
  changeOption: undefined,
  description: undefined,
  gasPrice: undefined,
};

export type AbrogationVoteModalProps = ModalProps & {
  voteState: VoteAbrogationState;
};

type AbrogationVoteModalState = {
  submitting: boolean;
};

const InitialState: AbrogationVoteModalState = {
  submitting: false,
};

const AbrogationVoteModal: React.FC<AbrogationVoteModalProps> = props => {
  const { voteState, ...modalProps } = props;

  const proposalCtx = useProposal();
  const abrogationCtx = useAbrogation();

  const [state, setState] = useMergeState<AbrogationVoteModalState>(InitialState);
  const [form] = Antd.Form.useForm<FormState>();

  async function handleSubmit(values: FormState) {
    if (!abrogationCtx.abrogation && voteState !== VoteAbrogationState.VoteInitiate) {
      return;
    }

    setState({ submitting: true });

    const { gasPrice } = values;
    const gasFee = gasPrice?.value!;

    try {
      await form.validateFields();

      if (voteState === VoteAbrogationState.VoteInitiate) {
        await proposalCtx.startAbrogationProposal(values.description!, gasFee);
      } else if (voteState === VoteAbrogationState.VoteFor) {
        await abrogationCtx.abrogationProposalCastVote(true, gasFee);
      } else if (voteState === VoteAbrogationState.VoteAgainst) {
        await abrogationCtx.abrogationProposalCastVote(false, gasFee);
      } else if (voteState === VoteAbrogationState.VoteChange) {
        await abrogationCtx.abrogationProposalCastVote(values.changeOption === true, gasFee);
      } else if (voteState === VoteAbrogationState.VoteCancel) {
        await abrogationCtx.abrogationProposalCancelVote(gasFee);
      }

      abrogationCtx.reload();
      props.onCancel?.();
    } catch {}

    setState({ submitting: false });
  }

  React.useEffect(() => {
    if (voteState === VoteAbrogationState.VoteChange) {
      form.setFieldsValue({
        changeOption: abrogationCtx.receipt?.support,
      });
    }
  }, [voteState, abrogationCtx.receipt]);

  return (
    <Modal
      className={s.component}
      width={560}
      title={
        <>
          {voteState === VoteAbrogationState.VoteInitiate && 'Initiate abrogation proposal'}
          {voteState === VoteAbrogationState.VoteFor && 'Confirm your vote'}
          {voteState === VoteAbrogationState.VoteAgainst && 'Confirm your vote'}
          {voteState === VoteAbrogationState.VoteChange && 'Change your vote'}
          {voteState === VoteAbrogationState.VoteCancel && 'Cancel your vote'}
        </>
      }
      {...modalProps}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onFinish={handleSubmit}>
        {voteState === VoteAbrogationState.VoteInitiate && (
          <Grid flow="row" gap={16} padding={32}>
            <Text type="p2" weight="semibold" color="secondary">
              {proposalCtx.proposal?.title}
            </Text>
          </Grid>
        )}
        {voteState !== VoteAbrogationState.VoteInitiate && (
          <Grid flow="row" gap={16} className={s.row}>
            <Grid flow="col" gap={8} align="center">
              <Text type="h2" weight="bold" color="primary">
                {formatBigValue(proposalCtx.votingPower, 2)}
              </Text>
              <Text type="p1" weight="semibold" color="secondary">
                Votes
              </Text>
            </Grid>
            {(voteState === VoteAbrogationState.VoteFor || voteState === VoteAbrogationState.VoteAgainst) && (
              <Grid flow="row" gap={8}>
                <Text type="p2" color="secondary">
                  You are about to vote {voteState === VoteAbrogationState.VoteFor ? 'FOR' : 'AGAINST'} the abrogation
                  proposal for
                </Text>
                <Text type="p2" weight="semibold" color="secondary">
                  "{proposalCtx.proposal?.title}"
                </Text>
                <Text type="p2" color="secondary">
                  You can change your vote later.
                </Text>
              </Grid>
            )}
            {voteState === VoteAbrogationState.VoteChange && (
              <Grid flow="row" gap={8}>
                <Text type="p2" color="secondary">
                  You are about to change your vote on the abrogation proposal for
                </Text>
                <Text type="p2" weight="semibold" color="secondary">
                  "{proposalCtx.proposal?.title}"
                </Text>
                <Text type="p2" color="secondary">
                  Are you sure you want to continue? You can change your vote again later.
                </Text>
              </Grid>
            )}
            {voteState === VoteAbrogationState.VoteCancel && (
              <Grid flow="row" gap={8}>
                <Text type="p2" color="secondary">
                  You are about to cancel your vote on the abrogation proposal for
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
        )}
        <div className={s.delimiter} />
        <Grid flow="row" gap={32} className={s.row}>
          {voteState === VoteAbrogationState.VoteInitiate && (
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Required' }]}>
              <Textarea placeholder="Placeholder" rows={4} disabled={state.submitting} />
            </Form.Item>
          )}
          {voteState === VoteAbrogationState.VoteChange && (
            <Form.Item name="changeOption" label="Vote" rules={[{ required: true, message: 'Required' }]}>
              <Antd.Radio.Group className={s.changeGroup} disabled={state.submitting}>
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
          <Form.Item name="gasPrice" label="Gas Fee (Gwei)" rules={[{ required: true, message: 'Required' }]}>
            <GasFeeList disabled={state.submitting} />
          </Form.Item>

          <Form.Item shouldUpdate>
            {({ getFieldsValue }) => {
              const { changeOption } = getFieldsValue();

              let isDisabled = false;

              if (voteState === VoteAbrogationState.VoteChange) {
                if (abrogationCtx.receipt?.support === changeOption) {
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
                  {voteState === VoteAbrogationState.VoteInitiate && 'Initiate abrogation proposal'}
                  {voteState === VoteAbrogationState.VoteFor && 'Vote for abrogation proposal'}
                  {voteState === VoteAbrogationState.VoteAgainst && 'Vote against abrogation proposal'}
                  {voteState === VoteAbrogationState.VoteChange &&
                    changeOption === true &&
                    'Vote for abrogation proposal'}
                  {voteState === VoteAbrogationState.VoteChange &&
                    changeOption === false &&
                    'Vote against abrogation proposal'}
                  {voteState === VoteAbrogationState.VoteCancel && 'Cancel abrogation vote'}
                </Button>
              );
            }}
          </Form.Item>
        </Grid>
      </Form>
    </Modal>
  );
};

export default AbrogationVoteModal;
