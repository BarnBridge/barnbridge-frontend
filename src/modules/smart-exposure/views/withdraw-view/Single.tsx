import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import { EnableTokenButton } from 'components/custom/enable-token';
import Icon from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount, TokenAmountPreview, TokenSelect } from 'components/custom/token-amount-new';
import TransactionDetails from 'components/custom/transaction-details';
import { TransactionSummary } from 'components/custom/transaction-summary';
import { Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIconPair } from 'components/token-icon';
import { TrancheApiType } from 'modules/smart-exposure/api';
import { useEPoolContract, useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';

export const SingleTokenForm = ({
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

  const debouncedTokenHandler = useDebounce(tokenHandler, 400);

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
        before={<TokenIconPair name1={tokenAIcon} name2={tokenBIcon} size={24} />}
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
