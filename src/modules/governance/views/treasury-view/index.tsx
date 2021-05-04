import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { Tabs } from 'components/custom/tabs';

import TreasuryFees from './treasury-fees';
import TreasuryHoldings from './treasury-holdings';

type TreasuryViewRouteParams = {
  tab: string;
};

const TreasuryView: React.FC = () => {
  const {
    params: { tab = 'holdings' },
  } = useRouteMatch<TreasuryViewRouteParams>();
  const history = useHistory();

  const [activeTab, setActiveTab] = React.useState<string>(tab);

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/governance/treasury/${tabKey}`);
  }

  React.useEffect(() => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab]);

  return (
    <>
      <Tabs
        tabs={[
          {
            id: 'holdings',
            onClick: () => {
              handleTabChange('holdings');
            },
            children: 'Holdings',
          },
          {
            id: 'fees',
            onClick: () => {
              handleTabChange('fees');
            },
            children: 'Fees',
          },
        ]}
        activeKey={activeTab}
        onClick={setActiveTab}
        variation="elastic"
        className="mb-40"
        style={{
          width: 248,
          height: 40,
        }}
      />
      <Switch>
        <Route path="/governance/treasury/holdings" component={TreasuryHoldings} />
        <Route path="/governance/treasury/fees" component={TreasuryFees} />
      </Switch>
    </>
  );
};

export default TreasuryView;
