import React from 'react';
import * as Antd from 'antd';

import Modal, { ModalProps } from 'components/antd/modal';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import RadioButton from 'components/antd/radio-button';
import Grid from 'components/custom/grid';
import { Heading, Paragraph } from 'components/custom/typography';
import GasFeeList from 'components/custom/gas-fee-list';
import { useProposal } from '../../providers/ProposalProvider';

import { formatBigValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import useMergeState from 'hooks/useMergeState';

import s from './styles.module.scss';

export enum VoteState {
  None,
  VoteFor,
  VoteAgainst,
  VoteChange,
  VoteCancel,
  VoteForAbrogation,
  VoteAgainstAbrogation,
  VoteCancelAbrogation,
}

type FormState = {
  changeOption?: boolean;
  gasPrice?: number;
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

const ProposalVoteModal: React.FunctionComponent<ModalProps & ProposalVoteModalProps> = props => {
  const { voteState, ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();
  const proposalCtx = useProposal();
  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<ProposalVoteModalState>(InitialState);

  async function handleSubmit(values: FormState) {
    if (!proposalCtx.proposal) {
      return;
    }

    setState({ submitting: true });

    const { proposalId } = proposalCtx.proposal;
    const { gasPrice = 0 } = values;

    try {
      await form.validateFields();
      let r: any;

      if (voteState === VoteState.VoteFor) {
        await web3c.daoGovernance.actions.castVote(gasPrice, proposalId, true);
      } else if (voteState === VoteState.VoteAgainst) {
        await web3c.daoGovernance.actions.castVote(gasPrice, proposalId, false);
      } else if (voteState === VoteState.VoteChange) {
        await web3c.daoGovernance.actions.castVote(gasPrice, proposalId, values.changeOption!);
      } else if (voteState === VoteState.VoteCancel) {
        await web3c.daoGovernance.actions.cancelVote(gasPrice, proposalId);
      } else if (voteState === VoteState.VoteForAbrogation) {
        r = await web3c.daoGovernance.actions.abrogationCastVote(gasPrice, proposalId, true);
      } else if (voteState === VoteState.VoteAgainstAbrogation) {
        r = await web3c.daoGovernance.actions.abrogationCastVote(gasPrice, proposalId, false);
      } else if (voteState === VoteState.VoteCancelAbrogation) {
        r = await web3c.daoGovernance.actions.abrogationCancelVote(gasPrice, proposalId);
      }

      console.log("R", r);
      props.onCancel?.();
      proposalCtx.reload();
    } catch {
    }

    setState({ submitting: false });
  }

  const title = React.useMemo<string | undefined>(() => {
    switch (voteState) {
      case VoteState.VoteFor:
      case VoteState.VoteAgainst:
      case VoteState.VoteForAbrogation:
      case VoteState.VoteAgainstAbrogation:
        return 'Confirm your vote';
      case VoteState.VoteCancel:
      case VoteState.VoteCancelAbrogation:
        return 'Cancel your vote';
      case VoteState.VoteChange:
        return 'Change your vote';
    }
  }, [voteState]);

  React.useEffect(() => {
    if (voteState === VoteState.VoteChange) {
      form.setFieldsValue({
        changeOption: proposalCtx.receipt?.support,
      });
    }
  }, [voteState]);

  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      className={s.component}
      centered
      width={560}
      title={title}
      {...modalProps}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit', 'onChange']}
        onFinish={handleSubmit}>
        <Grid flow="row" gap={16} className={s.row}>
          <Grid flow="col" gap={8} align="center" justify="center">
            <Heading type="h2" bold color="grey900">
              {formatBigValue(proposalCtx.votingPower, 2)}
            </Heading>
            <Paragraph type="p1" semiBold color="grey500">Votes</Paragraph>
          </Grid>
          <Paragraph type="p2" semiBold color="grey500" className="text-center">
            {proposalCtx.proposal?.title}
          </Paragraph>
        </Grid>
        <div className={s.delimiter} />
        <Grid flow="row" gap={32} className={s.row}>
          {voteState === VoteState.VoteChange && (
            <Form.Item
              name="changeOption"
              label="Vote"
              rules={[{ required: true, message: 'Required' }]}>
              <Antd.Radio.Group className={s.changeGroup} disabled={state.submitting}>
                <Grid gap={16} colsTemplate="1fr 1fr">
                  <RadioButton
                    label={<Paragraph type="p1" semiBold color="grey900">For</Paragraph>}
                    value={true} />
                  <RadioButton
                    label={<Paragraph type="p1" semiBold color="grey900">Against</Paragraph>}
                    value={false} />
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
                  {voteState === VoteState.VoteAgainst && 'Vote against proposal'}
                  {voteState === VoteState.VoteCancel && 'Cancel vote'}
                  {voteState === VoteState.VoteChange && changeOption === true && 'Vote for proposal'}
                  {voteState === VoteState.VoteChange && changeOption === false && 'Vote against proposal'}
                  {voteState === VoteState.VoteForAbrogation && 'Vote for cancellation proposal'}
                  {voteState === VoteState.VoteAgainstAbrogation && 'Vote against cancellation proposal'}
                  {voteState === VoteState.VoteCancelAbrogation && 'Cancel abrogation vote'}
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
