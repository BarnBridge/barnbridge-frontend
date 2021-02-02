import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Paragraph } from 'components/custom/typography';
import { useDAO } from '../../../../components/dao-provider';

import { formatBONDValue } from 'web3/utils';

export type ActivationThresholdProps = {
  className?: string;
};

const ActivationThreshold: React.FunctionComponent<ActivationThresholdProps> = props => {
  const { className } = props;

  const dao = useDAO();
  const [activating, setActivating] = React.useState<boolean>(false);

  function handleActivate() {
    setActivating(true);
    dao.actions.activate()
      .catch(Error)
      .then(() => {
        setActivating(false);
      });
  }

  return (
    <Card className={className}>
      <Grid flow="row" gap={24} align="start">
        <Paragraph type="p1" semiBold color="grey900">Activation threshold</Paragraph>
        <Grid gap={12} colsTemplate="auto 24px" width="100%">
          <Progress
            percent={dao.activationRate}
            trailColor="var(--color-border)"
            strokeWidth={24}
            strokeColor={{
              '0%': 'var(--text-color-blue500)',
              '100%': 'var(--text-color-green500)',
            }} />
          <Icons name="ribbon-outlined" />
        </Grid>
        <Grid flow="col" gap={8}>
          <Icons name="bond-square-token" />
          <Paragraph type="p1" bold color="grey900">
            {formatBONDValue(dao.bondStaked)}
          </Paragraph>
          <Paragraph type="p1" semiBold color="grey500">
            / {formatBONDValue(dao.activationThreshold)} already staked.
          </Paragraph>
        </Grid>
        {dao.activationRate === 100 && !dao.isActive && (
          <Button
            type="primary"
            loading={activating}
            onClick={handleActivate}>Activate</Button>
        )}
      </Grid>
    </Card>
  );
};

export default ActivationThreshold;
