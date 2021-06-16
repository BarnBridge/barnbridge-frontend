import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import { EnableTokenButton, EnableTokens } from 'components/custom/enable-token';
import Icon from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Spinner } from 'components/custom/spinner';
import { Tabs } from 'components/custom/tabs';
import { TokenAmount, TokenAmountPreview, TokenSelect } from 'components/custom/token-amount-new';
import TransactionDetails from 'components/custom/transaction-details';
import { Text } from 'components/custom/typography';
import { KnownTokens, getTokenBySymbol, getTokenIconBySymbol } from 'components/providers/known-tokens-provider';
import { useContract } from 'hooks/useContract';
import { TrancheApiType, fetchTranche } from 'modules/smart-exposure/api';
import { useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';
import { useWallet } from 'wallets/wallet';

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
  const [tranche, setTranche] = useState<TrancheApiType>();
  const [activeTab, setActiveTab] = useState<string>('multiple');
  const { ePoolPeripheryContract } = useSEPools();
  const tokenAContract = useContract(tranche?.tokenA.address, {
    loadAllowance: [poolAddress, ePoolPeripheryContract.address],
    loadCommon: true,
    loadBalance: true,
  });
  const tokenBContract = useContract(tranche?.tokenB.address, {
    loadAllowance: [poolAddress, ePoolPeripheryContract.address],
    loadCommon: true,
    loadBalance: true,
  });
  const selectedTokenContract = useContract(trancheAddress, {
    loadCommon: true,
    loadBalance: true,
  });
  const wallet = useWallet();

  useEffect(() => {
    fetchTranche(poolAddress, trancheAddress).then(result => {
      setTranche(result);
      console.log('tranche', result);
    });
  }, [poolAddress, trancheAddress]);

  if (!tranche || !tokenAContract || !tokenBContract || !selectedTokenContract) {
    return <Spinner className="mh-auto" />;
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
          <SingleTokenForm tranche={tranche} tokenAContract={tokenAContract} tokenBContract={tokenBContract} />
        )}
      </div>
      <ContractListener contract={tokenAContract} />
      <ContractListener contract={tokenBContract} />
      <ContractListener contract={selectedTokenContract} />
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
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tokenAState, setTokenAState] = useState<string>('');
  const [tokenBState, setTokenBState] = useState<string>('');
  const [tokenEState, setTokenEState] = useState<BigNumber | undefined>();
  const { ePoolContract, ePoolHelperContract } = useSEPools();

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  const tokenAMax = tokenAContract.balance?.unscaleBy(tokenAContract.decimals) ?? BigNumber.ZERO;
  const tokenBMax = tokenBContract.balance?.unscaleBy(tokenBContract.decimals) ?? BigNumber.ZERO;

  const handleAmountTokenA = useDebounce((value: string) => {
    if (!ePoolHelperContract) {
      return;
    }
    const amount = BigNumber.from(value)?.scaleBy(tranche.tokenA.decimals);

    if (!amount) {
      setTokenBState('');
      return;
    }

    ePoolHelperContract
      .getTokenBForTokenA(poolAddress, trancheAddress, amount)
      .then(amountB => setTokenBState(amountB.unscaleBy(tranche.tokenB.decimals)?.toString() ?? ''));
  }, 400);

  const handleAmountTokenB = useDebounce((value: string) => {
    if (!ePoolHelperContract) {
      return;
    }
    const amount = BigNumber.from(value)?.scaleBy(tranche.tokenB.decimals);

    if (!amount) {
      setTokenAState('');
      return;
    }

    ePoolHelperContract
      .getTokenAForTokenB(poolAddress, trancheAddress, amount)
      .then(amountA => setTokenAState(amountA.unscaleBy(tranche.tokenA.decimals)?.toString() ?? ''));
  }, 400);

  useEffect(() => {
    const amountA = BigNumber.from(tokenAState)?.scaleBy(tranche.tokenA.decimals);
    const amountB = BigNumber.from(tokenBState)?.scaleBy(tranche.tokenB.decimals);

    if (!amountA || !amountB) {
      setTokenEState(undefined);
      return;
    }

    ePoolHelperContract
      ?.getETokenForTokenATokenB(poolAddress, trancheAddress, amountA, amountB)
      .then(val => setTokenEState(BigNumber.from(val)));
  }, [tokenAState, tokenBState, ePoolHelperContract, tranche, poolAddress, trancheAddress]);

  const handleDeposit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tokenEState) {
      return;
    }

    ePoolContract?.deposit(trancheAddress, tokenEState);
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
        <span className="text-sm fw-semibold color-secondary ml-auto">
          {formatUSD(Number(tranche.state.eTokenPrice))} per {tranche.eTokenSymbol}
        </span>
      </div>
      <TokenAmountPreview
        before={<IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={24} />}
        value={formatToken(tokenEState?.dividedBy(tranche.sFactorE)) ?? '0'}
        secondary={formatUSD(tokenEState?.dividedBy(tranche.sFactorE).multipliedBy(tranche.state.eTokenPrice))}
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

