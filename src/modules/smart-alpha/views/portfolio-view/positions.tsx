import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import { Button, Link } from 'components/button';
import { Badge } from 'components/custom/badge';
import { Dropdown } from 'components/custom/dropdown';
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

import { tillNextEpoch } from 'modules/smart-alpha/utils';
import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

export const PortfolioPositions = () => {
  const location = useLocation();
  const history = useHistory();
  const { tranche } = useParams<{ tranche: 'senior' | 'junior' }>();
  const { account } = useWallet();
  const { data } = useFetchPools({ userAddress: account });
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

  const tranches = useMemo(() => {
    return (
      data
        ?.sort((a, b) => (a.userHasActivePosition === b.userHasActivePosition ? 0 : a.userHasActivePosition ? -1 : 1))
        .map(item => {
          const poolToken = getToken(item.poolToken.symbol);
          const oracleToken = getAsset(item.oracleAssetSymbol);

          return {
            children: (
              <div className="flex flex-grow align-center">
                <TokenIcon name={poolToken?.icon} bubble2Name={oracleToken?.icon} size={32} className="mr-16" />
                <Text type="p2" weight="semibold" color="primary">
                  {item.poolName}
                </Text>
                {item.userHasActivePosition ? (
                  <Badge color="red" size="small" className="ml-auto">
                    Staked
                  </Badge>
                ) : null}
              </div>
            ),
            onClick: () => {
              history.push({
                pathname: location.pathname,
                search: `?poolAddress=${item.poolAddress}`,
              });
            },
          };
        }) ?? []
    );
  }, [data]);

  if (!activePool) {
    return <Spinner />;
  }

  const poolToken = getToken(activePool.poolToken.symbol);
  const oracleToken = getAsset(activePool.oracleAssetSymbol);

  return (
    <>
      <Text type="h1" weight="bold" color="primary" className="mb-32">
        Positions
      </Text>
      <Dropdown items={tranches ?? []} size="large" className="mb-32" style={{ maxWidth: 360 }}>
        <TokenIcon name={poolToken?.icon} bubble2Name={oracleToken?.icon} size={32} className="mr-16" />
        <Text type="p2" weight="semibold" color="primary">
          {activePool.poolName}
        </Text>
        {activePool.userHasActivePosition ? (
          <Badge color="red" size="small" className="ml-auto">
            Staked
          </Badge>
        ) : null}
      </Dropdown>
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
    return tokenContract.balance?.unscaleBy(pool.poolToken.decimals)?.multipliedBy(price).multipliedBy(entryPrice);
  }, [
    smartAlphaContract.epochSeniorTokenPrice,
    smartAlphaContract.epochJuniorTokenPrice,
    smartAlphaContract.epochEntryPrice,
  ]);

  return (
    <section className="card flex flow-row p-24">
      <Text type="p1" weight="semibold" color="primary" className="mb-24 text-center">
        Wallet balance
      </Text>
      <div className="flex justify-center align-center mb-8">
        <Text type="h2" weight="bold" color="primary" className="mr-8">
          {formatToken(tokenContract.balance?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
        </Text>
        <TokenIcon
          name={poolToken?.icon}
          bubble1Name="bond"
          bubble2Name={oracleToken?.icon}
          outline={isSenior ? 'green' : 'purple'}
          size={24}
        />
      </div>
      <div className={classNames(s.positionsWalletSecondaryValues, 'mb-32')}>
        <div className={s.positionsWalletSecondaryValue}>
          <Text type="small" weight="semibold" color="secondary">
            TBD
          </Text>
          <TokenIcon name={poolToken?.icon} size={16} className="ml-8" />
        </div>
        <div className={s.positionsWalletSecondaryValue}>
          <Text type="small" weight="semibold" color="secondary">
            {formatToken(tokenAmountInQuoteAsset, {
              decimals: oracleToken?.decimals,
              tokenName: pool.oracleAssetSymbol,
            })}
          </Text>
        </div>
      </div>
      <footer>
        <Link
          variation="primary"
          aria-disabled={!tokenContract.balance?.gt(0)}
          to={`/smart-alpha/pools/${pool.poolAddress}/withdraw/${tranche}`}>
          Signal withdraw
        </Link>
      </footer>
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
              <TokenIcon name={poolToken?.icon} className="mr-8" />
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
                name={poolToken?.icon}
                bubble1Name="bond"
                bubble2Name={oracleToken?.icon}
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
                    pool.poolToken.symbol
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
                      const tne = tillNextEpoch(pool);

                      return (
                        <Text type="p1" weight="semibold">
                          {getFormattedDuration(tne)}
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
                  name={poolToken?.icon}
                  bubble1Name="bond"
                  bubble2Name={oracleToken?.icon}
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
                name={poolToken?.icon}
                bubble1Name="bond"
                bubble2Name={oracleToken?.icon}
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
              <TokenIcon name={poolToken?.icon} className="mr-8" />
              {redeemableUnderlying?.gt(0) ? (
                <Text type="p1" weight="semibold" color="primary">
                  {formatToken(redeemableUnderlying.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                </Text>
              ) : (
                <Text
                  type="p1"
                  weight="semibold"
                  color="secondary"
                  tooltip={`Because exit queue conditions may change if other users add or remove either senior or junior tokens, the amount of ${pool.poolToken.symbol} you will be able to redeem when the next epoch starts may differ. This value will become fixed whenever the new epoch starts, and all queued withdrawals are executed.`}>
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
                      const tne = tillNextEpoch(pool);

                      return (
                        <Text type="p1" weight="semibold">
                          {getFormattedDuration(tne)}
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
                <TokenIcon name={poolToken?.icon} size={16} className="ml-8" />
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
