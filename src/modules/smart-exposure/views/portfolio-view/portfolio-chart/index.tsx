import { useState } from 'react';
import cn from 'classnames';

import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';

const tabs = [
  {
    id: '24h',
    children: '24h',
  },
  {
    id: '1w',
    children: '1w',
  },
  {
    id: '30d',
    children: '1mo',
  },
];

type Props = {
  className?: string;
};

export const PortfolioChart: React.FC<Props> = ({ className }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <section className={cn('card', className)}>
      <header className="card-header flex align-center" style={{ padding: '16px 16px 16px 24px' }}>
        <Text type="p1" weight="semibold">
          Portfolio value
        </Text>
        <Tabs
          tabs={tabs}
          activeKey={activeTab}
          onClick={setActiveTab}
          className="ml-auto"
          variation="elastic"
          size="small"
        />
      </header>
      <div className="p-24">
        <img src="https://picsum.photos/500/200" alt="chart" style={{ display: 'block', width: '100%' }} />
        <footer className="flex flow-col justify-center col-gap-24 row-gap-16" style={{ marginTop: 16 }}>
          <div className="chart-label" style={{ '--dot-color': 'var(--theme-red-color)' } as React.CSSProperties}>
            Portfolio with strategy
          </div>
          <div className="chart-label" style={{ '--dot-color': 'var(--theme-icon-color)' } as React.CSSProperties}>
            Holding
          </div>
        </footer>
      </div>
    </section>
  );
};
