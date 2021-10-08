import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Spin from 'components/antd/spin';
import Tooltip from 'components/antd/tooltip';
import { Text } from 'components/custom/typography';
import { TokenIcon } from 'components/token-icon';
import { FCx } from 'components/types.tx';
import { KpiOptionType } from 'modules/smart-alpha/api';
import KpiRewardPoolContract from 'modules/smart-alpha/contracts/kpiRewardPoolContract';
import { useWallet } from 'wallets/walletProvider';

import { getKpiOptionTokenIconNames } from 'modules/smart-alpha/utils';

import s from './s.module.scss';

type StatisticsProps = {
  kpiOption: KpiOptionType;
  kpiContract: KpiRewardPoolContract;
  poolTokenContract: Erc20Contract;
  rewardContracts: Erc20Contract[];
};

const Statistics: FCx<StatisticsProps> = ({
  className,
  kpiOption,
  kpiContract,
  poolTokenContract,
  rewardContracts,
}) => {
  const walletCtx = useWallet();

  const walletBalance = poolTokenContract.balance;
  const stakedBalance = walletCtx.account ? kpiContract.getBalanceFor(walletCtx.account) : undefined;

  const [confirmClaimVisible, setConfirmClaim] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const totalToClaim = kpiOption.rewardTokens.reduce((sum, rewardToken) => {
    const toClaim = kpiContract.getClaimFor(rewardToken.address);
    return sum.plus(toClaim ?? BigNumber.ZERO);
  }, BigNumber.ZERO);

  const canClaim = totalToClaim.gt(BigNumber.ZERO);

  function handleClaim() {
    kpiOption.rewardTokens.forEach(token => {
      kpiContract.loadClaimFor(token.address);
    });
    setConfirmClaim(true);
  }

  const confirmClaimPoolReward = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirmClaim(false);
    setClaiming(true);

    try {
      await kpiContract.sendClaimAll(args.gasPrice);

      rewardContracts.forEach(rewardContract => {
        rewardContract.loadBalance();
      });
    } catch (e) {
      console.error(e);
    }

    setClaiming(false);
  };

  const [tokenName, tokenBubble1Name, tokenBubble2Name] = getKpiOptionTokenIconNames(kpiOption.poolToken.symbol);

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
              <TokenIcon
                name={tokenName}
                bubble1Name={tokenBubble1Name}
                bubble2Name={tokenBubble2Name}
                outline={['purple', 'green']}
                size={16}
                className="mr-8"
              />
              {formatToken(walletBalance, {
                scale: kpiOption.poolToken.decimals,
              }) ?? '-'}
            </dd>
          </div>
          <div className={s.def}>
            <dt>Staked balance</dt>
            <dd>
              <TokenIcon
                name={tokenName}
                bubble1Name={tokenBubble1Name}
                bubble2Name={tokenBubble2Name}
                outline={['purple', 'green']}
                size={16}
                className="mr-8"
              />
              {formatToken(stakedBalance, {
                scale: kpiOption.poolToken.decimals,
              }) ?? '-'}
            </dd>
          </div>
          {kpiOption.rewardTokens.map(token => {
            const [rewardTokenName, rewardTokenBubble1Name, rewardTokenBubble2Name] = getKpiOptionTokenIconNames(
              token.symbol,
            );
            return (
              <React.Fragment key={token.address}>
                <div className={s.def}>
                  <dt>My daily {token.symbol} reward</dt>
                  <dd>
                    <TokenIcon
                      name={rewardTokenName}
                      bubble1Name={rewardTokenBubble1Name}
                      bubble2Name={rewardTokenBubble2Name}
                      className="mr-8"
                      size="16"
                    />
                    {formatToken(kpiContract.getMyDailyRewardFor(token.address)?.unscaleBy(token.decimals)) ?? '-'}
                  </dd>
                </div>
                <div className={s.def}>
                  <dt>My {token.symbol} balance</dt>
                  <dd>
                    <TokenIcon
                      name={rewardTokenName}
                      bubble1Name={rewardTokenBubble1Name}
                      bubble2Name={rewardTokenBubble2Name}
                      className="mr-8"
                      size="16"
                    />
                    {formatToken(rewardContracts.find(rc => rc.address === token.address)?.balance, {
                      scale: token.decimals,
                    }) ?? '-'}
                  </dd>
                </div>
              </React.Fragment>
            );
          })}
        </dl>
        <footer className={s.footer}>
          <div>
            {kpiOption.rewardTokens.map(token => {
              const [rewardTokenName, rewardTokenBubble1Name, rewardTokenBubble2Name] = getKpiOptionTokenIconNames(
                token.symbol,
              );
              return (
                <div key={token.symbol} className={s.footerReward}>
                  <div className="flex mr-16">
                    <TokenIcon
                      name={rewardTokenName}
                      bubble1Name={rewardTokenBubble1Name}
                      bubble2Name={rewardTokenBubble2Name}
                      size="24"
                      className="mr-8"
                      style={{ flexShrink: 0 }}
                    />
                    <Tooltip
                      title={
                        <Text type="p2" weight="semibold" color="primary">
                          {formatToken(kpiContract.getClaimFor(token.address), {
                            decimals: token.decimals,
                            scale: token.decimals,
                            tokenName: token.symbol,
                          }) ?? '-'}
                        </Text>
                      }>
                      <Text
                        type="h3"
                        weight="bold"
                        color="primary"
                        className="text-ellipsis"
                        style={{ maxWidth: '120px' }}>
                        {formatToken(kpiContract.getClaimFor(token.address), {
                          compact: true,
                          scale: token.decimals,
                        }) ?? '-'}
                      </Text>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
            <Text type="small" weight="semibold" color="secondary">
              My current reward{kpiOption.rewardTokens.length! > 1 ? 's' : ''}
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
              {kpiOption.rewardTokens.map(token => (
                <Tooltip
                  key={token.symbol}
                  className="flex col-gap-8 align-center justify-center mr-16"
                  title={
                    formatToken(kpiContract.getClaimFor(token.address), {
                      decimals: token.decimals,
                      scale: token.decimals,
                      tokenName: token.symbol,
                    }) ?? '-'
                  }>
                  <Text type="h2" weight="semibold" color="primary">
                    {formatToken(kpiContract.getClaimFor(token.address), {
                      compact: true,
                      scale: token.decimals,
                    }) ?? '-'}
                  </Text>
                  <TokenIcon
                    name={tokenName}
                    bubble1Name={tokenBubble1Name}
                    bubble2Name={tokenBubble2Name}
                    outline={['purple', 'green']}
                    size={32}
                  />
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
