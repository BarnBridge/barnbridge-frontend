import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';

import Popover from 'components/antd/popover';
import { Button, ExternalLink, Link } from 'components/button';
import Grid from 'components/custom/grid';
import { PageSpinner } from 'components/custom/spinner';
import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { Input } from 'components/input';
import { ProjectToken } from 'components/providers/tokensProvider';
import useMergeState from 'hooks/useMergeState';
import { useWallet } from 'wallets/walletProvider';

import { useDAO } from '../../components/dao-provider';
import ActivationThreshold from '../overview-view/components/activation-threshold';
import ProposalsTable from './components/proposals-table';

import s from './s.module.scss';

type ProposalsViewState = {
  hasActiveProposal?: boolean;
  showWhyReason: boolean;
  stateFilter: string;
  searchFilter?: string;
};

const InitialState: ProposalsViewState = {
  hasActiveProposal: undefined,
  showWhyReason: false,
  stateFilter: '',
  searchFilter: undefined,
};

const ProposalsViewInner: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const daoCtx = useDAO();
  // const proposalsCtx = useProposals();

  const [state, setState] = useMergeState<ProposalsViewState>(InitialState);

  function handleStateChange(stateFilter: string) {
    setState({ stateFilter });
  }

  // function handleStateChange(stateFilter: string) {
  //   proposalsCtx.changeStateFilter(stateFilter);
  // }

  const handleSearchChange = useDebounce((ev: React.ChangeEvent<HTMLInputElement>) => {
    // proposalsCtx.changeSearchFilter(ev.target.value);
    setState({ searchFilter: ev.target.value });
  }, 400);

  useEffect(() => {
    daoCtx.actions.hasActiveProposal().then(hasActiveProposal => {
      setState({ hasActiveProposal });
    });
  }, [wallet.account]);

  const hasCreateRestrictions = state.hasActiveProposal !== undefined && daoCtx.actions.hasThreshold() !== undefined;
  const canCreateProposal = state.hasActiveProposal === false && daoCtx.actions.hasThreshold() === true;

  return (
    <>
      <Grid flow="col" align="center" justify="space-between" className="mb-32">
        <Text type="h1" weight="bold" color="primary">
          Proposals
        </Text>
        {wallet.isActive && (
          <Grid flow="row" gap={8} align="end" justify="end">
            <Button
              type="button"
              variation="primary"
              disabled={!canCreateProposal}
              onClick={() => history.push('proposals/create')}>
              Create proposal
            </Button>

            {hasCreateRestrictions && !canCreateProposal && (
              <Grid flow="col" gap={8} align="center">
                <Text type="caption" weight="semibold" color="secondary">
                  You are not able to create a proposal.
                </Text>
                <Popover
                  title="Why you can’t create a proposal"
                  placement="bottomLeft"
                  overlayStyle={{ width: 520 }}
                  content={
                    <Grid flow="row" gap={8}>
                      <Text type="body2" weight="semibold">
                        There are 2 possible reasons for why you can’t create a proposal:
                      </Text>

                      <ul>
                        <li>
                          <Text type="body2" weight="semibold">
                            You already are the creator of an ongoing proposal
                          </Text>
                        </li>
                        <li>
                          <Text type="body2" weight="semibold">
                            You don’t have enough voting power to create a proposal. The creator of a proposal needs to
                            have a voting power of at least {daoCtx.minThreshold}% of the amount of $
                            {ProjectToken.symbol} staked in the DAO.
                          </Text>
                        </li>
                      </ul>

                      <ExternalLink variation="link" href="">
                        Learn more
                      </ExternalLink>
                    </Grid>
                  }
                  visible={state.showWhyReason}
                  onVisibleChange={visible => setState({ showWhyReason: visible })}>
                  <Button type="button" variation="text">
                    See why
                  </Button>
                </Popover>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>

      <div className="card">
        <div className="card-header flex justify-space-between">
          <Tabs
            tabs={[
              {
                id: '',
                children: 'All proposals',
              },
              {
                id: 'active',
                children: 'Active',
              },
              {
                id: 'executed',
                children: 'Executed',
              },
              {
                id: 'failed',
                children: 'Failed',
              },
            ]}
            activeKey={state.stateFilter}
            onClick={handleStateChange}
          />
          <Input
            type="search"
            className={s.search}
            placeholder="Search proposal"
            onChange={ev => handleSearchChange(ev)}
          />
        </div>
        <ProposalsTable stateFilter={state.stateFilter} searchFilter={state.searchFilter} />
      </div>
    </>
  );
};

const ProposalsView: React.FC = () => {
  const daoCtx = useDAO();

  if (daoCtx.isActive === undefined) {
    return <PageSpinner />;
  }

  if (!daoCtx.isActive) {
    return (
      <div>
        <Link
          to="/governance/overview"
          variation="text-alt"
          className="mb-24"
          icon="arrow"
          iconPosition="left"
          iconRotate={180}>
          Overview
        </Link>
        <ActivationThreshold className="full-width" />
      </div>
    );
  }

  return <ProposalsViewInner />;
};

export default ProposalsView;
