import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import s from './s.module.scss';

function isExternal(href: string) {
  let parser = document.createElement('a');
  parser.href = href;
  return window.location.host !== parser.host;
}

type TabProps = React.HTMLProps<HTMLAnchorElement> & {
  href: string;
};

type TabsProps = {
  tabs: TabProps[];
  className?: string;
  shadows?: boolean | string; // in case of string, place background color variable
};

export const Tabs: FC<TabsProps> = ({ className, tabs, shadows = false }) => {
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

type ElasticTabProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
  onClick?: Function;
};

type ElasticTabsProps = {
  tabs: ElasticTabProps[];
  className?: string;
  active: ElasticTabProps['id'];
  onClick: (id: ElasticTabProps['id']) => void;
};

export const ElasticTabs: FC<ElasticTabsProps> = props => {
  return (
    <div className={cn(s.elasticTabs, props.className)}>
      {props.tabs.map(({ id, className, onClick, ...tabRest }) => (
        <button
          key={id}
          className={cn(s.tab, className, {
            [s.active]: id === props.active,
          })}
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
