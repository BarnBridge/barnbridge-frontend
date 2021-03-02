import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import RadioCard from 'modules/smart-yield/components/radio-card';
import { useTokenPool } from 'modules/smart-yield/views/token-pool-view/token-pool-provider';

export const WITHDRAW_TWO_STEP_KEY = 'two-step';
export const WITHDRAW_INSTANT_KEY = 'instant';

const InitiateWithdraw: React.FC = () => {
  const history = useHistory();
  const poolCtx = useTokenPool();

  const { pool, marketId, tokenId } = poolCtx;

  const [type, setType] = useState<string | undefined>();

  function handleTwoStepType() {
    setType(WITHDRAW_TWO_STEP_KEY);
  }

  function handleInstantType() {
    setType(WITHDRAW_INSTANT_KEY);
  }

  function handleCancel() {
    history.push(`/smart-yield/portfolio/junior`);
  }

  function handleNextStep() {
    if (type) {
      history.push({
        pathname: `/smart-yield/withdraw/${type}`,
        search: `?m=${marketId}&t=${tokenId}`,
      });
    }
  }

  return (
    <Card>
      <Text type="h3" weight="semibold" color="primary">
        Initiate Withdraw
      </Text>
      <Text type="p2" weight="semibold">
        You can choose between fixed, or variable interest.
        <br />
        Be aware of the risk involved and read the warnings before going further
      </Text>

      <Grid flow="col" gap={32} colsTemplate="1fr 1fr" className="mb-32">
        <RadioCard selected={type === WITHDRAW_TWO_STEP_KEY} onClick={handleTwoStepType}>
          <Icon name="withdrawal_regular" width={64} height={64} />
          <Text type="p1" weight="semibold" color="primary">
            2 step withdraw
          </Text>
          <Text type="small" weight="semibold">
            Wait time
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            abond.maturesAt + 1 days
          </Text>
          <Text type="small" weight="semibold">
            Total withdrawable amount
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(getHumanValue(pool?.smartYieldBalance?.multipliedBy(1), pool?.underlyingDecimals))}{' '}
            {pool?.underlyingSymbol}
          </Text>
        </RadioCard>
        <RadioCard selected={type === WITHDRAW_INSTANT_KEY} onClick={handleInstantType}>
          <Icon name="withdrawal_instant" width={64} height={64} />
          <br />
          <Text type="p1" weight="semibold" color="primary">
            Instant withdraw
          </Text>
          <Text type="small" weight="semibold">
            Wait time
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            None
          </Text>
          <Text type="small" weight="semibold">
            Total withdrawable amount
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(getHumanValue(pool?.smartYieldBalance?.multipliedBy(1), pool?.underlyingDecimals))}{' '}
            {pool?.underlyingSymbol}
          </Text>
          <Text type="small" weight="semibold" color="red">
            forfeits
          </Text>
        </RadioCard>
      </Grid>
      <Grid flow="col" gap={64} align="center" justify="space-between">
        <Button type="light" onClick={handleCancel}>
          <Icon name="left-arrow" width={9} height={8} />
          Cancel
        </Button>
        <Button type="primary" disabled={!type} onClick={handleNextStep}>
          Next step
        </Button>
      </Grid>
    </Card>
  );
};

export default InitiateWithdraw;
