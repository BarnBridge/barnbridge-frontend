import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';
import Web3Contract from 'web3/web3Contract';

import Icon from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Tabs } from 'components/custom/tabs';
import { TokenAmount, TokenAmountPreview, TokenSelect } from 'components/custom/token-amount-new';
import TransactionDetails from 'components/custom/transaction-details';
import { Text } from 'components/custom/typography';
import {
  KnownTokens,
  getTokenByAddress,
  getTokenBySymbol,
  getTokenIconBySymbol,
} from 'components/providers/known-tokens-provider';
import { useReload } from 'hooks/useReload';
import { TrancheApiType, fetchTranche } from 'modules/smart-exposure/api';
import SeUniswapRouterContract from 'modules/smart-exposure/contracts/seUniswapRouterContract';
import { useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';
import { useWallet } from 'wallets/wallet';

import { numberFormat } from 'utils';

const tabs = [
  {
    children: 'Multiple tokens',
    id: 'multiple',
  },
  {
    children: 'Single token',
    id: 'single',
  },
];

const DepositView: React.FC = () => {
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [reload] = useReload();
  const [tranche, setTranche] = useState<TrancheApiType>();
  const [activeTab, setActiveTab] = React.useState<string>('multiple');
  const [tokenAContract, setTokenAContract] = useState<Erc20Contract>();
  const [tokenBContract, setTokenBContract] = useState<Erc20Contract>();
  const wallet = useWallet();

  useEffect(() => {
    fetchTranche(poolAddress, trancheAddress).then(result => {
      setTranche(result);
      console.log('tranche', result);
    });
  }, [poolAddress, trancheAddress]);

  const selectedTokenContract = useMemo(() => {
    const contract = new Erc20Contract([], trancheAddress);
    contract.setProvider(wallet.provider);

    contract.setAccount(wallet.account);
    contract.loadBalance();
    contract
      .loadCommon()
      .then(() => reload())
      .catch(Error);

    contract.on(Web3Contract.UPDATE_DATA, reload);
    return contract;
  }, [reload, trancheAddress, wallet.account, wallet.provider]);

  useEffect(() => {
    if (tranche) {
      const tokenAContract: Erc20Contract =
        (getTokenByAddress(tranche.tokenA.address)?.contract as Erc20Contract) ??
        new Erc20Contract([], tranche.tokenA.address);
      tokenAContract.setProvider(wallet.provider);

      tokenAContract.on(Web3Contract.UPDATE_DATA, reload);

      const tokenBContract: Erc20Contract =
        (getTokenByAddress(tranche.tokenB.address)?.contract as Erc20Contract) ??
        new Erc20Contract([], tranche.tokenB.address);
      tokenBContract.setProvider(wallet.provider);

      tokenBContract.on(Web3Contract.UPDATE_DATA, reload);

      setTokenAContract(tokenAContract);
      setTokenBContract(tokenBContract);
    }
  }, [tranche, wallet.account, wallet.provider, reload]);

  useEffect(() => {
    if (tokenAContract) {
      tokenAContract.setAccount(wallet.account);
      tokenAContract.loadBalance();
    }

    if (tokenBContract) {
      tokenBContract.setAccount(wallet.account);
      tokenBContract.loadBalance();
    }
  }, [tokenAContract, tokenBContract, wallet.account]);

  useEffect(() => {
    if (tokenAContract) {
      tokenAContract.loadAllowance(poolAddress);
    }

    if (tokenBContract) {
      tokenBContract.loadAllowance(poolAddress);
    }
  }, [tokenAContract, tokenBContract, poolAddress]);

  if (!tranche || !tokenAContract || !tokenBContract) {
    return null;
  }

  const tokenA = getTokenBySymbol(tranche.tokenA.symbol);
  const tokenB = getTokenBySymbol(tranche.tokenB.symbol);
  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  return (
    <>
      <div className="flex justify-center row-gap-12 col-gap-64 mb-40">
        <div className="flex">
          <IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={40} className="mr-16" />
          <div>
            <div className="text-p1 fw-semibold color-primary mr-4">{`${Number(tranche.tokenARatio) * 100}% ${
              tranche.tokenA.symbol
            } / ${Number(tranche.tokenBRatio) * 100}% ${tranche.tokenB.symbol}`}</div>
            <div className="text-sm fw-semibold color-secondary">{`${tokenA?.name} / ${tokenB?.name}`}</div>
          </div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary mb-4">Wallet {tranche.tokenA.symbol} balance</div>
          <div>
            <span className="text-p1 fw-semibold color-primary mr-8">
              {formatToken(tokenAContract.getBalanceOf(wallet.account), {
                scale: tranche.tokenA.decimals,
              }) ?? '-'}
            </span>
            <span className="text-sm fw-semibold color-secondary">{tranche.tokenA.symbol}</span>
          </div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary mb-4">Wallet {tranche.tokenB.symbol} balance</div>
          <div>
            <span className="text-p1 fw-semibold color-primary mr-8">
              {' '}
              {formatToken(tokenBContract.getBalanceOf(wallet.account), {
                scale: tranche.tokenB.decimals,
              }) ?? '-'}
            </span>
            <span className="text-sm fw-semibold color-secondary">{tranche.tokenB.symbol}</span>
          </div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary mb-4">Wallet {tranche.eTokenSymbol} balance</div>
          <div>
            <span className="text-p1 fw-semibold color-primary mr-8">
              {formatToken(selectedTokenContract.getBalanceOf(wallet.account), {
                scale: selectedTokenContract.decimals,
              }) ?? '-'}
            </span>
            <span className="text-sm fw-semibold color-secondary">{tranche.eTokenSymbol}</span>
          </div>
        </div>
      </div>
      <div
        className="card ph-32 pv-32 mh-auto"
        style={{
          width: '100%',
          maxWidth: 640,
        }}>
        <Text type="h3" weight="semibold" color="primary" className="mb-16">
          Deposit
        </Text>
        <Text type="p2" weight="semibold" color="secondary" className="mb-32">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse efficitur odio nunc, a sodales ligula
          varius nec
        </Text>
        <Tabs
          tabs={tabs}
          activeKey={activeTab}
          onClick={setActiveTab}
          className="mb-32"
          variation="elastic"
          size="small"
        />
        {activeTab === 'multiple' ? (
          <MultipleTokensForm tranche={tranche} tokenAContract={tokenAContract} tokenBContract={tokenBContract} />
        ) : (
          <SingleTokenForm tranche={tranche} />
        )}
      </div>
      <ContractListener contract={tokenAContract} />
      <ContractListener contract={tokenBContract} />
    </>
  );
};

export default DepositView;

const MultipleTokensForm = ({
  tranche,
  tokenAContract,
  tokenBContract,
}: {
  tranche: TrancheApiType;
  tokenAContract: Erc20Contract;
  tokenBContract: Erc20Contract;
}) => {
  const wallet = useWallet();
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tokenAState, setTokenAState] = useState<string>('');
  const [tokenBState, setTokenBState] = useState<string>('');
  const [tokenEState, setTokenEState] = useState<BigNumber | undefined>();
  const { ePoolContract, ePoolPeripheryContract } = useSEPools();
  // console.log({ ePoolContract, ePoolPeripheryContract });

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  const tokenAMax = tokenAContract.getBalanceOf(wallet.account)?.unscaleBy(tranche.tokenA.decimals) ?? BigNumber.ZERO;
  const tokenBMax = tokenBContract.getBalanceOf(wallet.account)?.unscaleBy(tranche.tokenB.decimals) ?? BigNumber.ZERO;

  const handleAmountTokenA = useDebounce((value: string) => {
    if (!ePoolPeripheryContract) {
      return;
    }
    const amount = BigNumber.from(value)?.scaleBy(tranche.tokenA.decimals);

    if (!amount) {
      setTokenBState('');
      return;
    }

    ePoolPeripheryContract
      .getAmountBForAmountA(poolAddress, tranche.eTokenAddress, amount)
      .then(amountB => setTokenBState(amountB.unscaleBy(tranche.tokenB.decimals)?.toString() ?? ''));
  }, 400);

  const handleAmountTokenB = useDebounce((value: string) => {
    if (!ePoolPeripheryContract) {
      return;
    }
    const amount = BigNumber.from(value)?.scaleBy(tranche.tokenB.decimals);

    if (!amount) {
      setTokenAState('');
      return;
    }

    ePoolPeripheryContract
      .getAmountAForAmountB(poolAddress, tranche.eTokenAddress, amount)
      .then(amountA => setTokenAState(amountA.unscaleBy(tranche.tokenA.decimals)?.toString() ?? ''));
  }, 400);

  useEffect(() => {
    const amountA = BigNumber.from(tokenAState)?.scaleBy(tranche.tokenA.decimals);
    const amountB = BigNumber.from(tokenBState)?.scaleBy(tranche.tokenB.decimals);

    if (!amountA || !amountB) {
      setTokenEState(undefined);
      return;
    }

    ePoolPeripheryContract
      ?.getETokenForTokenATokenB(poolAddress, tranche.eTokenAddress, amountA, amountB)
      .then(val => setTokenEState(BigNumber.from(val)));
  }, [tokenAState, tokenBState, ePoolPeripheryContract, tranche, poolAddress]);

  const handleDeposit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tokenEState) {
      return;
    }

    ePoolContract?.deposit(tranche.eTokenAddress, tokenEState);
  };

  if (!ePoolContract) {
    return null;
  }

  return (
    <form onSubmit={handleDeposit}>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{tranche.tokenA.symbol} amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">
          Current ratio: {formatPercent(Number(tranche.tokenARatio))}
        </span>
      </div>
      <TokenAmount
        before={<Icon name={tokenAIcon} width={24} height={24} />}
        value={tokenAState}
        secondary={formatUSD(BigNumber.from(tokenAState)?.multipliedBy(tranche.tokenA.state.price) ?? 0)}
        onChange={value => {
          setTokenAState(value);
          handleAmountTokenA(value);
        }}
        max={tokenAMax?.toNumber()}
        placeholder={`0 (Max ${tokenAMax?.toNumber()})`}
        className="mb-16"
      />
      <Icon
        name="plus-circle"
        width={32}
        height={32}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{tranche.tokenB.symbol} amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">
          Current ratio: {formatPercent(Number(tranche.tokenBRatio))}
        </span>
      </div>
      <TokenAmount
        before={<Icon name={tokenBIcon} width={24} height={24} />}
        value={tokenBState}
        secondary={formatUSD(BigNumber.from(tokenBState)?.multipliedBy(tranche.tokenB.state.price) ?? 0)}
        onChange={value => {
          setTokenBState(value);
          handleAmountTokenB(value);
        }}
        max={tokenBMax?.toNumber()}
        placeholder={`0 (Max ${tokenBMax?.toNumber()})`}
        className="mb-16"
      />
      <Icon
        name="down-arrow-circle"
        width={32}
        height={32}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{tranche.eTokenSymbol} amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">$ 63,132.11 per {tranche.eTokenSymbol}</span>
      </div>
      <TokenAmountPreview
        before={<IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={24} />}
        value={formatToken(tokenEState?.dividedBy(tranche.sFactorE)) ?? '0'}
        className="mb-32"
      />
      <EnableTokens {...{ tokenAContract, tokenBContract, poolAddress, tranche }} className="mb-32" />
      <div className="grid flow-col col-gap-32 align-center justify-space-between">
        <Link to={`/smart-exposure/pools/${poolAddress}/${trancheAddress}`} className="button-back">
          <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
          Cancel
        </Link>
        <button type="submit" className="button-primary">
          Deposit
        </button>
      </div>
    </form>
  );
};

