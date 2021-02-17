import React from 'react';
import { useHistory } from 'react-router';
import useDebounce from '@rooks/use-debounce';
import * as Antd from 'antd';
import { CardTabListType } from 'antd/lib/card';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Input from 'components/antd/input';
import Popover from 'components/antd/popover';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';
import ProposalsProvider, { useProposals } from 'modules/governance/views/proposals-view/providers/ProposalsProvider';
import { useWallet } from 'wallets/wallet';

import { useDAO } from '../../components/dao-provider';
import ActivationThreshold from '../overview-view/components/activation-threshold';
import ProposalsTable from './components/proposals-table';

import s from './styles.module.scss';

const TABS: CardTabListType[] = [
  {
    key: 'all',
    tab: (
      <Text type="p1" weight="semibold" color="primary">
        All proposals
      </Text>
    ),
  },
  {
    key: 'active',
    tab: (
      <Text type="p1" weight="semibold" color="primary">
        Active
      </Text>
    ),
  },
  {
    key: 'executed',
    tab: (
      <Text type="p1" weight="semibold" color="primary">
        Executed
      </Text>
    ),
  },
  {
    key: 'failed',
    tab: (
      <Text type="p1" weight="semibold" color="primary">
        Failed
      </Text>
    ),
  },
];

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

  const [state, setState] = useMergeState(InitialState);

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

                      <ExternalLink href="https://docs.barnbridge.com/governance/barnbridge-dao/proposals-and-voting">
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

      <Card
        noPaddingBody
        tabList={TABS}
        activeTabKey={proposalsCtx.stateFilter}
        tabBarExtraContent={
          <Input
            className={s.search}
            prefix={<Icons name="search-outlined" />}
            placeholder="Search proposal"
            onChange={ev => handleSearchChange(ev)}
          />
        }
        onTabChange={handleStateChange}>
        <ProposalsTable />
      </Card>
    </Grid>
  );
};

const ProposalsView = () => {
  const history = useHistory();
  const dao = useDAO();

  function handleBackClick() {
    history.push('/governance/overview');
  }

  if (dao.isActive === undefined) {
    return <Antd.Spin />;
  }

  if (!dao.isActive) {
    return (
      <Grid flow="row" gap={24} align="start">
        <Button type="link" icon={<Icons name="left-arrow" />} onClick={handleBackClick}>
          Overview
        </Button>
        <ActivationThreshold className={s.activationThreshold} />
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
