import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';

import Modal, { ModalProps } from 'components/antd/modal';
import Tabs from 'components/antd/tabs';
import Table from 'components/antd/table';

import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import { Paragraph } from 'components/custom/typography';
import { useProposal } from '../../providers/ProposalProvider';

import { APIVoterEntity, fetchProposalVoters } from 'modules/governance/api';
import { formatBigValue, shortenAddr } from 'web3/utils';

import s from './styles.module.scss';

const Columns: ColumnsType<APIVoterEntity> = [
  {
    title: 'Address',
    dataIndex: 'address',
    width: '60%',
    render: (address: string) => (
      <Grid gap={8}>
        <Identicon address={address} />
        <Paragraph type="p1" semiBold>{shortenAddr(address)}</Paragraph>
      </Grid>
    ),
  },
  {
    title: 'Votes',
    dataIndex: 'power',
    width: '20%',
    render: (power: BigNumber) => (
      <Paragraph type="p1" semiBold>{formatBigValue(power, 0)}</Paragraph>
    ),
  },
  {
    title: 'Vote type',
    dataIndex: 'support',
    width: '20%',
    render: (support: boolean) => support ? 'FOR' : 'AGAINST',
  },
];

export type ProposalVotersModalProps = ModalProps;

const ProposalVotersModal: React.FunctionComponent<ProposalVotersModalProps> = props => {
  const { ...modalProps } = props;

  const proposalCtx = useProposal();
  const [stateFilter, setStateFilter] = React.useState<string>('all');
  const [voters, setVoters] = React.useState<APIVoterEntity[]>([]);

  React.useEffect(() => {
    if (!modalProps.visible || !proposalCtx.proposal) {
      return;
    }

    fetchProposalVoters(proposalCtx.proposal.proposalId)
      .then((voters: APIVoterEntity[]) => {
        setVoters(voters);
      });
  }, [modalProps.visible, proposalCtx.proposal]);

  function handlePaginationChange(page: number) {
  }

  return (
    <Modal
      className={s.component}
      centered
      width={560}
      {...modalProps}>
      <Tabs
        className={s.tabs}
        defaultActiveKey={stateFilter}
        onChange={setStateFilter}>
        <Tabs.Tab key="all" tab="All Votes" />
        <Tabs.Tab key="for" tab="For" />
        <Tabs.Tab key="against" tab="Against" />
      </Tabs>
      <Table<APIVoterEntity>
        className={s.table}
        title={() => ''}
        columns={Columns}
        dataSource={voters}
        rowKey="address"
        locale={{
          emptyText: 'No votes',
        }}
        pagination={{
          total: voters.length,
          current: 1,
          pageSize: 10,
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

export default ProposalVotersModal;
