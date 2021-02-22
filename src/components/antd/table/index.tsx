import React from 'react';
import * as Antd from 'antd';
import { TableProps as AntdTableProps } from 'antd/lib/table';
import cx from 'classnames';

import s from './styles.module.scss';

export type TableProps<T> = AntdTableProps<T>;

const Table = <T extends {}>(props: React.PropsWithChildren<TableProps<T>>) => {
  const { className, pagination, ...tableProps } = props;

  return (
    <Antd.Table<T>
      className={cx(s.component, className)}
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
