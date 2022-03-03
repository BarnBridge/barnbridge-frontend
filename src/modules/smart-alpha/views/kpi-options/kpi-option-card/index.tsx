import React, { FC, useState } from 'react';
import cn from 'classnames';
import ContractListener from 'web3/components/contract-listener';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { formatToken } from 'web3/utils';

import Spin from 'components/antd/spin';
import Tooltip from 'components/antd/tooltip';
import { Button, Link } from 'components/button';
import { Tabs } from 'components/custom/tabs';
import { Hint, Text } from 'components/custom/typography';
import { TokenIcon } from 'components/token-icon';
import { useWeb3Contract } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { KpiOptionType } from 'modules/smart-alpha/api';
import KpiRewardPoolContract from 'modules/smart-alpha/contracts/kpiRewardPoolContract';
import { useWallet } from 'wallets/walletProvider';

import { getKpiOptionTokenIconNames } from 'modules/smart-alpha/utils';

import s from './s.module.scss';

export type KpiOptionCardProps = {
  className?: string;
  kpiOption: KpiOptionType;
};

export enum TypeKey {
  pool = 'pool',
  my = 'my',
}

const epochTabs = [
  {
    id: TypeKey.pool,
    children: 'Pool statistics',
  },
  {
    id: TypeKey.my,
    children: 'My statistics',
  },
];

