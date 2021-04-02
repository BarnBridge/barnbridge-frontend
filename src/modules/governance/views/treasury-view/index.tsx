import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

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
      <div className="flex flow-col col-gap-16">
        <button
          className="button-primary"
          onClick={() => {
            handleTabChange('holdings');
          }}>
          Holdings
        </button>
        <button
          className="button-primary"
          onClick={() => {
            handleTabChange('fees');
          }}>
          Fees
        </button>
      </div>

      <Switch>
        <Route path="/governance/treasury/holdings" component={TreasuryHoldings} />
        <Route path="/governance/treasury/fees" component={TreasuryFees} />
      </Switch>
    </>
  );
};

export default TreasuryView;
