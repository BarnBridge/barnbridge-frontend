import React, { FC } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Icon from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { useFetchKpiOption } from 'modules/smart-alpha/api';
import KpiRewardPoolContract from 'modules/smart-alpha/contracts/kpiRewardPoolContract';
import { useWallet } from 'wallets/walletProvider';

import Stake from './stake';
import Transactions from './transactions';

import s from './s.module.scss';

const KpiOptionView: FC = () => {
  const { id: poolAddress } = useParams<{ id: string }>();
  const { data: kpiOption, loading, loaded } = useFetchKpiOption(poolAddress);

  const [reload] = useReload();
  const [reloadTxs, version] = useReload();
  const walletCtx = useWallet();
  const { getTokenBySymbol } = useKnownTokens();
  const { getOrCreateContract } = useContractFactory();

  if (loading) {
    return <Spinner />;
  }

  if (!kpiOption) {
    return loaded ? <Redirect to="/smart-alpha/kpi-options" /> : null;
  }

  const kpiRewardPoolContract = getOrCreateContract(
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
              {formatToken(kpiRewardPoolContract.poolSize?.unscaleBy(kpiOption.poolToken.decimals)) ?? '-'}
            </dd>
          </div>
          {kpiOption.rewardTokens.map(token => {
            const rewardToken = getTokenBySymbol(token.symbol);

            return rewardToken ? (
              <React.Fragment key={rewardToken.symbol}>
                {rewardToken.symbol === KnownTokens.BOND ? (
                  <div className={s.headerTermRow}>
                    <dt>{rewardToken.symbol} daily rewards</dt>
                    <dd>
                      <TokenIcon name={rewardToken.icon!} className="mr-8" size="16" />
                      {kpiRewardPoolContract.getRewardLeftFor(rewardToken.address)?.isZero()
                        ? '0'
                        : formatToken(kpiRewardPoolContract.getDailyRewardFor(rewardToken.address), {
                            scale: rewardToken.decimals,
                          }) ?? '-'}
                    </dd>
                  </div>
                ) : null}
                {rewardToken.symbol === KnownTokens.BOND ? (
                  <div className={s.headerTermRow}>
                    <dt>{rewardToken.symbol} rewards left</dt>
                    <dd>
                      <TokenIcon name={rewardToken.icon!} className="mr-8" size="16" />
                      {(rewardToken.symbol === KnownTokens.BOND &&
                        formatToken(kpiRewardPoolContract.getRewardLeftFor(rewardToken.address), {
                          scale: rewardToken.decimals,
                        })) ??
                        '-'}
                    </dd>
                  </div>
                ) : (
                  <div className={s.headerTermRow}>
                    <dt>{rewardToken.symbol} rewards balance</dt>
                    <dd>
                      <TokenIcon name={rewardToken.icon!} className="mr-8" size="16" />
                      {formatToken((rewardToken.contract as Erc20Contract).getBalanceOf(kpiOption.poolAddress), {
                        scale: rewardToken.decimals,
                      }) ?? '-'}
                    </dd>
                  </div>
                )}
              </React.Fragment>
            ) : null;
          })}
        </dl>
      </div>
      {walletCtx.isActive && (
        <div className={s.stakeStatisticsContainer}>
          <Stake className={s.stake} kpiOption={kpiOption} kpiContract={kpiRewardPoolContract} />
          {/*<Statistics className={s.statistics} />*/}
        </div>
      )}
      <Transactions poolAddress={poolAddress} kpiOption={kpiOption} version={version} />
    </div>
  );
};

export default KpiOptionView;
