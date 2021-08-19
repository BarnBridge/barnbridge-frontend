import React, { CSSProperties, FC, HTMLProps, ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import cn from 'classnames';

import s from './s.module.scss';

type NavTabProps = NavLinkProps | HTMLProps<HTMLAnchorElement>;

type NavTabsProps = {
  tabs: NavTabProps[];
  className?: string;
  /**
   * @example
   * <Tabs shadows="--theme-card-color" /> in case of string, place background color variable,
   * <Tabs shadows /> `--theme-body-color` will be used in case of `true`
   */
  shadows?: boolean | string;
};

export const NavTabs: FC<NavTabsProps> = ({ className, tabs, shadows = false }) => {
  return (
    <div
      className={cn(s.tabs, className, {
        [s.shadows]: shadows,
      })}
      style={
        {
          '--tabs-bg': `var(${typeof shadows === 'string' ? shadows : '--theme-body-color'})`,
        } as CSSProperties
      }>
      {tabs.map(({ className, children, ...restTab }, idx) => {
        // @ts-ignore
        if (restTab.to) {
          return (
            // @ts-ignore
            <NavLink key={idx} className={cn(s.tab, className)} activeClassName={s.active} {...restTab}>
              {children}
            </NavLink>
          );
        }

        return (
          <a key={idx} className={cn(s.tab, className)} rel="noopener noreferrer" target="_blank" {...restTab}>
            {children}
          </a>
        );
      })}
    </div>
  );
};

export const HorizontalMenu: FC<NavTabsProps> = ({ className, ...rest }) => {
  return <NavTabs {...rest} className={cn(s.horizontalMenu, className)} />;
};

type TabProps<T> = {
  id: T;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (id: T) => void;
};

type TabsProps<T> = {
  variation?: 'normal' | 'elastic';
  tabs: TabProps<T>[];
  activeKey: TabProps<T>['id'];
  size?: 'normal' | 'small';
  className?: string;
  style?: CSSProperties;
  onClick?: (id: TabProps<T>['id']) => void;
};

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const { variation = 'normal', tabs, activeKey, size, className, style } = props;

  const totalTabs = tabs.length;
  const activeIndex = tabs.findIndex(tab => tab.id === activeKey);

  return (
    <div
      className={cn(className, {
        [s.tabs]: variation === 'normal',
        [s.elasticTabs]: variation === 'elastic',
      })}
      style={style}>
      {variation === 'elastic' && (
        <div
          className={s.elasticToggle}
          style={{
            left: `calc(${activeIndex} * 100% / ${totalTabs} + 4px)`,
            width: `calc(100% / ${totalTabs} - 8px)`,
          }}
        />
      )}
      {tabs.map(({ id, className, onClick, ...tabRest }) => (
        <button
          key={id}
          className={cn(s.tab, className, {
            [s.active]: id === activeKey,
            [s.small]: size === 'small',
          })}
          style={{ width: variation === 'elastic' ? `calc(100% / ${totalTabs})` : 'inherit' }}
          type="button"
          onClick={() => {
            props.onClick?.(id);
            onClick?.(id);
          }}
          {...tabRest}
        />
      ))}
    </div>
  );
};

export enum PeriodTabsKey {
  day = '24h',
  week = '1w',
  month = '30d',
}

const periodTabs = [
  {
    id: PeriodTabsKey.day,
    children: '24h',
  },
  {
    id: PeriodTabsKey.week,
    children: '1w',
  },
  {
    id: PeriodTabsKey.month,
    children: '1mo',
  },
];

type PeriodChartTabsProps = Omit<TabsProps<PeriodTabsKey>, 'tabs' | 'variation'>;

export const PeriodChartTabs: React.FC<PeriodChartTabsProps> = props => {
  return <Tabs<PeriodTabsKey> {...props} tabs={periodTabs} variation="elastic" />;
};

export enum PortfolioPeriodTabsKey {
  week = '1w',
  month = '30d',
}

const portfolioPeriodTabs = [
  {
    id: PortfolioPeriodTabsKey.week,
    children: '1w',
  },
  {
    id: PortfolioPeriodTabsKey.month,
    children: '1mo',
  },
];

type PortfolioPeriodChartTabsProps = Omit<TabsProps<PortfolioPeriodTabsKey>, 'tabs' | 'variation'>;

export const PortfolioPeriodChartTabs: React.FC<PortfolioPeriodChartTabsProps> = props => {
  return <Tabs<PortfolioPeriodTabsKey> {...props} tabs={portfolioPeriodTabs} variation="elastic" />;
};
