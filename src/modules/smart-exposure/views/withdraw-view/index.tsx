import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';
import Web3Contract from 'web3/web3Contract';

import { EnableTokenButton } from 'components/custom/enable-token';
import Icon from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Tabs } from 'components/custom/tabs';
import { TokenAmount, TokenAmountPreview, TokenSelect } from 'components/custom/token-amount-new';
import TransactionDetails from 'components/custom/transaction-details';
import { TransactionSummary } from 'components/custom/transaction-summary';
import { Text } from 'components/custom/typography';
import { KnownTokens, getTokenBySymbol, getTokenIconBySymbol } from 'components/providers/known-tokens-provider';
import { useContract } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { TrancheApiType, fetchTranche } from 'modules/smart-exposure/api';
import SeUniswapRouterContract from 'modules/smart-exposure/contracts/seUniswapRouterContract';
import { useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';
import { useWallet } from 'wallets/wallet';

import { numberFormat } from 'utils';

const WithdrawView: React.FC = () => {
  const wallet = useWallet();
  const [reload] = useReload();
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tranche, setTranche] = useState<TrancheApiType>();
  const [activeTab, setActiveTab] = React.useState<string>('multiple');
  const { ePoolPeripheryContract } = useSEPools();

  useEffect(() => {
    fetchTranche(poolAddress, trancheAddress).then(result => {
      setTranche(result);
      console.log('tranche', result);
    });
  }, [poolAddress, trancheAddress]);

  const tokenContract = useMemo(() => {
    const contract = new Erc20Contract([], trancheAddress);
    contract.setProvider(wallet.provider);

    contract.setAccount(wallet.account);
    contract.loadBalance();
    contract
      .loadAllowance(poolAddress)
      .then(() => reload())
      .catch(Error);

    contract
      .loadAllowance(ePoolPeripheryContract.address)
      .then(() => reload())
      .catch(Error);

    contract
      .loadCommon()
      .then(() => reload())
      .catch(Error);

    contract.on(Web3Contract.UPDATE_DATA, reload);
    return contract;
  }, [ePoolPeripheryContract.address, poolAddress, reload, trancheAddress, wallet.account, wallet.provider]);
  // const tokenContract = useContract(trancheAddress, {
  //   loadAllowance: poolAddress,
  //   loadCommon: true,
  // });

  if (!tranche) {
    return null;
  }

  console.log({ tokenContract });

  const tokenA = getTokenBySymbol(tranche.tokenA.symbol);
  const tokenB = getTokenBySymbol(tranche.tokenB.symbol);

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

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

  return (
    <>
      <div
        className="flexbox-list align-middle mb-40 mh-auto"
        style={
          {
            maxWidth: 640,
            width: '100%',
            '--gap': '24px 64px',
            '--sm-gap': '24px',
            '--min': 'auto',
          } as React.CSSProperties
        }>
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
          <div className="text-sm fw-semibold color-secondary mb-4">{tranche.eTokenSymbol} balance</div>
          <div>
            <span className="text-p1 fw-semibold color-primary mr-8">
              {formatToken(tokenContract.getBalanceOf(wallet.account), {
                scale: tokenContract.decimals,
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
          <MultipleTokensForm tranche={tranche} tokenContract={tokenContract} />
        ) : (
          <SingleTokenForm tranche={tranche} tokenContract={tokenContract} />
        )}
      </div>
    </>
  );
};

export default WithdrawView;

const MultipleTokensForm = ({ tranche, tokenContract }: { tranche: TrancheApiType; tokenContract: Erc20Contract }) => {
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tokenState, setTokenState] = React.useState<string>('');
  const [tokenAState, setTokenAState] = React.useState<BigNumber | undefined>();
  const [tokenBState, setTokenBState] = React.useState<BigNumber | undefined>();
  const { ePoolContract, ePoolPeripheryContract } = useSEPools();
  console.debug({ ePoolContract, ePoolPeripheryContract });
  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  const tokenAmountHandler = useDebounce((value: string) => {
    if (!ePoolPeripheryContract) {
      return;
    }

    const amount = BigNumber.from(value)?.multipliedBy(tranche.sFactorE) ?? BigNumber.ZERO;

    if (!amount) {
      return;
    }

    ePoolPeripheryContract
      .getTokenATokenBForEToken(poolAddress, trancheAddress, amount)
      .then(({ amountA, amountB }) => {
        setTokenAState(amountA);
        setTokenBState(amountB);
      });
  }, 400);

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amount = BigNumber.from(tokenState) ?? BigNumber.ZERO;

    if (!amount) {
      return;
    }

    ePoolContract.redeem(tranche.eTokenAddress, amount.multipliedBy(tranche.sFactorE));
  };

  const feeRate = new BigNumber(ePoolContract.feeRate ?? 0).unscaleBy(18) ?? 0;

  return (
    <form onSubmit={submitHandler}>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{tranche.eTokenSymbol} amount</span>
      </div>
      <TokenAmount
        before={<IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={24} />}
        value={tokenState}
        onChange={value => {
          setTokenState(value);
          tokenAmountHandler(value);
        }}
        max={9.789}
        placeholder={`0 (Max ${9.789})`}
        className="mb-8"
        slider
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
        <span className="text-sm fw-semibold color-secondary ml-auto">Current ratio: 73.87%</span>
      </div>
      <TokenAmountPreview
        before={<Icon name={tokenAIcon} width={24} height={24} />}
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
        <span className="text-sm fw-semibold color-secondary ml-auto">Current ratio: 26.13%</span>
      </div>
      <TokenAmountPreview
        before={<Icon name={tokenBIcon} width={24} height={24} />}
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
                BigNumber.from(tokenState)?.multipliedBy(tranche.state.eTokenPrice).multipliedBy(feeRate) ?? 0,
              )}{' '}
              ({formatPercent(feeRate)})
            </Text>,
          ],
          [
            <Text type="small" weight="semibold" color="secondary">
              {tranche.tokenA.symbol} amount
            </Text>,
            <Text type="p1" weight="bold" color="primary">
              {tokenAState?.minus(tokenAState.multipliedBy(feeRate))?.unscaleBy(tranche.tokenA.decimals)?.toString() ||
                '0'}{' '}
              {tranche.tokenA.symbol}
            </Text>,
          ],
          [
            <Text type="small" weight="semibold" color="secondary">
              {tranche.tokenB.symbol} amount
            </Text>,
            <Text type="p1" weight="bold" color="primary">
              {tokenBState?.minus(tokenBState.multipliedBy(feeRate))?.unscaleBy(tranche.tokenB.decimals)?.toString() ||
                '0'}{' '}
              {tranche.tokenB.symbol}
            </Text>,
          ],
        ]}
      />

      <EnableTokenButton
        contract={tokenContract}
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
        <button type="submit" className="button-primary">
          Withdraw
        </button>
      </div>
    </form>
  );
};

