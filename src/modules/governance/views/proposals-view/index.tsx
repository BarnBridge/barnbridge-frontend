import React from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import AntdSpin from 'antd/lib/spin';

import Button from 'components/antd/button';
import Input from 'components/antd/input';
import Popover from 'components/antd/popover';
import Tabs from 'components/antd/tabs';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
import ProposalsProvider, { useProposals } from 'modules/governance/views/proposals-view/providers/ProposalsProvider';
import { useWallet } from 'wallets/walletProvider';

import { useDAO } from '../../components/dao-provider';
import ActivationThreshold from '../overview-view/components/activation-threshold';
import ProposalsTable from './components/proposals-table';

import s from './s.module.scss';

type ProposalsViewState = {
  hasActiveProposal?: boolean;
  showWhyReason: boolean;
};

const InitialState: ProposalsViewState = {
  hasActiveProposal: undefined,
  showWhyReason: false,
};

const ProposalsViewInner: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const daoCtx = useDAO();
  const proposalsCtx = useProposals();

  const [state, setState] = useMergeState<ProposalsViewState>(InitialState);

  function handleStateChange(stateFilter: string) {
    proposalsCtx.changeStateFilter(stateFilter);
  }

  const handleSearchChange = useDebounce((ev: React.ChangeEvent<HTMLInputElement>) => {
    proposalsCtx.changeSearchFilter(ev.target.value);
  }, 400);

  React.useEffect(() => {
    daoCtx.actions.hasActiveProposal().then(hasActiveProposal => {
      setState({ hasActiveProposal });
    });
  }, [wallet.account]);

  const hasCreateRestrictions = state.hasActiveProposal !== undefined && daoCtx.actions.hasThreshold() !== undefined;
  const canCreateProposal = state.hasActiveProposal === false && daoCtx.actions.hasThreshold() === true;

  return (
    <Grid flow="row" gap={32}>
      <Grid flow="col" align="center" justify="space-between">
        <Text type="h1" weight="bold" color="primary">
          Proposals
        </Text>
        {wallet.isActive && (
          <Grid flow="row" gap={8} align="end" justify="end">
            <Button type="primary" disabled={!canCreateProposal} onClick={() => history.push('proposals/create')}>
              Create proposal
            </Button>

            {hasCreateRestrictions && !canCreateProposal && (
              <Grid flow="col" gap={8} align="center">
                <Text type="small" weight="semibold" color="secondary">
                  You are not able to create a proposal.
                </Text>
                <Popover
                  title="Why you can’t create a proposal"
                  placement="bottomLeft"
                  overlayStyle={{ width: 520 }}
                  content={
                    <Grid flow="row" gap={8}>
                      <Text type="p2" weight="semibold">
                        There are 2 possible reasons for why you can’t create a proposal:
                      </Text>

                      <ul>
                        <li>
                          <Text type="p2" weight="semibold">
                            You already are the creator of an ongoing proposal
                          </Text>
                        </li>
                        <li>
                          <Text type="p2" weight="semibold">
                            You don’t have enough voting power to create a proposal. The creator of a proposal needs to
                            have a voting power of at least {daoCtx.minThreshold}% of the amount of $BOND staked in the
                            DAO.
                          </Text>
                        </li>
                      </ul>

                      <ExternalLink href="https://integrations.barnbridge.com/specs/dao-specifications#proposals-and-voting">
                        Learn more
                      </ExternalLink>
                    </Grid>
                  }
                  visible={state.showWhyReason}
                  onVisibleChange={visible => setState({ showWhyReason: visible })}>
                  <Button type="link">See why</Button>
                </Popover>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>

      <div className="card">
        <div className="card-header flex justify-space-between" style={{ padding: 0 }}>
          <Tabs className={s.tabs} simple activeKey={proposalsCtx.stateFilter} onChange={handleStateChange}>
            <Tabs.Tab key="all" tab="All proposals" />
            <Tabs.Tab key="active" tab="Active" />
            <Tabs.Tab key="executed" tab="Executed" />
            <Tabs.Tab key="failed" tab="Failed" />
          </Tabs>
          <Input
            className={s.search}
            prefix={<Icon name="search-outlined" width={16} height={16} />}
            placeholder="Search proposal"
            onChange={ev => handleSearchChange(ev)}
          />
        </div>
        <ProposalsTable />
      </div>
    </Grid>
  );
};

const ProposalsView: React.FC = () => {
  const history = useHistory();
  const daoCtx = useDAO();

  function handleBackClick() {
    history.push('/governance/overview');
  }

  if (daoCtx.isActive === undefined) {
    return <AntdSpin />;
  }

  if (!daoCtx.isActive) {
    return (
      <Grid flow="row" gap={24} align="start">
        <button type="button" onClick={handleBackClick} className="button-text">
          <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
          Overview
        </button>
        <ActivationThreshold className="full-width" />
      </Grid>
    );
  }

  return (
    <ProposalsProvider>
      <ProposalsViewInner />
    </ProposalsProvider>
  );
};

export default ProposalsView;
