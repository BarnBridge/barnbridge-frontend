import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import { EnableTokenButton, EnableTokens } from 'components/custom/enable-token';
import Icon, { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount, TokenAmountPreview, TokenSelect } from 'components/custom/token-amount-new';
import { InfoTooltip } from 'components/custom/tooltip';
import TransactionDetails from 'components/custom/transaction-details';
import { Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { useContract } from 'hooks/useContract';
import { TrancheApiType, useSeAPI } from 'modules/smart-exposure/api';
import { useEPoolContract, useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';

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
  const { getTokenBySymbol, getTokenIconBySymbol } = useKnownTokens();
  const [tranche, setTranche] = useState<TrancheApiType>();
  const [activeTab, setActiveTab] = useState<string>('multiple');
  const { ePoolPeripheryContract } = useSEPools();
  const seAPI = useSeAPI();
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
  const tokenEContract = useContract(trancheAddress, {
    loadCommon: true,
    loadBalance: true,
  });

  useEffect(() => {
    seAPI.fetchTranche(trancheAddress).then(result => {
      setTranche(result);
    });
  }, [trancheAddress]);

  if (!tranche || !tokenAContract || !tokenBContract || !tokenEContract) {
    return <Spinner className="mh-auto" />;
  }

  const tokenA = getTokenBySymbol(tranche.tokenA.symbol);
  const tokenB = getTokenBySymbol(tranche.tokenB.symbol);
  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  return (
    <>
      <div className="flex mb-16">
        <Link to={`/smart-exposure/pools/${poolAddress}/${trancheAddress}`} className="button-text">
          <Icon name="arrow-back" color="inherit" className="mr-8" />
          Tranche details
        </Link>
      </div>
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
              {formatToken(tokenAContract.balance, {
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
              {formatToken(tokenBContract.balance, {
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
              {formatToken(tokenEContract.balance, {
                scale: tokenEContract.decimals,
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
          {activeTab === 'multiple'
            ? 'Build your SMART Exposure position by minting eTokens with both the tokens in the tranche according to the current tranche ratio.'
            : 'Build your SMART Exposure position by minting a specified amount of eTokens with a single input token. The amount of deposited token you see will have a portion of it swapped for the second token, which is where the slippage and deadline parameters will be used.'}
        </Text>
        {/* <Tabs
          tabs={tabs}
          activeKey={activeTab}
          onClick={setActiveTab}
          className="mb-32"
          variation="elastic"
          size="small"
        /> */}
        {activeTab === 'multiple' ? (
          <MultipleTokensForm
            tranche={tranche}
            tokenAContract={tokenAContract}
            tokenBContract={tokenBContract}
            tokenEContract={tokenEContract}
          />
        ) : (
          <SingleTokenForm
            tranche={tranche}
            tokenAContract={tokenAContract}
            tokenBContract={tokenBContract}
            tokenEContract={tokenEContract}
          />
        )}
      </div>
    </>
  );
};

export default DepositView;

const MultipleTokensForm = ({
  tranche,
  tokenAContract,
  tokenBContract,
  tokenEContract,
}: {
  tranche: TrancheApiType;
  tokenAContract: Erc20Contract;
  tokenBContract: Erc20Contract;
  tokenEContract: Erc20Contract;
}) => {
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tokenAState, setTokenAState] = useState<string>('');
  const [tokenBState, setTokenBState] = useState<string>('');
  const [tokenEState, setTokenEState] = useState<BigNumber | undefined>();
  const ePoolContract = useEPoolContract(poolAddress);
  const { ePoolHelperContract } = useSEPools();
  const [loading, setLoading] = useState<boolean>(false);
  const { getTokenIconBySymbol } = useKnownTokens();

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
      .then(amountB => setTokenBState(amountB?.unscaleBy(tranche.tokenB.decimals)?.toString() ?? ''));
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
      .then(amountA => setTokenAState(amountA?.unscaleBy(tranche.tokenA.decimals)?.toString() ?? ''));
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

  const handleDeposit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tokenEState) {
      return;
    }

    setLoading(true);

    try {
      await ePoolContract?.deposit(trancheAddress, tokenEState);

      setTokenAState('');
      setTokenBState('');
      setTokenEState(undefined);
      tokenAContract.loadBalance();
      tokenBContract.loadBalance();
      tokenEContract.loadBalance();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const tokenAErrors = useMemo(() => {
    const errors: string[] = [];

    if (tokenAState && !tokenAState.match(/^(\d+\.?\d*|\.\d+)$/)) {
      errors.push('Wrong number format');
    }

    if (tokenAMax.isLessThan(tokenAState)) {
      errors.push('Insufficient balance');
    }

    return errors;
  }, [tokenAMax, tokenAState]);

  const tokenBErrors = useMemo(() => {
    const errors: string[] = [];

    if (tokenBState && !tokenBState.match(/^(\d+\.?\d*|\.\d+)$/)) {
      errors.push('Wrong number format');
    }

    if (tokenBMax.isLessThan(tokenBState)) {
      errors.push('Insufficient balance');
    }

    return errors;
  }, [tokenBMax, tokenBState]);

  const disableSubmit =
    !tokenAState ||
    !tokenBState ||
    !!tokenAErrors.length ||
    !!tokenBErrors.length ||
    tokenAContract.isAllowedOf(poolAddress) === false ||
    tokenBContract.isAllowedOf(poolAddress) === false;

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
        before={<Icon name={tokenAIcon as IconNames} width={24} height={24} />}
        value={tokenAState}
        secondary={formatUSD(BigNumber.from(tokenAState)?.multipliedBy(tranche.tokenA.state.price) ?? 0)}
        onChange={value => {
          setTokenAState(value);
          handleAmountTokenA(value);
        }}
        max={tokenAMax}
        placeholder={`0 (Max ${tokenAMax ?? 0})`}
        className="mb-16"
        errors={tokenAErrors}
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
        before={<Icon name={tokenBIcon as IconNames} width={24} height={24} />}
        value={tokenBState}
        secondary={formatUSD(BigNumber.from(tokenBState)?.multipliedBy(tranche.tokenB.state.price) ?? 0)}
        onChange={value => {
          setTokenBState(value);
          handleAmountTokenB(value);
        }}
        max={tokenBMax}
        placeholder={`0 (Max ${tokenBMax ?? 0})`}
        className="mb-16"
        errors={tokenBErrors}
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
        <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
          {tranche.eTokenSymbol} amount <InfoTooltip>These tokens represent your share in the tranche.</InfoTooltip>
        </Text>
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
        <button type="submit" className="button-primary" disabled={loading || disableSubmit}>
          {loading && <Spinner className="mr-8" />}
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
  tokenEContract,
}: {
  tranche: TrancheApiType;
  tokenAContract: Erc20Contract;
  tokenBContract: Erc20Contract;
  tokenEContract: Erc20Contract;
}) => {
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const tokens: [KnownTokens, KnownTokens] = [tranche.tokenA.symbol, tranche.tokenB.symbol];

  const { getTokenIconBySymbol } = useKnownTokens();
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<KnownTokens>(tokens[0]);
  const [tokenState, setTokenState] = useState<BigNumber | undefined>();
  const [tokenEState, setTokenEState] = useState<string>('');
  const [selectedTokenEMax, setSelectedTokenEMax] = useState<BigNumber | undefined>();
  const { ePoolPeripheryContract } = useSEPools();
  const [transactionDetails, setTransactionDetails] = useState<{ deadline?: number; slippage?: number }>({
    deadline: 20,
    slippage: 0.5,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const isTokenA = selectedTokenSymbol === tranche.tokenA.symbol;

  const selectedTokenContract = isTokenA ? tokenAContract : tokenBContract;
  const selectedTokenDecimals = tranche[isTokenA ? 'tokenA' : 'tokenB'].decimals;

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  useEffect(() => {
    setTokenState(undefined);
    setTokenEState('');
  }, [selectedTokenSymbol]);

  useEffect(() => {
    const amount = selectedTokenContract.balance;
    if (!amount || !ePoolPeripheryContract) {
      return;
    }

    ePoolPeripheryContract?.[isTokenA ? 'getETokenForMinInputAmountA' : 'getETokenForMinInputAmountB'](
      poolAddress,
      trancheAddress,
      amount,
    ).then(val => {
      setSelectedTokenEMax(val?.dividedBy(tranche.sFactorE));
    });
  }, [ePoolPeripheryContract, isTokenA, poolAddress, selectedTokenContract.balance, tranche.sFactorE, trancheAddress]);

  const handleAmountTokenE = useDebounce((value: string) => {
    const amount = BigNumber.from(value)?.multipliedBy(tranche.sFactorE);
    if (!amount || !ePoolPeripheryContract) {
      return;
    }
    ePoolPeripheryContract?.[isTokenA ? 'getMinInputAmountAForEToken' : 'getMinInputAmountBForEToken'](
      poolAddress,
      trancheAddress,
      amount,
    ).then(val => {
      setTokenState(val);
    });
  }, 400);

  const tokenStateWithSlippage = tokenState?.multipliedBy(1 + (transactionDetails.slippage ?? 0) / 100);

  const handleDeposit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tokenEAmount = BigNumber.from(tokenEState)?.multipliedBy(tranche.sFactorE);

    if (!tokenEAmount || !tokenStateWithSlippage) {
      return;
    }

    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(transactionDetails.deadline) * 60);

    setLoading(true);

    try {
      await ePoolPeripheryContract?.[isTokenA ? 'depositForMaxTokenA' : 'depositForMaxTokenB'](
        poolAddress,
        trancheAddress,
        tokenEAmount,
        tokenStateWithSlippage.scaleBy(selectedTokenDecimals) ?? BigNumber.ZERO,
        deadlineTs,
      );

      setTokenState(undefined);
      setTokenEState('');
      tokenAContract.loadBalance();
      tokenBContract.loadBalance();
      tokenEContract.loadBalance();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const tokenEErrors = useMemo(() => {
    const errors: string[] = [];

    if (tokenEState && !tokenEState.match(/^(\d+\.?\d*|\.\d+)$/)) {
      errors.push('Wrong number format');
    }

    if (selectedTokenEMax?.isLessThan(tokenEState)) {
      errors.push('Insufficient balance');
    }

    return errors;
  }, [selectedTokenEMax, tokenEState]);

  const disableSubmit =
    !tokenEState ||
    !!tokenEErrors.length ||
    selectedTokenContract.isAllowedOf(ePoolPeripheryContract.address) === false;

  if (!ePoolPeripheryContract) {
    return null;
  }

  return (
    <form onSubmit={handleDeposit}>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{selectedTokenSymbol} amount</span>
        {/* <span className="text-sm fw-semibold color-secondary ml-auto">
          Current ratio: {formatPercent(Number(isTokenA ? tranche.tokenARatio : tranche.tokenBRatio))}
        </span> */}
      </div>
      <TokenAmountPreview
        before={
          <TokenSelect
            value={selectedTokenSymbol}
            onChange={setSelectedTokenSymbol}
            tokens={tokens}
            style={{ backgroundColor: 'var(--theme-card-color)' }}
          />
        }
        value={formatToken(tokenStateWithSlippage?.unscaleBy(selectedTokenDecimals)) ?? '0'}
        secondary={formatUSD(
          tokenStateWithSlippage
            ?.unscaleBy(selectedTokenDecimals)
            ?.multipliedBy(tranche[isTokenA ? 'tokenA' : 'tokenB'].state.price) ?? 0,
        )}
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
        <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
          {tranche.eTokenSymbol} amount <InfoTooltip>These tokens represent your share in the tranche.</InfoTooltip>
        </Text>
        {/* <span className="text-sm fw-semibold color-secondary ml-auto">$ 63,132.11 per bb_ET_WBTC50/ETH50</span> */}
      </div>
      <TokenAmount
        before={<IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={24} />}
        value={tokenEState}
        secondary={formatUSD(BigNumber.from(tokenEState)?.multipliedBy(tranche.state.eTokenPrice))}
        onChange={value => {
          setTokenEState(value);
          handleAmountTokenE(value);
        }}
        max={selectedTokenEMax}
        placeholder={`0 (Max ${selectedTokenEMax ?? 0})`}
        className="mb-32"
        slider
        errors={tokenEErrors}
      />

      <TransactionDetails
        className="mb-32"
        showSlippage
        slippage={transactionDetails.slippage}
        slippageHint="Your transaction will revert if the amount of tokens you actually receive is smaller by this percentage."
        showDeadline
        deadline={transactionDetails.deadline}
        onChange={setTransactionDetails}>
        Swap transaction details
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
        <button type="submit" className="button-primary" disabled={loading || disableSubmit}>
          {loading && <Spinner className="mr-8" />}
          Deposit
        </button>
      </div>
    </form>
  );
};
