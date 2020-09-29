import React from 'react';
import * as Antd from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';

export type TableProps<T> = {
  columns: ColumnsType<T>;
  data: T[];
  rowKey: string;
};

const Table: React.FunctionComponent<any> = props => {
  return (
    <Antd.Table
      columns={props.columns}
      dataSource={props.data}
      rowKey={props.rowKey}
      pagination={false}
    />
  );
};

export default Table;
