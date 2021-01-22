import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';
import { useProposal } from '../../providers/ProposalProvider';

import s from './styles.module.scss';

type ProposalCancellationCardState = {
  cancelling: boolean;
};

const InitialState: ProposalCancellationCardState = {
  cancelling: false,
};

const ProposalCancellationCard: React.FunctionComponent = () => {
  const proposalCtx = useProposal();

  const [state, setState] = React.useState<ProposalCancellationCardState>(InitialState);

  function handleProposalCancellation() {
    setState(prevState => ({
      ...prevState,
      cancelling: true,
    }));

    proposalCtx.startCancellationProposal()
      .then(() => {
        setState(prevState => ({
          ...prevState,
          cancelling: false,
        }));
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          cancelling: false,
        }));
      });
  }

  return (
    <Card
      title={(
        <Paragraph type="p1" semiBold color="grey900">Cancellation proposal</Paragraph>
      )}>
      {!proposalCtx.canceled ? (
        <Grid flow="row" gap={24}>
          <Paragraph type="p1" color="grey900">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
            enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco
            est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
            consequat sunt nostrud amet.
          </Paragraph>
          <Button
            type="default"
            loading={state.cancelling}
            onClick={handleProposalCancellation}>
            Initiate cancellation proposal
          </Button>
        </Grid>
      ) : (
        <Grid flow="row" gap={24}>
          <Paragraph type="p1" color="grey900">Cancellation proposal currently in progress.</Paragraph>
          <Button type="primary">View cancellation proposal</Button>
        </Grid>
      )}
    </Card>
  );
};

export default ProposalCancellationCard;
