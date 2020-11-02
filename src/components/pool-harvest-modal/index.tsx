import React from 'react';
import * as Antd from 'antd';
import { ModalProps } from 'antd/lib/modal';

import { formatBigValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswapV2';

import IconsSet from 'components/icons-set';

import s from './styles.module.css';

export type PoolHarvestModalProps = ModalProps & {};

const PoolHarvestModal: React.FunctionComponent<PoolHarvestModalProps> = props => {
  const { ...modalProps } = props;

  const { yf, yflp, bond } = useWeb3Contracts();
  const [yfHarvesting, setYFHarvesting] = React.useState<boolean>(false);
  const [yflpHarvesting, setYFLPHarvesting] = React.useState<boolean>(false);

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
      await yflp.massHarvestSend();
      bond.reload();
    } catch (e) {
    }

    setYFLPHarvesting(false);
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
          <IconsSet className={s.optionIcons} icons={[
            USDCTokenMeta.icon,
            DAITokenMeta.icon,
            SUSDTokenMeta.icon,
          ]} />
          <div className={s.optionLabel}>{[
            USDCTokenMeta.name,
            DAITokenMeta.name,
            SUSDTokenMeta.name,
          ].join('/')}</div>
          <div className={s.optionRewardLabel}>REWARD</div>
          <div className={s.optionRewardValue}>
            <strong>{formatBigValue(yf?.currentReward)}</strong> BOND
          </div>
        </Antd.Button>
        <Antd.Button
          className={s.option}
          type="ghost"
          loading={yflpHarvesting}
          disabled={yflp?.currentReward?.isEqualTo(0) !== false}
          onClick={handleYFLPHarvest}>
          <IconsSet className={s.optionIcons} icons={[
            UNISWAPTokenMeta.icon,
          ]} />
          <div className={s.optionLabel}>{[
            UNISWAPTokenMeta.name,
          ].join('/')}</div>
          <div className={s.optionRewardLabel}>REWARD</div>
          <div className={s.optionRewardValue}>
            <strong>{formatBigValue(yflp?.currentReward)}</strong> BOND
          </div>
        </Antd.Button>
      </div>
    </Antd.Modal>
  );
};

export default PoolHarvestModal;
