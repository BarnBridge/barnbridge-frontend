import cn from 'classnames';

import Icon from 'components/custom/icon';

import s from './s.module.scss';

type Props = {
  className?: string;
};

export const Pagination: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(s.pagination, className)}>
      <button className={cn(s.page, s.prev)} type="button">
        <Icon name="arrow-backward" width={24} height={24} color="inherit" />
      </button>
      <button className={cn(s.page, s.active)} type="button">
        1
      </button>
      <button className={s.page} type="button">
        2
      </button>
      <button className={s.page} type="button">
        3
      </button>
      <button className={s.page} type="button">
        4
      </button>
      <div className={s.separator}>...</div>
      <button className={s.page} type="button">
        50
      </button>
      <button className={cn(s.page, s.next)} type="button">
        <Icon name="arrow-forward" width={24} height={24} color="inherit" />
      </button>
    </div>
  );
};
