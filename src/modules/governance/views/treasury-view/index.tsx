import { FC, useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import { Tabs } from 'components/custom/tabs';

import TreasuryFees from './treasury-fees';
import TreasuryHoldings from './treasury-holdings';

type RouteParams = {
  tab: string;
};

const TreasuryView: FC = () => {
  const {
    params: { tab = 'holdings' },
  } = useRouteMatch<RouteParams>();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState(tab);

  function handleTabChange(tabKey: string) {
    history.push(`/governance/treasury/${tabKey}`);
  }

  useEffect(() => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab]);

  return (
    <div className="container-limit">
      <div className="card mb-32">
        <div className="card-header pv-0">
          <Tabs
            tabs={[
              {
                id: 'holdings',
                children: 'Holdings',
                onClick: () => {
                  handleTabChange('holdings');
                },
              },
              {
                id: 'fees',
                children: 'Fees accrued',
                onClick: () => {
                  handleTabChange('fees');
                },
              },
            ]}
            size="small"
            activeKey={activeTab}
            onClick={setActiveTab}
          />
        </div>
      </div>
      <Switch>
        <Route path="/governance/treasury/holdings" exact component={TreasuryHoldings} />
        <Route path="/governance/treasury/fees" exact component={TreasuryFees} />
      </Switch>
    </div>
  );
};

export default TreasuryView;
