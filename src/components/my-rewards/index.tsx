import React from 'react';
import * as Antd from 'antd';

import { useWeb3 } from 'web3/provider';
import InfoTooltip from 'components/info-tooltip';
import IconsSet from 'components/icons-set';

import { useWeb3Contracts } from 'web3/contracts';
import { formatBigValue } from 'web3/utils';

import { ReactComponent as BondSvg } from 'resources/svg/tokens/bond.svg';
import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UNISWAPIcon } from 'resources/svg/tokens/uniswap.svg';

import s from './styles.module.css';

const MyRewards: React.FunctionComponent = props => {
  const { isActive } = useWeb3();
  const { yf, yflp, bond, aggregated } = useWeb3Contracts();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  function onHarvestClick() {
    setModalVisible(true);
  }

  function onModalClose() {
    setModalVisible(false);
  }

  function onYFHarvest() {
    console.log('onYFHarvest', yf.massHarvestSend());
  }

  function onYFLPHarvest() {
    console.log('onYFLPHarvest', yflp.massHarvestSend());
  }

  return (
    <div className={s.component}>
      <div className={s.label}>MY REWARDS</div>
      <div className={s.row}>
        <div className={s.col}>
          <div>
            <div className={s.blockLabel}>Current reward</div>
            <div className={s.blockValue} text-elipsis="true">
              {formatBigValue(aggregated.totalCurrentReward)} <BondSvg className={s.bondIcon} />
            </div>
          </div>
          {isActive && (
            <Antd.Button type="primary" className={s.harvestBtn} onClick={onHarvestClick}>Harvest</Antd.Button>
          )}
        </div>
        <div className={s.col}>
          <div className={s.blockLabel}>BOND balance</div>
          <div className={s.blockValue} text-elipsis="true">
            {formatBigValue(bond.balance)} <BondSvg className={s.bondIcon} />
          </div>
        </div>
        <div className={s.col}>
          <div className={s.blockLabel}>
            Potential reward this epoch
            <InfoTooltip />
          </div>
          <div className={s.blockValue} text-elipsis="true">
            {formatBigValue(aggregated.totalPotentialReward)} <BondSvg className={s.bondIcon} />
          </div>
        </div>
      </div>
      <Antd.Modal
        className={s.modal}
        visible={modalVisible}
        centered
        closable
        onCancel={onModalClose}
        footer={[]}
      >
        <div className={s.modalHeader}>Harvest your reward</div>
        <div className={s.modalSubHeader}>Select the pool you want to harvest your reward from</div>
        <div className={s.modalBody}>
          <Antd.Button className={s.modalOption} type="ghost" onClick={onYFHarvest}>
            <IconsSet className={s.modalOptionIcons}
                      icons={[<USDCIcon key="usdc" />, <DAIIcon key="dai" />, <SUSDIcon key="susd" />]} />
            <div className={s.modalOptionLabel}>USDC/DAI/sUSD</div>
            <div className={s.modalOptionRewardLabel}>REWARD</div>
            <div className={s.modalOptionRewardValue}>
              <strong>{formatBigValue(yf?.currentReward)}</strong> BOND
            </div>
          </Antd.Button>
          <Antd.Button className={s.modalOption} type="ghost" onClick={onYFLPHarvest}>
            <IconsSet className={s.modalOptionIcons} icons={[<UNISWAPIcon key="uniswap" />]} />
            <div className={s.modalOptionLabel}>USDC_BOND_UNI_LP</div>
            <div className={s.modalOptionRewardLabel}>REWARD</div>
            <div className={s.modalOptionRewardValue}>
              <strong>{formatBigValue(yflp?.currentReward)}</strong> BOND
            </div>
          </Antd.Button>
        </div>
      </Antd.Modal>
    </div>
  );
};

export default MyRewards;
