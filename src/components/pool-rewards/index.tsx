import React from 'react';
import * as Antd from 'antd';

import { useWeb3 } from 'web3/provider';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBigValue } from 'web3/utils';

import InfoTooltip from 'components/info-tooltip';
import PoolHarvestModal from 'components/pool-harvest-modal';

import { ReactComponent as BondSvg } from 'resources/svg/tokens/bond.svg';

import s from './styles.module.css';

const PoolRewards: React.FunctionComponent = props => {
  const { isActive } = useWeb3();
  const { bond, aggregated } = useWeb3Contracts();
  const [harvestVisible, setHarvestVisible] = React.useState<boolean>(false);

  function onHarvestClick() {
    setHarvestVisible(true);
  }

  function onModalClose() {
    setHarvestVisible(false);
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
            <Antd.Button
              type="primary"
              className={s.harvestBtn}
              disabled={aggregated.totalCurrentReward?.isEqualTo(0) !== false}
              onClick={onHarvestClick}>Claim</Antd.Button>
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
            <InfoTooltip
              title="This number shows the $BOND rewards you would potentially be able to harvest this epoch, but is subject to change - in case more users deposit, or you withdraw some of your stake." />
          </div>
          <div className={s.blockValue} text-elipsis="true">
            {formatBigValue(aggregated.totalPotentialReward)} <BondSvg className={s.bondIcon} />
          </div>
        </div>
      </div>
      <PoolHarvestModal
        visible={harvestVisible}
        onCancel={onModalClose}
      />
    </div>
  );
};

export default PoolRewards;
