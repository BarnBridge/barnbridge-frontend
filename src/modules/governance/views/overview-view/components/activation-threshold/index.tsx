import React from 'react';
import { formatBONDValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';

import { useDAO } from '../../../../components/dao-provider';

export type ActivationThresholdProps = {
  className?: string;
};

const ActivationThreshold: React.FC<ActivationThresholdProps> = props => {
  const { className } = props;

  const dao = useDAO();
  const [activating, setActivating] = React.useState<boolean>(false);

  function handleActivate() {
    setActivating(true);
    dao.actions
      .activate()
      .catch(Error)
      .then(() => {
        setActivating(false);
      });
  }

  return (
    <Card className={className}>
      <Grid flow="row" gap={24} align="start">
        <Hint
          text={
            <Text type="p2">
              For the DAO to be activated, a threshold of {formatBONDValue(dao.activationThreshold)} $BOND tokens staked
              has to be met.
            </Text>
          }>
          <Text type="p1" weight="semibold" color="primary">
            Activation threshold
          </Text>
        </Hint>
        <Grid gap={12} colsTemplate="auto 24px" width="100%">
          <Progress
            percent={dao.activationRate}
            trailColor="var(--color-border)"
            strokeWidth={24}
            strokeColor={{
              '0%': 'var(--theme-blue-color)',
              '100%': 'var(--theme-green-color)',
            }}
          />
          <Icons name="ribbon-outlined" />
        </Grid>
        <Grid flow="col" gap={8}>
          <Icons name="bond-square-token" />
          <Text type="p1" weight="bold" color="primary">
            {formatBONDValue(dao.bondStaked)}
          </Text>
          <Text type="p1" weight="semibold" color="secondary">
            / {formatBONDValue(dao.activationThreshold)} already staked.
          </Text>
        </Grid>
        {dao.activationRate === 100 && !dao.isActive && (
          <Button type="primary" loading={activating} onClick={handleActivate}>
            Activate
          </Button>
        )}
      </Grid>
    </Card>
  );
};

export default ActivationThreshold;
