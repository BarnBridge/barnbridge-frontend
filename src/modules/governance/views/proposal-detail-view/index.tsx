import React from 'react';

import { Heading } from 'components/custom/typography';
import ProposalVoteResultsCard from './components/proposal-vote-results-card';
import ProposalDetailsCard from './components/proposal-details-card';
import ProposalStatusCard from './components/proposal-status-card';
import ProposalCancellationCard from './components/proposal-cancellation-card';
import ProposalVotesCard from './components/proposal-votes-card';
import ProposalQuorumCard from './components/proposal-quorum-card';
import ProposalApprovalCard from './components/proposal-approval-card';

import s from './styles.module.scss';
import { ProposalData, ProposalState } from 'web3/contracts/daoGovernance';
import { useWeb3Contracts } from 'web3/contracts';
import { useRouteMatch } from 'react-router-dom';

const ProposalDetailView: React.FunctionComponent = () => {
  const web3c = useWeb3Contracts();
  const [data, setData] = React.useState<ProposalData>();
  const { params } = useRouteMatch<{ id: string }>();

  React.useEffect(() => {
    fetch(`https://bbtest.kwix.xyz/api/governance/proposals/${params.id}`)
      .then(result => result.json())
      .then(async result => {
        const proposal = result.data as ProposalData;

        const [proposalState, proposalMeta] = await web3c.daoGovernance.proposalStateSend(proposal.proposal_id);

        setData({
          ...proposal,
          state: proposalState,
          meta: proposalMeta,
          time_left: web3c.daoGovernance.proposalTimeLeft(proposalState, proposal.create_time * 1000),
        } as ProposalData);
      });
  }, [params.id]);

  return (
    <div className={s.component}>
      <Heading type="h2" semiBold className={s.header}>
        {data?.title}
      </Heading>

      <div className={s.content}>
        <div className={s.column}>
          {data && <ProposalVoteResultsCard proposal={data} />}
          {data && <ProposalDetailsCard proposal={data} />}
        </div>
        <div className={s.column}>
          <ProposalStatusCard proposal={data} />
          {data?.state === ProposalState.Queued && (
            <ProposalCancellationCard proposal={data} />
          )}
          <ProposalVotesCard proposal={data} />
          <ProposalQuorumCard proposal={data} />
          <ProposalApprovalCard proposal={data} />
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailView;
