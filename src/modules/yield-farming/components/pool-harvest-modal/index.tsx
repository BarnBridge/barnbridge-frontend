import React, { FC, useState } from 'react';
import BigNumber from 'bignumber.js';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import Modal, { ModalProps } from 'components/antd/modal';
import Spin from 'components/antd/spin';
import Grid from 'components/custom/grid';
import Icon, { IconNames } from 'components/custom/icon';
import IconsSet from 'components/custom/icons-set';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { YFPoolID, useYFPools } from 'modules/yield-farming/providers/pools-provider';

type PoolHarvestButtonProps = {
  icons: string[];
  label: string;
  reward?: BigNumber;
  loading: boolean;
  onClick: () => void;
};

const PoolHarvestButton: FC<PoolHarvestButtonProps> = props => {
  const { icons, label, reward, loading, onClick } = props;
  const { projectToken } = useKnownTokens();

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
                tokenName: projectToken.symbol,
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

  const { projectToken } = useKnownTokens();
  const yfPoolsCtx = useYFPools();
  const stableYfPool = yfPoolsCtx.getYFKnownPoolByName(YFPoolID.STABLE);
  const unilpYfPool = yfPoolsCtx.getYFKnownPoolByName(YFPoolID.UNILP);
  const bondYfPool = yfPoolsCtx.getYFKnownPoolByName(YFPoolID.BOND);

  const [stableHarvesting, setStableHarvesting] = useState(false);
  const [unilpHarvesting, setUnilpHarvesting] = useState(false);
  const [bondHarvesting, setBondHarvesting] = useState(false);

  async function handleStableHarvest() {
    setStableHarvesting(true);

    try {
      await stableYfPool?.contract.claim();
      stableYfPool?.contract.loadUserData().catch(Error);
      (projectToken.contract as Erc20Contract).loadBalance().catch(Error);
    } catch (e) {}

    setStableHarvesting(false);
  }

  async function handleUnilpHarvest() {
    setUnilpHarvesting(true);

    try {
      await unilpYfPool?.contract.claim();
      unilpYfPool?.contract.loadUserData().catch(Error);
      (projectToken.contract as Erc20Contract).loadBalance().catch(Error);
    } catch (e) {}

    setUnilpHarvesting(false);
  }

  async function handleBondHarvest() {
    setBondHarvesting(true);

    try {
      await bondYfPool?.contract.claim();
      bondYfPool?.contract.loadUserData().catch(Error);
      (projectToken.contract as Erc20Contract).loadBalance().catch(Error);
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
          {stableYfPool && (
            <PoolHarvestButton
              icons={stableYfPool.tokens.map(token => token.icon ?? 'unknown')}
              label={stableYfPool.label}
              reward={stableYfPool.contract.toClaim?.unscaleBy(projectToken.decimals)}
              loading={stableHarvesting}
              onClick={handleStableHarvest}
            />
          )}
          {unilpYfPool && (
            <PoolHarvestButton
              icons={unilpYfPool.tokens.map(token => token.icon ?? 'unknown')}
              label={unilpYfPool.label}
              reward={unilpYfPool.contract.toClaim?.unscaleBy(projectToken.decimals)}
              loading={unilpHarvesting}
              onClick={handleUnilpHarvest}
            />
          )}
          {bondYfPool && (
            <PoolHarvestButton
              icons={bondYfPool.tokens.map(token => token.icon ?? 'unknown')}
              label={bondYfPool.label}
              reward={bondYfPool.contract.toClaim?.unscaleBy(projectToken.decimals)}
              loading={bondHarvesting}
              onClick={handleBondHarvest}
            />
          )}
        </Grid>
      </div>
    </Modal>
  );
};

export default PoolHarvestModal;
