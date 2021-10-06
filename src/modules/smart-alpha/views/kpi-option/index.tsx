import React, { FC } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Icon from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { KnownTokens } from 'components/providers/knownTokensProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { useWallet } from 'wallets/walletProvider';

import { useFetchKpiOption } from '../../api';
import KpiRewardPoolContract from '../../contracts/kpiRewardPoolContract';
import Stake from './stake';
import Statistics from './statistics';
import Transactions from './transactions';

import s from './s.module.scss';

const KpiOptionView: FC = () => {
  const { id: poolAddress } = useParams<{ id: string }>();
  const { data: kpiOption, loading, loaded } = useFetchKpiOption(poolAddress);

  const [reload] = useReload();
  const [reloadTxs, version] = useReload();
  const walletCtx = useWallet();
  const { getToken } = useTokens();
  const { getOrCreateContract } = useContractFactory();

  if (loading) {
    return <Spinner />;
  }

  if (!kpiOption) {
    return loaded ? <Redirect to="/smart-alpha/kpi-options" /> : null;
  }

  const kpiContract = getOrCreateContract(
    kpiOption.poolAddress,
    () => {
      return new KpiRewardPoolContract(kpiOption.poolAddress, kpiOption.poolType === 'MULTI');
    },
    {
      afterInit: contract => {
        contract.onUpdateData(reload);
        contract.on('tx:success', reloadTxs);

        contract.loadCommon();

        if (walletCtx.account) {
          contract.loadBalanceFor(walletCtx.account);
        }

        kpiOption.rewardTokens.forEach(rewardToken => {
          contract.loadRewardRateFor(rewardToken.address);
          contract.loadRewardLeftFor(rewardToken.address);
          contract.loadBalanceFor(rewardToken.address);
          contract.loadClaimFor(rewardToken.address);
        });

        return () => {
          contract.off('tx:success', reloadTxs);
        };
      },
    },
  );

  const poolTokenContract = getOrCreateContract(
    kpiOption.poolToken.address,
    () => {
      return new Erc20Contract([], kpiOption.poolToken.address);
    },
    {
      afterInit: contract => {
        contract.onUpdateData(reload);
        contract.loadAllowance(kpiOption.poolAddress);

        if (walletCtx.account) {
          contract.loadBalance(walletCtx.account);
        }
      },
    },
  );

  const rewardContracts = kpiOption.rewardTokens.map(token => {
    return getOrCreateContract(token.address, () => new Erc20Contract([], token.address), {
      afterInit: contract => {
        contract.loadBalance();
      },
    });
  });

  return (
    <div className="container-limit">
      <div className="mb-16">
        <Link to="/smart-alpha/kpi-options" className="button-text" style={{ display: 'inline-flex' }}>
          <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
          KPI Options
        </Link>
      </div>
      <div className="flex align-center mb-32">
        <TokenIcon name="unknown" bubble1Name="unknown" bubble2Name="unknown" size={36} className="mr-16" />
        <Text type="p1" weight="semibold" color="primary">
          {kpiOption.poolToken.symbol}
        </Text>
      </div>
      <div className="card p-24 mb-32">
        <dl className={s.headerTerms}>
          <div className={s.headerTermRow}>
            <dt>Balancer tokens</dt>
            <dd>
              <TokenIcon name="unknown" bubble1Name="unknown" bubble2Name="unknown" size={16} className="mr-8" />
              {formatToken(kpiContract.poolSize?.unscaleBy(kpiOption.poolToken.decimals)) ?? '-'}
            </dd>
          </div>
          {kpiOption.rewardTokens.map(token => (
            <React.Fragment key={token.symbol}>
              {token.symbol === KnownTokens.BOND ? (
                <div className={s.headerTermRow}>
                  <dt>{token.symbol} daily rewards</dt>
                  <dd>
                    <TokenIcon name={getToken(token.symbol)?.icon} className="mr-8" size="16" />
                    {kpiContract.getRewardLeftFor(token.address)?.isZero()
                      ? '0'
                      : formatToken(kpiContract.getDailyRewardFor(token.address), {
                          scale: token.decimals,
                        }) ?? '-'}
                  </dd>
                </div>
              ) : null}
              {token.symbol === KnownTokens.BOND ? (
                <div className={s.headerTermRow}>
                  <dt>{token.symbol} rewards left</dt>
                  <dd>
                    <TokenIcon name={getToken(token.symbol)?.icon} className="mr-8" size="16" />
                    {(token.symbol === KnownTokens.BOND &&
                      formatToken(kpiContract.getRewardLeftFor(token.address), {
                        scale: token.decimals,
                      })) ??
                      '-'}
                  </dd>
                </div>
              ) : (
                <div className={s.headerTermRow}>
                  <dt>{token.symbol} rewards balance</dt>
                  <dd>
                    <TokenIcon name={getToken(token.symbol)?.icon} className="mr-8" size="16" />
                    {/*{formatToken((token.contract as Erc20Contract).getBalanceOf(kpiOption.poolAddress), {*/}
                    {/*  scale: token.decimals,*/}
                    {/*}) ?? '-'}*/}
                  </dd>
                </div>
              )}
            </React.Fragment>
          ))}
        </dl>
      </div>
      {walletCtx.isActive && (
        <div className={s.stakeStatisticsContainer}>
          <Stake
            className={s.stake}
            kpiOption={kpiOption}
            kpiContract={kpiContract}
            poolTokenContract={poolTokenContract}
          />
          <Statistics
            className={s.statistics}
            kpiOption={kpiOption}
            kpiContract={kpiContract}
            poolTokenContract={poolTokenContract}
            rewardContracts={rewardContracts}
          />
        </div>
      )}
      <Transactions poolAddress={poolAddress} kpiOption={kpiOption} version={version} />
    </div>
  );
};

export default KpiOptionView;
