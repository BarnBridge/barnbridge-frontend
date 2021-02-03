import React from 'react';
import { useHistory } from 'react-router';
import { CardTabListType } from 'antd/lib/card';
import * as Antd from 'antd';
import useDebounce from "@rooks/use-debounce";

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Input from 'components/antd/input';
import Popover from 'components/antd/popover';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Heading, Paragraph, Small } from 'components/custom/typography';
import ProposalsProvider, {
  useProposals,
} from 'modules/governance/views/proposals-view/providers/ProposalsProvider';
import ProposalsTable from './components/proposals-table';
import { useDAO } from '../../components/dao-provider';
import ActivationThreshold from '../overview-view/components/activation-threshold';

import useMergeState from 'hooks/useMergeState';
import { useWallet } from 'wallets/wallet';

import s from './styles.module.scss';

const TABS: CardTabListType[] = [
  {
    key: 'all',
    tab: (
      <Paragraph type="p1" semiBold color="grey900">
        All proposals
      </Paragraph>
    ),
  },
  {
    key: 'active',
    tab: (
      <Paragraph type="p1" semiBold color="grey900">
        Active
      </Paragraph>
    ),
  },
  {
    key: 'executed',
    tab: (
      <Paragraph type="p1" semiBold color="grey900">
        Executed
      </Paragraph>
    ),
  },
  {
    key: 'failed',
    tab: (
      <Paragraph type="p1" semiBold color="grey900">
        Failed
      </Paragraph>
    ),
  },
];

type ProposalsViewState = {
  showWhyReason: boolean;
  hasActiveProposal?: boolean;
};

const InitialState: ProposalsViewState = {
  showWhyReason: false,
  hasActiveProposal: undefined,
};

const ProposalsViewInner: React.FunctionComponent = () => {
  const history = useHistory();
  const wallet = useWallet();
  const daoCtx = useDAO();
  const proposalsCtx = useProposals();

  const [state, setState] = useMergeState(InitialState);

  function handleStateChange(stateFilter: string) {
    proposalsCtx.changeStateFilter(stateFilter);
  }

  const handleSearchChange = useDebounce(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      proposalsCtx.changeSearchFilter(ev.target.value);
    },
    400,
  );

  React.useEffect(() => {
    daoCtx.actions.hasActiveProposal()
      .then(hasActiveProposal => {
        setState({ hasActiveProposal });
      });
  }, [wallet.account]);

  const hasRestrictions = state.hasActiveProposal !== undefined && daoCtx.thresholdRate !== undefined;
  const hasThreshold = daoCtx.thresholdRate && daoCtx.thresholdRate >= daoCtx.minThreshold;
  const canCreateProposal = state.hasActiveProposal === false && hasThreshold;

  return (
    <Grid flow="row" gap={32}>
      <Grid flow="col" align="center" justify="space-between">
        <Heading type="h1" bold color="grey900">
          Proposals
        </Heading>
        {wallet.isActive && (
          <Grid flow="row" gap={8} align="end" justify="end">
            <Button
              type="primary"
              disabled={!canCreateProposal}
              onClick={() => history.push('proposals/create')}>
              Create proposal
            </Button>

            {hasRestrictions && !canCreateProposal && (
              <Grid flow="col" gap={8} align="center">
                <Small semiBold color="grey500">
                  You are not able to create a proposal.
                </Small>
                <Popover
                  title="Why you can’t create a proposal"
                  placement="bottomLeft"
                  overlayStyle={{ width: 520 }}
                  content={
                    <Grid flow="row" gap={8}>
                      <Paragraph type="p2" semiBold>
                        There are 2 possible reasons for why you can’t create a
                        proposal:
                      </Paragraph>

                      <ul>
                        <li>
                          <Paragraph type="p2" semiBold>
                            You already are the creator of an ongoing proposal
                          </Paragraph>
                        </li>
                        <li>
                          <Paragraph type="p2" semiBold>
                            You don’t have enough balance to create a proposal.
                            The creator of a proposal needs to have at least {daoCtx.minThreshold}%
                            of the amount of $BOND staked in the DAO in order to
                            create a proposal.
                          </Paragraph>
                        </li>
                      </ul>
                    </Grid>
                  }
                  visible={state.showWhyReason}
                  onVisibleChange={visible =>
                    setState({ showWhyReason: visible })
                  }>
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
        <Button
          type="link"
          icon={<Icons name="left-arrow" />}
          onClick={handleBackClick}>
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
