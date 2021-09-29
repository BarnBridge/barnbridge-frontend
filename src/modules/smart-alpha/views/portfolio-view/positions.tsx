import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { addSeconds, getUnixTime } from 'date-fns';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import { Button, Link } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useReload } from 'hooks/useReload';
import { useFetchPools } from 'modules/smart-alpha/api';
import LoupeContract from 'modules/smart-alpha/contracts/loupeContract';
import SmartAlphaContract, { SMART_ALPHA_DECIMALS } from 'modules/smart-alpha/contracts/smartAlphaContract';
import { useWallet } from 'wallets/walletProvider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

export const PortfolioPositions = () => {
  const location = useLocation();
  const history = useHistory();
  const { tranche } = useParams<{ tranche: 'senior' | 'junior' }>();
  const { data } = useFetchPools();
  const { getToken } = useTokens();
  const [reload] = useReload();

  const activePoolAddress = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('poolAddress');
  }, [location.search]);

  const activePool = useMemo(() => {
    return activePoolAddress ? data?.find(item => item.poolAddress === activePoolAddress) : undefined;
  }, [data, activePoolAddress]);

  useEffect(() => {
    if (!activePoolAddress && data && data.length) {
      history.push({
        pathname: location.pathname,
        search: `?poolAddress=${data[0].poolAddress}`,
      });
    }
  }, [activePoolAddress, data]);

  const { getOrCreateContract, Listeners } = useContractFactory();

  const smartAlphaContract = useMemo(() => {
    if (!activePool) {
      return undefined;
    }

    return getOrCreateContract(
      activePool.poolAddress,
      () => {
        return new SmartAlphaContract(activePool.poolAddress);
      },
      {
        afterInit: async contract => {
          contract.onUpdateData(reload);
          await contract.loadCommon();
        },
      },
    );
  }, [activePool]);

  if (!activePool) {
    return <Spinner />;
  }

  return (
    <>
      <Text type="h1" weight="bold" color="primary" className="mb-32">
        Positions
      </Text>
      <div className="flex wrap col-gap-32 row-gap-32 mb-64 sm-mb-32">
        {data?.map(item => {
          const poolToken = getToken(item.poolToken.symbol);
          const oracleToken = getAsset(item.oracleAssetSymbol);

          return (
            <button
              key={item.poolAddress}
              onClick={() => {
                history.push({
                  pathname: location.pathname,
                  search: `?poolAddress=${item.poolAddress}`,
                });
              }}
              className={classNames('tab-card', {
                active: item.poolAddress === activePool?.poolAddress,
              })}>
              <TokenIcon
                name={poolToken?.icon ?? 'unknown'}
                bubble2Name={oracleToken?.icon}
                size={24}
                className="mr-16"
              />
              <Text type="p2" weight="semibold" color="primary">
                {item.poolName}
              </Text>
            </button>
          );
        })}
      </div>
      <div className={s.positionsCards}>
        <WalletBalance pool={activePool} tranche={tranche} smartAlphaContract={smartAlphaContract} />
        <EntryQueue pool={activePool} tranche={tranche} smartAlphaContract={smartAlphaContract} />
        <ExitQueue pool={activePool} tranche={tranche} smartAlphaContract={smartAlphaContract} />
      </div>
      {Listeners}
    </>
  );
};

