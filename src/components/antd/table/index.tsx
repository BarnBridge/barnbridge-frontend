import React from 'react';
import AntdTable, { TableProps as AntdTableProps } from 'antd/lib/table';
import cn from 'classnames';

import s from './s.module.scss';

export type TableProps<T> = AntdTableProps<T> & {
  inCard?: boolean;
};

const Table = <T extends Record<string, any>>(props: React.PropsWithChildren<TableProps<T>>): React.ReactElement => {
  const { className, pagination, inCard = false, ...tableProps } = props;

  return (
    <AntdTable<T>
      className={cn(s.component, className, inCard && 'ant-table-in-card')}
      bordered={false}
      showSorterTooltip={false}
      pagination={
        pagination
          ? {
              showSizeChanger: false,
              ...pagination,
            }
          : false
      }
      {...tableProps}
    />
  );
};

export default Table;
