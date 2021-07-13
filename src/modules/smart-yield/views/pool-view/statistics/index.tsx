import React, { FC, useState } from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Spin from 'components/antd/spin';
import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

type Props = {
  className?: string;
};

const Statistics: FC<Props> = props => {
  const { className } = props;
  const walletCtx = useWallet();
  const rewardPoolCtx = useRewardPool();
  const { projectToken } = useKnownTokens();
  const pool = rewardPoolCtx.pool!;

  const { market: poolMarket, uToken } = rewardPoolCtx;
  const { smartYield, rewardPool } = pool;
  const rewardTokens = Array.from(pool.rewardTokens.values());
  const walletBalance = smartYield.balance;
  const stakedBalance = rewardPool.getBalanceFor(walletCtx.account!);
  const [confirmClaimVisible, setConfirmClaim] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const totalToClaim = rewardTokens.reduce((sum, rewardToken) => {
    const toClaim = rewardPool.getClaimFor(rewardToken.address);
    return sum.plus(toClaim ?? BigNumber.ZERO);
  }, BigNumber.ZERO);

  const canClaim = totalToClaim.gt(BigNumber.ZERO);

  function handleClaim() {
    pool.loadClaims();
    setConfirmClaim(true);
  }

  const confirmClaimPoolReward = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirmClaim(false);
    setClaiming(true);

    try {
      await rewardPool.sendClaimAll(args.gasPrice);

      rewardTokens.forEach(rewardToken => {
        (rewardToken.contract as Erc20Contract).loadBalance().catch(Error);
      });
    } catch (e) {
      console.error(e);
    }

    setClaiming(false);
  };

  return (
    <>
      <section className={cn('card', s.statistics, className)}>
        <header className="card-header">
          <Text type="p1" weight="semibold" color="primary">
            My statistics
          </Text>
        </header>
        <dl className={s.defs}>
          <div className={s.def}>
            <dt>Portfolio balance</dt>
            <dd>
              <IconBubble
                name={uToken?.icon}
                bubbleName={projectToken.icon!}
                secondBubbleName={poolMarket?.icon.active}
                width={16}
                height={16}
                className="mr-8"
              />
              {formatToken(walletBalance, {
                scale: smartYield.decimals,
              }) ?? '-'}
            </dd>
          </div>
          <div className={s.def}>
            <dt>Staked balance</dt>
            <dd>
              <IconBubble
                name={uToken?.icon}
                bubbleName={projectToken.icon!}
                secondBubbleName={poolMarket?.icon.active}
                width={16}
                height={16}
                className="mr-8"
              />
              {formatToken(stakedBalance, {
                scale: smartYield.decimals,
              }) ?? '-'}
            </dd>
          </div>
          {rewardTokens.map(rewardToken => (
            <React.Fragment key={rewardToken.address}>
              {rewardToken.symbol === KnownTokens.BOND ? (
                <div className={s.def}>
                  <dt>My daily {rewardToken.symbol} reward</dt>
                  <dd>
                    <Icon name={rewardToken.icon!} className="mr-8" width="16" height="16" />
                    {formatToken(
                      rewardPool.getMyDailyRewardFor(rewardToken.address)?.unscaleBy(rewardToken.decimals),
                    ) ?? '-'}
                  </dd>
                </div>
              ) : null}
              <div className={s.def}>
                <dt>My {rewardToken.symbol} balance</dt>
                <dd>
                  <Icon name={rewardToken.icon!} className="mr-8" width="16" height="16" />
                  {formatToken((rewardToken.contract as Erc20Contract).balance, {
                    scale: rewardToken.decimals,
                  }) ?? '-'}
                </dd>
              </div>
            </React.Fragment>
          ))}
        </dl>
        <footer className={s.footer}>
          <div>
            {rewardTokens.map(rewardToken => (
              <div key={rewardToken.symbol} className={s.footerReward}>
                <div className="flex mr-16">
                  <Icon name={rewardToken.icon!} width="24" height="24" className="mr-8" style={{ flexShrink: 0 }} />
                  <Tooltip
                    title={
                      <Text type="p2" weight="semibold" color="primary">
                        {formatToken(rewardPool.getClaimFor(rewardToken.address), {
                          decimals: rewardToken.decimals,
                          scale: rewardToken.decimals,
                          tokenName: rewardToken.symbol,
                        }) ?? '-'}
                      </Text>
                    }>
                    <Text
                      type="h3"
                      weight="bold"
                      color="primary"
                      className="text-ellipsis"
                      style={{ maxWidth: '120px' }}>
                      {formatToken(rewardPool.getClaimFor(rewardToken.address), {
                        compact: true,
                        scale: rewardToken.decimals,
                      }) ?? '-'}
                    </Text>
                  </Tooltip>
                </div>
              </div>
            ))}
            <Text type="small" weight="semibold" color="secondary">
              My current reward{rewardTokens.length! > 1 ? 's' : ''}
            </Text>
          </div>
          <button
            type="button"
            className="button-primary ml-auto"
            disabled={!canClaim || claiming}
            onClick={handleClaim}>
            <Spin type="circle" spinning={claiming} />
            Claim reward
          </button>
        </footer>
      </section>
      {confirmClaimVisible && (
        <TxConfirmModal
          title="Confirm your claim"
          header={
            <div className="flex justify-center">
              {rewardTokens.map(rewardToken => (
                <Tooltip
                  key={rewardToken.symbol}
                  className="flex col-gap-8 align-center justify-center mr-16"
                  title={
                    formatToken(rewardPool.getClaimFor(rewardToken.address), {
                      decimals: rewardToken.decimals,
                      scale: rewardToken.decimals,
                      tokenName: rewardToken.symbol,
                    }) ?? '-'
                  }>
                  <Text type="h2" weight="semibold" color="primary">
                    {formatToken(rewardPool.getClaimFor(rewardToken.address), {
                      compact: true,
                      scale: rewardToken.decimals,
                    }) ?? '-'}
                  </Text>
                  <Icon name={rewardToken.icon!} width={32} height={32} />
                </Tooltip>
              ))}
            </div>
          }
          submitText="Claim"
          onCancel={() => setConfirmClaim(false)}
          onConfirm={confirmClaimPoolReward}
        />
      )}
    </>
  );
};

export default Statistics;
