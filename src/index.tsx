import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Web3WalletProvider from 'wallets/wallet';
import Web3ContractsProvider from 'web3/contracts';
import RouteParamsProvider from 'hooks/useRouteParams';

import ThemeProvider from 'components/theme-provider';

import './antd.css';
import './index.scss';

import LayoutView from 'views/layout';

import * as sw from './serviceWorker';

const App: React.FunctionComponent = () => {
  return (
    <ThemeProvider>
      <Web3WalletProvider>
        <Web3ContractsProvider>
          <Router>
            <RouteParamsProvider>
              <LayoutView />
            </RouteParamsProvider>
          </Router>
        </Web3ContractsProvider>
      </Web3WalletProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

sw.unregister();
