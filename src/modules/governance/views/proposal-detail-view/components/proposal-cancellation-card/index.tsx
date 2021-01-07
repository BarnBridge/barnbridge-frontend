import React from 'react';

import Card from 'components/antd/card';
import { Paragraph } from 'components/custom/typography';
import Button from 'components/antd/button';

import { useWeb3Contracts } from 'web3/contracts';
import { ProposalData } from 'web3/contracts/daoGovernance';

import s from './styles.module.scss';

export type ProposalCancellationCardProps = {
  proposal?: ProposalData;
};

type ProposalCancellationCardState = {
  canceled: boolean;
};

const ProposalCancellationCard: React.FunctionComponent<ProposalCancellationCardProps> = props => {
  const { proposal } = props;

  const web3c = useWeb3Contracts();
  const [state, setState] = React.useState<ProposalCancellationCardState>({
    canceled: false,
  });

  React.useEffect(() => {
    if (!proposal?.proposal_id) {
      return;
    }

    web3c.daoGovernance.cancellationProposalsCall(proposal?.proposal_id!)
      .then(([result]) => {
        console.log('R', result);
        if (result.createTime > 0) {
          setState(prevState => ({
            ...prevState,
            canceled: true,
          }));
        }
      });
  }, [proposal?.proposal_id]);

  return (
    <Card className={s.component} title="Cancellation proposal">
      {!state.canceled ? (
        <>
          <Paragraph type="p1">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
            enim velit mollit. Exercitation veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco
            est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
            consequat sunt nostrud amet.
          </Paragraph>

          <Button type="default" className={s.cancelBtn}>
            Initiate cancellation proposal
          </Button>
        </>
      ) : (
        <>
          <Paragraph type="p1">Cancellation proposal currently in progress.</Paragraph>
          <Button type="primary">View cancellation proposal</Button>
        </>
      )}

    </Card>
  );
};

export default ProposalCancellationCard;
