import React from 'react';

import Card from 'components/antd/card';
import Button from 'components/antd/button';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Paragraph } from 'components/custom/typography';

import { formatBONDValue } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';

export type ActivationThresholdProps = {
  className?: string;
};

const ActivationThreshold: React.FunctionComponent<ActivationThresholdProps> = props => {
  const { className } = props;
  const web3c = useWeb3Contracts();

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
      .catch(Error)
      .then(() => {
        web3c.daoBarn.reload();
        setActivating(false);
      });
  }

  if (activationRate >= 100) {
    return null;
  }

  return (
    <Card className={className}>
      <Grid flow="row" gap={24}>
        <Paragraph type="p1" semiBold color="grey900">Activation threshold</Paragraph>
        <Grid gap={12} colsTemplate="auto 24px">
          <Progress
            percent={activationRate}
            trailColor="var(--color-border)"
            strokeWidth={24}
            strokeColor={{
              '0%': 'var(--text-color-blue500)',
              '100%': 'var(--text-color-green500)',
            }} />
          <Icon type="ribbon" />
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
    </Card>
  );
};

export default ActivationThreshold;
