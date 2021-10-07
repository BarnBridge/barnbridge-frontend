import React from 'react';
import cn from 'classnames';
import { formatToken } from 'web3/utils';

import Button from 'components/antd/button';
import Progress from 'components/antd/progress';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIcon } from 'components/token-icon';

import { useDAO } from '../../../../components/dao-provider';

export type ActivationThresholdProps = {
  className?: string;
};

const ActivationThreshold: React.FC<ActivationThresholdProps> = props => {
  const { projectToken } = useKnownTokens();
  const config = useConfig();
  const daoCtx = useDAO();
  const [activating, setActivating] = React.useState<boolean>(false);

  function handleActivate() {
    setActivating(true);
    daoCtx.actions
      .activate()
      .catch(Error)
      .then(() => {
        setActivating(false);
      });
  }

  return (
    <div className={cn('card p-24', props.className)}>
      <Grid flow="row" gap={24} align="start">
        <Hint
          text={
            <Text type="p2">
              For the DAO to be activated, a threshold of {formatToken(config.dao?.activationThreshold)} $
              {projectToken.symbol} tokens staked has to be met.
            </Text>
          }>
          <Text type="p1" weight="semibold" color="primary">
            Activation threshold
          </Text>
        </Hint>
        <Grid gap={12} colsTemplate="auto 24px" width="100%">
          <Progress
            percent={daoCtx.activationRate}
            trailColor="var(--theme-border-color)"
            strokeWidth={24}
            strokeColor={{
              '0%': 'var(--theme-blue-color)',
              '100%': 'var(--theme-green-color)',
            }}
          />
          <Icon name="ribbon-outlined" />
        </Grid>
        <Grid flow="col" gap={8}>
          <TokenIcon name={projectToken.icon} />
          <Text type="p1" weight="bold" color="primary">
            {formatToken(daoCtx.bondStaked)}
          </Text>
          <Text type="p1" weight="semibold" color="secondary">
            / {formatToken(config.dao?.activationThreshold)} already staked.
          </Text>
        </Grid>
        {daoCtx.activationRate === 100 && !daoCtx.isActive && (
          <Button type="primary" loading={activating} onClick={handleActivate}>
            Activate
          </Button>
        )}
      </Grid>
    </div>
  );
};

export default ActivationThreshold;
