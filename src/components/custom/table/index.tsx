import classNames from 'classnames';

import { Pagination } from 'components/custom/pagination';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';

import s from './s.module.scss';

export type ColumnType<T> = {
  heading: React.ReactNode;
  render: (item: T) => React.ReactElement;
};

type Props<T> = {
  columns: ColumnType<T>[];
  data: T[];
  loading?: boolean;
  rowKey?: (item: T) => string;
};

export const Table = <T extends Record<string, any>>({ columns, data, loading, rowKey }: Props<T>) => {
  return (
    <div
      className={classNames('table-container', s.tableContainer, {
        [s.loading]: loading,
      })}>
      <table
        className={classNames('table', s.table, {
          [s.loading]: loading,
        })}>
        <thead>
          <tr>
            {columns.map((col, dataIdx) => (
              <th key={dataIdx}>{col.heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, itemIdx) => (
            <tr key={rowKey?.(item) ?? itemIdx}>
              {columns.map(({ render: Render }, dataIdx) => (
                <td key={dataIdx}>
                  <Render {...item} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {loading && (
        <Spinner
          className={s.spinner}
          style={{
            width: 40,
            height: 40,
            position: 'absolute',
            marginTop: -20,
            marginLeft: -20,
          }}
        />
      )}
    </div>
  );
};

type TableFooterType = {
  total: number;
  current: number;
  pageSize: number;
  children?: JSX.Element | (({ total, from, to }: { total: number; from: number; to: number }) => JSX.Element);
  onChange: (page: number) => void;
};

export const TableFooter: React.FC<TableFooterType> = ({ children, total, current, pageSize, onChange }) => {
  return (
    <div className="flex p-24">
      <Text type="p2" weight="semibold" color="secondary">
        {typeof children === 'function'
          ? children({
              total,
              from: total ? (current - 1) * pageSize + 1 : 0,
              to: current * pageSize > total ? total : current * pageSize,
            })
          : children}
      </Text>
      <Pagination className="ml-auto" total={total} current={current} pageSize={pageSize} onChange={onChange} />
    </div>
  );
};
