import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import Erc20Contract from 'web3/contracts/erc20Contract';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import { formatNumber, formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import Spin from 'components/antd/spin';
import Icon from 'components/custom/icon';
import { TokenAmount, TokenSelect } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/known-tokens-provider';
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

  const [selectedTokenSymbol, setSelectedTokenSymbol] = useState(yfPoolCtx.poolMeta?.tokens[0]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [enabling, setEnabling] = useState(false);
  const [staking, setStaking] = useState(false);
  const [amount, setAmount] = useState('');

  const { poolMeta } = yfPoolCtx;
  const tokenMeta = selectedTokenSymbol ? knownTokensCtx.getTokenBySymbol(selectedTokenSymbol) : undefined;

  const contract = tokenMeta?.contract as Erc20Contract;

  useEffect(() => {
    if (contract && walletCtx.account) {
      Promise.all([
        contract.loadBalance(walletCtx.account),
        contract.loadAllowance(CONTRACT_STAKING_ADDR, walletCtx.account),
      ]).then(reload);
    }
  }, [contract, walletCtx.account]);

  if (!poolMeta || !tokenMeta) {
    return null;
  }

  const selectedStakedToken = yfPoolsCtx.stakingContract?.stakedTokensBySymbol.get(selectedTokenSymbol!);
  const allowance = (tokenMeta.contract as Erc20Contract)
    .getAllowanceOf(CONTRACT_STAKING_ADDR)
    ?.unscaleBy(tokenMeta.decimals);
  const balance = (tokenMeta.contract as Erc20Contract)
    .getBalanceOf(walletCtx.account ?? '')
    ?.unscaleBy(tokenMeta.decimals);
  const maxAmount = BigNumber.min(balance ?? 0, allowance ?? 0);
  const bnAmount = new BigNumber(amount);

  async function handleEnable() {
    setEnabling(true);

    try {
      await contract.approve(true, yfPoolsCtx.stakingContract?.address!);
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

    if (!tokenMeta || value.isNaN() || value.isLessThanOrEqualTo(BigNumber.ZERO)) {
      return Promise.reject();
    }

    setStaking(true);

    value = value.scaleBy(tokenMeta.decimals)!;

    try {
      if (type === 'stake') {
        await yfPoolsCtx.stakingContract?.stake(tokenMeta.address, value, gasPrice);
      } else if (type === 'unstake') {
        await yfPoolsCtx.stakingContract?.unstake(tokenMeta.address, value, gasPrice);
      }
      setAmount('');
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
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(selectedStakedToken?.nextEpochUserBalance) ?? '-'}
          </Text>
        </div>
        <div className="flex flow-row">
          <Text type="small" weight="semibold" color="secondary" className="mb-8">
            Wallet balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatToken(selectedStakedToken?.userBalance) ?? '-'}
          </Text>
        </div>
      </div>
      <TokenAmount
        before={
          poolMeta.tokens.length > 1 ? (
            <TokenSelect
              value={selectedTokenSymbol as KnownTokens}
              onChange={setSelectedTokenSymbol}
              tokens={poolMeta.tokens}
              showLabel
            />
          ) : (
            <Icon name={tokenMeta?.icon!} width={24} height={24} />
          )
        }
        value={amount}
        onChange={setAmount}
        max={maxAmount.toNumber()}
        placeholder={`0 (Max ${formatNumber(maxAmount)})`}
        slider
        className="mb-40"
      />

      {poolMeta.contract.isPoolEnded === true && (
        <>
          {[KnownTokens.USDC, KnownTokens.DAI].includes(selectedTokenSymbol as KnownTokens) && (
            <Alert
              message={
                <div className="flex flow-row row-gap-16 align-start">
                  <Text type="p2" weight="semibold" color="blue">
                    You can still deposit {selectedTokenSymbol} in SMART Yield’s Junior or Senior Tranches and earn
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
          {selectedTokenSymbol === KnownTokens.BOND && (
            <Alert
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
              className="mb-32"
            />
          )}
        </>
      )}

      {poolMeta.contract.isPoolEnded === false && type === 'stake' && (
        <Alert
          message="Deposits made after an epoch started will be considered as pro-rata figures in relation to the length of the epoch."
          className="mb-32"
        />
      )}

      {type === 'stake' && !contract.getAllowanceOf(yfPoolsCtx.stakingContract?.address!)?.gt(BigNumber.ZERO) && (
        <button type="button" className="button-primary" disabled={enabling} onClick={handleEnable}>
          {enabling && <Spin spinning />}
          Enable {tokenMeta.symbol}
        </button>
      )}

      {(type === 'unstake' || contract.getAllowanceOf(yfPoolsCtx.stakingContract?.address!)?.gt(BigNumber.ZERO)) && (
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
                {formatToken(bnAmount)}
              </Text>
              <Icon name={tokenMeta?.icon!} />
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
