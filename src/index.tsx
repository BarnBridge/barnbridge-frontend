import 'styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Web3ContractsProvider from 'web3/contracts';

import EthWeb3Provider from 'components/providers/eth-web3-provider';
import ThemeProvider from 'components/providers/theme-provider';
import WindowStateProvider from 'components/providers/window-state';
import LayoutView from 'layout';
import Web3WalletProvider from 'wallets/wallet';

import * as sw from './serviceWorker';

const App: React.FC = () => {
  return (
    <WindowStateProvider>
      <ThemeProvider>
        <EthWeb3Provider>
          <Web3WalletProvider>
            <Web3ContractsProvider>
              <Router>
                <LayoutView />
              </Router>
            </Web3ContractsProvider>
          </Web3WalletProvider>
        </EthWeb3Provider>
      </ThemeProvider>
    </WindowStateProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

sw.unregister();
