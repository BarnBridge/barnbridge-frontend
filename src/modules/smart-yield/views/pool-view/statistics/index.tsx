import React, { useState } from 'react';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { ZERO_BIG_NUMBER, formatToken } from 'web3/utils';

import Spin from 'components/antd/spin';
import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { Markets, Pools } from 'modules/smart-yield/api';
import { useRewardPool } from 'modules/smart-yield/providers/reward-pool-provider';

import s from './s.module.scss';

type Props = {
  className?: string;
};

const Statistics: React.FC<Props> = ({ className }) => {
  const { rewardPool, sendClaim } = useRewardPool();

  const [confirmVisible, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const canClaim = Boolean(rewardPool?.pool.toClaim?.gt(ZERO_BIG_NUMBER));

  const market = Markets.get(rewardPool?.protocolId ?? '');
  const meta = Pools.get(rewardPool?.underlyingSymbol ?? '');

  function handleClaim() {
    rewardPool?.pool.loadClaim();
    setConfirm(true);
  }

  const confirmClaim = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirm(false);
    setSaving(true);

    try {
      await sendClaim(args.gasPrice);
    } catch {}

    setSaving(false);
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
                name={meta?.icon}
                bubbleName="bond-circle-token"
                secondBubbleName={market?.icon}
                width={16}
                height={16}
                className="mr-8"
              />
              {formatToken(rewardPool?.poolToken.balance, {
                scale: rewardPool?.poolToken.decimals,
              }) ?? '-'}
            </dd>
          </div>
          <div className={s.def}>
            <dt>Staked balance</dt>
            <dd>
              <IconBubble
                name={meta?.icon}
                bubbleName="bond-circle-token"
                secondBubbleName={market?.icon}
                width={16}
                height={16}
                className="mr-8"
              />
              {formatToken(rewardPool?.pool.balance, {
                scale: rewardPool?.poolToken.decimals,
              }) ?? '-'}
            </dd>
          </div>
          <div className={s.def}>
            <dt>My daily reward</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              {formatToken(rewardPool?.pool.myDailyReward, {
                scale: rewardPool?.rewardToken.decimals,
              }) ?? '-'}
            </dd>
          </div>
          <div className={s.def}>
            <dt>My Bond balance</dt>
            <dd>
              <Icon name="bond-circle-token" className="mr-8" width="16" height="16" />
              {formatToken(rewardPool?.rewardToken.balance, {
                scale: rewardPool?.rewardToken.decimals,
              }) ?? '-'}
            </dd>
          </div>
        </dl>
        <footer className={s.footer}>
          <div>
            <div className={s.footerReward}>
              <Tooltip
                title={
                  <Text type="p2" weight="semibold" color="primary">
                    {formatToken(rewardPool?.pool.toClaim, {
                      scale: rewardPool?.rewardToken.decimals,
                      decimals: rewardPool?.rewardToken.decimals,
                    }) ?? '-'}
                  </Text>
                }>
                <Text type="h2" weight="bold" color="primary" className="wrap">
                  {formatToken(rewardPool?.pool.toClaim, {
                    scale: rewardPool?.rewardToken.decimals,
                  }) ?? '-'}
                </Text>
              </Tooltip>
              <Icon name="bond-circle-token" width="24" height="24" style={{ marginLeft: 8 }} />
            </div>
            <Text type="small" weight="semibold" color="secondary">
              My current reward
            </Text>
          </div>
          <button type="button" className="button-primary ml-auto" disabled={!canClaim || saving} onClick={handleClaim}>
            {saving && <Spin type="circle" />}
            Claim reward
          </button>
        </footer>
      </section>
      {confirmVisible && (
        <TxConfirmModal
          title="Confirm your claim"
          header={
            <div className="flex col-gap-8 align-center justify-center">
              <Text type="h2" weight="semibold" color="primary">
                {formatToken(rewardPool?.pool.toClaim, {
                  scale: rewardPool?.rewardToken.decimals,
                }) ?? '-'}
              </Text>
              <Icon name="bond-circle-token" width={32} height={32} />
            </div>
          }
          submitText="Claim"
          onCancel={() => setConfirm(false)}
          onConfirm={confirmClaim}
        />
      )}
    </>
  );
};

export default Statistics;
