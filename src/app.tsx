import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Web3Provider from 'context/Web3Provider';

import LayoutView from 'views/layout';

const App: React.FunctionComponent = () => {
  return (
    <Web3Provider>
      <Router>
        <LayoutView />
      </Router>
    </Web3Provider>
  );
};

export default App;
