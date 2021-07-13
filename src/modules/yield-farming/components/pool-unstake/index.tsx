import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatNumber, formatToken, formatUSD } from 'web3/utils';

import Alert from 'components/antd/alert';
import Spin from 'components/antd/spin';
import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';
import { TokenAmount, TokenSelect } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';
import { YfPoolContract } from 'modules/yield-farming/contracts/yfPool';

import { useYfPool } from '../../providers/pool-provider';
import { useYFPools } from '../../providers/pools-provider';

import s from './s.module.scss';

const PoolUnstake: FC = () => {
  const { getTokenBySymbol, convertTokenInUSD } = useKnownTokens();
  const yfPoolsCtx = useYFPools();
  const yfPoolCtx = useYfPool();

  const [activeToken, setActiveToken] = useState(yfPoolCtx.poolMeta?.tokens[0]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [unstaking, setUnstaking] = useState(false);
  const [amount, setAmount] = useState('');

  const { poolMeta } = yfPoolCtx;
  const activeContract = activeToken?.contract as Erc20Contract;

  if (!poolMeta || !activeToken) {
    return null;
  }

  const selectedStakedToken = yfPoolsCtx.stakingContract?.stakedTokens.get(activeToken.address);
  const stakedBalance = selectedStakedToken?.nextEpochUserBalance?.unscaleBy(activeToken.decimals);
  const walletBalance = activeContract.balance?.unscaleBy(activeToken.decimals);
  const maxAmount = stakedBalance ?? BigNumber.ZERO;
  const bnAmount = BigNumber.from(amount);

  function handleTokenSelect(tokenSymbol: string) {
    const tokenMeta = getTokenBySymbol(tokenSymbol);
    setActiveToken(tokenMeta);
  }

  function handleUnstake() {
    setConfirmModalVisible(true);
  }

  function handleUnstakeCancel() {
    setConfirmModalVisible(false);
  }

  async function handleUnstakeConfirm({ gasPrice }: any) {
    setConfirmModalVisible(false);

    let value = BigNumber.from(amount);

    if (!activeToken || !value || value.isLessThanOrEqualTo(BigNumber.ZERO)) {
      return Promise.reject();
    }

    setUnstaking(true);

    value = value.scaleBy(activeToken.decimals)!;

    try {
      await yfPoolsCtx.stakingContract?.unstake(activeToken.address, value, gasPrice);

      setAmount('');
      yfPoolsCtx.stakingContract?.loadCommonFor(activeToken.address).catch(Error);
      yfPoolsCtx.stakingContract?.loadUserDataFor(activeToken.address).catch(Error);
      (poolMeta?.contract as YfPoolContract).loadCommon().catch(Error);
      (poolMeta?.contract as YfPoolContract).loadUserData().catch(Error);
      activeContract.loadBalance().catch(Error);
    } catch (e) {}

    setUnstaking(false);
  }

  return (
    <>
      <div className={cn('flexbox-list p-16 mb-32', s.stakeBlock)}>
        <div className="flex flow-row mr-16">
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            Staked balance
          </Text>
          <Tooltip title={formatUSD(convertTokenInUSD(stakedBalance, activeToken.symbol)) ?? '-'}>
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(stakedBalance, {
                decimals: activeToken.decimals,
              }) ?? '-'}
            </Text>
          </Tooltip>
        </div>
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            Wallet balance
          </Text>
          <Tooltip title={formatUSD(convertTokenInUSD(walletBalance, activeToken.symbol)) ?? '-'}>
            <Text type="p1" weight="semibold" color="primary">
              {formatToken(walletBalance, {
                decimals: activeToken.decimals,
              }) ?? '-'}
            </Text>
          </Tooltip>
        </div>
      </div>
      <TokenAmount
        before={
          poolMeta.tokens.length > 1 ? (
            <TokenSelect
              value={activeToken.symbol as KnownTokens}
              onChange={handleTokenSelect}
              tokens={poolMeta.tokens.map(t => t.symbol as KnownTokens)}
            />
          ) : (
            <Icon name={activeToken.icon!} width={24} height={24} />
          )
        }
        value={amount}
        onChange={setAmount}
        max={maxAmount}
        placeholder={`0 (Max ${formatNumber(maxAmount, { decimals: activeToken.decimals })})`}
        slider
        className="mb-40"
        classNameBefore={poolMeta.tokens.length > 1 ? 'ph-0' : ''}
      />

      {poolMeta.contract.isPoolEnded === true && (
        <>
          {[KnownTokens.USDC, KnownTokens.DAI].includes(activeToken.symbol as KnownTokens) && (
            <Alert
              message={
                <div className="flex flow-row row-gap-16 align-start">
                  <Text type="p2" weight="semibold" color="blue">
                    You can still deposit {activeToken.symbol} in SMART Yield’s Junior or Senior Tranches and earn
                    interest for your funds.
                  </Text>
                  <Link to="/smart-yield" className="link-blue">
                    <Text type="p2" weight="bold" className="text-underline">
                      Go to SMART yield
                    </Text>
                  </Link>
                </div>
              }
              className="mb-32"
            />
          )}
          {activeToken.symbol === KnownTokens.BOND && (
            <Alert
              className="mb-32"
              message={
                <div className="flex flow-row row-gap-16 align-start">
                  <Text type="p2" weight="semibold" color="blue">
                    You can still deposit BOND in the DAO governance to earn interest for your funds.
                  </Text>
                  <Link to="/governance" className="link-blue">
                    <Text type="p2" weight="bold" className="text-underline">
                      Go to governance staking
                    </Text>
                  </Link>
                </div>
              }
            />
          )}
        </>
      )}

      {poolMeta.contract.isPoolEnded === false && (
        <Alert
          className="mb-32"
          message="Any funds withdrawn before the end of this epoch will not accrue any rewards for this epoch."
        />
      )}

      <button
        type="button"
        className="button-primary"
        disabled={!bnAmount || !bnAmount.gt(BigNumber.ZERO) || bnAmount.gt(maxAmount) || unstaking}
        onClick={handleUnstake}>
        {unstaking && <Spin spinning />}
        Unstake
      </button>

      {confirmModalVisible && (
        <TxConfirmModal
          title="Unstake"
          header={
            <div className="flex align-center justify-center">
              <Text type="h2" weight="bold" color="primary" className="mr-8">
                {formatToken(bnAmount, {
                  decimals: activeToken.decimals,
                })}
              </Text>
              <Icon name={activeToken.icon!} />
            </div>
          }
          submitText={`Confirm your unstake`}
          onCancel={handleUnstakeCancel}
          onConfirm={handleUnstakeConfirm}
        />
      )}
    </>
  );
};

export default PoolUnstake;
