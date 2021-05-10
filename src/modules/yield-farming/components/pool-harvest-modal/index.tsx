import React, { FC, useState } from 'react';
import BigNumber from 'bignumber.js';
import { formatToken } from 'web3/utils';

import Modal, { ModalProps } from 'components/antd/modal';
import Spin from 'components/antd/spin';
import Grid from 'components/custom/grid';
import Icon, { IconNames } from 'components/custom/icon';
import IconsSet from 'components/custom/icons-set';
import { Text } from 'components/custom/typography';
import { BondToken } from 'components/providers/known-tokens-provider';

import { BondYfPool, StableYfPool, UnilpYfPool } from '../../providers/pools-provider';

type PoolHarvestButtonProps = {
  icons: string[];
  label: string;
  reward?: BigNumber;
  loading: boolean;
  onClick: () => void;
};

const PoolHarvestButton: FC<PoolHarvestButtonProps> = props => {
  const { icons, label, reward, loading, onClick } = props;

  return (
    <Spin spinning={loading}>
      <button
        type="button"
        className="button-ghost p-24"
        style={{ width: '100%' }}
        disabled={loading || !reward?.gt(BigNumber.ZERO)}
        onClick={onClick}>
        <div className="flex flow-row align-start" style={{ width: '100%' }}>
          <div className="flex flow-row align-start mb-24">
            <IconsSet
              icons={icons.map(icon => (
                <Icon key={icon} name={icon as IconNames} />
              ))}
              className="mb-8"
            />
            <Text type="p1" weight="semibold" color="primary">
              {label}
            </Text>
          </div>
          <div className="flex flow-row align-start">
            <Text type="lb2" weight="semibold" color="secondary" className="mb-8">
              Reward
            </Text>
            <Text type="p1" weight="semibold" color="primary" className="mr-4">
              {formatToken(reward, {
                tokenName: BondToken.symbol,
              })}
            </Text>
          </div>
        </div>
      </button>
    </Spin>
  );
};

const PoolHarvestModal: FC<ModalProps> = props => {
  const { ...modalProps } = props;

  const [stableHarvesting, setStableHarvesting] = useState(false);
  const [unilpHarvesting, setUnilpHarvesting] = useState(false);
  const [bondHarvesting, setBondHarvesting] = useState(false);

  async function handleStableHarvest() {
    setStableHarvesting(true);

    try {
      await StableYfPool.contract.claim();
      await StableYfPool.contract.loadUserData();
    } catch (e) {}

    setStableHarvesting(false);
  }

  async function handleUnilpHarvest() {
    setUnilpHarvesting(true);

    try {
      await UnilpYfPool.contract.claim();
      await UnilpYfPool.contract.loadUserData();
    } catch (e) {}

    setUnilpHarvesting(false);
  }

  async function handleBondHarvest() {
    setBondHarvesting(true);

    try {
      await BondYfPool.contract.claim();
      await BondYfPool.contract.loadUserData();
    } catch (e) {}

    setBondHarvesting(false);
  }

  return (
    <Modal width={832} {...modalProps}>
      <div className="flex flow-row">
        <div className="flex flow-row mb-32">
          <Text type="h3" weight="semibold" color="primary" className="mb-8">
            Claim your reward
          </Text>
          <Text type="p2" weight="semibold" color="secondary">
            Select the pool you want to claim your reward from
          </Text>
        </div>
        <Grid flow="col" gap={24} colsTemplate="repeat(auto-fit, 240px)">
          <PoolHarvestButton
            icons={StableYfPool.icons}
            label={StableYfPool.label}
            reward={StableYfPool.contract.toClaim?.unscaleBy(BondToken.decimals)}
            loading={stableHarvesting}
            onClick={handleStableHarvest}
          />
          <PoolHarvestButton
            icons={UnilpYfPool.icons}
            label={UnilpYfPool.label}
            reward={UnilpYfPool.contract.toClaim?.unscaleBy(BondToken.decimals)}
            loading={unilpHarvesting}
            onClick={handleUnilpHarvest}
          />
          <PoolHarvestButton
            icons={BondYfPool.icons}
            label={BondYfPool.label}
            reward={BondYfPool.contract.toClaim?.unscaleBy(BondToken.decimals)}
            loading={bondHarvesting}
            onClick={handleBondHarvest}
          />
        </Grid>
      </div>
    </Modal>
  );
};

export default PoolHarvestModal;
