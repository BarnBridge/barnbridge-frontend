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

  const [state, setState] = React.useState<ProposalDetailsCardState>(InitialState);

  const canCancel =
    ((proposalCtx.thresholdRate && proposalCtx.thresholdRate < proposalCtx.minThreshold) ||
      proposalCtx.proposal?.proposer === wallet.account) &&
    [APIProposalState.WARMUP, APIProposalState.ACTIVE].includes(proposalCtx.proposal?.state as any);

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
        proposalCtx.reload();
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
      <Grid flow="col" gap={32} justify="space-between" padding={24}>
        <Grid flow="col" gap={32}>
          <Grid flow="row" gap={4}>
            <Text type="small" weight="semibold" color="secondary">
              Created by
            </Text>
            <Grid flow="col" gap={8}>
              <Identicon address={proposalCtx.proposal?.proposer} width={24} height={24} />
              <ExternalLink href={`${getEtherscanAddressUrl(proposalCtx.proposal?.proposer)}`}>
                <Text type="p1" weight="semibold" color="blue">
                  {shortenAddr(proposalCtx.proposal?.proposer)}
                </Text>
              </ExternalLink>
            </Grid>
          </Grid>
          <Grid flow="row" gap={4}>
            <Hint
              text={`If the creator’s vBOND balance falls below ${proposalCtx.minThreshold}% of the total amount of $BOND staked in the DAO the proposal can be cancelled by anyone.`}>
              <Text type="small" weight="semibold" color="secondary">
                Creator threshold
              </Text>
            </Hint>
            <Grid flow="col" gap={8}>
              {proposalCtx.thresholdRate !== undefined && (
                <>
                  <Icon
                    name={
                      proposalCtx.thresholdRate > proposalCtx.minThreshold
                        ? 'check-circle-outlined'
                        : 'close-circle-outlined'
                    }
                  />
                  <Skeleton loading={proposalCtx.proposal === undefined}>
                    <Text type="p1" weight="semibold" color="primary">
                      {proposalCtx.thresholdRate >= proposalCtx.minThreshold ? 'Above 1%' : 'Below 1%'}
                    </Text>
                  </Skeleton>
                </>
              )}
            </Grid>
          </Grid>
          {canCancel && (
            <Button type="default" loading={state.cancelling} onClick={handleProposalCancel}>
              Cancel proposal
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider />
      <Grid flow="row" gap={16} padding={24}>
        <Text type="small" weight="semibold" color="secondary">
          Description
        </Text>
        <Text type="p1" color="primary" wrap>
          {proposalCtx.proposal?.description}
        </Text>
      </Grid>
      <Divider />
      <Grid flow="row" gap={16} padding={24}>
        <Text type="small" weight="semibold" color="secondary">
          Actions
        </Text>
        {proposalCtx.proposal?.targets.map((target: string, index: number) => (
          <ProposalActionCard
            key={index}
            title={`Action ${index + 1}`}
            target={proposalCtx.proposal!.targets[index]}
            signature={proposalCtx.proposal!.signatures[index]}
            callData={proposalCtx.proposal!.calldatas[index]}
          />
        ))}
      </Grid>
    </Card>
  );
};

export default ProposalDetailsCard;
