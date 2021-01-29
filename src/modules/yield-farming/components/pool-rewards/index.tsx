import React from 'react';

import Button from 'components/antd/button';
import Field from 'components/custom/field';
import Icons from 'components/custom/icon';
import PoolHarvestModal from '../pool-harvest-modal';

import { useWallet } from 'wallets/wallet';
import { useWeb3Contracts } from 'web3/contracts';
import { formatBONDValue } from 'web3/utils';

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
            <Icons name="bond-square-token" />
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
            <Icons name="bond-square-token" />
          </div>
        </Field>

        <Field
          label="Potential reward this epoch"
          hint="This number shows the $BOND rewards you would potentially be able to harvest this epoch, but is subject to change - in case more users deposit, or you withdraw some of your stake."
          className={s.field}>
          <div className={s.fieldContent}>
            <span>{formatBONDValue(web3c.aggregated.totalPotentialReward)}</span>
            <Icons name="bond-square-token" />
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
