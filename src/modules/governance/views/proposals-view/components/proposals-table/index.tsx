import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';

import Grid from 'components/custom/grid';
import { Progress } from 'components/custom/progress';
import { ColumnType, Table, TableFooter } from 'components/custom/table';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import useMergeState from 'hooks/useMergeState';
import { APILiteProposalEntity, useDaoAPI } from 'modules/governance/api';

import ProposalStatusTag from '../proposal-status-tag';

import { getFormattedDuration } from 'utils';

export type LiteProposalEntity = APILiteProposalEntity & {
  stateTimeLeftTs: number;
};

const columns: ColumnType<LiteProposalEntity>[] = [
  {
    heading: 'Proposal',
    render: data => (
      <Grid flow="row" gap={8}>
        <Link to={`proposals/${data.proposalId}`}>
          <Text type="body1" weight="semibold" color="primary">
            PID-{data.proposalId}: {data.title}
          </Text>
        </Link>
        <Grid flow="col" gap={16} align="center">
          <ProposalStatusTag state={data.state} />
          <UseLeftTime end={data.stateTimeLeftTs} delay={1_000}>
            {leftTime => (
              <Text type="body2" weight="semibold" color="secondary">
                {leftTime > 0 ? getFormattedDuration(0, data.stateTimeLeftTs) : ''}
              </Text>
            )}
          </UseLeftTime>
        </Grid>
      </Grid>
    ),
  },
  {
    heading: 'Votes',
    render: data => {
      const total = data.forVotes.plus(data.againstVotes);

      let forRate = BigNumber.ZERO;
      let againstRate = BigNumber.ZERO;

      if (total.gt(0)) {
        forRate = data.forVotes.multipliedBy(100).div(total);
        againstRate = data.againstVotes.multipliedBy(100).div(total);
      }

      return (
        <div
          style={{
            display: 'grid',
            gap: '8px',
          }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 196px) 65px',
              gap: '24px',
              alignItems: 'center',
            }}>
            <Progress value={forRate.toNumber()} color="green" />
            <Text type="body2" weight="semibold" color="secondary" align="right">
              {forRate.toFormat(2)}%
            </Text>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 196px) 65px',
              gap: '24px',
              alignItems: 'center',
            }}>
            <Progress value={againstRate.toNumber()} color="red" />
            <Text type="body2" weight="semibold" color="secondary" align="right">
              {againstRate.toFormat(2)}%
            </Text>
          </div>
        </div>
      );
    },
  },
];

export type ProposalsProviderState = {
  proposals: LiteProposalEntity[];
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  stateFilter?: string;
  searchFilter?: string;
};

const InitialState: ProposalsProviderState = {
  proposals: [],
  total: 0,
  page: 1,
  pageSize: 10,
  loading: false,
  stateFilter: undefined,
  searchFilter: undefined,
};

type Props = {
  stateFilter?: string;
  searchFilter?: string;
};

const ProposalsTable: React.FC<Props> = ({ stateFilter, searchFilter }) => {
  const daoAPI = useDaoAPI();
  const [state, setState] = useMergeState<ProposalsProviderState>(InitialState);

  function handlePaginationChange(page: number) {
    setState({ page });
  }

  useEffect(() => {
    setState({
      loading: true,
    });

    daoAPI
      .fetchProposals(state.page, state.pageSize, stateFilter, searchFilter)
      .then(data => {
        setState({
          loading: false,
          proposals: data.data.map(item => ({
            ...item,
            stateTimeLeftTs: Date.now() + (item.stateTimeLeft ?? 0) * 1_000,
          })),
          total: data.meta.count,
        });
      })
      .catch(() => {
        setState({
          loading: false,
          proposals: [],
        });
      });
  }, [state.page, stateFilter, searchFilter]);

  return (
    <>
      <Table<LiteProposalEntity> columns={columns} data={state.proposals} loading={state.loading} />
      <TableFooter
        total={state.total}
        current={state.page}
        pageSize={state.pageSize}
        onChange={handlePaginationChange}
        text={({ total, from, to }) => (
          <>
            Showing {from} to {to} out of {total} transactions
          </>
        )}
      />
    </>
  );
};

export default ProposalsTable;
