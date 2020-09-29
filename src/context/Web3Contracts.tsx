import React from 'react';
import Web3EthContract, { Contract } from 'web3-eth-contract';
import { useWeb3 } from 'context/Web3Provider';
import BigNumber from 'bignumber.js';

const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR);
const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR);
const CONTRACT_SUSD_ADDR = String(process.env.REACT_APP_CONTRACT_SUSD_ADDR);
const CONTRACT_BOND_ADDR = String(process.env.REACT_APP_CONTRACT_BOND_ADDR);
const CONTRACT_USDC_BOND_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_BOND_ADDR);

export enum Keys {
  CommunityVault = 'COMMUNITY_VAULT',
  Stacking = 'STACKING',
  YF = 'YF',
  YF_LP = 'YF_LP',
  DAI = 'DAI',
  USDC = 'USDC',
  SUSD = 'SUSD',
  BOND = 'BOND',
  USDC_BOND = 'USDC_BOND',
}

export type ContractMeta = {
  abi: any;
  address: string;
  contract: Contract | null;
};

function createContract(abi: any, address: string): ContractMeta {
  const contract: Contract = new (Web3EthContract as any)(abi, address);
  (contract as any).setProvider(`wss://rinkeby.infura.io/ws/v3/6c58700fe84943eb83c4cd5c23dff3d8`);

  return {
    abi,
    address,
    contract,
  };
}

const CONTRACTS_MAP: {
  [name: string]: ContractMeta,
} = {
  [Keys.CommunityVault]: createContract(
    require('resources/abi/CommunityVault.json'),
    String(process.env.REACT_APP_CONTRACT_COMMUNITY_VAULT_ADDR),
  ),
  [Keys.Stacking]: createContract(
    require('resources/abi/Staking.json'),
    String(process.env.REACT_APP_CONTRACT_STACKING_ADDR),
  ),
  [Keys.YF]: createContract(
    require('resources/abi/YieldFarm.json'),
    String(process.env.REACT_APP_CONTRACT_YF_ADDR),
  ),
  [Keys.YF_LP]: createContract(
    require('resources/abi/YieldFarmLP.json'),
    String(process.env.REACT_APP_CONTRACT_YF_LP_ADDR),
  ),
  [Keys.DAI]: createContract(
    require('resources/abi/DAI.json'),
    String(process.env.REACT_APP_CONTRACT_DAI_ADDR),
  ),
  [Keys.USDC]: createContract(
    require('resources/abi/USDC.json'),
    String(process.env.REACT_APP_CONTRACT_USDC_ADDR),
  ),
  [Keys.SUSD]: createContract(
    require('resources/abi/SUSD.json'),
    String(process.env.REACT_APP_CONTRACT_SUSD_ADDR),
  ),
  [Keys.BOND]: createContract(
    require('resources/abi/BOND.json'),
    String(process.env.REACT_APP_CONTRACT_BOND_ADDR),
  ),
  [Keys.USDC_BOND]: createContract(
    require('resources/abi/USDC_BOND.json'),
    String(process.env.REACT_APP_CONTRACT_USDC_BOND_ADDR),
  ),
};

function call(contractName: string, methodName: string, ...args: any[]): Promise<any> {
  return CONTRACTS_MAP[contractName]
    ?.contract
    ?.methods[methodName](...args)
    ?.call()
    ?.catch((e: any) => {
      console.error(`${contractName}.${methodName}.call`, e);
      return Promise.reject(e);
    });
}

export type Web3ContractsType = {
  yf?: YFContractInfo;
  yflp?: YFContractInfo;
  stacking?: StackingContractInfo;
  dai?: Web3ContractInfo;
  usdc?: Web3ContractInfo;
  susd?: Web3ContractInfo;
  bond?: Web3ContractInfo;
  aggregated: {
    potentialReward?: BigNumber;
    lpTokenValue?: BigNumber;
    totalStacked?: BigNumber;
    bondReward?: BigNumber;
    totalBondReward?: BigNumber;
    poolBalanceDUS?: BigNumber;
    poolBalanceDUSShares?: number[];
    myPoolBalanceDUS?: BigNumber;
    poolBalanceUB?: BigNumber;
    myPoolBalanceUB?: BigNumber;
  };
};

const Web3ContractsContext = React.createContext<Web3ContractsType>({
  aggregated: {},
});

