import React from 'react';
import { Route, Switch } from 'react-router-dom';

import s from './styles.module.css';

import HomeView from 'views/home';
import BondsView from 'views/bonds';
import PoolsView from 'views/pools';
import VotingView from 'views/voting';

const LayoutView: React.FunctionComponent<{}> = props => {
  return (
    <div className={s.container}>
      <Switch>
        <Route path="/bonds" component={BondsView} />
        <Route path="/pools" component={PoolsView} />
        <Route path="/voting" component={VotingView} />
        <Route path="/" component={HomeView} />
      </Switch>
    </div>
  );
};

export default LayoutView;
