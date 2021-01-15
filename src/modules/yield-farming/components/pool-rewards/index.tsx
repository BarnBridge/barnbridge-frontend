import React from 'react';

import { useWallet } from 'wallets/wallet';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBONDValue } from 'web3/utils';

import Field from 'components/custom/field';
import Button from 'components/antd/button';
import PoolHarvestModal from '../pool-harvest-modal';

import { ReactComponent as BondSquareSvg } from 'resources/svg/tokens/bond-square.svg';

import s from './styles.module.scss';

const PoolRewards: React.FunctionComponent = () => {
  const wallet = useWallet();
  const web3c = useWeb3Contracts();

  const [harvestVisible, setHarvestVisible] = React.useState<boolean>(false);

  return (
    <div className={s.component}>
      <div className={s.header}>
        MY REWARDS
      </div>
      <div className={s.list}>
        <Field
          label="Current reward"
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{formatBONDValue(web3c.aggregated.totalCurrentReward)}</span>
            <BondSquareSvg className={s.bondIcon} />
            {wallet.isActive && (
              <Button
                type="link"
                disabled={web3c.aggregated.totalCurrentReward?.isZero()}
                onClick={() => setHarvestVisible(true)}
              >
                Claim
              </Button>
            )}
          </div>
        </Field>

        <Field
          label="Bond Balance"
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{formatBONDValue(web3c.bond.balance)}</span>
            <BondSquareSvg className={s.bondIcon} />
          </div>
        </Field>

        <Field
          label="Potential reward this epoch"
          hint="This number shows the $BOND rewards you would potentially be able to harvest this epoch, but is subject to change - in case more users deposit, or you withdraw some of your stake."
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{formatBONDValue(web3c.aggregated.totalPotentialReward)}</span>
            <BondSquareSvg className={s.bondIcon} />
          </div>
        </Field>
      </div>

      <PoolHarvestModal
        visible={harvestVisible}
        onCancel={() => setHarvestVisible(false)}
      />
    </div>
  );
};

export default PoolRewards;
