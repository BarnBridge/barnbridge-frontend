import React from 'react';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';

import Table from 'components/table';

import s from './styles.module.scss';

const Columns: ColumnsType<any> = [
  {
    title: 'PROPOSAL',
    width: '60%',
    render: () => (
      <div>
        <div className={s.proposalLabel}>Amet minim mollit non deserunt ullamco est</div>
        <div className={s.values}>
          <div className={s.proposalTag}>VOTING</div>
          <span className={s.valueLabel}>4 days 20h 01m left</span>
        </div>
      </div>
    ),
  },
  {
    title: 'VOTES',
    width: '40%',
    render: () => (
      <div>
        <div>
          <Antd.Progress className={s.progress} percent={80} format={() => (
            '21,007'
          )} />
        </div>
        <div>
          <Antd.Progress className={s.progress} percent={10} format={() => (
            '2,003'
          )} />
        </div>
      </div>
    ),
  },
];

const Data: any[] = [{ id: 1 }, { id: 2 }, { id: 3 }];

const ProposalsTable: React.FunctionComponent = () => {
  return (
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
  );
};

export default ProposalsTable;