const SingleTokenForm = ({ tranche, tokenContract }: { tranche: TrancheApiType; tokenContract: Erc20Contract }) => {
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tokenState, setTokenState] = React.useState<string>('');
  const [selectedTokenValue, setSelectedTokenValue] = React.useState<BigNumber | undefined>();
  const [withdrawValue, setWithdrawValue] = React.useState<BigNumber | undefined>();
  const [uniswapRouterContract, setUniswapRouterContract] = React.useState<SeUniswapRouterContract | undefined>();

  const tokens: [KnownTokens, KnownTokens] = [tranche.tokenA.symbol, tranche.tokenB.symbol];
  const [selectedTokenSymbol, setSelectedTokenSymbol] = React.useState<KnownTokens>(tokens[0]);
  const { ePoolContract, ePoolPeripheryContract } = useSEPools();

  const slippage = 0.005;
  const deadline = 20;

  const selectedToken = getTokenBySymbol(selectedTokenSymbol);

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  useEffect(() => {
    ePoolPeripheryContract?.getRouter().then(address => {
      const uniswapRouterContract = new SeUniswapRouterContract(address);
      setUniswapRouterContract(uniswapRouterContract);
    });
  }, [ePoolPeripheryContract]);

  const isTokenA = selectedTokenSymbol === tranche.tokenA.symbol;

  const feeRateUnscaled = new BigNumber(ePoolContract.feeRate ?? 0).unscaleBy(18) ?? 0;

  const tokenHandler = useDebounce((value: string) => {
    const amount = BigNumber.from(value)?.multipliedBy(tranche.sFactorE);
    if (!amount) {
      return;
    }

    ePoolPeripheryContract
      .getTokenATokenBForEToken(poolAddress, trancheAddress, amount)
      .then(({ amountA, amountB }) => {
        if (isTokenA) {
          const amountAUnscaled = amountA.unscaleBy(tranche.tokenA.decimals) ?? BigNumber.ZERO;
          const amountBUnscaled = amountB.unscaleBy(tranche.tokenB.decimals) ?? BigNumber.ZERO;

          const amountAFee = amountAUnscaled.multipliedBy(feeRateUnscaled);
          const amountBFee = amountBUnscaled.multipliedBy(feeRateUnscaled);

          const amountAWithoutFee = amountAUnscaled.minus(amountAFee);
          const amountBWithoutFee = amountBUnscaled.minus(amountBFee);

          uniswapRouterContract
            ?.getAmountsOut(amountBWithoutFee.scaleBy(tranche.tokenB.decimals)?.integerValue() ?? BigNumber.ZERO, [
              tranche.tokenB.address,
              tranche.tokenA.address,
            ])
            .then(vals => {
              const amountTokenAConvertedFromTokenB = vals[1];
              const minOutputA = amountAWithoutFee.plus(amountTokenAConvertedFromTokenB.multipliedBy(1 - slippage));
              console.log({ amountTokenAConvertedFromTokenB, minOutputA });
              console.log(ePoolContract.rate?.toString());
              setWithdrawValue(minOutputA);
              setSelectedTokenValue(
                minOutputA.plus(amountAFee).plus(amountBFee.multipliedBy(tranche.tokenB.state.price)),
              ); // TODO
            });
        } else {
          const amountAUnscaled = amountA.unscaleBy(tranche.tokenA.decimals) ?? BigNumber.ZERO;
          const amountBUnscaled = amountB.unscaleBy(tranche.tokenB.decimals) ?? BigNumber.ZERO;

          const amountAFee = amountAUnscaled.multipliedBy(feeRateUnscaled);
          const amountBFee = amountBUnscaled.multipliedBy(feeRateUnscaled);

          const amountAWithoutFee = amountAUnscaled.minus(amountAFee);
          const amountBWithoutFee = amountBUnscaled.minus(amountBFee);

          uniswapRouterContract
            ?.getAmountsOut(amountAWithoutFee.scaleBy(tranche.tokenA.decimals)?.integerValue() ?? BigNumber.ZERO, [
              tranche.tokenA.address,
              tranche.tokenB.address,
            ])
            .then(vals => {
              const amountTokenBConvertedFromTokenA = vals[1];
              const minOutputB = amountBWithoutFee.plus(amountTokenBConvertedFromTokenA.multipliedBy(1 - slippage));
              console.log({ amountTokenBConvertedFromTokenA, minOutputB });

              setWithdrawValue(minOutputB);
              setSelectedTokenValue(
                minOutputB.plus(amountBFee).plus(amountAFee.multipliedBy(tranche.tokenA.state.price)),
              ); // TODO
            });
        }
      });
  }, 400);

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amount =
      BigNumber.from(tokenState)?.scaleBy(isTokenA ? tranche.tokenA.decimals : tranche.tokenB.decimals) ??
      BigNumber.ZERO;

    if (!amount || !withdrawValue) {
      return;
    }

    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);

    ePoolPeripheryContract?.[isTokenA ? 'redeemForMinTokenA' : 'redeemForMinTokenB'](
      poolAddress,
      trancheAddress,
      amount,
      withdrawValue.integerValue(),
      deadlineTs,
    );
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">{tranche.eTokenSymbol} amount</span>
      </div>
      <TokenAmount
        before={<IconsPair icon1={tokenAIcon} icon2={tokenBIcon} size={24} />}
        value={tokenState}
        onChange={val => {
          setTokenState(val);
          tokenHandler(val);
        }}
        max={9.789}
        placeholder={`0 (Max ${9.789})`}
        className="mb-8"
        slider
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
        <span className="text-sm fw-semibold color-secondary ml-auto">
          Current ratio:{' '}
          {numberFormat(
            Number(selectedToken?.symbol === tranche.tokenA.symbol ? tranche.tokenARatio : tranche.tokenBRatio) * 100,
            {
              minimumFractionDigits: 2,
            },
          )}
          %
        </span>
      </div>
      <TokenAmountPreview
        before={<TokenSelect value={selectedTokenSymbol} onChange={setSelectedTokenSymbol} tokens={tokens} />}
        value={formatToken(selectedTokenValue?.unscaleBy(tranche[isTokenA ? 'tokenA' : 'tokenB'].decimals)) ?? '-'}
        secondary={formatUSD(
          selectedTokenValue
            ?.unscaleBy(tranche[isTokenA ? 'tokenA' : 'tokenB'].decimals)
            ?.multipliedBy(tranche[isTokenA ? 'tokenA' : 'tokenB'].state.price) ?? 0,
        )}
        className="mb-40"
        // classNameBefore="ph-0"
      />

      <TransactionDetails
        className="mb-32"
        showSlippage
        slippage={0.5}
        slippageHint="Your transaction will revert if the amount of tokens you actually receive is smaller by this percentage."
        showDeadline
        deadline={deadline}
        onChange={fd => console.log({ fd })}>
        Uniswap transaction details
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
                BigNumber.from(tokenState)?.multipliedBy(tranche.state.eTokenPrice).multipliedBy(feeRateUnscaled) ?? 0,
              )}{' '}
              ({formatPercent(feeRateUnscaled)})
            </Text>,
          ],
          [
            <Text type="small" weight="semibold" color="secondary">
              {selectedTokenSymbol} amount
            </Text>,
            <Text type="p1" weight="bold" color="primary">
              {/* {amount
                ?.minus(amount?.multipliedBy(feeRateUnscaled) ?? 0)
                ?.unscaleBy(tranche.tokenA.decimals)
                ?.toString() || '0'}{' '} */}
              {formatToken(withdrawValue?.unscaleBy(tranche.tokenA.decimals)) ?? '-'} {tranche.tokenA.symbol}
            </Text>,
          ],
        ]}
      />

      <EnableTokenButton
        contract={tokenContract}
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
        <button type="submit" className="button-primary">
          Withdraw
        </button>
      </div>
    </form>
  );
};
