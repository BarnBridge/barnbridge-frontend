import React from 'react';
import * as Antd from 'antd';

import Modal, { ModalProps } from 'components/antd/modal';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import Textarea from 'components/antd/textarea';
import RadioButton from 'components/antd/radio-button';
import Grid from 'components/custom/grid';
import { Heading, Paragraph } from 'components/custom/typography';
import GasFeeList from 'components/custom/gas-fee-list';
import { useProposal } from '../../providers/ProposalProvider';
import { useAbrogation } from '../../providers/AbrogationProvider';

import { formatBigValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import useMergeState from 'hooks/useMergeState';

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
  gasPrice?: number;
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

const AbrogationVoteModal: React.FunctionComponent<AbrogationVoteModalProps> = props => {
  const { voteState, ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();
  const proposalCtx = useProposal();
  const abrogationCtx = useAbrogation();
  const web3c = useWeb3Contracts();

  const [state, setState] = useMergeState<AbrogationVoteModalState>(InitialState);

  async function handleSubmit(values: FormState) {
    if (!abrogationCtx.abrogation) {
      return;
    }

    setState({ submitting: true });

    const { proposalId } = abrogationCtx.abrogation;
    const { gasPrice = 0 } = values;

    try {
      await form.validateFields();
      let r: any;

      if (voteState === VoteAbrogationState.VoteInitiate) {
        r = await web3c.daoGovernance.actions.startAbrogationProposal(gasPrice, proposalId, values.description!);
      } else if (voteState === VoteAbrogationState.VoteFor) {
        r = await web3c.daoGovernance.actions.abrogationCastVote(gasPrice, proposalId, true);
      } else if (voteState === VoteAbrogationState.VoteAgainst) {
        r = await web3c.daoGovernance.actions.abrogationCastVote(gasPrice, proposalId, false);
      } else if (voteState === VoteAbrogationState.VoteChange) {
        r = await web3c.daoGovernance.actions.abrogationCastVote(gasPrice, proposalId, values.changeOption!);
      } else if (voteState === VoteAbrogationState.VoteCancel) {
        r = await web3c.daoGovernance.actions.abrogationCancelVote(gasPrice, proposalId);
      }

      console.log("AR", r);
      props.onCancel?.();
      abrogationCtx.reload();
    } catch {
    }

    setState({ submitting: false });
  }

  const title = React.useMemo<string | undefined>(() => {
    switch (voteState) {
      case VoteAbrogationState.VoteInitiate:
        return 'Initiate abrogation proposal';
      case VoteAbrogationState.VoteFor:
      case VoteAbrogationState.VoteAgainst:
        return 'Confirm your vote';
      case VoteAbrogationState.VoteCancel:
        return 'Cancel your vote';
      case VoteAbrogationState.VoteChange:
        return 'Change your vote';
    }
  }, [voteState]);

  React.useEffect(() => {
    if (voteState === VoteAbrogationState.VoteChange) {
      form.setFieldsValue({
        changeOption: abrogationCtx.receipt?.support,
      });
    }
  }, [voteState]);

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
        {voteState === VoteAbrogationState.VoteInitiate && (
          <Grid flow="row" gap={16} padding={32}>
            <Paragraph type="p2" semiBold color="grey500">
              {proposalCtx.proposal?.title}
            </Paragraph>
          </Grid>
        )}
        {voteState !== VoteAbrogationState.VoteInitiate && (
          <Grid flow="row" gap={16} className={s.row}>
            <Grid flow="col" gap={8} align="center" justify="center">
              <Heading type="h2" bold color="grey900">
                {formatBigValue(abrogationCtx.votingPower, 2)}
              </Heading>
              <Paragraph type="p1" semiBold color="grey500">Votes</Paragraph>
            </Grid>
            <Paragraph type="p2" semiBold color="grey500" className="text-center">
              {proposalCtx.proposal?.title}
            </Paragraph>
          </Grid>
        )}
        <div className={s.delimiter} />
        <Grid flow="row" gap={32} className={s.row}>
          {voteState === VoteAbrogationState.VoteInitiate && (
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Required' }]}>
              <Textarea placeholder="Placeholder" rows={4} disabled={state.submitting} />
            </Form.Item>
          )}
          {voteState === VoteAbrogationState.VoteChange && (
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
                  {voteState === VoteAbrogationState.VoteChange && changeOption === true && 'Vote for abrogation proposal'}
                  {voteState === VoteAbrogationState.VoteChange && changeOption === false && 'Vote against abrogation proposal'}
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
