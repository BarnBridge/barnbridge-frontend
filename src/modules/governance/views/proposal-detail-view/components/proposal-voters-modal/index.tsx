import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { formatBigValue, shortenAddr } from 'web3/utils';

import Modal, { ModalProps } from 'components/antd/modal';
import Table from 'components/antd/table';
import Tabs from 'components/antd/tabs';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
import { useWeb3 } from 'components/providers/web3Provider';
import { APIVoteEntity } from 'modules/governance/api';

import ProposalVotersProvider, { useProposalVoters } from '../../providers/ProposalVotersProvider';

import s from './s.module.scss';

const Columns: ColumnsType<APIVoteEntity> = [
  {
    title: 'Address',
    dataIndex: 'address',
    width: '35%',
    render: function Render(address: string) {
      const { getEtherscanAddressUrl } = useWeb3();

      return (
        <Grid flow="col" gap={8} align="center">
          <Identicon address={address} width={32} height={32} />
          <ExternalLink href={getEtherscanAddressUrl(address)}>
            <Text type="p1" weight="semibold" color="blue">
              {shortenAddr(address)}
            </Text>
          </ExternalLink>
        </Grid>
      );
    },
  },
  {
    title: 'Votes',
    dataIndex: 'power',
    width: '38%',
    align: 'right',
    render: (power: BigNumber) => (
      <Text type="p1" weight="semibold" color="primary" className={s.powerCell}>
        {formatBigValue(power, 2, '-', 2)}
      </Text>
    ),
  },
  {
    title: 'Vote type',
    dataIndex: 'support',
    width: '27%',
    render: (support: boolean) =>
      support ? (
        <Text type="lb2" weight="semibold" className={s.forTag}>
          For
        </Text>
      ) : (
        <Text type="lb2" weight="semibold" className={s.againstTag}>
          Against
        </Text>
      ),
  },
];

export type ProposalVotersModalProps = ModalProps;

const ProposalVotersModalInner: React.FC<ProposalVotersModalProps> = props => {
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
    <Modal className={s.component} width={620} {...modalProps}>
      <Tabs className={s.tabs} defaultActiveKey="all" onChange={handleStateChange}>
        <Tabs.Tab key="all" tab="All Votes" />
        <Tabs.Tab key="for" tab="For" />
        <Tabs.Tab key="against" tab="Against" />
      </Tabs>
      <Table<APIVoteEntity>
        className={s.table}
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
            <Text type="p2" weight="semibold" color="secondary">
              Showing {from} to {to} out of {total} votes
            </Text>
          ),
          onChange: handlePaginationChange,
        }}
      />
    </Modal>
  );
};

const ProposalVotersModal: React.FC<ProposalVotersModalProps> = props => (
  <ProposalVotersProvider>
    <ProposalVotersModalInner {...props} />
  </ProposalVotersProvider>
);
export default ProposalVotersModal;
