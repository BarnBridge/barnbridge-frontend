import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';

import Modal, { ModalProps } from 'components/antd/modal';

import Tabs from 'components/antd/tabs';
import Table from 'components/antd/table';

import s from './styles.module.scss';

export type ProposalVotersModalProps = ModalProps & {};

const Columns: ColumnsType<any> = [
  {
    title: 'Address',
    dataIndex: 'address',
    width: '60%',
  },
  {
    title: 'Votes',
    dataIndex: 'votes',
    width: '20%',
  },
  {
    title: 'Vote type',
    dataIndex: 'type',
    width: '20%',
  },
];

const Data: any[] = [{
  id: 1,
  address: '0xeF1a...5F46',
  votes: 492,
  type: 'For',
}, {
  id: 1,
  address: '0xE60d...2093',
  votes: 798,
  type: 'Against',
}];

const ProposalVotersModal: React.FunctionComponent<ProposalVotersModalProps> = props => {
  const [activeTab, setActiveTab] = React.useState<string>('all-proposals');

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
            rowKey="id"
            dataSource={Data}
            title={() => ''}
            pagination={{
              position: ['bottomRight'],
              pageSize: 10,
              total: 20,
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
