import { Pagination } from 'components/custom/pagination';
import { Text } from 'components/custom/typography';

export type ColumnType<T> = {
  heading: React.ReactNode;
  render: (item: T) => React.ReactNode;
};

type Props<T> = {
  columns: ColumnType<T>[];
  data: T[];
};

export const Table = <T extends Record<string, any>>({ columns, data }: Props<T>) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((col, dataIdx) => (
              <th key={dataIdx}>{col.heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, itemIdx) => (
            <tr key={itemIdx}>
              {columns.map((col, dataIdx) => (
                <td key={dataIdx}>{col.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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
              from: (current - 1) * pageSize + 1,
              to: current * pageSize > total ? total : current * pageSize,
            })
          : children}
      </Text>
      <Pagination className="ml-auto" total={total} current={current} pageSize={pageSize} onChange={onChange} />
    </div>
  );
};
