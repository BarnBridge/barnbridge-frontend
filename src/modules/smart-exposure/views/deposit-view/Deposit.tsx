import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import { Link } from 'components/button';
import { EnableTokens } from 'components/custom/enable-token';
import OldIcon from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount, TokenAmountPreview } from 'components/custom/token-amount-new';
import { InfoTooltip } from 'components/custom/tooltip';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon, TokenIconNames, TokenIconPair } from 'components/token-icon';
import { TrancheApiType } from 'modules/smart-exposure/api';
import { useEPoolContract, useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';

export const Deposit = ({
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
        before={<TokenIcon name={tokenAIcon as TokenIconNames} size={24} />}
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
      <OldIcon
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
        before={<TokenIcon name={tokenBIcon as TokenIconNames} size={24} />}
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
      <OldIcon
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
        before={<TokenIconPair name1={tokenAIcon} name2={tokenBIcon} size={24} />}
        value={formatToken(tokenEState?.dividedBy(tranche.sFactorE)) ?? '0'}
        secondary={formatUSD(tokenEState?.dividedBy(tranche.sFactorE).multipliedBy(tranche.state.eTokenPrice))}
        className="mb-32"
      />
      <EnableTokens {...{ tokenAContract, tokenBContract, poolAddress, tranche }} className="mb-32" />
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
          Deposit
        </button>
      </div>
    </form>
  );
};
