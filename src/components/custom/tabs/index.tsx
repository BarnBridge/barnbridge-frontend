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

type TabProps = {
  id: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: Function;
};

type TabsProps = {
  variation?: 'normal' | 'elastic';
  tabs: TabProps[];
  activeKey: TabProps['id'];
  size?: 'normal' | 'small';
  className?: string;
  style?: CSSProperties;
  onClick?: (id: TabProps['id']) => void;
};

export const Tabs: FC<TabsProps> = props => {
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
          style={{ left: `calc(${activeIndex} * 100% / ${totalTabs} + 4px)`, width: `calc(100% / ${totalTabs} - 8px)` }}
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
            onClick?.();
          }}
          {...tabRest}
        />
      ))}
    </div>
  );
};
