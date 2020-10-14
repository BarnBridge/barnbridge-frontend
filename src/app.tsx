import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import Web3Provider from 'web3/provider';
import Web3ContractsProvider from 'web3/contracts';
import TheGraphProvider from 'context/TheGraph';

import LayoutView from 'views/layout';

const App: React.FunctionComponent = () => {
  if (isMobile) {
    return (
      <div className="mobile-not-available-wrap">
        <p>BarnBridge</p>
        <p>Yield Farming</p>
        <p>is currently not available</p>
        <p>on mobile and tablet</p>
      </div>
    );
  }

  return (
    <Web3Provider>
      <Web3ContractsProvider>
        <TheGraphProvider>
          <Router>
            <LayoutView />
          </Router>
        </TheGraphProvider>
      </Web3ContractsProvider>
    </Web3Provider>
  );
};

export default App;
