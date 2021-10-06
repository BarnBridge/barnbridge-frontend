import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import ContractListener from 'web3/components/contract-listener';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { formatToken } from 'web3/utils';

import Spin from 'components/antd/spin';
import Tooltip from 'components/antd/tooltip';
import { Hint, Text } from 'components/custom/typography';
import { KnownTokens } from 'components/providers/knownTokensProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useWeb3Contract } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { KpiOptionType } from 'modules/smart-alpha/api';
import KpiRewardPoolContract from 'modules/smart-alpha/contracts/kpiRewardPoolContract';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

export type KpiOptionCardProps = {
  className?: string;
  kpiOption: KpiOptionType;
};

export const KpiOptionCard: FC<KpiOptionCardProps> = props => {
  const { className, kpiOption } = props;

  const { getToken } = useTokens();
  const walletCtx = useWallet();
  const [reload] = useReload();

  const [activeTab, setActiveTab] = useState<'pool' | 'my'>('pool');
  const [confirmClaimVisible, setConfirmClaim] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const kpiRewardPoolContract = useWeb3Contract(
    () => {
      return new KpiRewardPoolContract(kpiOption.poolAddress, kpiOption.poolType === 'MULTI');
    },
    {
      afterInit: contract => {
        contract.onUpdateData(reload);
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
      },
    },
  );

  function handleClaim() {
    kpiOption.rewardTokens.forEach(rewardToken => {
      kpiRewardPoolContract.loadClaimFor(rewardToken.address);
    });

    setConfirmClaim(true);
  }

  const confirmClaimPoolReward = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirmClaim(false);
    setClaiming(true);

    try {
      await kpiRewardPoolContract.sendClaimAll(args.gasPrice);
    } catch {}

    setClaiming(false);
  };

  return (
    <>
      <section className={cn(s.card, className)}>
        <header className={s.header}>
          <TokenIcon name="unknown" bubble1Name="unknown" bubble2Name="unknown" size={36} className="mr-16" />
          <Text type="p1" weight="semibold">
            {kpiOption.poolToken.symbol}
          </Text>
        </header>
        <div className={s.tabs}>
          <div className={cn(s.tabSelection, activeTab === 'my' && s.toggled)} />
          <button
            type="button"
            className={cn(s.tab, activeTab === 'pool' && s.active)}
            onClick={() => setActiveTab('pool')}>
            Pool statistics
          </button>
          <button
            type="button"
            className={cn(s.tab, activeTab === 'my' && s.active)}
            disabled={!walletCtx.isActive}
            onClick={() => setActiveTab('my')}>
            My statistics
          </button>
        </div>
        {activeTab === 'pool' && (
          <dl>
            {kpiOption.rewardTokens.map(token => (
              <React.Fragment key={token.symbol}>
                {token.symbol === KnownTokens.BOND ? (
                  <div className={s.defRow}>
                    <dt>
                      <Hint text={`This number shows the $${token.symbol} token rewards distributed per day.`}>
                        {token.symbol} daily rewards
                      </Hint>
                    </dt>
                    <dd>
                      <TokenIcon name={getToken(token.symbol)?.icon} className="mr-8" size="16" />
                      {kpiRewardPoolContract.getRewardLeftFor(token.address)?.isZero()
                        ? '0'
                        : formatToken(kpiRewardPoolContract.getDailyRewardFor(token.address), {
                            scale: token.decimals,
                          }) ?? '-'}
                    </dd>
                  </div>
                ) : null}
                <div className={s.defRow}>
                  <dt>
                    {token.symbol === KnownTokens.BOND && (
                      <Hint text={`This number shows the $${token.symbol} token rewards remaining.`}>
                        {token.symbol} rewards left
                      </Hint>
                    )}
                    {/*{rewardToken === stkAaveToken && (*/}
                    {/*  <Hint*/}
                    {/*    text={`This number shows the ${stkAaveToken.symbol} amount currently accrued by the pool. This amount is claimable, pro-rata, by the current pool participants. Any future deposits will only have a claim on rewards that accrue after that date.`}>*/}
                    {/*    {rewardToken.symbol} rewards balance*/}
                    {/*  </Hint>*/}
                    {/*)}*/}
                  </dt>
                  <dd>
                    <TokenIcon name={getToken(token.symbol)?.icon} className="mr-8" size="16" />
                    {(token.symbol === KnownTokens.BOND &&
                      formatToken(kpiRewardPoolContract.getRewardLeftFor(token.address), {
                        scale: token.decimals,
                      })) ??
                      '-'}
                    {/*{rewardToken === stkAaveToken &&*/}
                    {/*  (formatToken((rewardToken.contract as Erc20Contract).getBalanceOf(pool?.meta.poolAddress), {*/}
                    {/*    scale: rewardToken.decimals,*/}
                    {/*  }) ??*/}
                    {/*    '-')}*/}
                  </dd>
                </div>
              </React.Fragment>
            ))}
            <div className={s.defRow}>
              <dt>Balancer tokens</dt>
              <dd>
                <TokenIcon name="unknown" bubble1Name="unknown" bubble2Name="unknown" size={16} className="mr-8" />
                {formatToken(kpiRewardPoolContract.poolSize?.unscaleBy(kpiOption.poolToken.decimals)) ?? '-'}
              </dd>
            </div>
          </dl>
        )}
        {activeTab === 'my' && walletCtx.isActive && (
          <dl>
            {kpiOption.rewardTokens.map(token => (
              <React.Fragment key={token.address}>
                {token.symbol === KnownTokens.BOND ? (
                  <div className={s.defRow}>
                    <dt>
                      <Hint
                        text={`This number shows the $${token.symbol} rewards you would potentially be able to harvest daily, but is subject to change - in case more users deposit, or you withdraw some of your stake.`}>
                        My daily {token.symbol} reward
                      </Hint>
                    </dt>
                    <dd>
                      <TokenIcon name={getToken(token.symbol)?.icon} className="mr-8" size="16" />
                      {formatToken(kpiRewardPoolContract.getMyDailyRewardFor(token.address), {
                        scale: token.decimals,
                      }) ?? '-'}
                    </dd>
                  </div>
                ) : null}
                <div className={s.defRow}>
                  <dt>My current {token.symbol} reward</dt>
                  <dd>
                    <TokenIcon name={getToken(token.symbol)?.icon} className="mr-8" size="16" />
                    {formatToken(kpiRewardPoolContract.getClaimFor(token.address), {
                      scale: token.decimals,
                    }) ?? '-'}
                  </dd>
                </div>
              </React.Fragment>
            ))}
            <div className={s.defRow}>
              <dt>Staked balance</dt>
              <dd>
                <TokenIcon name="bond" bubble1Name="bond" bubble2Name="bond" size={16} className="mr-8" />
                {formatToken(
                  kpiRewardPoolContract.getBalanceFor(walletCtx.account!)?.unscaleBy(kpiOption.poolToken.decimals),
                ) ?? '-'}
              </dd>
            </div>
          </dl>
        )}
        <footer className={s.footer}>
          <Link className="button-primary full-width" to={`/smart-alpha/kpi-options/${kpiOption.poolAddress}`}>
            View pool
          </Link>
          {walletCtx.isActive && activeTab === 'my' && (
            <button
              type="button"
              className="button-ghost"
              disabled={!kpiRewardPoolContract.hasToClaim()}
              onClick={handleClaim}>
              {claiming && <Spin type="circle" />}
              Claim
            </button>
          )}
        </footer>
      </section>
      {confirmClaimVisible && (
        <TxConfirmModal
          title="Confirm your claim"
          header={
            <div className="flex justify-center">
              {kpiOption.rewardTokens.map(token => (
                <Tooltip
                  key={token.symbol}
                  className="flex col-gap-8 align-center justify-center mr-16"
                  title={
                    formatToken(kpiRewardPoolContract.getClaimFor(token.address), {
                      decimals: token.decimals,
                      scale: token.decimals,
                      tokenName: token.symbol,
                    }) ?? '-'
                  }>
                  <Text type="h2" weight="semibold" color="primary">
                    {formatToken(kpiRewardPoolContract.getClaimFor(token.address), {
                      compact: true,
                      scale: token.decimals,
                    }) ?? '-'}
                  </Text>
                  <TokenIcon name={getToken(token.symbol)?.icon} size={32} />
                </Tooltip>
              ))}
            </div>
          }
          submitText="Claim"
          onCancel={() => setConfirmClaim(false)}
          onConfirm={confirmClaimPoolReward}
        />
      )}
      <ContractListener contract={kpiRewardPoolContract} />
    </>
  );
};
