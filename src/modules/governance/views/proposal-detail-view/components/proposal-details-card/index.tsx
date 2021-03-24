import React from 'react';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import Skeleton from 'components/antd/skeleton';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import Identicon from 'components/custom/identicon';
import { Hint, Text } from 'components/custom/typography';
import { APIProposalState } from 'modules/governance/api';
import { useWallet } from 'wallets/wallet';

import ProposalActionCard from '../../../../components/proposal-action-card';
import { useProposal } from '../../providers/ProposalProvider';

type ProposalDetailsCardState = {
  cancelling: boolean;
};

const InitialState: ProposalDetailsCardState = {
  cancelling: false,
};

const ProposalDetailsCard: React.FC = () => {
  const wallet = useWallet();
  const proposalCtx = useProposal();
  const { proposal, thresholdRate, minThreshold } = proposalCtx;

  const [state, setState] = React.useState<ProposalDetailsCardState>(InitialState);

  const ownProposal = proposal?.proposer === wallet.account;
  const isThresholdBelow = thresholdRate !== undefined && thresholdRate < minThreshold;
  const isValidStateForCancel = [APIProposalState.WARMUP, APIProposalState.ACTIVE].includes(proposal?.state as any);
  const canBeCancelled = isValidStateForCancel && (ownProposal || isThresholdBelow);

  function handleProposalCancel() {
    setState(prevState => ({
      ...prevState,
      cancelling: true,
    }));

    proposalCtx
      .cancelProposal()
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
      title={
        <Text type="p1" weight="semibold" color="primary">
          Details
        </Text>
      }
      noPaddingBody>
      <div className="p-24 flexbox-list" style={{ '--gap': '32px' } as React.CSSProperties}>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Created by
          </Text>
          <Grid flow="col" gap={8}>
            <Identicon address={proposal?.proposer} width={24} height={24} />
            <ExternalLink href={`${getEtherscanAddressUrl(proposal?.proposer)}`}>
              <Text type="p1" weight="semibold" color="blue">
                {shortenAddr(proposal?.proposer)}
              </Text>
            </ExternalLink>
          </Grid>
        </div>
        <div>
          <Hint
            text={`If the creator’s vBOND balance falls below ${minThreshold}% of the total amount of $BOND staked in the DAO the proposal can be cancelled by anyone.`}>
            <Text type="small" weight="semibold" color="secondary" className="mb-4">
              Creator threshold
            </Text>
          </Hint>
          <Grid flow="col" gap={8}>
            {thresholdRate !== undefined && (
              <>
                <Icon name={isThresholdBelow ? 'close-circle-outlined' : 'check-circle-outlined'} />
                <Skeleton loading={proposal === undefined}>
                  <Text type="p1" weight="semibold" color="primary">
                    {isThresholdBelow ? 'Below 1%' : 'Above 1%'}
                  </Text>
                </Skeleton>
              </>
            )}
          </Grid>
        </div>
        {canBeCancelled && (
          <Button type="default" loading={state.cancelling} onClick={handleProposalCancel}>
            Cancel proposal
          </Button>
        )}
      </div>
      <Divider />
      <Grid flow="row" gap={16} padding={24}>
        <Text type="small" weight="semibold" color="secondary">
          Description
        </Text>
        <Text type="p1" color="primary" wrap>
          {proposal?.description}
        </Text>
      </Grid>
      <Divider />
      <Grid flow="row" gap={16} padding={24}>
        <Text type="small" weight="semibold" color="secondary">
          Actions
        </Text>
        {proposal?.targets.map((target: string, index: number) => (
          <ProposalActionCard
            key={index}
            title={`Action ${index + 1}`}
            target={proposal?.targets[index]}
            signature={proposal?.signatures[index]}
            callData={proposal?.calldatas[index]}
          />
        ))}
      </Grid>
    </Card>
  );
};

export default ProposalDetailsCard;
