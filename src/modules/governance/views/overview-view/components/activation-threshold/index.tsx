import React from 'react';
import * as Antd from 'antd';
import cx from 'classnames';

import { Paragraph } from 'components/custom/typography';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';

import { formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

import s from './styles.module.scss';
import Button from 'components/antd/button';

export type ActivationThresholdProps = {
  className?: string;
};

const ActivationThreshold: React.FunctionComponent<ActivationThresholdProps> = props => {
  const { className } = props;
  const web3c = useWeb3Contracts();

  /// move to own PROVIDER
  const activationRate = React.useMemo<number>(() => {
    const { bondStaked, activationThreshold } = web3c.daoBarn;

    if (!bondStaked || !activationThreshold) {
      return 0;
    }

    return Math.min(bondStaked.multipliedBy(100).div(activationThreshold).toNumber(), 100);
  }, [web3c.daoBarn.bondStaked, web3c.daoBarn.activationThreshold]);

  const [activating, setActivating] = React.useState<boolean>(false);

  function handleActivate() {
    setActivating(true);
    web3c.daoGovernance.actions.activate()
      .then(() => {
        setActivating(false);
        /// hide activation threshold panel
      })
      .catch(() => {
        setActivating(false);
      });
  }

  return (
    <Grid flow="row" gap={24} className={cx(s.component, className)}>
      <Paragraph type="p1" semiBold color="grey900">Activation threshold</Paragraph>
      <Grid gap={12} colsTemplate="auto 24px">
        <Antd.Progress
          percent={activationRate}
          trailColor="var(--bg-color-grey100)"
          showInfo={false}
          strokeWidth={24}
          strokeColor={{
            '0%': '#4f6ae6',
            '100%': 'var(--bg-color-green500)',
          }} />
        <Icon type="ribbon" color="grey300" />
      </Grid>
      <Grid flow="col" gap={8}>
        <Icon type="bond-square" />
        <Paragraph type="p1" bold color="grey900">
          {formatBONDValue(web3c.daoBarn.bondStaked)}
        </Paragraph>
        <Paragraph type="p1" semiBold color="grey500">
          / {formatBONDValue(web3c.daoBarn.activationThreshold)} already staked.
        </Paragraph>
      </Grid>
      {activationRate === 100 && !web3c.daoGovernance.isActive && (
        <Button
          type="primary"
          loading={activating}
          onClick={handleActivate}>Activate</Button>
      )}
    </Grid>
  );
};

export default ActivationThreshold;