const WalletBalance = ({ pool, tranche, smartAlphaContract }) => {
  const { getToken } = useTokens();
  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);
  const isSenior = tranche === 'senior';

  const { getOrCreateContract } = useContractFactory();

  const tokenContract = useMemo(() => {
    const address = isSenior ? pool.seniorTokenAddress : pool.juniorTokenAddress;
    return getOrCreateContract(
      address,
      () => {
        return new Erc20Contract([], address);
      },
      {
        afterInit: async contract => {
          await contract.loadBalance();
        },
      },
    );
  }, [pool, isSenior]);

  const tokenAmountInQuoteAsset = useMemo(() => {
    const entryPriceDecimals = smartAlphaContract?.getEntryPriceDecimals(pool.oracleAssetSymbol);
    const price = (
      isSenior ? smartAlphaContract.epochSeniorTokenPrice : smartAlphaContract.epochJuniorTokenPrice
    )?.unscaleBy(SMART_ALPHA_DECIMALS);
    const entryPrice = smartAlphaContract.epochEntryPrice?.unscaleBy(entryPriceDecimals);
    return tokenContract.balance?.unscaleBy(poolToken?.decimals)?.multipliedBy(price).multipliedBy(entryPrice);
  }, [
    smartAlphaContract.epochSeniorTokenPrice,
    smartAlphaContract.epochJuniorTokenPrice,
    smartAlphaContract.epochEntryPrice,
  ]);

  return (
    <section className="card">
      <header className="card-header">
        <Text type="p1" weight="semibold" color="primary">
          Wallet balance
        </Text>
      </header>
      <div className="p-24">
        <div className="flex align-center mb-8">
          <Text type="h2" weight="bold" color="primary" className="mr-8">
            {formatToken(tokenContract.balance?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
          </Text>
          <TokenIcon
            name={poolToken?.icon ?? 'unknown'}
            bubble1Name="bond"
            bubble2Name={oracleToken?.icon}
            outline={isSenior ? 'green' : 'purple'}
            size={24}
          />
        </div>
        <Text type="small" weight="semibold" color="secondary" className="mb-24">
          {formatToken(tokenAmountInQuoteAsset, {
            decimals: oracleToken?.decimals,
            tokenName: pool.oracleAssetSymbol,
          })}
        </Text>
        <footer>
          <Link
            variation="primary"
            aria-disabled={!tokenContract.balance?.gt(0)}
            to={`/smart-alpha/pools/${pool.poolAddress}/withdraw/${tranche}`}>
            Signal withdraw
          </Link>
        </footer>
      </div>
    </section>
  );
};

const EntryQueue = ({ pool, tranche, smartAlphaContract }) => {
  const history = useHistory();
  const config = useConfig();
  const wallet = useWallet();
  const { getToken } = useTokens();
  const { getOrCreateContract } = useContractFactory();
  const [reload, version] = useReload();

  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);
  const isSenior = tranche === 'senior';

  const [epoch, setEpoch] = useState<number | undefined>();
  const [underlyingInQueue, setUnderlyingInQueue] = useState<BigNumber | undefined>();
  const [redeemableTokens, setRedeemableTokens] = useState<BigNumber | undefined>();
  const [saving, setSaving] = useState(false);
  const [confirmRedeemTokensModal, setConfirmRedeemTokensModal] = useState(false);

  const loupeContract = useMemo<LoupeContract | undefined>(() => {
    const loupeAddress = config.contracts.sa?.loupe;

    if (!loupeAddress) {
      return undefined;
    }

    return getOrCreateContract(loupeAddress, () => {
      return new LoupeContract(loupeAddress);
    });
  }, [config.contracts.sa?.loupe]);

  useEffect(() => {
    setEpoch(undefined);
    setUnderlyingInQueue(undefined);
    setRedeemableTokens(undefined);

    if (!wallet.account || !smartAlphaContract) {
      return;
    }

    (isSenior ? smartAlphaContract.seniorEntryQueue : smartAlphaContract.juniorEntryQueue)
      ?.call(smartAlphaContract, wallet.account)
      .then(([epoch, amount]) => {
        setEpoch(epoch);
        setUnderlyingInQueue(amount);
      });

    if (loupeContract) {
      (isSenior ? loupeContract.getUserRedeemableSeniorTokens : loupeContract.getUserRedeemableJuniorTokens)
        ?.call(loupeContract, smartAlphaContract.address, wallet.account)
        .then(amount => {
          setRedeemableTokens(amount);
        });
    }
  }, [isSenior, wallet.account, smartAlphaContract, loupeContract, version]);

  async function handleRedeemTokens(gasPrice?: number) {
    setConfirmRedeemTokensModal(false);
    setSaving(true);

    try {
      await (isSenior ? smartAlphaContract?.redeemSeniorTokens : smartAlphaContract?.redeemJuniorTokens)?.call(
        smartAlphaContract,
        gasPrice,
      );
    } catch (e) {
      console.error(e);
    }

    reload();
    setSaving(false);
  }

  if (underlyingInQueue === undefined) {
    return (
      <section className="card relative">
        <Spinner className={s.spinner} />
      </section>
    );
  }

  if (underlyingInQueue.eq(0)) {
    return (
      <section
        className="card p-24"
        style={{
          display: 'grid',
          justifyItems: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}>
        <Text type="p1" weight="semibold" color="primary" className="mb-8">
          Empty entry queue
        </Text>
        <Text type="small" weight="semibold" color="secondary" className="mb-8">
          Your entry queue for {pool.poolName} is currently empty.
        </Text>
        <Link variation="text" to={`/smart-alpha/pools/${pool.poolAddress}/deposit/${tranche}`}>
          Deposit {pool.poolToken.symbol}
        </Link>
      </section>
    );
  }

  return (
    <section className="card">
      <header className="card-header">
        <Text type="p1" weight="semibold" color="primary">
          Entry queue
        </Text>
      </header>
      <div className="p-24">
        <dl>
          <div className="flex align-center justify-space-between mb-24">
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Underlying in queue
              </Text>
            </dt>
            <dd className="flex align-center">
              <TokenIcon name={poolToken?.icon ?? 'unknown'} className="mr-8" />
              <Text type="p1" weight="bold" color="primary">
                {formatToken(underlyingInQueue.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
            </dd>
          </div>
          <div className="flex align-center justify-space-between mb-24">
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable tokens
              </Text>
            </dt>
            <dd className="flex align-center">
              <TokenIcon
                name={poolToken?.icon ?? 'unknown'}
                bubble1Name="bond"
                bubble2Name={oracleToken?.icon ?? 'unknown'}
                outline={isSenior ? 'green' : 'purple'}
                className="mr-8"
              />
              {redeemableTokens?.gt(0) ? (
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(redeemableTokens.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
              ) : (
                <Text
                  type="p1"
                  weight="semibold"
                  color="secondary"
                  tooltip={`Because entry queue conditions may change if other users add or remove ${
                    poolToken?.symbol
                  }, the amount of ${
                    isSenior ? 'senior' : 'junior'
                  } tokens you will be able to redeem when the next epoch starts may differ. This value will become fixed whenever the new epoch starts and all queued deposits are executed.`}>
                  ???
                </Text>
              )}
            </dd>
          </div>
          <div className="flex align-center justify-space-between mb-24">
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Entry epoch
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                #{epoch ?? '-'}
              </Text>
            </dd>
          </div>
          <div className="flex align-center justify-space-between mb-24">
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable in
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                {redeemableTokens?.gt(0) ? (
                  'Redeem now'
                ) : (
                  <UseLeftTime delay={1_000}>
                    {() => {
                      const secondsFromEpoch1 = addSeconds(new Date(), smartAlphaContract.epoch1Start * -1);
                      const currentEpochProgress = getUnixTime(secondsFromEpoch1) % smartAlphaContract.epochDuration;

                      return (
                        <Text type="p1" weight="semibold">
                          {getFormattedDuration(smartAlphaContract.epochDuration - currentEpochProgress)}
                        </Text>
                      );
                    }}
                  </UseLeftTime>
                )}
              </Text>
            </dd>
          </div>
        </dl>
        <footer className="flex">
          <Button
            variation={redeemableTokens?.gt(0) ? 'primary' : 'ghost'}
            className="full-width"
            disabled={saving}
            onClick={() => {
              if (!redeemableTokens?.gt(0)) {
                history.push(`/smart-alpha/pools/${pool.poolAddress}/deposit/${tranche}`);
              } else {
                setConfirmRedeemTokensModal(true);
              }
            }}
            loading={saving}
            iconPosition="left">
            {redeemableTokens?.gt(0) ? 'Redeem tokens' : 'Add to entry queue'}
          </Button>
        </footer>
      </div>
      {confirmRedeemTokensModal && (
        <TxConfirmModal
          title="Redeem tokens"
          header={
            <div className="container-box flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Redeemable tokens
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                {formatToken(redeemableTokens?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                <TokenIcon
                  name={poolToken?.icon ?? 'unknown'}
                  bubble1Name="bond"
                  bubble2Name={oracleToken?.icon ?? 'unknown'}
                  outline={isSenior ? 'green' : 'purple'}
                  className="ml-8"
                />
              </Text>
            </div>
          }
          submitText="Confirm redeem your tokens"
          onCancel={() => setConfirmRedeemTokensModal(false)}
          onConfirm={({ gasPrice }) => handleRedeemTokens(gasPrice)}
        />
      )}
    </section>
  );
};

const ExitQueue = ({ pool, tranche, smartAlphaContract }) => {
  const history = useHistory();
  const config = useConfig();
  const wallet = useWallet();
  const { getToken } = useTokens();
  const { getOrCreateContract } = useContractFactory();
  const [reload, version] = useReload();

  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);
  const isSenior = tranche === 'senior';

  const [epoch, setEpoch] = useState<number | undefined>();
  const [tokensInQueue, setTokensInQueue] = useState<BigNumber | undefined>();
  const [redeemableUnderlying, setRedeemableUnderlying] = useState<BigNumber | undefined>();
  const [saving, setSaving] = useState(false);
  const [confirmRedeemUnderlyingModal, setConfirmRedeemUnderlyingModal] = useState(false);

  const loupeContract = useMemo<LoupeContract | undefined>(() => {
    const loupeAddress = config.contracts.sa?.loupe;

    if (!loupeAddress) {
      return undefined;
    }

    return getOrCreateContract(loupeAddress, () => {
      return new LoupeContract(loupeAddress);
    });
  }, [config.contracts.sa?.loupe]);

  useEffect(() => {
    setEpoch(undefined);
    setTokensInQueue(undefined);
    setRedeemableUnderlying(undefined);

    if (!wallet.account || !smartAlphaContract) {
      return;
    }

    (isSenior ? smartAlphaContract.seniorExitQueue : smartAlphaContract.juniorExitQueue)
      ?.call(smartAlphaContract, wallet.account)
      .then(([epoch, amount]) => {
        setEpoch(epoch);
        setTokensInQueue(amount);
      });

    if (loupeContract) {
      (isSenior ? loupeContract.getUserRedeemableSeniorUnderlying : loupeContract.getUserRedeemableJuniorUnderlying)
        ?.call(loupeContract, smartAlphaContract.address, wallet.account)
        .then(amount => {
          setRedeemableUnderlying(amount);
        });
    }
  }, [isSenior, wallet.account, smartAlphaContract, loupeContract, version]);

  async function handleRedeemUnderlying(gasPrice?: number) {
    setConfirmRedeemUnderlyingModal(false);
    setSaving(true);

    try {
      await (isSenior ? smartAlphaContract?.redeemSeniorUnderlying : smartAlphaContract?.redeemJuniorUnderlying)?.call(
        smartAlphaContract,
        gasPrice,
      );
    } catch (e) {
      console.error(e);
    }

    reload();
    setSaving(false);
  }

  if (tokensInQueue === undefined) {
    return (
      <section className="card relative">
        <Spinner className={s.spinner} />
      </section>
    );
  }

  if (tokensInQueue.eq(0)) {
    return (
      <section
        className="card p-24"
        style={{
          display: 'grid',
          justifyItems: 'center',
          alignContent: 'center',
          textAlign: 'center',
        }}>
        <Text type="p1" weight="semibold" color="primary" className="mb-8">
          Empty exit queue
        </Text>
        <Text type="small" weight="semibold" color="secondary" className="mb-8">
          Your exit queue for {pool.poolName} is currently empty.
        </Text>
      </section>
    );
  }

  return (
    <section className="card">
      <header className="card-header">
        <Text type="p1" weight="semibold" color="primary">
          Exit queue
        </Text>
      </header>
      <div className="p-24">
        <dl>
          <div className="flex align-center justify-space-between mb-24">
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Tokens in queue
              </Text>
            </dt>
            <dd className="flex align-center">
              <TokenIcon
                name={poolToken?.icon ?? 'unknown'}
                bubble1Name="bond"
                bubble2Name={oracleToken?.icon ?? 'unknown'}
                outline={isSenior ? 'green' : 'purple'}
                className="mr-8"
              />
              <Text type="p1" weight="bold" color="primary">
                {formatToken(tokensInQueue.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
            </dd>
          </div>
          <div className="flex align-center justify-space-between mb-24">
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable underlying
              </Text>
            </dt>
            <dd className="flex align-center">
              <TokenIcon name={poolToken?.icon ?? 'unknown'} className="mr-8" />
              {redeemableUnderlying?.gt(0) ? (
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(redeemableUnderlying.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
              ) : (
                <Text
                  type="p1"
                  weight="semibold"
                  color="secondary"
                  tooltip={`Because exit queue conditions may change if other users add or remove either senior or junior tokens, the amount of ${poolToken?.symbol} you will be able to redeem when the next epoch starts may differ. This value will become fixed whenever the new epoch starts, and all queued withdrawals are executed.`}>
                  ???
                </Text>
              )}
            </dd>
          </div>
          <div className="flex align-center justify-space-between mb-24">
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Entry epoch
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                #{epoch ?? '-'}
              </Text>
            </dd>
          </div>
          <div className="flex align-center justify-space-between mb-24">
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable in
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                {redeemableUnderlying?.gt(0) ? (
                  'Redeem now'
                ) : (
                  <UseLeftTime delay={1_000}>
                    {() => {
                      const secondsFromEpoch1 = addSeconds(new Date(), smartAlphaContract.epoch1Start * -1);
                      const currentEpochProgress = getUnixTime(secondsFromEpoch1) % smartAlphaContract.epochDuration;

                      return (
                        <Text type="p1" weight="semibold">
                          {getFormattedDuration(smartAlphaContract.epochDuration - currentEpochProgress)}
                        </Text>
                      );
                    }}
                  </UseLeftTime>
                )}
              </Text>
            </dd>
          </div>
        </dl>
        <footer className="flex">
          <Button
            variation={redeemableUnderlying?.gt(0) ? 'primary' : 'ghost'}
            className="full-width"
            disabled={saving}
            onClick={() => {
              if (!redeemableUnderlying?.gt(0)) {
                history.push(`/smart-alpha/pools/${pool.poolAddress}/withdraw/${tranche}`);
              } else {
                setConfirmRedeemUnderlyingModal(true);
              }
            }}
            loading={saving}
            iconPosition="left">
            {redeemableUnderlying?.gt(0) ? 'Redeem underlying' : 'Add to exit queue'}
          </Button>
        </footer>
      </div>
      {confirmRedeemUnderlyingModal && (
        <TxConfirmModal
          title="Redeem underlying"
          header={
            <div className="container-box flex flow-row">
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Redeemable underlying
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                {formatToken(redeemableUnderlying?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="ml-8" />
              </Text>
            </div>
          }
          submitText="Confirm redeem your underlying"
          onCancel={() => setConfirmRedeemUnderlyingModal(false)}
          onConfirm={({ gasPrice }) => handleRedeemUnderlying(gasPrice)}
        />
      )}
    </section>
  );
};