export const KpiOptionCard: FC<KpiOptionCardProps> = props => {
  const { className, kpiOption } = props;

  const walletCtx = useWallet();
  const [reload] = useReload();

  const [activeTab, setActiveTab] = useState<TypeKey>(TypeKey.pool);
  const [confirmClaimVisible, setConfirmClaim] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const kpiContract = useWeb3Contract(
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
      kpiContract.loadClaimFor(rewardToken.address);
    });

    setConfirmClaim(true);
  }

  const confirmClaimPoolReward = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirmClaim(false);
    setClaiming(true);

    try {
      await kpiContract.sendClaimAll(args.gasPrice);
    } catch {}

    setClaiming(false);
  };

  const [tokenName, tokenBubble1Name, tokenBubble2Name] = getKpiOptionTokenIconNames(kpiOption.poolToken.symbol);

  return (
    <>
      <section className={cn(s.card, className)}>
        <header className={s.header}>
          <TokenIcon
            name={tokenName}
            bubble1Name={tokenBubble1Name}
            bubble2Name={tokenBubble2Name}
            outline={['purple', 'green']}
            size={36}
            className="mr-16"
          />
          <Text type="body1" weight="semibold">
            {kpiOption.poolToken.symbol}
          </Text>
        </header>
        <Tabs<TypeKey>
          tabs={epochTabs}
          activeKey={activeTab}
          onClick={setActiveTab}
          variation="elastic"
          className="mb-24"
        />
        {activeTab === TypeKey.pool && (
          <dl>
            {kpiOption.rewardTokens.map(token => {
              const [rewardTokenName, rewardTokenBubble1Name, rewardTokenBubble2Name] = getKpiOptionTokenIconNames(
                token.symbol,
              );
              return (
                <React.Fragment key={token.symbol}>
                  <div className={s.defRow}>
                    <dt>
                      <Hint text={`This number shows the $${token.symbol} token rewards distributed per day.`}>
                        {token.symbol} daily rewards
                      </Hint>
                    </dt>
                    <dd>
                      <TokenIcon
                        name={rewardTokenName}
                        bubble1Name={rewardTokenBubble1Name}
                        bubble2Name={rewardTokenBubble2Name}
                        className="mr-8"
                        size="16"
                      />
                      {kpiContract.getRewardLeftFor(token.address)?.isZero()
                        ? '0'
                        : formatToken(kpiContract.getDailyRewardFor(token.address), {
                            scale: token.decimals,
                          }) ?? '-'}
                    </dd>
                  </div>
                  <div className={s.defRow}>
                    <dt>
                      <Hint text={`This number shows the $${token.symbol} token rewards remaining.`}>
                        {token.symbol} rewards balance
                      </Hint>
                    </dt>
                    <dd>
                      <TokenIcon
                        name={rewardTokenName}
                        bubble1Name={rewardTokenBubble1Name}
                        bubble2Name={rewardTokenBubble2Name}
                        className="mr-8"
                        size="16"
                      />
                      {formatToken(kpiContract.getRewardLeftFor(token.address), {
                        scale: token.decimals,
                      }) ?? '-'}
                    </dd>
                  </div>
                </React.Fragment>
              );
            })}
            <div className={s.defRow}>
              <dt>Balancer tokens</dt>
              <dd>
                <TokenIcon
                  name={tokenName}
                  bubble1Name={tokenBubble1Name}
                  bubble2Name={tokenBubble2Name}
                  outline={['purple', 'green']}
                  size={16}
                  className="mr-8"
                />
                {formatToken(kpiContract.poolSize?.unscaleBy(kpiOption.poolToken.decimals)) ?? '-'}
              </dd>
            </div>
          </dl>
        )}
        {activeTab === TypeKey.my && walletCtx.isActive && (
          <dl>
            {kpiOption.rewardTokens.map(token => {
              const [rewardTokenName, rewardTokenBubble1Name, rewardTokenBubble2Name] = getKpiOptionTokenIconNames(
                token.symbol,
              );

              return (
                <React.Fragment key={token.address}>
                  <div className={s.defRow}>
                    <dt>
                      <Hint
                        text={`This number shows the $${token.symbol} rewards you would potentially be able to harvest daily, but is subject to change - in case more users deposit, or you withdraw some of your stake.`}>
                        My daily {token.symbol} reward
                      </Hint>
                    </dt>
                    <dd>
                      <TokenIcon
                        name={rewardTokenName}
                        bubble1Name={rewardTokenBubble1Name}
                        bubble2Name={rewardTokenBubble2Name}
                        className="mr-8"
                        size="16"
                      />
                      {formatToken(kpiContract.getMyDailyRewardFor(token.address), {
                        scale: token.decimals,
                      }) ?? '-'}
                    </dd>
                  </div>
                  <div className={s.defRow}>
                    <dt>My current {token.symbol} reward</dt>
                    <dd>
                      <TokenIcon
                        name={rewardTokenName}
                        bubble1Name={rewardTokenBubble1Name}
                        bubble2Name={rewardTokenBubble2Name}
                        className="mr-8"
                        size="16"
                      />
                      {formatToken(kpiContract.getClaimFor(token.address), {
                        scale: token.decimals,
                      }) ?? '-'}
                    </dd>
                  </div>
                </React.Fragment>
              );
            })}
            <div className={s.defRow}>
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
                {formatToken(kpiContract.getBalanceFor(walletCtx.account!)?.unscaleBy(kpiOption.poolToken.decimals)) ??
                  '-'}
              </dd>
            </div>
          </dl>
        )}
        <footer className={s.footer}>
          <Link variation="primary" className="full-width" to={`/smart-alpha/kpi-options/${kpiOption.poolAddress}`}>
            View pool
          </Link>
          {walletCtx.isActive && activeTab === TypeKey.my && (
            <Button type="button" variation="ghost" disabled={!kpiContract.hasToClaim()} onClick={handleClaim}>
              {claiming && <Spin type="circle" />}
              Claim
            </Button>
          )}
        </footer>
      </section>
      {confirmClaimVisible && (
        <TxConfirmModal
          title="Confirm your claim"
          header={
            <div className="flex justify-center">
              {kpiOption.rewardTokens.map(token => {
                const [rewardTokenName, rewardTokenBubble1Name, rewardTokenBubble2Name] = getKpiOptionTokenIconNames(
                  token.symbol,
                );

                return (
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
                      name={rewardTokenName}
                      bubble1Name={rewardTokenBubble1Name}
                      bubble2Name={rewardTokenBubble2Name}
                      size={32}
                    />
                  </Tooltip>
                );
              })}
            </div>
          }
          submitText="Claim"
          onCancel={() => setConfirmClaim(false)}
          onConfirm={confirmClaimPoolReward}
        />
      )}
      <ContractListener contract={kpiContract} />
    </>
  );
};
