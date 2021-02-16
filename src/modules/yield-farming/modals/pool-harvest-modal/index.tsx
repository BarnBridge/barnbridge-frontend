import React from 'react';
import BigNumber from 'bignumber.js';

import Modal, { ModalProps } from 'components/antd/modal';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import IconsSet from 'components/custom/icons-set';
import { Heading, Label, Paragraph } from 'components/custom/typography';
import { getPoolIcons, getPoolNames, PoolTypes } from 'modules/yield-farming/utils';
import { formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import useMergeState from 'hooks/useMergeState';

import s from './styles.module.scss';

export type PoolHarvestModalProps = ModalProps & {};

type PoolHarvestSelectProps = {
  icons: React.ReactNode[];
  label: React.ReactNode;
  reward?: BigNumber;
  loading: boolean;
  onClick: () => void;
};

const PoolHarvestSelect: React.FunctionComponent<PoolHarvestSelectProps> = props => {
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
          <Paragraph type="p1" semiBold color="primary">
            {label}
          </Paragraph>
        </Grid>
        <Grid flow="row" gap={8}>
          <Label type="lb2" semiBold color="secondary">
            Reward
          </Label>
          <Grid flow="col" gap={4}>
            <Paragraph type="p1" semiBold color="primary">
              {formatBONDValue(reward)}
            </Paragraph>
            <Paragraph type="p2" color="secondary">
              BOND
            </Paragraph>
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

const PoolHarvestModal: React.FunctionComponent<PoolHarvestModalProps> = props => {
  const { ...modalProps } = props;

  const { yf, yfLP, yfBOND, bond } = useWeb3Contracts();
  const [state, setState] = useMergeState<State>(InitialState);

  async function handleYFHarvest() {
    setState({ yfHarvesting: true });

    try {
      await yf.massHarvestSend();
      bond.reload();
    } catch (e) {
    }

    setState({ yfHarvesting: false });
  }

  async function handleYFLPHarvest() {
    setState({ yfLPHarvesting: true });

    try {
      await yfLP.massHarvestSend();
      bond.reload();
    } catch (e) {
    }

    setState({ yfLPHarvesting: false });
  }

  async function handleYFBONDHarvest() {
    setState({ yfBONDHarvesting: true });

    try {
      await yfBOND.massHarvestSend();
      bond.reload();
    } catch (e) {
    }

    setState({ yfBONDHarvesting: false });
  }

  return (
    <Modal width={832} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={8}>
          <Heading type="h3" semiBold color="primary">
            Claim your reward
          </Heading>
          <Paragraph type="p2" semiBold color="secondary">
            Select the pool you want to claim your reward from
          </Paragraph>
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
