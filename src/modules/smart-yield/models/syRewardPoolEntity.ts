import BigNumber from 'bignumber.js';
import { ContractManagerType } from 'web3/components/contractManagerProvider';
import Erc20Contract from 'web3/erc20Contract';
import Web3Contract from 'web3/web3Contract';

import { KnownTokens, KnownTokensContextType, TokenMeta } from 'components/providers/knownTokensProvider';
import { MainnetHttpsWeb3Provider } from 'components/providers/web3Provider';
import ManagedEntity from 'models/managedEntity';
import { APISYRewardPool } from 'modules/smart-yield/api';
import SYAaveTokenContract from 'modules/smart-yield/contracts/syAaveTokenContract';
import SYRewardPoolContract from 'modules/smart-yield/contracts/syRewardPoolContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { AaveMarket } from 'modules/smart-yield/providers/markets';

export class SYRewardPoolEntity extends ManagedEntity {
  meta: APISYRewardPool;
  smartYield: SYSmartYieldContract;
  rewardPool: SYRewardPoolContract;
  rewardTokens: Map<string, TokenMeta>;
  knownTokensCtx: KnownTokensContextType;
  contractManagerCtx: ContractManagerType;

  apy?: BigNumber;

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

    if (meta.protocolId === AaveMarket.id) {
      /// TODO: !!!!
      let aTokenAddress: string | undefined;
      let aTokenDecimals: number | undefined;

      if (meta.underlyingSymbol === KnownTokens.DAI) {
        aTokenAddress = '0x028171bca77440897b824ca71d1c56cac55b68a3';
        aTokenDecimals = 18;
      } else if (meta.underlyingSymbol === KnownTokens.GUSD) {
        aTokenAddress = '0xd37ee7e4f452c6638c96536e68090de8cbcdb583';
        aTokenDecimals = 2;
      } else if (meta.underlyingSymbol === KnownTokens.USDC) {
        aTokenAddress = '0xbcca60bb61934080951369a648fb03df4f96263c';
        aTokenDecimals = 6;
      } else if (meta.underlyingSymbol === KnownTokens.USDT) {
        aTokenAddress = '0x3ed3b47dd13ec9a98b44e6204a523e766b225811';
        aTokenDecimals = 6;
      }

      if (aTokenAddress && aTokenDecimals) {
        this.getAaveIncentivesAPY(aTokenAddress, aTokenDecimals, meta.underlyingSymbol).then(apy => {
          this.apy = apy;
        });
      }
    }
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

  async getAaveIncentivesAPY(
    cTokenAddress: string,
    uDecimals: number,
    uSymbol: string,
  ): Promise<BigNumber | undefined> {
    const aTokenAddress = cTokenAddress;
    const aTokenDecimals = uDecimals;

    const aToken = new SYAaveTokenContract(aTokenAddress);
    aToken.setCallProvider(MainnetHttpsWeb3Provider); // TODO: Re-think about mainnet provider
    await aToken.loadCommon();

    const aTokenPriceInEth = this.knownTokensCtx.convertTokenIn(
      1,
      this.knownTokensCtx.stkAaveToken.symbol,
      this.knownTokensCtx.ethToken.symbol,
    );
    const uTokenPriceInEth = this.knownTokensCtx.convertTokenIn(1, uSymbol, this.knownTokensCtx.ethToken.symbol);

    return aToken.calculateIncentivesAPY(aTokenPriceInEth!, uTokenPriceInEth!, aTokenDecimals);
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
}