export function useWeb3Contracts(): Web3ContractsType {
  return React.useContext(Web3ContractsContext);
}

export type Web3ContractInfo = {
  meta: {
    symbol: string;
    name: string;
    totalSupply: BigNumber;
    decimals: number;
    reserves?: BigNumber[];
  };
  balance: BigNumber;
};

function useWeb3Contract(contractName: string, account?: string): Web3ContractInfo | undefined {
  const [info, setInfo] = React.useState<Web3ContractInfo | undefined>();

  React.useEffect(() => {
    (async () => {
      const symbol = await call(contractName, 'symbol');
      const name = await call(contractName, 'name');
      const totalSupply = await call(contractName, 'totalSupply');
      const decimals = await call(contractName, 'decimals');

      let reserves: BigNumber[] = [];

      if (contractName === Keys.USDC_BOND) {
        const result = await call(contractName, 'getReserves');
        reserves.push(new BigNumber(result[0]), new BigNumber(result[1]));
      }

      setInfo(prevState => ({
        ...prevState!,
        meta: {
          symbol,
          name,
          totalSupply: new BigNumber(totalSupply),
          decimals: Number(decimals),
          reserves,
        },
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!account) {
      return;
    }

    (async () => {
      const balance = await call(contractName, 'balanceOf', account);

      setInfo(prevState => ({
        ...prevState!,
        balance: new BigNumber(balance),
      }));
    })();
  }, [account]);

  return info;
}

export type YFContractInfo = {
  meta: {
    totalEpochs: number;
    bondRewards: BigNumber;
    epochReward: BigNumber;
  };
  currentEpoch: number;
  poolSize: BigNumber;
  epochStake: BigNumber;
  currentReward: BigNumber;
};

function useYFContract(contractName: string, totalEpochs: number, bondRewards: number, account?: string): YFContractInfo | undefined {
  const [info, setInfo] = React.useState<YFContractInfo | undefined>();

  React.useEffect(() => {
    (async () => {
      const currentEpoch = await call(contractName, 'getCurrentEpoch');
      const poolSize = await call(contractName, 'getPoolSize', currentEpoch);
      const massHarvest = await call(contractName, 'massHarvest');

      setInfo(prevState => ({
        ...prevState!,
        meta: {
          totalEpochs,
          bondRewards: new BigNumber(bondRewards),
          epochReward: (new BigNumber(bondRewards)).div(totalEpochs),
        },
        currentEpoch: Number(currentEpoch),
        poolSize: new BigNumber(poolSize),
        currentReward: new BigNumber(massHarvest),
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!account || !info?.currentEpoch) {
      return;
    }

    (async () => {
      const epochStake = await call(contractName, 'getEpochStake', account, info.currentEpoch);

      setInfo(prevState => ({
        ...prevState!,
        epochStake: new BigNumber(epochStake),
      }));
    })();
  }, [account, info?.currentEpoch]);

  return info;
}

export type StackingContractInfo = {
  currentEpoch: number;
  dai: {
    poolSize: BigNumber;
    balance: BigNumber;
    epochUserBalance: BigNumber;
  };
  usdc: {
    poolSize: BigNumber;
    balance: BigNumber;
    epochUserBalance: BigNumber;
  };
  susd: {
    poolSize: BigNumber;
    balance: BigNumber;
    epochUserBalance: BigNumber;
  };
  usdc_bond: {
    poolSize: BigNumber;
    balance: BigNumber;
    epochUserBalance: BigNumber;
  };
};

function useStackingContract(account?: string): StackingContractInfo | undefined {
  const [info, setInfo] = React.useState<StackingContractInfo | undefined>();

  React.useEffect(() => {
    (async () => {
      const currentEpoch = await call(Keys.Stacking, 'getCurrentEpoch');
      const daiPoolSize = await call(Keys.Stacking, 'getEpochPoolSize',
        CONTRACT_DAI_ADDR, currentEpoch);
      const usdcPoolSize = await call(Keys.Stacking, 'getEpochPoolSize',
        CONTRACT_USDC_ADDR, currentEpoch);
      const susdPoolSize = await call(Keys.Stacking, 'getEpochPoolSize',
        CONTRACT_SUSD_ADDR, currentEpoch);
      const usdcBondPoolSize = await call(Keys.Stacking, 'getEpochPoolSize',
        CONTRACT_USDC_BOND_ADDR, currentEpoch);

      console.log({ currentEpoch, daiPoolSize, usdcPoolSize, susdPoolSize });
      setInfo(prevState => ({
        ...prevState!,
        currentEpoch: Number(currentEpoch),
        dai: {
          ...prevState?.dai!,
          poolSize: new BigNumber(daiPoolSize),
        },
        usdc: {
          ...prevState?.usdc!,
          poolSize: new BigNumber(usdcPoolSize),
        },
        susd: {
          ...prevState?.susd!,
          poolSize: new BigNumber(susdPoolSize),
        },
        usdc_bond: {
          ...prevState?.usdc_bond!,
          poolSize: new BigNumber(usdcBondPoolSize),
        },
      }));
    })();
  }, []);

  React.useEffect(() => {
    if (!account || !info?.currentEpoch) {
      return;
    }

    (async () => {
      const daiBalance = await call(Keys.Stacking, 'balanceOf',
        account, CONTRACT_DAI_ADDR);
      const usdcBalance = await call(Keys.Stacking, 'balanceOf',
        account, CONTRACT_USDC_ADDR);
      const susdBalance = await call(Keys.Stacking, 'balanceOf',
        account, CONTRACT_SUSD_ADDR);
      const usdcBondBalance = await call(Keys.Stacking, 'balanceOf',
        account, CONTRACT_USDC_BOND_ADDR);

      const daiEpochUserBalance = await call(Keys.Stacking, 'getEpochUserBalance',
        account, CONTRACT_DAI_ADDR, info.currentEpoch);
      const usdcEpochUserBalance = await call(Keys.Stacking, 'getEpochUserBalance',
        account, CONTRACT_USDC_ADDR, info.currentEpoch);
      const susdEpochUserBalance = await call(Keys.Stacking, 'getEpochUserBalance',
        account, CONTRACT_SUSD_ADDR, info.currentEpoch);
      const usdcBondEpochUserBalance = await call(Keys.Stacking, 'getEpochUserBalance',
        account, CONTRACT_USDC_BOND_ADDR, info.currentEpoch);

      setInfo(prevState => ({
        ...prevState!,
        dai: {
          ...prevState?.dai!,
          balance: new BigNumber(daiBalance),
          epochUserBalance: new BigNumber(daiEpochUserBalance),
        },
        usdc: {
          ...prevState?.usdc!,
          balance: new BigNumber(usdcBalance),
          epochUserBalance: new BigNumber(usdcEpochUserBalance),
        },
        susd: {
          ...prevState?.susd!,
          balance: new BigNumber(susdBalance),
          epochUserBalance: new BigNumber(susdEpochUserBalance),
        },
        usdc_bond: {
          ...prevState?.usdc_bond!,
          balance: new BigNumber(usdcBondBalance),
          epochUserBalance: new BigNumber(usdcBondEpochUserBalance),
        },
      }));
    })();
  }, [account, info?.currentEpoch]);

  return info;
}

const Web3ContractsProvider: React.FunctionComponent = props => {
  const { account } = useWeb3();

  const daiContract = useWeb3Contract(Keys.DAI, account);
  const usdcContract = useWeb3Contract(Keys.USDC, account);
  const susdContract = useWeb3Contract(Keys.SUSD, account);
  const bondContract = useWeb3Contract(Keys.BOND, account);
  const usdcBondContract = useWeb3Contract(Keys.USDC_BOND, account);

  const yfContract = useYFContract(Keys.YF, 24, 800000, account);
  const yflpContract = useYFContract(Keys.YF_LP, 100, 2000000, account);

  const stackingContract = useStackingContract(account);

  const value = {
    yf: yfContract,
    yflp: yflpContract,
    stacking: stackingContract,
    usdc: usdcContract,
    dai: daiContract,
    susd: susdContract,
    bond: bondContract,
    usdcBond: usdcBondContract,
    aggregated: {
      get potentialReward(): BigNumber | undefined {
        if (!yfContract || !yflpContract) {
          return undefined;
        }

        const yf_pr = !yfContract.poolSize.eq(0) ? yfContract.epochStake
          ?.div(yfContract.poolSize)
          ?.multipliedBy(yfContract.meta.epochReward) : new BigNumber(0);

        const yflp_pr = !yflpContract.poolSize.eq(0) ? yflpContract.epochStake
          ?.div(yflpContract.poolSize)
          ?.multipliedBy(yflpContract.meta.epochReward) : new BigNumber(0);

        return yf_pr?.plus(yflp_pr);
      },
      get lpTokenValue(): BigNumber | undefined {
        ///  lptoken.getReserves()[_reserveX] / 10^6 / lptoken.totalSupply() * 2

        const a = usdcBondContract?.meta?.reserves?.[0];
        const b = usdcContract?.meta.decimals;
        const c = usdcBondContract?.meta.totalSupply;

        if (!a || !b || !c) {
          return undefined;
        }

        return a.div(new BigNumber(10).pow(b)).div(c).multipliedBy(2);
      },
      get totalStacked(): BigNumber | undefined {
        const a = yfContract?.poolSize;
        const b = yflpContract?.poolSize;
        const c = this.lpTokenValue;

        if (!a || !b || !c) {
          return undefined;
        }

        return a.plus(b.multipliedBy(c));
      },
      get bondReward(): BigNumber | undefined {
        const a = (yfContract?.currentEpoch || 1) - 1;
        const b = yfContract?.meta?.epochReward;
        const c = (yflpContract?.currentEpoch || 1) - 1;
        const d = yflpContract?.meta?.epochReward;

        if (!b || !d) {
          return undefined;
        }

        return b.multipliedBy(a).plus(d.multipliedBy(c));
      },
      get totalBondReward(): BigNumber | undefined {
        const a = yfContract?.meta?.bondRewards;
        const b = yflpContract?.meta?.bondRewards;

        if (!a || !b) {
          return undefined;
        }

        return a.plus(b);
      },
      get poolBalanceDUS(): BigNumber | undefined {
        const a = stackingContract?.dai.poolSize;
        const b = stackingContract?.susd.poolSize;
        const c = stackingContract?.usdc.poolSize;

        if (!a || !b || !c) {
          return undefined;
        }

        const d = new BigNumber(10).pow(daiContract?.meta?.decimals || 0);
        const e = new BigNumber(10).pow(susdContract?.meta?.decimals || 0);
        const f = new BigNumber(10).pow(usdcContract?.meta?.decimals || 0);

        return a.div(d).plus(b.div(e)).plus(c.div(f));
      },
      get poolBalanceDUSShares(): number[] | undefined {
        const a = stackingContract?.dai.poolSize;
        const b = stackingContract?.susd.poolSize;
        const c = stackingContract?.usdc.poolSize;

        if (!a || !b || !c) {
          return undefined;
        }

        const total = this.poolBalanceDUS;

        if (!total) {
          return undefined;
        }

        return [
          parseFloat(c.multipliedBy(100).div(total).toFormat(3)),
          parseFloat(a.multipliedBy(100).div(total).toFormat(3)),
          parseFloat(b.multipliedBy(100).div(total).toFormat(3)),
        ];
      },
      get myPoolBalanceDUS(): BigNumber | undefined {
        const a = stackingContract?.dai.epochUserBalance;
        const b = stackingContract?.susd.epochUserBalance;
        const c = stackingContract?.usdc.epochUserBalance;

        if (!a || !b || !c) {
          return undefined;
        }

        const d = new BigNumber(10).pow(daiContract?.meta?.decimals || 0);
        const e = new BigNumber(10).pow(susdContract?.meta?.decimals || 0);
        const f = new BigNumber(10).pow(usdcContract?.meta?.decimals || 0);

        return a.div(d).plus(b.div(e)).plus(c.div(f));
      },
      get poolBalanceUB(): BigNumber | undefined {
        const a = stackingContract?.usdc_bond.poolSize;

        if (!a) {
          return undefined;
        }

        const d = new BigNumber(10).pow(usdcBondContract?.meta?.decimals || 0);

        return a.div(d);
      },
      get myPoolBalanceUB(): BigNumber | undefined {
        const a = stackingContract?.usdc_bond.epochUserBalance;

        if (!a) {
          return undefined;
        }

        const d = new BigNumber(10).pow(usdcBondContract?.meta?.decimals || 0);

        return a.div(d);
      },
    },
  };

  console.log(value);

  return (
    <Web3ContractsContext.Provider value={value}>
      {props.children}
    </Web3ContractsContext.Provider>
  );
};

export default Web3ContractsProvider;
