import React from 'react';
import * as Antd from 'antd';
import { ModalProps } from 'antd/lib/modal';

import { formatBONDValue, getPoolIcons, getPoolNames, PoolTypes } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import IconsSet from 'components/icons-set';

import s from './styles.module.css';

export type PoolHarvestModalProps = ModalProps & {};

const PoolHarvestModal: React.FunctionComponent<PoolHarvestModalProps> = props => {
  const { ...modalProps } = props;

  const { yf, yfLP, yfBOND, bond } = useWeb3Contracts();
  const [yfHarvesting, setYFHarvesting] = React.useState<boolean>(false);
  const [yfLPHarvesting, setYFLPHarvesting] = React.useState<boolean>(false);
  const [yfBONDHarvesting, setYFBONDHarvesting] = React.useState<boolean>(false);

  async function handleYFHarvest() {
    setYFHarvesting(true);

    try {
      await yf.massHarvestSend();
      bond.reload();
    } catch (e) {
    }

    setYFHarvesting(false);
  }

  async function handleYFLPHarvest() {
    setYFLPHarvesting(true);

    try {
      await yfLP.massHarvestSend();
      bond.reload();
    } catch (e) {
    }

    setYFLPHarvesting(false);
  }

  async function handleYFBONDHarvest() {
    setYFBONDHarvesting(true);

    try {
      await yfBOND.massHarvestSend();
      bond.reload();
    } catch (e) {
    }

    setYFBONDHarvesting(false);
  }

  return (
    <Antd.Modal
      className={s.component}
      centered
      closable
      footer={[]}
      {...modalProps}
    >
      <div className={s.header}>Claim your reward</div>
      <div className={s.note}>Select the pool you want to claim your reward from</div>
      <div className={s.body}>
        <Antd.Button
          className={s.option}
          type="ghost"
          loading={yfHarvesting}
          disabled={yf?.currentReward?.isEqualTo(0) !== false}
          onClick={handleYFHarvest}>
          <IconsSet className={s.optionIcons} icons={getPoolIcons(PoolTypes.STABLE)} />
          <div className={s.optionLabel}>{getPoolNames(PoolTypes.STABLE).join('/')}</div>
          <div className={s.optionRewardLabel}>REWARD</div>
          <div className={s.optionRewardValue}>
            <strong>{formatBONDValue(yf?.currentReward)}</strong> BOND
          </div>
        </Antd.Button>
        <Antd.Button
          className={s.option}
          type="ghost"
          loading={yfLPHarvesting}
          disabled={yfLP?.currentReward?.isEqualTo(0) !== false}
          onClick={handleYFLPHarvest}>
          <IconsSet className={s.optionIcons} icons={getPoolIcons(PoolTypes.UNILP)} />
          <div className={s.optionLabel}>{getPoolNames(PoolTypes.UNILP).join('/')}</div>
          <div className={s.optionRewardLabel}>REWARD</div>
          <div className={s.optionRewardValue}>
            <strong>{formatBONDValue(yfLP?.currentReward)}</strong> BOND
          </div>
        </Antd.Button>
        <Antd.Button
          className={s.option}
          type="ghost"
          loading={yfBONDHarvesting}
          disabled={yfBOND?.currentReward?.isEqualTo(0) !== false}
          onClick={handleYFBONDHarvest}>
          <IconsSet className={s.optionIcons} icons={getPoolIcons(PoolTypes.BOND)} />
          <div className={s.optionLabel}>{getPoolNames(PoolTypes.BOND).join('/')}</div>
          <div className={s.optionRewardLabel}>REWARD</div>
          <div className={s.optionRewardValue}>
            <strong>{formatBONDValue(yfBOND?.currentReward)}</strong> BOND
          </div>
        </Antd.Button>
      </div>
    </Antd.Modal>
  );
};

export default PoolHarvestModal;
