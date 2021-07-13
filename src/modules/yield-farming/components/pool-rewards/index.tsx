import React, { FC, useState } from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useWallet } from 'wallets/walletProvider';

import PoolHarvestModal from '../../components/pool-harvest-modal';
import { useYFPools } from '../../providers/pools-provider';

import s from './s.module.scss';

const PoolRewards: FC = () => {
  const walletCtx = useWallet();
  const yfPoolsCtx = useYFPools();
  const { projectToken } = useKnownTokens();

  const [harvestModalVisible, showHarvestModal] = useState(false);

  const bondContract = projectToken.contract as Erc20Contract;

  const totalToClaim = yfPoolsCtx.yfPools.reduce((sum: BigNumber | undefined, { contract }) => {
    return (sum ?? BigNumber.ZERO).plus(contract.toClaim ?? BigNumber.ZERO);
  }, undefined);

  const totalPotentialReward = yfPoolsCtx.yfPools.reduce((sum: BigNumber | undefined, { contract }) => {
    if (contract.isPoolEnded !== false) {
      return sum;
    }

    return (sum ?? BigNumber.ZERO).plus(contract.potentialReward ?? BigNumber.ZERO);
  }, undefined);

  return (
    <div className={cn(s.component, 'flex flow-row pv-24 ph-64')}>
      <Text type="lb2" weight="semibold" color="red" className="mb-16">
        My Rewards
      </Text>

      <div className="flex col-gap-24">
        <div className="flex flow-row">
          <Text type="p2" color="secondary" className="mb-4">
            Current reward
          </Text>
          <div className="flex col-gap-16 align-center">
            <Text type="h3" weight="bold" color="primary">
              {formatToken(totalToClaim?.unscaleBy(projectToken.decimals))}
            </Text>
            <Icon name={projectToken.icon!} />
            {walletCtx.isActive && (
              <button
                type="button"
                className="button-text"
                style={{ color: totalToClaim?.gt(BigNumber.ZERO) ? 'red' : 'var(--theme-default-color)' }}
                disabled={!totalToClaim?.gt(BigNumber.ZERO)}
                onClick={() => showHarvestModal(true)}>
                Claim
              </button>
            )}
          </div>
        </div>
        <div className="v-divider" />
        <div className="flex flow-row">
          <Text type="p2" color="secondary" className="mb-4">
            Bond Balance
          </Text>
          <div className="flex col-gap-16 align-center">
            <Text type="h3" weight="bold" color="primary">
              {formatToken(bondContract.balance?.unscaleBy(projectToken.decimals)) ?? '-'}
            </Text>
            <Icon name={projectToken.icon!} />
          </div>
        </div>
        <div className="v-divider" />
        <div className="flex flow-row">
          <Hint text="This number shows the $BOND rewards you would potentially be able to harvest this epoch, but is subject to change - in case more users deposit, or you withdraw some of your stake.">
            <Text type="p2" color="secondary" className="mb-4">
              Potential reward this epoch
            </Text>
          </Hint>
          <div className="flex col-gap-8 align-center">
            <Text type="h3" weight="bold" color="primary">
              {formatToken(totalPotentialReward) ?? '-'}
            </Text>
            <Icon name={projectToken.icon!} />
          </div>
        </div>
      </div>

      {harvestModalVisible && <PoolHarvestModal onCancel={() => showHarvestModal(false)} />}
    </div>
  );
};

export default PoolRewards;
