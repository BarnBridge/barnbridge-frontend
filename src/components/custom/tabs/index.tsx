import React, { FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import cn from 'classnames';

import s from './s.module.scss';

type NavTabProps = NavLinkProps | React.HTMLProps<HTMLAnchorElement>;

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
        } as React.CSSProperties
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
  children: React.ReactNode;
  id: string;
  className?: string;
  onClick?: Function;
};

type TabsProps = {
  tabs: TabProps[];
  className?: string;
  active: TabProps['id'];
  onClick: (id: TabProps['id']) => void;
  variation: 'normal' | 'elastic';
  size?: 'normal' | 'small';
  style?: React.CSSProperties;
};

export const Tabs: FC<TabsProps> = props => {
  const totalTabs = props.tabs.length;
  const activeIndex = props.tabs.findIndex(tab => tab.id === props.active);

  return (
    <div
      className={cn(props.className, {
        [s.tabs]: props.variation === 'normal',
        [s.elasticTabs]: props.variation === 'elastic',
      })}
      style={props.style}>
      <div
        className={s.elasticToggle}
        style={{ left: `calc(${activeIndex} * 100% / ${totalTabs} + 4px)`, width: `calc(100% / ${totalTabs} - 8px)` }}
      />
      {props.tabs.map(({ id, className, onClick, ...tabRest }) => (
        <button
          key={id}
          className={cn(s.tab, className, {
            [s.active]: id === props.active,
            [s.small]: props.size === 'small',
          })}
          style={{ width: `calc(100% / ${totalTabs})` }}
          type="button"
          onClick={() => {
            props.onClick(id);
            if (typeof onClick === 'function') {
              onClick();
            }
          }}
          {...tabRest}
        />
      ))}
    </div>
  );
};
