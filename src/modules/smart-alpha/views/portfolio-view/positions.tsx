import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import { Button, Link } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useFetchPools } from 'modules/smart-alpha/api';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';
import { useWallet } from 'wallets/walletProvider';

export const PortfolioPositions = () => {
  const location = useLocation();
  const history = useHistory();

  const { tranche } = useParams<{ tranche: 'senior' | 'junior' }>();
  const { data } = useFetchPools();
  const { getToken } = useTokens();

  const activePool = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const poolAddress = params.get('poolAddress');
    return data?.find(item => item.poolAddress === poolAddress);
  }, [data, location.search]);

  useEffect(() => {
    if (data && data.length) {
      history.push({
        pathname: location.pathname,
        search: `?poolAddress=${data[0].poolAddress}`,
      });
    }
  }, [data]);

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
      <div className="css-grid" style={{ '--min': '260px' } as React.CSSProperties}>
        <WalletBalance pool={activePool} tranche={tranche} smartAlphaContract={smartAlphaContract} />
        <EntryQueue tranche={tranche} smartAlphaContract={smartAlphaContract} />
        <ExitQueue tranche={tranche} smartAlphaContract={smartAlphaContract} />
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
    const price = (
      isSenior ? smartAlphaContract.epochSeniorTokenPrice : smartAlphaContract.epochJuniorTokenPrice
    )?.unscaleBy(poolToken?.decimals);
    const entryPrice = smartAlphaContract.epochEntryPrice?.unscaleBy(oracleToken?.decimals);
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
        <div className="flex align-center mr-8">
          <Text type="h2" weight="bold" color="primary" className="mr-8">
            {formatToken(tokenContract.balance?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
          </Text>
          <TokenIcon
            outline={isSenior ? 'green' : 'purple'}
            name={poolToken?.icon ?? 'unknown'}
            bubble1Name="bond"
            bubble2Name={oracleToken?.icon}
            size={24}
            className="mr-16"
          />
        </div>
        <Text type="small" weight="semibold" color="secondary" className="mb-24">
          {formatToken(tokenAmountInQuoteAsset, {
            decimals: oracleToken?.decimals,
            tokenName: pool.oracleAssetSymbol,
          })}
        </Text>
        <footer>
          <Link variation="primary" to={`/smart-alpha/pools/${pool.poolAddress}/withdraw/${tranche}`}>
            Signal withdraw
          </Link>
        </footer>
      </div>
    </section>
  );
};

const EntryQueue = ({ tranche, smartAlphaContract }) => {
  const wallet = useWallet();

  const [epoch, setEpoch] = useState<number | undefined>();
  const [amount, setAmount] = useState<BigNumber | undefined>();
  const [saving, setSaving] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  useEffect(() => {
    (tranche === 'senior' ? smartAlphaContract?.seniorEntryQueue : smartAlphaContract?.juniorEntryQueue)
      ?.call(smartAlphaContract, wallet.account)
      .then(([epoch, amount]) => {
        setEpoch(epoch);
        setAmount(amount);
      });
  }, [tranche, smartAlphaContract]);

  async function handleEnterQueue(gasPrice: number) {
    setConfirmModalVisible(false);
    setSaving(true);

    try {
      await (tranche === 'senior'
        ? smartAlphaContract?.redeemSeniorTokens
        : smartAlphaContract?.redeemJuniorTokens
      )?.call(smartAlphaContract, BigNumber.ZERO, gasPrice);
    } catch (e) {
      console.error(e);
    }

    setSaving(false);
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
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Underlying in queue
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="bold" color="primary">
                23.4412
              </Text>
            </dd>
          </div>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable tokens
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                23.4412
              </Text>
            </dd>
          </div>
          <div>
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
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable in
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                2d 4h 30m
              </Text>
            </dd>
          </div>
        </dl>
        <footer>
          <Button
            variation="ghost"
            disabled={saving}
            onClick={() => {
              setConfirmModalVisible(true);
            }}>
            {saving && <Spinner className="mr-8" />}
            Add to entry queue
          </Button>
        </footer>
      </div>
      {confirmModalVisible && (
        <TxConfirmModal
          title="Redeem your tokens"
          submitText="Redeem tokens"
          onCancel={() => setConfirmModalVisible(false)}
          onConfirm={({ gasPrice }) => handleEnterQueue(gasPrice)}
        />
      )}
    </section>
  );
};

const ExitQueue = ({ tranche, smartAlphaContract }) => {
  const wallet = useWallet();

  const [epoch, setEpoch] = useState<number | undefined>();
  const [amount, setAmount] = useState<BigNumber | undefined>();
  const [saving, setSaving] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  useEffect(() => {
    (tranche === 'senior' ? smartAlphaContract?.seniorExitQueue : smartAlphaContract?.juniorExitQueue)
      ?.call(smartAlphaContract, wallet.account)
      .then(([epoch, amount]) => {
        setEpoch(epoch);
        setAmount(amount);
      });
  }, [tranche, smartAlphaContract]);

  async function handleExitQueue(gasPrice: number) {
    setConfirmModalVisible(false);
    setSaving(true);

    try {
      await (tranche === 'senior'
        ? smartAlphaContract?.redeemSeniorUnderlying
        : smartAlphaContract?.redeemJuniorUnderlying
      )?.call(smartAlphaContract, BigNumber.ZERO, gasPrice);
    } catch (e) {
      console.error(e);
    }

    setSaving(false);
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
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Tokens in queue
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="bold" color="primary">
                23.4412
              </Text>
            </dd>
          </div>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable underlying
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                23.4412
              </Text>
            </dd>
          </div>
          <div>
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
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable in
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                2d 4h 30m
              </Text>
            </dd>
          </div>
        </dl>
        <footer>
          <Button
            variation="ghost"
            disabled={saving}
            onClick={() => {
              setConfirmModalVisible(true);
            }}>
            {saving && <Spinner className="mr-8" />}
            Add to exit queue
          </Button>
        </footer>
      </div>
      {confirmModalVisible && (
        <TxConfirmModal
          title="Confirm exit queue"
          submitText="Confirm exit queue"
          onCancel={() => setConfirmModalVisible(false)}
          onConfirm={({ gasPrice }) => handleExitQueue(gasPrice)}
        />
      )}
    </section>
  );
};