const SingleTokenForm = ({ tranche }: { tranche: TrancheApiType }) => {
  const wallet = useWallet();
  const [reload] = useReload();
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const tokens: [KnownTokens, KnownTokens] = [tranche.tokenA.symbol, tranche.tokenB.symbol];

  const [selectedTokenSymbol, setSelectedTokenSymbol] = React.useState<KnownTokens>(tokens[0]);
  const [tokenState, setTokenState] = React.useState<string>('');
  const [tokenAState, setTokenAState] = React.useState<BigNumber | undefined>();
  const [tokenBState, setTokenBState] = React.useState<BigNumber | undefined>();
  const [uniswapRouterContract, setUniswapRouterContract] = React.useState<SeUniswapRouterContract | undefined>();
  const { ePoolPeripheryContract } = useSEPools();
  const [tokenEState, setTokenEState] = useState<BigNumber | undefined>();

  const slippage = 0.005;
  const deadline = 20;
  const isTokenA = selectedTokenSymbol === tranche.tokenA.symbol;

  const selectedToken = getTokenBySymbol(selectedTokenSymbol);
  const selectedTokenContract = useMemo(() => {
    const contract = new Erc20Contract([], isTokenA ? tranche.tokenA.address : tranche.tokenB.address);
    contract.setProvider(wallet.provider);
    contract.on(Web3Contract.UPDATE_DATA, reload);
    if (ePoolPeripheryContract) {
      contract.loadAllowance(ePoolPeripheryContract.address);
    }
    return contract;
  }, [tranche, isTokenA, wallet.provider, ePoolPeripheryContract, reload]);

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  useEffect(() => {
    ePoolPeripheryContract?.getRouter().then(address => {
      const uniswapRouterContract = new SeUniswapRouterContract(address);
      setUniswapRouterContract(uniswapRouterContract);
    });
  }, [ePoolPeripheryContract]);

  useEffect(() => {
    if (selectedTokenContract && ePoolPeripheryContract) {
      selectedTokenContract.setProvider(wallet.provider);
      selectedTokenContract.setAccount(wallet.account);
      selectedTokenContract.loadAllowance(ePoolPeripheryContract.address);
    }
  }, [ePoolPeripheryContract, selectedTokenContract, wallet.account, wallet.provider]);

  useEffect(() => {
    const amount = BigNumber.from(tokenState)
      ?.scaleBy(selectedToken?.decimals)
      ?.multipliedBy(1 - slippage);
    if (!amount) {
      return;
    }

    ePoolPeripheryContract?.[isTokenA ? 'getTokenATokenBForTokenA' : 'getTokenATokenBForTokenB'](
      poolAddress,
      tranche.eTokenAddress,
      amount,
    ).then(val => {
      console.log({ val });
      if (isTokenA) {
        const asd = amount.minus(val.amountA ?? 0);
        uniswapRouterContract?.getAmountsOut(asd, [tranche.tokenA.address, tranche.tokenB.address]).then(vals => {
          setTokenAState(val.amountA);
          setTokenBState(vals[1]);
        });
      } else {
        const asd = amount.minus(val.amountB ?? 0);
        uniswapRouterContract?.getAmountsOut(asd, [tranche.tokenB.address, tranche.tokenA.address]).then(vals => {
          setTokenBState(val.amountB);
          setTokenAState(vals[1]);
        });
      }
    });
  }, [
    tokenState,
    selectedTokenSymbol,
    tranche,
    ePoolPeripheryContract,
    poolAddress,
    selectedToken,
    uniswapRouterContract,
    isTokenA,
  ]);

  useEffect(() => {
    const amountA = BigNumber.from(tokenAState);
    const amountB = BigNumber.from(tokenBState);

    if (!amountA || !amountB) {
      setTokenEState(undefined);
      return;
    }

    ePoolPeripheryContract
      ?.getETokenForTokenATokenB(poolAddress, tranche.eTokenAddress, amountA, amountB)
      .then(val => setTokenEState(BigNumber.from(val)));
  }, [tokenAState, tokenBState, ePoolPeripheryContract, tranche, poolAddress]);

  const handleDeposit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tokenEState || !tokenAState) {
      return;
    }

    const isTokenA = selectedTokenSymbol === tranche.tokenA.symbol;
    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);

    ePoolPeripheryContract?.[isTokenA ? 'depositForMaxTokenA' : 'depositForMaxTokenB'](
      poolAddress,
      tranche.eTokenAddress,
      tokenEState,
      tokenAState,
      deadlineTs,
    );
  };

  if (!ePoolPeripheryContract || !selectedToken) {
    return null;
  }

  return (
    <form onSubmit={handleDeposit}>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{selectedToken.symbol} amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">
          Current ratio:{' '}
          {numberFormat(
            Number(selectedToken.symbol === tranche.tokenA.symbol ? tranche.tokenARatio : tranche.tokenBRatio) * 100,
            {
              minimumFractionDigits: 2,
            },
          )}
          %
        </span>
      </div>
      <TokenAmount
        before={<TokenSelect value={selectedTokenSymbol} onChange={setSelectedTokenSymbol} tokens={tokens} />}
        value={tokenState}
        secondary={formatUSD(
          BigNumber.from(tokenState)?.multipliedBy(tranche[isTokenA ? 'tokenA' : 'tokenB'].state.price) ?? 0,
        )}
        onChange={setTokenState}
        max={9.789}
        placeholder={`0 (Max ${9.789})`}
        className="mb-40"
        classNameBefore="ph-0"
      />

      <div className="css-grid mb-16" style={{ '--gap': '32px' } as React.CSSProperties}>
        <div>
          <div className="flex mb-8">
            <span className="text-sm fw-semibold color-secondary">Uniswap {tranche.tokenA.symbol} amount</span>
            <span className="text-sm fw-semibold color-secondary ml-auto">
              {numberFormat(Number(tranche.tokenARatio) * 100, { minimumFractionDigits: 2 })}%
            </span>
          </div>
          <TokenAmountPreview
            before={<Icon name={tokenAIcon} width={24} height={24} />}
            value={tokenAState?.unscaleBy(tranche.tokenA.decimals)?.toString() || '0'}
            secondary={formatUSD(
              tokenAState?.unscaleBy(tranche.tokenA.decimals)?.multipliedBy(tranche.tokenA.state.price) ?? 0,
            )}
          />
        </div>
        <div>
          <div className="flex mb-8">
            <span className="text-sm fw-semibold color-secondary">Uniswap {tranche.tokenB.symbol} amount</span>
            <span className="text-sm fw-semibold color-secondary ml-auto">
              {numberFormat(Number(tranche.tokenBRatio) * 100, { minimumFractionDigits: 2 })}%
            </span>
          </div>
          <TokenAmountPreview
            before={<Icon name={tokenBIcon} width={24} height={24} />}
            value={tokenBState?.unscaleBy(tranche.tokenB.decimals)?.toString() || '0'}
            secondary={formatUSD(
              tokenBState?.unscaleBy(tranche.tokenB.decimals)?.multipliedBy(tranche.tokenB.state.price) ?? 0,
            )}
          />
        </div>
      </div>
      <Icon
        name="down-arrow-circle"
        width={32}
        height={32}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{tranche.eTokenSymbol} amount</span>
        {/* <span className="text-sm fw-semibold color-secondary ml-auto">$ 63,132.11 per bb_ET_WBTC50/ETH50</span> */}
      </div>
      <TokenAmountPreview
        before={<IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={24} />}
        value={formatToken(tokenEState?.dividedBy(tranche.sFactorE)) ?? '0'}
        className="mb-32"
      />

      <TransactionDetails
        className="mb-32"
        showSlippage
        slippage={slippage * 100}
        slippageHint="Your transaction will revert if the amount of tokens you actually receive is smaller by this percentage."
        showDeadline
        deadline={20}
        onChange={fd => console.log({ fd })}>
        Uniswap transaction details
      </TransactionDetails>
      {selectedTokenContract.isAllowedOf(ePoolPeripheryContract.address) === false && (
        <div className={'flex align-center col-gap-24 mb-32'}>
          <EnableTokenButton
            contract={selectedTokenContract}
            address={ePoolPeripheryContract.address}
            tokenSymbol={selectedTokenSymbol}
          />
        </div>
      )}

      <div className="grid flow-col col-gap-32 align-center justify-space-between">
        <Link to={`/smart-exposure/pools/${poolAddress}/${trancheAddress}`} className="button-back">
          <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
          Cancel
        </Link>
        <button type="submit" className="button-primary">
          Deposit
        </button>
      </div>
    </form>
  );
};

