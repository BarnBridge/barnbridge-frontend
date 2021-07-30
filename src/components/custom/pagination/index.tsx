import { useMemo } from 'react';
import cn from 'classnames';

import { Icon } from 'components/icon';

import s from './s.module.scss';

/**
 * @param {number} current
 * @param {number} last
 * @param {number} [delta=2]
 */
function pagination(current: number, last: number, delta: number = 2) {
  const left = current - delta;
  const right = current + delta + 1;
  const range: number[] = [];
  const rangeWithDots: (number | null)[] = [];
  let l: number;

  if (last < 2) {
    return [1];
  }

  range.push(1);
  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= left && i < right && i < last && i > 1) {
      range.push(i);
    }
  }
  range.push(last);

  range.forEach(i => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push(null);
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
}

type Props = {
  className?: string;
  total: number;
  current: number;
  pageSize: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ className, total, current, pageSize, onChange }) => {
  const pages = Math.ceil(total / pageSize);
  const paginationList = useMemo(() => pagination(current, pages), [current, pages]);

  if (pages < 2) {
    return null;
  }

  return (
    <div className={cn(s.pagination, className)}>
      <button
        className={cn(s.page, s.prev)}
        type="button"
        onClick={() => onChange(current - 1)}
        disabled={current <= 1}>
        <Icon name="chevron" rotate={180} size={24} />
      </button>
      {paginationList.map((page, idx) =>
        page ? (
          <button
            key={idx}
            onClick={() => onChange(page)}
            className={cn(s.page, {
              [s.active]: page === current,
            })}
            type="button"
            disabled={page === current}>
            {page}
          </button>
        ) : (
          <div key={idx} className={s.separator}>
            ...
          </div>
        ),
      )}
      <button
        className={cn(s.page, s.next)}
        type="button"
        onClick={() => onChange(current + 1)}
        disabled={current >= pages}>
        <Icon name="chevron" size={24} />
      </button>
    </div>
  );
};
