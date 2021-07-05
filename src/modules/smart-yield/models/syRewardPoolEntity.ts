import BigNumber from 'bignumber.js';
import { ContractManagerType } from 'web3/components/contractManagerProvider';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract from 'web3/web3Contract';

import { KnownTokensContextType, TokenMeta } from 'components/providers/knownTokensProvider';
import ManagedEntity from 'models/managedEntity';
import { APISYRewardPool } from 'modules/smart-yield/api';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';

export class SYRewardPoolEntity extends ManagedEntity {
  meta: APISYRewardPool;
  smartYield: SYSmartYieldContract;
  rewardPool: SYRewardPoolContract;
  rewardTokens: Map<string, TokenMeta>;
  knownTokensCtx: KnownTokensContextType;
  contractManagerCtx: ContractManagerType;

  constructor(meta: APISYRewardPool, knownTokensCtx: KnownTokensContextType, contractManagerCtx: ContractManagerType) {
    // TODO: Refactor
    super();
    this.meta = meta;
    this.knownTokensCtx = knownTokensCtx;
    this.contractManagerCtx = contractManagerCtx;
    this.smartYield = this.contractManagerCtx.getContract<SYSmartYieldContract>(meta.poolTokenAddress, () => {
      return new SYSmartYieldContract(meta.poolTokenAddress);
    });
    this.smartYield.on(Web3Contract.UPDATE_DATA, this.emitDataUpdate);
    this.rewardPool = this.contractManagerCtx.getContract<SYRewardPoolContract>(meta.poolAddress, () => {
      return new SYRewardPoolContract(meta.poolAddress, meta.poolType === 'MULTI');
    });
    this.rewardPool.on(Web3Contract.UPDATE_DATA, this.emitDataUpdate);
    this.rewardTokens = new Map();

    meta.rewardTokens.forEach(rewardTkn => {
      const rewardToken =
        knownTokensCtx.getTokenByAddress(rewardTkn.address) ??
        ({
          address: rewardTkn.address,
          symbol: rewardTkn.symbol,
          name: rewardTkn.symbol,
          decimals: rewardTkn.decimals,
          contract: this.contractManagerCtx.getContract<Erc20Contract>(rewardTkn.address, () => {
            return new Erc20Contract([], rewardTkn.address);
          }),
        } as TokenMeta);
      rewardToken.contract?.on(Web3Contract.UPDATE_DATA, this.emitDataUpdate);
      this.rewardTokens.set(rewardTkn.address, rewardToken);
    });
  }

  get apr(): BigNumber | undefined {
    const { rewardPool, smartYield } = this;
    const { poolSize } = rewardPool;

    if (!poolSize) {
      return undefined;
    }

    const { bondToken, convertTokenInUSD } = this.knownTokensCtx;
    const r = rewardPool.getDailyRewardFor(bondToken.address)?.unscaleBy(bondToken.decimals);
    const yearlyReward = convertTokenInUSD(r, bondToken.symbol!)?.multipliedBy(365);

    const p = poolSize.dividedBy(10 ** (smartYield.decimals ?? 0));
    const poolBalance = convertTokenInUSD(p, smartYield.symbol!);

    if (!yearlyReward || !poolBalance || poolBalance.eq(BigNumber.ZERO)) {
      return undefined;
    }

    return yearlyReward.dividedBy(poolBalance);
  }

  loadCommonData() {
    this.smartYield.loadCommon().catch(Error);
    this.rewardPool.loadCommon().catch(Error);
    this.rewardTokens.forEach(rewardToken => {
      this.rewardPool.loadRewardLeftFor(rewardToken.address).catch(Error);
      this.rewardPool.loadRewardRateFor(rewardToken.address).catch(Error);
      (rewardToken.contract as Erc20Contract)?.loadBalance(this.meta.poolAddress).catch(Error);
    });
  }

  loadUserBalances() {
    this.smartYield.loadBalance().catch(Error);
    this.rewardTokens.forEach(rewardToken => {
      (rewardToken.contract as Erc20Contract)?.loadBalance().catch(Error);
      this.rewardPool.loadBalanceFor(rewardToken.address).catch(Error);
    });
    if (this.rewardPool.account) {
      this.rewardPool.loadBalanceFor(this.rewardPool.account).catch(Error);
    }
  }

  loadClaims() {
    this.rewardTokens.forEach(rewardContract => {
      this.rewardPool.loadClaimFor(rewardContract.address).catch(Error);
    });
  }

  loadUserData() {
    this.loadUserBalances();
    this.loadClaims();
  }

  updateProvider(provider?: any) {
    this.smartYield.setProvider(provider);
    this.rewardPool.setProvider(provider);
    this.rewardTokens.forEach(rewardContract => {
      rewardContract.contract?.setProvider(provider);
    });
  }

  updateAccount(account?: string) {
    this.smartYield.setAccount(account);
    this.rewardPool.setAccount(account);
    this.rewardTokens.forEach(rewardContract => {
      rewardContract.contract?.setAccount(account);
    });
  }
}
