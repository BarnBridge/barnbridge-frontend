import React from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import Spin from 'components/antd/spin';
import Icon from 'components/custom/icon';
import { TokenAmount, TokenSelect } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { KnownTokens, TokenMeta } from 'components/providers/known-tokens-provider';
import TxConfirmModal from 'modules/smart-yield/components/tx-confirm-modal';
import { useYFPool } from 'modules/yield-farming/providers/pool-provider';
import { useYFPools } from 'modules/yield-farming/providers/pools-provider';

import s from './s.module.scss';

type Props = {
  type: 'stake' | 'unstake';
  token?: TokenMeta;
};

const PoolStake: React.FC<Props> = props => {
  const { type, token } = props;

  const yfPoolsCtx = useYFPools();
  const yfPoolCtx = useYFPool();

  const [staking, setStaking] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [activeToken, setActiveToken] = React.useState(token?.symbol);
  const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);

  const { poolMeta } = yfPoolCtx;

  if (!poolMeta) {
    return null;
  }

  const selectedStakedToken = yfPoolsCtx.stakingContract?.stakedTokensBySymbol.get(activeToken!);

  function handleStake() {
    setConfirmModalVisible(true);
  }

  function handleStakeCancel() {
    setConfirmModalVisible(false);
  }

  async function handleStakeConfirm({ gasPrice }: any) {
    setConfirmModalVisible(false);

    let value = new BigNumber(amount);

    if (!token || value.isNaN() || value.isLessThanOrEqualTo(BigNumber.ZERO)) {
      return Promise.reject();
    }

    setStaking(true);

    value = value.scaleBy(token.decimals)!;

    try {
      let result;

      if (type === 'stake') {
        result = await yfPoolsCtx.stakingContract?.stake(token.address, value, gasPrice);
      } else if (type === 'unstake') {
        result = await yfPoolsCtx.stakingContract?.unstake(token.address, value, gasPrice);
      }
      console.log('--- STAKE RESULT', result);

      setAmount('');
    } catch (e) {
      console.log('ERRR', e);
    }

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
            {formatToken(selectedStakedToken?.currentEpochUserBalance) ?? '-'}
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
              value={activeToken as KnownTokens}
              onChange={setActiveToken}
              tokens={poolMeta.tokens}
              showLabel
            />
          ) : (
            <Icon name={token?.icon!} width={24} height={24} />
          )
        }
        value={amount}
        onChange={setAmount}
        max={9.789}
        placeholder={`0 (Max ${9.789})`}
        className="mb-40"
      />

      {poolMeta.contract.isPoolEnded && [KnownTokens.USDC, KnownTokens.DAI].includes(activeToken as KnownTokens) && (
        <Alert
          message={
            <div className="flex flow-row row-gap-16 align-start">
              <Text type="p2" weight="semibold" color="blue">
                You can still deposit {activeToken} in SMART Yield’s Junior or Senior Tranches and earn interest for
                your funds.
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

      {poolMeta.contract.isPoolEnded && activeToken === KnownTokens.BOND && (
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

      {poolMeta.contract.isPoolEnded === false && type === 'stake' && (
        <Alert
          message="Deposits made after an epoch started will be considered as pro-rata figures in relation to the length of the epoch."
          className="mb-32"
        />
      )}

      <button type="button" className="button-primary" disabled={staking} onClick={handleStake}>
        {staking && <Spin spinning />}
        {type === 'stake' && 'Stake'}
        {type === 'unstake' && 'Unstake'}
      </button>

      {confirmModalVisible && (
        <TxConfirmModal
          title={{ stake: 'Stake', unstake: 'Unstake' }[type]}
          header={
            <div className="flex align-center justify-center">
              <Text type="h2" weight="bold" color="primary" className="mr-8">
                {formatToken(new BigNumber(amount))}
              </Text>
              <Icon name={token?.icon!} />
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
