import React from 'react';
import ContractListener from 'web3/components/contract-listener';
import { NewStakingContract } from 'web3/contracts/staking';
import Web3Contract from 'web3/contracts/web3Contract';
import { YFContract } from 'web3/contracts/yieldFarming';

import { KnownTokens } from 'components/providers/known-tokens-provider';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/wallet';

export type YFPoolMeta = {
  name: string;
  label: string;
  icons: string[];
  tokens: KnownTokens[];
  contract: YFContract;
};

const KNOWN_POOLS: YFPoolMeta[] = [
  {
    name: 'stable',
    label: 'USDC/DAI/sUSD',
    icons: ['token-usdc', 'token-dai', 'token-susd'],
    tokens: [KnownTokens.USDC, KnownTokens.DAI, KnownTokens.SUSD],
    contract: new YFContract(String(process.env.REACT_APP_CONTRACT_YIELD_FARM_ADDR).toLowerCase()),
  },
  {
    name: 'unilp',
    label: 'USDC_BOND_UNI_LP',
    icons: ['token-uniswap'],
    tokens: [KnownTokens.UNIV2],
    contract: new YFContract(String(process.env.REACT_APP_CONTRACT_YIELD_FARM_LP_ADDR).toLowerCase()),
  },
  {
    name: 'bond',
    label: 'BOND',
    icons: ['token-bond'],
    tokens: [KnownTokens.BOND],
    contract: new YFContract(String(process.env.REACT_APP_CONTRACT_YIELD_FARM_BOND_ADDR).toLowerCase()),
  },
];

export function getKnownPoolByName(name: string): YFPoolMeta | undefined {
  return KNOWN_POOLS.find(pool => pool.name === name);
}

export type YFPoolsType = {
  pools: YFPoolMeta[];
  getKnownPoolByName: (name: string) => YFPoolMeta | undefined;
  stakingContract?: NewStakingContract;
};

const YFPoolsContext = React.createContext<YFPoolsType>({
  pools: KNOWN_POOLS,
  getKnownPoolByName,
  stakingContract: undefined,
});

export function useYFPools(): YFPoolsType {
  return React.useContext(YFPoolsContext);
}

const YFPoolsProvider: React.FC = props => {
  const { children } = props;
  const walletCtx = useWallet();
  const [reload] = useReload();

  const stakingContract = React.useMemo(() => {
    const staking = new NewStakingContract();
    staking.on(Web3Contract.UPDATE_DATA, reload);

    return staking;
  }, []);

  React.useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.on(Web3Contract.UPDATE_DATA, reload);
      pool.contract.loadCommon();
    });

    stakingContract.loadCommon();
  }, []);

  React.useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.setProvider(walletCtx.provider);
    });

    stakingContract.setProvider(walletCtx.provider);
  }, [walletCtx.provider]);

  React.useEffect(() => {
    KNOWN_POOLS.forEach(pool => {
      pool.contract.setAccount(walletCtx.account);

      if (walletCtx.account) {
        pool.contract.loadUserData();
      }
    });

    stakingContract.setAccount(walletCtx.account);
    if (walletCtx.account) {
      stakingContract.loadUserData();
    }
  }, [walletCtx.account]);

  const value: YFPoolsType = {
    pools: KNOWN_POOLS,
    getKnownPoolByName,
    stakingContract,
  };

  return (
    <YFPoolsContext.Provider value={value}>
      {children}
      <ContractListener contract={stakingContract} />
    </YFPoolsContext.Provider>
  );
};

export default YFPoolsProvider;
