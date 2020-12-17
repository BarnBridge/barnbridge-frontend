import React from 'react';
import * as Antd from 'antd';
import { TabsProps as AntdTabsProps } from 'antd/lib/tabs';
import { TabPaneProps as AntdTabPaneProps } from 'rc-tabs/lib/TabPanelList/TabPane';
import cx from 'classnames';

import s from './styles.module.scss';

export type TabProps = AntdTabPaneProps;

const Tab: React.FunctionComponent<TabProps> = props => {
  const { className, ...tabProps } = props;

  return (
    <Antd.Tabs.TabPane
      className={cx(s.tab, className)}
      {...tabProps}
    />
  );
};

export type TabsProps = AntdTabsProps;

export type StaticTabsProps = {
  Tab: React.FunctionComponent<TabProps>;
};

const Tabs: React.FunctionComponent<TabsProps> & StaticTabsProps = ((props: TabsProps) => {
  const { className, ...tabsProps } = props;

  return (
    <Antd.Tabs
      className={cx(s.tabs, className)}
      tabBarGutter={32}
      {...tabsProps}
    />
  );
}) as any;

Tabs.Tab = Tab;

export default Tabs;
