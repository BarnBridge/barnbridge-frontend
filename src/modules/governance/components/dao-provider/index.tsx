import React from 'react';
import BigNumber from 'bignumber.js';

import { useWeb3Contracts } from 'web3/contracts';

type DAOContextType = {
  activationRate?: number,
  isActive?: boolean;
  activationThreshold?: BigNumber;
  bondStaked?: BigNumber;
  activate: () => Promise<void>;
};

const DAOContext = React.createContext<DAOContextType>({
  activationRate: undefined,
  isActive: undefined,
  activationThreshold: undefined,
  bondStaked: undefined,
  activate: Promise.reject,
});

export function useDAO(): DAOContextType {
  return React.useContext(DAOContext);
}

const DAOProvider: React.FunctionComponent = props => {
  const { children } = props;

  const web3c = useWeb3Contracts();
  const { bondStaked, activationThreshold } = web3c.daoBarn;

  const activationRate = React.useMemo<number>(() => {
    const { bondStaked, activationThreshold } = web3c.daoBarn;

    if (!bondStaked || !activationThreshold) {
      return 0;
    }

    const rate = bondStaked.multipliedBy(100).div(activationThreshold).toNumber();

    return Math.min(rate, 100);
  }, [bondStaked, activationThreshold]);

  function activate() {
    return web3c.daoGovernance.actions.activate()
      .then(() => {
        web3c.daoBarn.reload();
        web3c.daoGovernance.reload();
      });
  }

  return (
    <DAOContext.Provider value={{
      activationRate,
      isActive: web3c.daoGovernance.isActive,
      activationThreshold,
      bondStaked,
      activate,
    }}>
      {children}
    </DAOContext.Provider>
  );
};

export default DAOProvider;