import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';

import Modal, { ModalProps } from 'components/antd/modal';
import Tabs from 'components/antd/tabs';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import ExternalLink from 'components/custom/externalLink';
import Identicon from 'components/custom/identicon';
import { Label, Paragraph, Small } from 'components/custom/typography';
import ProposalVotersProvider, { useProposalVoters } from '../../providers/ProposalVotersProvider';

import { APIVoteEntity } from 'modules/governance/api';
import { formatBigValue, getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import s from './styles.module.scss';

const Columns: ColumnsType<APIVoteEntity> = [
  {
    title: () => (
      <Small semiBold color="grey300">Address</Small>
    ),
    dataIndex: 'address',
    width: '60%',
    render: (address: string) => (
      <Grid flow="col" gap={8} align="center">
        <Identicon address={address} width={32} height={32} />
        <ExternalLink href={getEtherscanAddressUrl(address)}>
          <Paragraph type="p1" semiBold color="blue500">
            {shortenAddr(address)}
          </Paragraph>
        </ExternalLink>
      </Grid>
    ),
  },
  {
    title: () => (
      <Small semiBold color="grey300">Votes</Small>
    ),
    dataIndex: 'power',
    width: '20%',
    render: (power: BigNumber) => (
      <Paragraph type="p1" semiBold color="grey900" className={s.powerCell}>
        {formatBigValue(power, 0)}
      </Paragraph>
    ),
  },
  {
    title: () => (
      <Small semiBold color="grey300">Vote type</Small>
    ),
    dataIndex: 'support',
    width: '20%',
    render: (support: boolean) => support ? (
      <Label type="lb2" semiBold className={s.forTag}>For</Label>
    ) : (
      <Label type="lb2" semiBold className={s.againstTag}>Against</Label>
    ),
  },
];

export type ProposalVotersModalProps = ModalProps;

const ProposalVotersModalInner: React.FunctionComponent<ProposalVotersModalProps> = props => {
  const { ...modalProps } = props;

  const proposalVotesCtx = useProposalVoters();

  function handleStateChange(stateFilter: string) {
    if (stateFilter === 'for') {
      proposalVotesCtx.changeSupportFilter(true);
    } else if (stateFilter === 'against') {
      proposalVotesCtx.changeSupportFilter(false);
    } else {
      proposalVotesCtx.changeSupportFilter(undefined);
    }
  }

  function handlePaginationChange(page: number) {
    proposalVotesCtx.changePage(page);
  }

  return (
    <Modal
      className={s.component}
      centered
      width={560}
      {...modalProps}>
      <Tabs
        className={s.tabs}
        defaultActiveKey="all"
        onChange={handleStateChange}>
        <Tabs.Tab key="all" tab="All Votes" />
        <Tabs.Tab key="for" tab="For" />
        <Tabs.Tab key="against" tab="Against" />
      </Tabs>
      <Table<APIVoteEntity>
        className={s.table}
        title={() => ''}
        columns={Columns}
        dataSource={proposalVotesCtx.votes}
        rowKey="address"
        loading={proposalVotesCtx.loading}
        locale={{
          emptyText: 'No votes',
        }}
        pagination={{
          total: proposalVotesCtx.total,
          current: proposalVotesCtx.page,
          pageSize: proposalVotesCtx.pageSize,
          position: ['bottomRight'],
          showTotal: (total: number, [from, to]: [number, number]) => (
            <Paragraph type="p2" semiBold color="grey500">
              Showing {from} to {to} out of {total} votes
            </Paragraph>
          ),
          onChange: handlePaginationChange,
        }}
      />
    </Modal>
  );
};

const ProposalVotersModal: React.FunctionComponent<ProposalVotersModalProps> = props => (
  <ProposalVotersProvider>
    <ProposalVotersModalInner {...props} />
  </ProposalVotersProvider>
)
export default ProposalVotersModal;
