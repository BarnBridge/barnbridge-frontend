import React from 'react';
import AntdTable, { TableProps as AntdTableProps } from 'antd/lib/table';
import cn from 'classnames';

import s from './s.module.scss';

const Table = <T extends Record<string, any>>(
  props: React.PropsWithChildren<AntdTableProps<T>>,
): React.ReactElement => {
  const { className, pagination, ...tableProps } = props;

  return (
    <AntdTable<T>
      className={cn(s.component, className)}
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
