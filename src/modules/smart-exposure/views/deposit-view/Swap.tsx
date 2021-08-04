import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import { useContractManager } from 'web3/components/contractManagerProvider';
import Erc20Contract from 'web3/erc20Contract';
import { formatUSD } from 'web3/utils';

import { Link } from 'components/button';
import { EnableTokenButton } from 'components/custom/enable-token';
import OldIcon from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount, TokenAmountPreview, TokenSelect } from 'components/custom/token-amount-new';
import TransactionDetails from 'components/custom/transaction-details';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon } from 'components/token-icon';
import { TrancheApiType } from 'modules/smart-exposure/api';
import SeUniswapRouterContract from 'modules/smart-exposure/contracts/seUniswapRouterContract';
import { useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';
import { useWallet } from 'wallets/walletProvider';

import { numberFormat } from '../../../../utils';

export const Swap = ({
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
  const wallet = useWallet();
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const tokens: [KnownTokens, KnownTokens] = [tranche.tokenA.symbol, tranche.tokenB.symbol];

  const { getTokenIconBySymbol } = useKnownTokens();
  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<KnownTokens>(tokens[0]);
  const [tokenState, setTokenState] = useState<string>('');
  const [tokenAState, setTokenAState] = useState<BigNumber | undefined>();
  const [tokenBState, setTokenBState] = useState<BigNumber | undefined>();
  const [uniswapRouterContract, setUniswapRouterContract] = useState<SeUniswapRouterContract | undefined>();
  const [selectedTokenSwapAmount, setSelectedTokenSwapAmount] = useState<BigNumber | undefined>();
  const { ePoolPeripheryContract, ePoolHelperContract } = useSEPools();
  const [transactionDetails, setTransactionDetails] = useState<{ deadline?: number; slippage?: number }>({
    deadline: 20,
    slippage: 0.5,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { getContract } = useContractManager();

  const isTokenA = selectedTokenSymbol === tranche.tokenA.symbol;

  const selectedTokenContract = isTokenA ? tokenAContract : tokenBContract;
  const selectedTokenDecimals = tranche[isTokenA ? 'tokenA' : 'tokenB'].decimals;

  useEffect(() => {
    setTokenState('');
    setTokenAState(undefined);
    setTokenBState(undefined);
    setSelectedTokenSwapAmount(undefined);
  }, [isTokenA]);

  useEffect(() => {
    ePoolPeripheryContract?.getRouter().then(address => {
      const routerContract = getContract(address, () => new SeUniswapRouterContract(address));
      setUniswapRouterContract(routerContract);
    });
  }, [ePoolPeripheryContract]);

  useEffect(() => {
    if (uniswapRouterContract?.address) {
      selectedTokenContract.loadAllowance(uniswapRouterContract?.address);
    }
  }, [selectedTokenContract, uniswapRouterContract?.address]);

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  const selectedTokenMax =
    selectedTokenContract.getBalanceOf(wallet.account)?.unscaleBy(selectedTokenDecimals) ?? BigNumber.ZERO;

  const tokenHandler = useCallback(
    (value: string, _isTokenA: boolean) => {
      setSelectedTokenSwapAmount(undefined);
      const amount = BigNumber.from(value)?.scaleBy(selectedTokenDecimals);
      if (!amount || !ePoolHelperContract) {
        return;
      }

      ePoolHelperContract?.[_isTokenA ? 'getTokenATokenBForTokenA' : 'getTokenATokenBForTokenB'](
        poolAddress,
        trancheAddress,
        amount,
      )
        .then(({ amountA, amountB }) => {
          setTokenAState(amountA);
          setTokenBState(amountB);

          uniswapRouterContract
            ?.getAmountsIn(
              _isTokenA ? amountB : amountA,
              _isTokenA
                ? [tranche.tokenA.address, tranche.tokenB.address]
                : [tranche.tokenB.address, tranche.tokenA.address],
            )
            .then(routerValues => {
              setSelectedTokenSwapAmount(routerValues[_isTokenA ? 0 : 1]);
            })
            .catch(e => {
              console.error(e);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    [
      ePoolHelperContract,
      poolAddress,
      trancheAddress,
      selectedTokenDecimals,
      tranche.tokenA.address,
      tranche.tokenB.address,
      uniswapRouterContract,
    ],
  );

  const debouncedTokenHandler = useDebounce(tokenHandler, 400);

  useEffect(() => {
    setTokenAState(undefined);
    setTokenBState(undefined);
    debouncedTokenHandler(tokenState, isTokenA);
  }, [debouncedTokenHandler, tokenState, isTokenA]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amountOut = isTokenA ? tokenBState : tokenAState;

    if (!amountOut || !wallet.account) return;

    setLoading(true);
    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(transactionDetails.deadline) * 60);
    uniswapRouterContract
      ?.swapTokensForExactTokens(
        amountOut,
        selectedTokenSwapAmount?.multipliedBy(1 + (transactionDetails.slippage ?? 0) / 100).integerValue() ??
          BigNumber.ZERO,
        isTokenA ? [tranche.tokenA.address, tranche.tokenB.address] : [tranche.tokenB.address, tranche.tokenA.address],
        wallet.account,
        deadlineTs,
      )
      .then(() => {
        setTokenState('');
        tokenAContract.loadBalance();
        tokenBContract.loadBalance();
        tokenEContract.loadBalance();
      })
      .catch(e => {
        console.error(e);
      });

    setLoading(false);
  };

  const tokenMax = selectedTokenContract.balance?.unscaleBy(selectedTokenContract.decimals) ?? BigNumber.ZERO;

  const tokenErrors = useMemo(() => {
    const errors: string[] = [];

    if (tokenState && !tokenState.match(/^(\d+\.?\d*|\.\d+)$/)) {
      errors.push('Wrong number format');
    }

    if (tokenMax.isLessThan(tokenState)) {
      errors.push('Insufficient balance');
    }

    return errors;
  }, [tokenMax, tokenState]);

  const disableSubmit =
    !tokenState ||
    !!tokenErrors.length ||
    (uniswapRouterContract?.address
      ? selectedTokenContract.isAllowedOf(uniswapRouterContract?.address ?? '') === false
      : false);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{selectedTokenSymbol} amount</span>
      </div>
      <TokenAmount
        before={<TokenSelect value={selectedTokenSymbol} onChange={setSelectedTokenSymbol} tokens={tokens} />}
        value={tokenState}
        secondary={formatUSD(
          BigNumber.from(tokenState)?.multipliedBy(tranche[isTokenA ? 'tokenA' : 'tokenB'].state.price) ?? 0,
        )}
        onChange={setTokenState}
        max={selectedTokenMax}
        placeholder={`0 (Max ${selectedTokenMax})`}
        className="mb-16"
        classNameBefore="ph-0"
        errors={tokenErrors}
      />
      <OldIcon
        name="down-arrow-circle"
        width={32}
        height={32}
        style={{
          display: 'block',
          margin: '0 auto',
        }}
      />
      <div className="css-grid mb-32" style={{ '--gap': '32px' } as React.CSSProperties}>
        <div>
          <div className="flex mb-8">
            <span className="text-sm fw-semibold color-secondary">{tranche.tokenA.symbol} amount</span>
            <span className="text-sm fw-semibold color-secondary ml-auto">
              {numberFormat(Number(tranche.tokenARatio) * 100, { minimumFractionDigits: 2 })}%
            </span>
          </div>
          <TokenAmountPreview
            before={<TokenIcon name={tokenAIcon} size={24} />}
            value={tokenAState?.unscaleBy(tranche.tokenA.decimals)?.toString() || '0'}
            secondary={formatUSD(
              tokenAState?.unscaleBy(tranche.tokenA.decimals)?.multipliedBy(tranche.tokenA.state.price) ?? 0,
            )}
          />
        </div>
        <div>
          <div className="flex mb-8">
            <span className="text-sm fw-semibold color-secondary">{tranche.tokenB.symbol} amount</span>
            <span className="text-sm fw-semibold color-secondary ml-auto">
              {numberFormat(Number(tranche.tokenBRatio) * 100, { minimumFractionDigits: 2 })}%
            </span>
          </div>
          <TokenAmountPreview
            before={<TokenIcon name={tokenBIcon} size={24} />}
            value={tokenBState?.unscaleBy(tranche.tokenB.decimals)?.toString() || '0'}
            secondary={formatUSD(
              tokenBState?.unscaleBy(tranche.tokenB.decimals)?.multipliedBy(tranche.tokenB.state.price) ?? 0,
            )}
          />
        </div>
      </div>

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

      {uniswapRouterContract?.address ? (
        <EnableTokenButton
          contract={selectedTokenContract}
          address={uniswapRouterContract.address}
          tokenSymbol={selectedTokenSymbol}
          className="mb-32"
          style={{ width: '100%' }}
        />
      ) : null}

      <div className="grid flow-col col-gap-32 align-center justify-space-between">
        <Link
          to={`/smart-exposure/pools/${poolAddress}/${trancheAddress}`}
          variation="text-alt"
          size="small"
          icon="arrow"
          iconPosition="left"
          iconRotate={180}>
          Cancel
        </Link>
        <button type="submit" className="button-primary" disabled={loading || disableSubmit}>
          {loading && <Spinner className="mr-8" />}
          Swap
        </button>
      </div>
    </form>
  );
};
