import React from 'react';
import BigNumber from 'bignumber.js';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBONDValue } from 'web3/utils';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import IconsSet from 'components/custom/icons-set';
import { Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';

import { PoolTypes, getPoolIcons, getPoolNames } from 'modules/yield-farming/utils';

import s from './styles.module.scss';

export type PoolHarvestModalProps = ModalProps & {};

type PoolHarvestSelectProps = {
  icons: React.ReactNode[];
  label: React.ReactNode;
  reward?: BigNumber;
  loading: boolean;
  onClick: () => void;
};

const PoolHarvestSelect: React.FC<PoolHarvestSelectProps> = props => {
  const { icons, label, reward, loading, onClick } = props;

  return (
    <Button
      className={s.btn}
      type="select"
      loading={loading}
      disabled={reward?.isEqualTo(0) !== false}
      onClick={onClick}>
      <Grid flow="row" gap={24} width="100%">
        <Grid flow="row" gap={8} align="start">
          <IconsSet icons={icons} />
          <Text type="p1" weight="semibold" color="primary">
            {label}
          </Text>
        </Grid>
        <Grid flow="row" gap={8}>
          <Text type="lb2" weight="semibold" color="secondary">
            Reward
          </Text>
          <Grid flow="col" gap={4}>
            <Text type="p1" weight="semibold" color="primary">
              {formatBONDValue(reward)}
            </Text>
            <Text type="p2" color="secondary">
              BOND
            </Text>
          </Grid>
        </Grid>
      </Grid>
    </Button>
  );
};

type State = {
  yfHarvesting: boolean;
  yfLPHarvesting: boolean;
  yfBONDHarvesting: boolean;
};

const InitialState: State = {
  yfHarvesting: false,
  yfLPHarvesting: false,
  yfBONDHarvesting: false,
};

const PoolHarvestModal: React.FC<PoolHarvestModalProps> = props => {
  const { ...modalProps } = props;

  const { yf, yfLP, yfBOND, bond } = useWeb3Contracts();
  const [state, setState] = useMergeState<State>(InitialState);

  async function handleYFHarvest() {
    setState({ yfHarvesting: true });

    try {
      await yf.massHarvestSend();
      bond.reload();
    } catch (e) {}

    setState({ yfHarvesting: false });
  }

  async function handleYFLPHarvest() {
    setState({ yfLPHarvesting: true });

    try {
      await yfLP.massHarvestSend();
      bond.reload();
    } catch (e) {}

    setState({ yfLPHarvesting: false });
  }

  async function handleYFBONDHarvest() {
    setState({ yfBONDHarvesting: true });

    try {
      await yfBOND.massHarvestSend();
      bond.reload();
    } catch (e) {}

    setState({ yfBONDHarvesting: false });
  }

  return (
    <Modal width={832} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={8}>
          <Text type="h3" weight="semibold" color="primary">
            Claim your reward
          </Text>
          <Text type="p2" weight="semibold" color="secondary">
            Select the pool you want to claim your reward from
          </Text>
        </Grid>
        <Grid flow="col" gap={24} colsTemplate="repeat(auto-fit, 240px)">
          <PoolHarvestSelect
            icons={getPoolIcons(PoolTypes.STABLE)}
            label={getPoolNames(PoolTypes.STABLE).join('/')}
            reward={yf?.currentReward}
            loading={state.yfHarvesting}
            onClick={handleYFHarvest}
          />
          <PoolHarvestSelect
            icons={getPoolIcons(PoolTypes.UNILP)}
            label={getPoolNames(PoolTypes.UNILP).join('/')}
            reward={yfLP?.currentReward}
            loading={state.yfLPHarvesting}
            onClick={handleYFLPHarvest}
          />
          <PoolHarvestSelect
            icons={getPoolIcons(PoolTypes.BOND)}
            label={getPoolNames(PoolTypes.BOND).join('/')}
            reward={yfBOND?.currentReward}
            loading={state.yfBONDHarvesting}
            onClick={handleYFBONDHarvest}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};

export default PoolHarvestModal;
