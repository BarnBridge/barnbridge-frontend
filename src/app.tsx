import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Web3Provider, { useWeb3 } from 'context/Web3Provider';

import ConnectView from 'views/connect';
import LayoutView from 'views/layout';

function Routes() {
  const { isActive } = useWeb3();

  return (
    <Router>
      <Switch>
        <Route path="/" render={(props: any) => (
          !isActive
            ? <ConnectView {...props} />
            : <LayoutView {...props} />
        )} />
      </Switch>
    </Router>
  );
}

const App: React.FunctionComponent<{}> = props => {
  return (
    <Web3Provider>
      <Routes />
    </Web3Provider>
  );
};

export default App;