const EnableTokens = ({
  tokenAContract,
  tokenBContract,
  poolAddress,
  tranche,
  className,
}: {
  tokenAContract: Erc20Contract;
  tokenBContract: Erc20Contract;
  poolAddress: string;
  tranche: TrancheApiType;
  className?: string;
}) => {
  return (
    <div className={classNames('flex align-center col-gap-24', className)}>
      {tokenAContract.isAllowedOf(poolAddress) === false && (
        <EnableTokenButton contract={tokenAContract} address={poolAddress} tokenSymbol={tranche.tokenA.symbol} />
      )}
      {tokenAContract.isAllowedOf(poolAddress) === false && tokenBContract.isAllowedOf(poolAddress) === false && (
        <span className="middle-dot color-border" />
      )}
      {tokenBContract.isAllowedOf(poolAddress) === false && (
        <EnableTokenButton contract={tokenBContract} address={poolAddress} tokenSymbol={tranche.tokenB.symbol} />
      )}
    </div>
  );
};

const EnableTokenButton = ({
  contract,
  address,
  tokenSymbol,
}: {
  contract: Erc20Contract;
  address: string;
  tokenSymbol: KnownTokens;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      className="button-primary"
      style={{ flexGrow: 1 }}
      disabled={loading}
      onClick={() => {
        setLoading(true);
        contract.approve(address, true).finally(() => setLoading(false));
      }}>
      Enable {tokenSymbol}
    </button>
  );
};
