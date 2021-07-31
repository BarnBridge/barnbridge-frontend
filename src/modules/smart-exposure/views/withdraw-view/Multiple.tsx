import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import { EnableTokenButton } from 'components/custom/enable-token';
import Icon, { IconNames } from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount, TokenAmountPreview } from 'components/custom/token-amount-new';
import { TransactionSummary } from 'components/custom/transaction-summary';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIconPair } from 'components/token-icon';
import { TrancheApiType } from 'modules/smart-exposure/api';
import { useEPoolContract, useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';

export const MultipleTokensForm = ({
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
        before={<TokenIconPair name1={tokenAIcon} name2={tokenBIcon} size={24} />}
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
