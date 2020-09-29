import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Web3Provider from 'context/Web3Provider';
import Web3ContractsProvider from 'context/Web3Contracts';

import LayoutView from 'views/layout';

const App: React.FunctionComponent = () => {
  return (
    <Web3Provider>
      <Web3ContractsProvider>
        <Router>
          <LayoutView />
        </Router>
      </Web3ContractsProvider>
    </Web3Provider>
  );
};

export default App;
