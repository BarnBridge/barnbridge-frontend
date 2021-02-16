import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import Icons from 'components/custom/icon';
import ExternalLink from 'components/custom/externalLink';
import { Hint, Paragraph, Small } from 'components/custom/typography';
import { useProposal } from '../../providers/ProposalProvider';
import ProposalActionCard from '../../../../components/proposal-action-card';

import { APIProposalState } from 'modules/governance/api';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';
import { useWallet } from 'wallets/wallet';
import Skeleton from 'components/antd/skeleton';

type ProposalDetailsCardState = {
  cancelling: boolean;
};

const InitialState: ProposalDetailsCardState = {
  cancelling: false,
};

const ProposalDetailsCard: React.FunctionComponent = () => {
  const wallet = useWallet();
  const proposalCtx = useProposal();

  const [state, setState] = React.useState<ProposalDetailsCardState>(
    InitialState,
  );

  const canCancel =
    ((proposalCtx.thresholdRate && proposalCtx.thresholdRate < proposalCtx.minThreshold) ||
      proposalCtx.proposal?.proposer === wallet.account) &&
    [APIProposalState.WARMUP, APIProposalState.ACTIVE].includes(
      proposalCtx.proposal?.state as any,
    );

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
        <Paragraph type="p1" semiBold color="primary">
          Details
        </Paragraph>
      }
      noPaddingBody>
      <Grid flow="col" gap={32} justify="space-between" padding={24}>
        <Grid flow="col" gap={32}>
          <Grid flow="row" gap={4}>
            <Small semiBold color="secondary">
              Created by
            </Small>
            <Grid flow="col" gap={8}>
              <Identicon
                address={proposalCtx.proposal?.proposer}
                width={24}
                height={24}
              />
              <ExternalLink
                href={`${getEtherscanAddressUrl(
                  proposalCtx.proposal?.proposer!,
                )}`}>
                <Paragraph type="p1" semiBold color="blue">
                  {shortenAddr(proposalCtx.proposal?.proposer)}
                </Paragraph>
              </ExternalLink>
            </Grid>
          </Grid>
          <Grid flow="row" gap={4}>
            <Hint
              text={`If the creator’s vBOND balance falls below ${proposalCtx.minThreshold}% of the total amount of $BOND staked in the DAO the proposal can be cancelled by anyone.`}>
              <Small semiBold color="secondary">
                Creator threshold
              </Small>
            </Hint>
            <Grid flow="col" gap={8}>
              {proposalCtx.thresholdRate !== undefined && (
                <>
                  <Icons
                    name={
                      proposalCtx.thresholdRate > proposalCtx.minThreshold
                        ? 'check-circle-outlined'
                        : 'close-circle-outlined'
                    }
                  />
                  <Skeleton loading={proposalCtx.proposal === undefined}>
                    <Paragraph type="p1" semiBold color="primary">
                      {proposalCtx.thresholdRate >= proposalCtx.minThreshold ? 'Above 1%' : 'Below 1%'}
                    </Paragraph>
                  </Skeleton>
                </>
              )}
            </Grid>
          </Grid>
          {canCancel && (
            <Button
              type="default"
              loading={state.cancelling}
              onClick={handleProposalCancel}>
              Cancel proposal
            </Button>
          )}
        </Grid>
      </Grid>
      <Card.Delimiter />
      <Grid flow="row" gap={16} padding={24}>
        <Small semiBold color="secondary">
          Description
        </Small>
        <Paragraph type="p1" color="primary" wrap>
          {proposalCtx.proposal?.description}
        </Paragraph>
      </Grid>
      <Card.Delimiter />
      <Grid flow="row" gap={16} padding={24}>
        <Small semiBold color="secondary">
          Actions
        </Small>
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
