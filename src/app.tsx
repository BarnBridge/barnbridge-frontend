import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Web3WalletProvider from 'wallets/wallet';
import Web3ContractsProvider from 'web3/contracts';

import ThemeProvider from 'components/theme-provider';

import LayoutView from 'views/layout';

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider>
      <Web3WalletProvider>
        <Web3ContractsProvider>
          <Router>
            <LayoutView />
          </Router>
        </Web3ContractsProvider>
      </Web3WalletProvider>
    </ThemeProvider>
  );
};

export default App;