const SingleTokenForm = ({
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
  const tokens: [KnownTokens, KnownTokens] = [tranche.tokenA.symbol, tranche.tokenB.symbol];

  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<KnownTokens>(tokens[0]);
  const [tokenState, setTokenState] = useState<string>('');
  const { ePoolPeripheryContract } = useSEPools();
  const [tokenEState, setTokenEState] = useState<BigNumber | undefined>();
  const [transactionDetails, setTransactionDetails] = useState<{ deadline?: number; slippage?: number }>({
    deadline: 20,
    slippage: 0.5,
  });

  const isTokenA = selectedTokenSymbol === tranche.tokenA.symbol;

  const selectedTokenContract = isTokenA ? tokenAContract : tokenBContract;
  const selectedTokenDecimals = tranche[isTokenA ? 'tokenA' : 'tokenB'].decimals;

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  const selectedTokenMax =
    selectedTokenContract.getBalanceOf(wallet.account)?.unscaleBy(tranche[isTokenA ? 'tokenA' : 'tokenB'].decimals) ??
    BigNumber.ZERO;

  useEffect(() => {
    const amount = BigNumber.from(tokenState)?.scaleBy(selectedTokenDecimals);
    if (!amount || !ePoolPeripheryContract) {
      return;
    }

    ePoolPeripheryContract?.[isTokenA ? 'getMinInputAmountAForEToken' : 'getMinInputAmountBForEToken'](
      poolAddress,
      trancheAddress,
      amount,
    ).then(val => {
      setTokenEState(val);
    });
  }, [ePoolPeripheryContract, isTokenA, poolAddress, selectedTokenDecimals, tokenState, trancheAddress]);

  const handleDeposit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tokenState || !tokenEState) {
      return;
    }

    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(transactionDetails.deadline) * 60);

    ePoolPeripheryContract?.[isTokenA ? 'depositForMaxTokenA' : 'depositForMaxTokenB'](
      poolAddress,
      tranche.eTokenAddress,
      tokenEState.integerValue(),
      BigNumber.from(tokenState)
        ?.multipliedBy(1 - (transactionDetails.slippage ?? 0) / 100)
        .scaleBy(selectedTokenDecimals) ?? BigNumber.ZERO,
      deadlineTs,
    );
  };

  if (!ePoolPeripheryContract) {
    return null;
  }

  return (
    <form onSubmit={handleDeposit}>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{selectedTokenSymbol} amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">
          Current ratio: {formatPercent(Number(isTokenA ? tranche.tokenARatio : tranche.tokenBRatio))}
        </span>
      </div>
      <TokenAmount
        before={<TokenSelect value={selectedTokenSymbol} onChange={setSelectedTokenSymbol} tokens={tokens} />}
        value={tokenState}
        secondary={formatUSD(
          BigNumber.from(tokenState)?.multipliedBy(tranche[isTokenA ? 'tokenA' : 'tokenB'].state.price) ?? 0,
        )}
        onChange={setTokenState}
        max={selectedTokenMax.toNumber()}
        placeholder={`0 (Max ${selectedTokenMax})`}
        className="mb-16"
        classNameBefore="ph-0"
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
        {/* <span className="text-sm fw-semibold color-secondary ml-auto">$ 63,132.11 per bb_ET_WBTC50/ETH50</span> */}
      </div>
      <TokenAmountPreview
        before={<IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={24} />}
        value={formatToken(tokenEState?.dividedBy(tranche.sFactorE)) ?? '0'}
        secondary={formatUSD(tokenEState?.dividedBy(tranche.sFactorE).multipliedBy(tranche.state.eTokenPrice))}
        className="mb-32"
      />

      <TransactionDetails
        className="mb-32"
        showSlippage
        slippage={transactionDetails.slippage}
        slippageHint="Your transaction will revert if the amount of tokens you actually receive is smaller by this percentage."
        showDeadline
        deadline={transactionDetails.deadline}
        onChange={setTransactionDetails}>
        Uniswap transaction details
      </TransactionDetails>

      <EnableTokenButton
        contract={selectedTokenContract}
        address={ePoolPeripheryContract.address}
        tokenSymbol={selectedTokenSymbol}
        className="mb-32"
        style={{ width: '100%' }}
      />

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
