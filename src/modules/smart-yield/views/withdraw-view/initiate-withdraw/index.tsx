import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import RadioCard from 'modules/smart-yield/components/radio-card';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

export const WITHDRAW_TWO_STEP_KEY = 'two-step';
export const WITHDRAW_INSTANT_KEY = 'instant';

const InitiateWithdraw: React.FC = () => {
  const history = useHistory();
  const poolCtx = useSYPool();

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
      <Text type="h3" weight="semibold" color="primary" className="mb-16">
        Initiate Withdraw
      </Text>
      <Text type="p2" weight="semibold" className="mb-32">
        In order to access your liquidity and profits you can withdraw it from the pool.
        <br />
        To do so, you have 2 options:
      </Text>

      <Grid flow="col" gap={32} colsTemplate="1fr 1fr" className="mb-32">
        <RadioCard selected={type === WITHDRAW_TWO_STEP_KEY} onClick={handleTwoStepType}>
          <Icon name="withdrawal_regular" width={64} height={64} className="mb-16" />
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  The 2-step process allows a user to first signal the intention of exiting the pool. In return they
                  receive an NFT that can be redeemed after the current seniors reach their maturity dates.
                </Text>
                <ExternalLink href="#">Learn more</ExternalLink>
              </Grid>
            }>
            <Text type="p1" weight="semibold" color="primary" className="mb-16">
              2 step withdraw
            </Text>
          </Hint>
          <Text type="small" weight="semibold" className="mb-4">
            Wait time
          </Text>
          <Text type="p1" weight="semibold" color="primary" className="mb-16">
            abond.maturesAt + 1 days
          </Text>
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  This value is based on current junior token prices. At the actual maturity date of the junior bond,
                  the price may differ and be higher or lower.
                </Text>
                <ExternalLink href="#">Learn more</ExternalLink>
              </Grid>
            }>
            <Text type="small" weight="semibold" className="mb-4">
              Total withdrawable amount
            </Text>
          </Hint>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(getHumanValue(pool?.smartYieldBalance?.multipliedBy(1), pool?.underlyingDecimals))}{' '}
            {pool?.underlyingSymbol}
          </Text>
        </RadioCard>
        <RadioCard selected={type === WITHDRAW_INSTANT_KEY} onClick={handleInstantType}>
          <Icon name="withdrawal_instant" width={64} height={64} className="mb-16" />
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  The instant withdrawal allows juniors to instantly withdraw their underlying tokens.
                  <br />
                  <br />
                  However, in order to ensure the guaranteed gains for the current senior bonds, a locked part of each
                  junior position is burnt in favor of the existing junior token holders, increasing the price.
                  <br />
                  <br />
                  Using this function, you forfeit your locked underlying.
                </Text>
                <ExternalLink href="#">Learn more</ExternalLink>
              </Grid>
            }>
            <Text type="p1" weight="semibold" color="primary" className="mb-16">
              Instant withdraw
            </Text>
          </Hint>
          <Text type="small" weight="semibold" className="mb-4">
            Wait time
          </Text>
          <Text type="p1" weight="semibold" color="primary" className="mb-16">
            None
          </Text>
          <Text type="small" weight="semibold" className="mb-4">
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
