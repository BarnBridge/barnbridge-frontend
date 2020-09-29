import React from 'react';
import * as Antd from 'antd';

export type TabsProps = {
  tabs: {
    key: string;
    title: string;
    content: React.ReactNode;
  }[];
};

const Tabs: React.FunctionComponent<TabsProps> = props => {
  const { tabs } = props;

  function onChangeHandle(tabKey: string) {
    console.log(tabKey);
  }

  return (
    <Antd.Tabs defaultActiveKey="1" onChange={onChangeHandle}>
      {tabs.map(tab => (
        <Antd.Tabs.TabPane key={tab.key} tab={tab.title}>
          {tab.content}
        </Antd.Tabs.TabPane>
      ))}
    </Antd.Tabs>
  );
};

export default Tabs;
