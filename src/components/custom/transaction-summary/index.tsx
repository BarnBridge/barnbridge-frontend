import classNames from 'classnames';

import { Text } from 'components/custom/typography';

import s from './s.module.scss';

type PropsType = {
  items: [React.ReactNode, React.ReactNode][];
  heading?: string;
  className?: string;
};

export const TransactionSummary: React.FC<PropsType> = ({ items, heading, className }) => {
  return (
    <section className={classNames(s.section, className)}>
      <header className={s.header}>
        {heading ? (
          heading
        ) : (
          <Text type="p2" weight="semibold" color="secondary">
            Transaction summary
          </Text>
        )}
      </header>
      <div className="ph-24 pv-16">
        {items.map(([left, right], idx) => (
          <div key={idx} className={s.item}>
            <div>{left}</div>
            <div className="ml-auto">{right}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
