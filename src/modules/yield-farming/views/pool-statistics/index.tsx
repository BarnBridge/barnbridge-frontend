import React, { FC, useState } from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/contracts/erc20Contract';
import { formatToken } from 'web3/utils';

import Spin from 'components/antd/spin';
import Icon from 'components/custom/icon';
import { Tabs as ElasticTabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { BondToken, useKnownTokens } from 'components/providers/known-tokens-provider';
import { useYFPool } from 'modules/yield-farming/providers/pool-provider';
import { useYFPools } from 'modules/yield-farming/providers/pools-provider';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const PoolStatistics: FC = () => {
  const knownTokensCtx = useKnownTokens();
  const walletCtx = useWallet();
  const yfPoolsCtx = useYFPools();
  const yfPoolCtx = useYFPool();

  const { poolMeta } = yfPoolCtx;

  const [activeToken, setActiveToken] = useState(poolMeta?.tokens[0]);
  const [claiming, setClaiming] = useState(false);
  const [confirmClaimVisible, setConfirmClaimVisible] = useState(false);

  const bondContract = BondToken.contract as Erc20Contract;
  const activeContract = activeToken?.contract as Erc20Contract;

  if (!walletCtx.isActive || !poolMeta) {
    return null;
  }

  const selectedStakedToken = yfPoolsCtx.stakingContract?.stakedTokens.get(activeToken?.address!);

  function handleTabSelect(tokenSymbol: string) {
    const tokenMeta = knownTokensCtx.getTokenBySymbol(tokenSymbol);
    setActiveToken(tokenMeta);
  }

  function handleClaim() {
    setConfirmClaimVisible(true);
  }

  const confirmClaim = async <A extends ConfirmTxModalArgs>(args: A) => {
    setConfirmClaimVisible(false);
    setClaiming(true);

    try {
      await poolMeta.contract.claim(args.gasPrice);
    } catch {}

    setClaiming(false);
  };

  return (
    <div className={s.component}>
      <div className="card mb-32">
        <div className="card-header">
          <Text type="p1" weight="semibold" color="primary">
            My rewards
          </Text>
        </div>
        <div className="p-24">
          <div className="flex align-center justify-space-between mb-24">
            <Text type="small" weight="semibold" color="secondary">
              Bond balance
            </Text>
            <div className="flex align-center">
              <Icon name="bond-circle-token" width={16} height={16} className="mr-8" />
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(bondContract.balance?.unscaleBy(BondToken.decimals)) ?? '-'}
              </Text>
            </div>
          </div>
          <div className="flex align-center justify-space-between">
            <Text type="small" weight="semibold" color="secondary">
              Potential reward this epoch
            </Text>
            <div className="flex align-center">
              <Icon name="bond-circle-token" width={16} height={16} className="mr-8" />
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(poolMeta.contract.potentialReward?.unscaleBy(BondToken.decimals), {
                  decimals: BondToken.decimals,
                }) ?? '-'}
              </Text>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className={cn('flex align-center justify-space-between', s.claimBlock)}>
            <div className="flex flow-row">
              <div className="flex align-center mb-4">
                <Text type="h2" weight="semibold" color="primary" className="mr-8">
                  {formatToken(poolMeta.contract.toClaim?.unscaleBy(BondToken.decimals), {
                    decimals: BondToken.decimals,
                  }) ?? '-'}
                </Text>
                <Icon name="bond-circle-token" />
              </div>
              <Text type="small" weight="semibold" color="secondary">
                Current reward
              </Text>
            </div>
            <button
              type="button"
              className="button-primary"
              disabled={!poolMeta.contract.toClaim?.gt(BigNumber.ZERO) || claiming}
              onClick={handleClaim}>
              {claiming && <Spin spinning />}
              Claim reward
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <Text type="p1" weight="semibold" color="primary">
            My stake
          </Text>
        </div>
        <div className="p-24">
          {poolMeta.tokens.length > 1 && (
            <ElasticTabs
              tabs={poolMeta.tokens.map(token => ({
                id: token.symbol,
                children: token.symbol,
              }))}
              activeKey={activeToken?.symbol!}
              onClick={handleTabSelect}
              variation="elastic"
              className="mb-32"
              style={{
                width: '100%',
                height: 40,
              }}
            />
          )}
          <div className="flex flow-row">
            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                Staked balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(selectedStakedToken?.nextEpochUserBalance?.unscaleBy(activeToken?.decimals), {
                  decimals: activeToken?.decimals,
                }) ?? '-'}
              </Text>
            </div>

            <div className="flex align-center justify-space-between mb-24">
              <Text type="small" weight="semibold" color="secondary">
                Effective Staked balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(selectedStakedToken?.currentEpochUserBalance?.unscaleBy(activeToken?.decimals), {
                  decimals: activeToken?.decimals,
                }) ?? '-'}
              </Text>
            </div>

            <div className="flex align-center justify-space-between">
              <Text type="small" weight="semibold" color="secondary">
                Wallet balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatToken(activeContract.balance?.unscaleBy(activeToken?.decimals), {
                  decimals: activeToken?.decimals,
                }) ?? '-'}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {confirmClaimVisible && (
        <TxConfirmModal
          title="Confirm your claim"
          header={
            <div className="flex col-gap-8 align-center justify-center">
              <Text type="h2" weight="semibold" color="primary">
                {formatToken(poolMeta.contract.toClaim?.unscaleBy(BondToken.decimals)) ?? '-'}
              </Text>
              <Icon name="bond-circle-token" width={32} height={32} />
            </div>
          }
          submitText="Claim"
          onCancel={() => setConfirmClaimVisible(false)}
          onConfirm={confirmClaim}
        />
      )}
    </div>
  );
};

export default PoolStatistics;
