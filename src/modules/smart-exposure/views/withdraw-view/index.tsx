import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import { EnableTokenButton } from 'components/custom/enable-token';
import Icon, { IconNames } from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Spinner } from 'components/custom/spinner';
import { Tabs } from 'components/custom/tabs';
import { TokenAmount, TokenAmountPreview, TokenSelect } from 'components/custom/token-amount-new';
import TransactionDetails from 'components/custom/transaction-details';
import { TransactionSummary } from 'components/custom/transaction-summary';
import { Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { useContract } from 'hooks/useContract';
import { TrancheApiType, useSeAPI } from 'modules/smart-exposure/api';
import { useEPoolContract, useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';
import { useWallet } from 'wallets/walletProvider';

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

const WithdrawView: React.FC = () => {
  const wallet = useWallet();
  const { getTokenBySymbol, getTokenIconBySymbol } = useKnownTokens();
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tranche, setTranche] = useState<TrancheApiType>();
  const [activeTab, setActiveTab] = useState<string>('multiple');
  const { ePoolPeripheryContract } = useSEPools();
  const seAPI = useSeAPI();

  useEffect(() => {
    seAPI.fetchTranche(trancheAddress).then(result => {
      setTranche(result);
    });
  }, [trancheAddress]);

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
    loadAllowance: [poolAddress, ePoolPeripheryContract.address],
    loadCommon: true,
    loadBalance: true,
  });

  if (!tranche || !tokenEContract || !tokenAContract || !tokenBContract) {
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
              {formatToken(tokenEContract.getBalanceOf(wallet.account), {
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
          Withdraw
        </Text>
        <Text type="p2" weight="semibold" color="secondary" className="mb-32">
          {activeTab === 'multiple'
            ? 'Withdraw from your position by burning eTokens of this tranche for the underlying tranche tokens according to the current tranche ratio.'
            : 'Withdraw from your position by burning eTokens of this tranche for one of the underlying tranche tokens. The second underlying token will be swapped for the token you want to receive, which is where the slippage and deadline parameters will be used.'}
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

export default WithdrawView;

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
  const { getTokenIconBySymbol } = useKnownTokens();
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tokenEState, setTokenEState] = useState<string>('');
  const [tokenAState, setTokenAState] = useState<BigNumber | undefined>();
  const [tokenBState, setTokenBState] = useState<BigNumber | undefined>();
  const ePoolContract = useEPoolContract(poolAddress);
  const { ePoolHelperContract, ePoolPeripheryContract } = useSEPools();
  const [loading, setLoading] = useState<boolean>(false);

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  const tokenEAmountHandler = useDebounce((value: string) => {
    if (!ePoolPeripheryContract) {
      return;
    }

    const amount = BigNumber.from(value)?.multipliedBy(tranche.sFactorE) ?? BigNumber.ZERO;

    if (!amount) {
      return;
    }

    ePoolHelperContract.getTokenATokenBForEToken(poolAddress, trancheAddress, amount).then(({ amountA, amountB }) => {
      setTokenAState(amountA);
      setTokenBState(amountB);
    });
  }, 400);

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = BigNumber.from(tokenEState) ?? BigNumber.ZERO;

    if (!amount) {
      return;
    }

    setLoading(true);

    try {
      await ePoolContract.redeem(tranche.eTokenAddress, amount.multipliedBy(tranche.sFactorE));

      setTokenEState('');
      setTokenAState(undefined);
      setTokenBState(undefined);
      tokenAContract.loadBalance();
      tokenBContract.loadBalance();
      tokenEContract.loadBalance();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const feeRate = BigNumber.from(ePoolContract.feeRate ?? 0)?.unscaleBy(18) ?? 0;
  const tokenEMax = tokenEContract.balance?.unscaleBy(tokenEContract?.decimals) ?? BigNumber.ZERO;

  const tokenEErrors = useMemo(() => {
    const errors: string[] = [];

    if (tokenEState && !tokenEState.toString().match(/^(\d+\.?\d*|\.\d+)$/)) {
      errors.push('Wrong number format');
    }

    if (tokenEMax.isLessThan(tokenEState)) {
      errors.push('Insufficient balance');
    }

    return errors;
  }, [tokenEMax, tokenEState]);

  const disableSubmit = !tokenEState || !!tokenEErrors.length || tokenEContract.isAllowedOf(poolAddress) === false;

  return (
    <form onSubmit={submitHandler}>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{tranche.eTokenSymbol} amount</span>
      </div>
      <TokenAmount
        before={<IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={24} />}
        value={tokenEState}
        onChange={value => {
          setTokenEState(value);
          tokenEAmountHandler(value);
        }}
        max={tokenEMax}
        placeholder={`0 (Max ${tokenEMax ?? 0})`}
        className="mb-8"
        slider
        errors={tokenEErrors}
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
        <span className="text-sm fw-semibold color-secondary">{tranche.tokenA.symbol} amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">
          Current ratio: {formatPercent(Number(tranche.tokenARatio))}
        </span>
      </div>
      <TokenAmountPreview
        before={<Icon name={tokenAIcon as IconNames} width={24} height={24} />}
        value={tokenAState?.unscaleBy(tranche.tokenA.decimals)?.toString() || '0'}
        secondary={formatUSD(
          tokenAState?.unscaleBy(tranche.tokenA.decimals)?.multipliedBy(tranche.tokenA.state.price) ?? 0,
        )}
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
      <TokenAmountPreview
        before={<Icon name={tokenBIcon as IconNames} width={24} height={24} />}
        value={tokenBState?.unscaleBy(tranche.tokenB.decimals)?.toString() || '0'}
        secondary={formatUSD(
          tokenBState?.unscaleBy(tranche.tokenB.decimals)?.multipliedBy(tranche.tokenB.state.price) ?? 0,
        )}
        className="mb-32"
      />

      <TransactionSummary
        className="mb-32"
        items={[
          [
            <Text type="small" weight="semibold" color="secondary">
              Transaction fees
            </Text>,
            <Text type="p2" weight="semibold" color="primary">
              {formatUSD(
                BigNumber.from(tokenEState)?.multipliedBy(tranche.state.eTokenPrice).multipliedBy(feeRate) ?? 0,
              )}{' '}
              ({formatPercent(feeRate)})
            </Text>,
          ],
          [
            <Text type="small" weight="semibold" color="secondary">
              {tranche.tokenA.symbol} amount
            </Text>,
            <Text type="p1" weight="bold" color="primary">
              {formatToken(tokenAState?.minus(tokenAState.multipliedBy(feeRate))?.unscaleBy(tranche.tokenA.decimals)) ||
                '0'}{' '}
              {tranche.tokenA.symbol}
            </Text>,
          ],
          [
            <Text type="small" weight="semibold" color="secondary">
              {tranche.tokenB.symbol} amount
            </Text>,
            <Text type="p1" weight="bold" color="primary">
              {formatToken(tokenBState?.minus(tokenBState.multipliedBy(feeRate))?.unscaleBy(tranche.tokenB.decimals)) ||
                '0'}{' '}
              {tranche.tokenB.symbol}
            </Text>,
          ],
        ]}
      />

      <EnableTokenButton
        contract={tokenEContract}
        address={poolAddress}
        tokenSymbol={tranche.eTokenSymbol}
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
          Withdraw
        </button>
      </div>
      <ContractListener contract={ePoolContract} />
    </form>
  );
};

const debounceOptions = {
  // leading: true,
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
  const { getTokenBySymbol, getTokenIconBySymbol } = useKnownTokens();
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tokenEState, setTokenEState] = useState<string>('');
  const [selectedTokenValue, setSelectedTokenValue] = useState<BigNumber | undefined>();

  const tokens: [KnownTokens, KnownTokens] = [tranche.tokenA.symbol, tranche.tokenB.symbol];
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<KnownTokens>(tokens[0]);
  const ePoolContract = useEPoolContract(poolAddress);
  const { ePoolPeripheryContract } = useSEPools();

  const [transactionDetails, setTransactionDetails] = useState<{ deadline?: number; slippage?: number }>({
    deadline: 20,
    slippage: 0.5,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const selectedToken = getTokenBySymbol(selectedTokenSymbol);

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  const isTokenA = selectedTokenSymbol === tranche.tokenA.symbol;
  const selectedTokenDecimals = isTokenA ? tranche.tokenA.decimals : tranche.tokenB.decimals;

  const selectedTokenValueMinusSlippage = selectedTokenValue?.multipliedBy(
    1 - (transactionDetails.slippage ?? 0) / 100,
  );

  const tokenHandler = useCallback(
    (value: string, _isTokenA: boolean) => {
      const amount = BigNumber.from(value)?.multipliedBy(tranche.sFactorE);
      if (!amount) {
        return;
      }

      ePoolPeripheryContract?.[_isTokenA ? 'getMaxOutputAmountAForEToken' : 'getMaxOutputAmountBForEToken'](
        poolAddress,
        trancheAddress,
        amount,
      ).then(val => {
        setSelectedTokenValue(val);
      });
    },
    [ePoolPeripheryContract, poolAddress, tranche.sFactorE, trancheAddress],
  );

  const debouncedTokenHandler = useDebounce(tokenHandler, 400, debounceOptions);

  useEffect(() => {
    setSelectedTokenValue(undefined);
    debouncedTokenHandler(tokenEState, isTokenA);
  }, [debouncedTokenHandler, tokenEState, isTokenA]);

  const submitHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount = BigNumber.from(tokenEState)?.multipliedBy(tranche.sFactorE) ?? BigNumber.ZERO;

    if (!amount || !selectedTokenValueMinusSlippage) {
      return;
    }

    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(transactionDetails.deadline ?? 0) * 60);
    setLoading(true);
    try {
      await ePoolPeripheryContract?.[isTokenA ? 'redeemForMinTokenA' : 'redeemForMinTokenB'](
        poolAddress,
        trancheAddress,
        amount,
        selectedTokenValueMinusSlippage.integerValue(),
        deadlineTs,
      );

      setTokenEState('');
      setSelectedTokenValue(undefined);
      tokenAContract.loadBalance();
      tokenBContract.loadBalance();
      tokenEContract.loadBalance();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const feeRate = BigNumber.from(ePoolContract.feeRate ?? 0)?.unscaleBy(18) ?? 0;
  const tokenEMax = tokenEContract.balance?.unscaleBy(tokenEContract.decimals) ?? BigNumber.ZERO;

  const tokenEErrors = useMemo(() => {
    const errors: string[] = [];

    if (tokenEState && !tokenEState.match(/^(\d+\.?\d*|\.\d+)$/)) {
      errors.push('Wrong number format');
    }

    if (tokenEMax.isLessThan(tokenEState)) {
      errors.push('Insufficient balance');
    }

    return errors;
  }, [tokenEMax, tokenEState]);

  const disableSubmit =
    !tokenEState || !!tokenEErrors.length || tokenEContract.isAllowedOf(ePoolPeripheryContract.address) === false;

  return (
    <form onSubmit={submitHandler}>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{tranche.eTokenSymbol} amount</span>
      </div>
      <TokenAmount
        before={<IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={24} />}
        value={tokenEState}
        onChange={setTokenEState}
        max={tokenEMax}
        placeholder={`0 (Max ${tokenEMax ?? 0})`}
        className="mb-8"
        slider
        errors={tokenEErrors}
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
        <span className="text-sm fw-semibold color-secondary">{selectedToken?.symbol} amount</span>
        {/* <span className="text-sm fw-semibold color-secondary ml-auto">
          Current ratio:{' '}
          {formatPercent(
            Number(selectedToken?.symbol === tranche.tokenA.symbol ? tranche.tokenARatio : tranche.tokenBRatio),
          )}
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
        value={formatToken(selectedTokenValueMinusSlippage?.unscaleBy(selectedTokenDecimals)) ?? '-'}
        secondary={formatUSD(
          selectedTokenValueMinusSlippage
            ?.unscaleBy(selectedTokenDecimals)
            ?.multipliedBy(tranche[isTokenA ? 'tokenA' : 'tokenB'].state.price) ?? 0,
        )}
        className="mb-40"
        classNameBefore="ph-0"
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

      <TransactionSummary
        className="mb-32"
        items={[
          [
            <Text type="small" weight="semibold" color="secondary">
              Transaction fees
            </Text>,
            <Text type="p2" weight="semibold" color="primary">
              {formatUSD(
                BigNumber.from(tokenEState)?.multipliedBy(tranche.state.eTokenPrice).multipliedBy(feeRate) ?? 0,
              )}{' '}
              ({formatPercent(feeRate)})
            </Text>,
          ],
          [
            <Text type="small" weight="semibold" color="secondary">
              {selectedTokenSymbol} amount
            </Text>,
            <Text type="p1" weight="bold" color="primary">
              {formatToken(selectedTokenValueMinusSlippage?.unscaleBy(selectedTokenDecimals)) || '0'}{' '}
              {selectedTokenSymbol}
            </Text>,
          ],
        ]}
      />

      <EnableTokenButton
        contract={tokenEContract}
        address={ePoolPeripheryContract.address}
        tokenSymbol={tranche.eTokenSymbol}
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
          Withdraw
        </button>
      </div>
      <ContractListener contract={ePoolContract} />
    </form>
  );
};
