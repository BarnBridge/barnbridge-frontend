import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import s from './s.module.scss';

function isExternal(href: string) {
  let parser = document.createElement('a');
  parser.href = href;
  return window.location.host !== parser.host;
}

type NavTabProps = React.HTMLProps<HTMLAnchorElement> & {
  href: string;
};

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
      {tabs.map(({ href, className, children, ...restTab }, idx) => {
        if (isExternal(href)) {
          return (
            <a
              key={idx}
              href={href}
              className={cn(s.tab, className)}
              rel="noopener noreferrer"
              target="_blank"
              {...restTab}>
              {children}
            </a>
          );
        }

        return (
          // @ts-ignore
          <NavLink key={idx} to={href} className={cn(s.tab, className)} exact activeClassName={s.active} {...restTab}>
            {children}
          </NavLink>
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
  return (
    <div
      className={cn(props.className, {
        [s.tabs]: props.variation === 'normal',
        [s.elasticTabs]: props.variation === 'elastic',
      })}
      style={props.style}>
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
