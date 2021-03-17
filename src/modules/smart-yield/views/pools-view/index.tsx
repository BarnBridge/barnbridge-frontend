import { Redirect, Route, Switch } from 'react-router-dom';

import Pool from './pool';
import Pools from './pools';

const PoolsView: React.FC = () => {
  return (
    <Switch>
      <Route path="/smart-yield/pools" exact component={Pools} />
      <Route path="/smart-yield/pools/:id" exact component={Pool} />
      <Redirect to="/smart-yield/pools" />
    </Switch>
  );
};

export default PoolsView;
