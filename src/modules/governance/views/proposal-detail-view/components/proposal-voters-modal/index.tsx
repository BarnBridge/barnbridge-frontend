import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';

import Modal, { ModalProps } from 'components/antd/modal';
import Tabs from 'components/antd/tabs';
import Table from 'components/antd/table';

import { formatBigValue, getHumanValue, shortenAddr } from 'web3/utils';
import { ProposalData } from 'web3/contracts/daoGovernance';

import s from './styles.module.scss';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import { Paragraph } from 'components/custom/typography';

export type ProposalVotersModalProps = ModalProps & {
  proposal?: ProposalData;
};

const Columns: ColumnsType<any> = [
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

export type ProposalVoterData = {
  address: string;
  support: boolean;
  blockTimestamp: number;
  power: BigNumber;
};

function fetchProposalVoters(proposalId: number): Promise<ProposalVoterData[]> {
  return fetch(`https://bbtest.kwix.xyz/api/governance/proposals/${proposalId}/votes`)
    .then(result => result.json())
    .then(result => result.data.map((item: ProposalVoterData) => ({
      ...item,
      blockTimestamp: item.blockTimestamp * 1000,
      power: getHumanValue(new BigNumber(item.power), 18),
    })));
}

const ProposalVotersModal: React.FunctionComponent<ProposalVotersModalProps> = props => {
  const { proposal } = props;

  const [activeTab, setActiveTab] = React.useState<string>('all-proposals');
  const [voters, setVoters] = React.useState<ProposalVoterData[]>([]);

  React.useEffect(() => {
    if (!proposal?.proposal_id) {
      return;
    }

    fetchProposalVoters(proposal.proposal_id)
      .then((voters: ProposalVoterData[]) => {
        setVoters(voters);
      });
  }, [proposal?.proposal_id]);

  return (
    <Modal className={s.component} centered width={560} {...props}>
      <Tabs
        className={s.tabs}
        defaultActiveKey={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.Tab key="all-votes" tab="All Votes">
          <Table
            className={s.table}
            columns={Columns}
            rowKey="address"
            dataSource={voters}
            title={() => ''}
            pagination={{
              position: ['bottomRight'],
              pageSize: 10,
              total: voters.length,
              showTotal: (total: number, range: [number, number]) => (
                `Showing ${range[0]} to ${range[1]} out of ${total} proposals`
              ),
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab key="for" tab="For">
        </Tabs.Tab>
        <Tabs.Tab key="against" tab="Against">
        </Tabs.Tab>
      </Tabs>
    </Modal>
  );
};

export default ProposalVotersModal;
