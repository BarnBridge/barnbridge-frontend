import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import Erc20Contract from 'web3/contracts/erc20Contract';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import { YFContract } from 'web3/contracts/yieldFarming';
import { formatNumber, formatToken, formatUSD } from 'web3/utils';

import Alert from 'components/antd/alert';
import Spin from 'components/antd/spin';
import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';
import { TokenAmount, TokenSelect } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { KnownTokens, convertTokenInUSD, useKnownTokens } from 'components/providers/known-tokens-provider';
import { useReload } from 'hooks/useReload';
import TxConfirmModal from 'modules/smart-yield/components/tx-confirm-modal';
import { useYFPool } from 'modules/yield-farming/providers/pool-provider';
import { useYFPools } from 'modules/yield-farming/providers/pools-provider';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

type Props = {
  type: 'stake' | 'unstake';
};

const PoolStake: FC<Props> = props => {
  const { type } = props;

  const knownTokensCtx = useKnownTokens();
  const walletCtx = useWallet();
  const yfPoolsCtx = useYFPools();
  const yfPoolCtx = useYFPool();
  const [reload] = useReload();

  const [activeToken, setActiveToken] = useState(yfPoolCtx.poolMeta?.tokens[0]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [enabling, setEnabling] = useState(false);
  const [staking, setStaking] = useState(false);
  const [amount, setAmount] = useState('');

  const { poolMeta } = yfPoolCtx;
  const activeContract = activeToken?.contract as Erc20Contract;

  useEffect(() => {
    setAmount('');
  }, [type]);

  useEffect(() => {
    if (activeContract && walletCtx.account) {
      Promise.all([activeContract.loadBalance(), activeContract.loadAllowance(CONTRACT_STAKING_ADDR)]).then(reload);
    }
  }, [activeContract, walletCtx.account]);

  if (!poolMeta || !activeToken) {
    return null;
  }

  const selectedStakedToken = yfPoolsCtx.stakingContract?.stakedTokens.get(activeToken.address);
  const allowance = activeContract.getAllowanceOf(CONTRACT_STAKING_ADDR)?.unscaleBy(activeToken.decimals);
  const stakedBalance = selectedStakedToken?.nextEpochUserBalance?.unscaleBy(activeToken.decimals);
  const walletBalance = activeContract.balance?.unscaleBy(activeToken.decimals);
  const maxAmount =
    type === 'stake' ? BigNumber.min(walletBalance ?? 0, allowance ?? 0) : stakedBalance ?? BigNumber.ZERO;
  const bnAmount = new BigNumber(amount);

  function handleTokenSelect(tokenSymbol: string) {
    const tokenMeta = knownTokensCtx.getTokenBySymbol(tokenSymbol);
    setActiveToken(tokenMeta);
  }

  async function handleEnable() {
    setEnabling(true);

    try {
      await activeContract.approve(true, yfPoolsCtx.stakingContract?.address!);
    } catch {}

    setEnabling(false);
  }

  function handleStake() {
    setConfirmModalVisible(true);
  }

  function handleStakeCancel() {
    setConfirmModalVisible(false);
  }

  async function handleStakeConfirm({ gasPrice }: any) {
    setConfirmModalVisible(false);

    let value = new BigNumber(amount);

    if (!activeToken || value.isNaN() || value.isLessThanOrEqualTo(BigNumber.ZERO)) {
      return Promise.reject();
    }

    setStaking(true);

    value = value.scaleBy(activeToken.decimals)!;

    try {
      if (type === 'stake') {
        await yfPoolsCtx.stakingContract?.stake(activeToken.address, value, gasPrice);
      } else if (type === 'unstake') {
        await yfPoolsCtx.stakingContract?.unstake(activeToken.address, value, gasPrice);
      }

      setAmount('');
      await yfPoolsCtx.stakingContract?.loadCommonFor(activeToken);
      await yfPoolsCtx.stakingContract?.loadUserDataFor(activeToken);
      await activeContract.loadBalance();
      await (poolMeta?.contract as YFContract).loadCommon();
      await (poolMeta?.contract as YFContract).loadUserData();
    } catch (e) {}

    setStaking(false);
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
        max={maxAmount.toNumber()}
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
                    <Text type="p2" weight="bold" style={{ textDecoration: 'underline' }}>
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
                    <Text type="p2" weight="bold" style={{ textDecoration: 'underline' }}>
                      Go to governance staking
                    </Text>
                  </Link>
                </div>
              }
            />
          )}
        </>
      )}

      {poolMeta.contract.isPoolEnded === false && type === 'stake' && (
        <Alert
          className="mb-32"
          message="Deposits made after an epoch started will be considered as pro-rata figures in relation to the length of the epoch."
        />
      )}

      {poolMeta.contract.isPoolEnded === false && type === 'unstake' && (
        <Alert
          className="mb-32"
          message="Any funds withdrawn before the end of this epoch will not accrue any rewards for this epoch."
        />
      )}

      {type === 'stake' && allowance?.eq(BigNumber.ZERO) && (
        <button type="button" className="button-primary" disabled={enabling} onClick={handleEnable}>
          {enabling && <Spin spinning />}
          Enable {activeToken.symbol}
        </button>
      )}

      {(type === 'unstake' || allowance?.gt(BigNumber.ZERO)) && (
        <button
          type="button"
          className="button-primary"
          disabled={!bnAmount.gt(BigNumber.ZERO) || bnAmount.gt(maxAmount) || staking}
          onClick={handleStake}>
          {staking && <Spin spinning />}
          {type === 'stake' && 'Stake'}
          {type === 'unstake' && 'Unstake'}
        </button>
      )}

      {confirmModalVisible && (
        <TxConfirmModal
          title={{ stake: 'Stake', unstake: 'Unstake' }[type]}
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
          submitText={`Confirm your ${type}`}
          onCancel={handleStakeCancel}
          onConfirm={handleStakeConfirm}
        />
      )}
    </>
  );
};

export default PoolStake;
