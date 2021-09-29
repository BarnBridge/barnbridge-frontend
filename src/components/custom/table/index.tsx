import classNames from 'classnames';

import { Pagination } from 'components/custom/pagination';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';

import s from './s.module.scss';

export type ColumnType<T> = {
  heading: React.ReactNode;
  render: (item: T) => React.ReactElement;
  align?: 'center' | 'right';
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
            {columns.map(({ heading, align }, dataIdx) => (
              <th key={dataIdx} className={align ? `text-${align}` : undefined}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, itemIdx) => (
            <tr key={rowKey?.(item) ?? itemIdx}>
              {columns.map(({ render: Render, align }, dataIdx) => (
                <td key={dataIdx} className={align ? `text-${align}` : undefined}>
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
  text?: boolean | (({ total, from, to }) => React.ReactNode);
};

export const TableFooter: React.FC<TableFooterType> = ({ children, text, total, current, pageSize, onChange }) => {
  const generatedText = generateText({ text, total, current, pageSize });
  return (
    <div className={classNames(s.tableFooter, 'p-24')}>
      {generatedText ? (
        <Text type="p2" weight="semibold" color="secondary">
          {generatedText}
        </Text>
      ) : null}
      <Pagination total={total} current={current} pageSize={pageSize} onChange={onChange} />
    </div>
  );
};

function generateText({ text, total, current, pageSize }) {
  let generatedText: React.ReactNode;
  if (text) {
    const from = total ? (current - 1) * pageSize + 1 : 0;
    const to = current * pageSize > total ? total : current * pageSize;

    if (typeof text === 'function') {
      generatedText = text({
        total,
        from,
        to,
      });
    }

    if (text === true) {
      generatedText = (
        <>
          Showing {from} to {to} out of {total} entries
        </>
      );
    }
  }

  return generatedText;
}
