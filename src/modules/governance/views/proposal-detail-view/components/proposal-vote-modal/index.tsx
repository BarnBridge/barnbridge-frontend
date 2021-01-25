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
  gasPrice?: number;
};

const InitialFormValues: FormState = {
  changeOption: undefined,
  gasPrice: undefined,
};

export type ProposalVoteModalProps = {
  voteState: VoteState;
};

const ProposalVoteModal: React.FunctionComponent<ModalProps & ProposalVoteModalProps> = props => {
  const { voteState, ...modalProps } = props;

  const [form] = Antd.Form.useForm<FormState>();
  const proposalCtx = useProposal();
  const web3c = useWeb3Contracts();

  async function handleSubmit(values: FormState) {
    if (!proposalCtx.proposal || !values.gasPrice) {
      return;
    }

    const { proposalId } = proposalCtx.proposal;

    try {
      let r: any;

      if (voteState === VoteState.VoteFor) {
        r = await web3c.daoGovernance.actions.castVote(values.gasPrice, proposalId, true);
      } else if (voteState === VoteState.VoteAgainst) {
        r = await web3c.daoGovernance.actions.castVote(values.gasPrice, proposalId, false);
      } else if (voteState === VoteState.VoteChange) {
        r = await web3c.daoGovernance.actions.castVote(values.gasPrice, proposalId, values.changeOption!);
      } else if (voteState === VoteState.VoteCancel) {
        r = await web3c.daoGovernance.actions.cancelVote(values.gasPrice, proposalId);
      }
    } catch {
      //
    }
  }

  const title = React.useMemo<string | undefined>(() => {
    switch (voteState) {
      case VoteState.VoteFor:
      case VoteState.VoteAgainst:
        return 'Confirm your vote';
      case VoteState.VoteChange:
        return 'Change your vote';
      case VoteState.VoteCancel:
        return 'Cancel your vote';
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
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
          </Paragraph>
        </Grid>
        <div className={s.delimiter} />
        <Grid flow="row" gap={32} className={s.row}>
          {voteState === VoteState.VoteChange && (
            <Form.Item
              name="changeOption"
              label="Vote"
              rules={[
                { required: true, message: 'Required' },
              ]}>
              <Antd.Radio.Group className={s.changeGroup}>
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
            rules={[
              { required: true, message: 'Required' },
            ]}>
            <GasFeeList />
          </Form.Item>
          <Button htmlType="submit" type="primary" className={s.actionBtn}>
            {voteState === VoteState.VoteFor && 'Vote for proposal'}
            {voteState === VoteState.VoteAgainst && 'Vote against proposal'}
          </Button>
        </Grid>
      </Form>
    </Modal>
  );
};

export default ProposalVoteModal;
