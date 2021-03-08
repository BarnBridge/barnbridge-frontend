import React from 'react';
import AntdTabs, { TabPaneProps as AntdTabPaneProps, TabsProps as AntdTabsProps } from 'antd/lib/tabs';
import cn from 'classnames';

import s from './s.module.scss';

export type TabProps = AntdTabPaneProps;

const Tab: React.FC<TabProps> = props => {
  const { className, ...tabProps } = props;

  return <AntdTabs.TabPane className={cn(s.tab, className)} {...tabProps} />;
};

export type TabsProps = AntdTabsProps & {
  simple?: boolean;
};

export type StaticTabsProps = {
  Tab: React.FC<TabProps>;
};

const Tabs: React.FC<TabsProps> & StaticTabsProps = ((props: TabsProps) => {
  const { className, simple = false, ...tabsProps } = props;

  return <AntdTabs className={cn(s.tabs, className, simple && s.simple)} tabBarGutter={32} {...tabsProps} />;
}) as any;

Tabs.Tab = Tab;

export default Tabs;
