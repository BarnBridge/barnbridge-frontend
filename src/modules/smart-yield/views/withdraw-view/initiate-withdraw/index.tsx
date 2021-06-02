import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import RadioCard from 'modules/smart-yield/components/radio-card';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

export const WITHDRAW_TWO_STEP_KEY = 'two-step';
export const WITHDRAW_INSTANT_KEY = 'instant';

const InitiateWithdraw: React.FC = () => {
  const history = useHistory();
  const poolCtx = useSYPool();

  const { pool, marketId, tokenId } = poolCtx;

  const [type, setType] = useState<string | undefined>();
  const [forfeits, setForfeits] = useState<BigNumber | undefined>();

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

  React.useEffect(() => {
    if (!pool || !pool.contracts.smartYield.balance) {
      return;
    }

    poolCtx.actions.getForfeitsFor(pool.contracts.smartYield.balance).then(setForfeits);
  }, [pool?.contracts.smartYield.balance]);

  const totalWithdrawable = React.useMemo(() => {
    return pool?.contracts.smartYield.balance?.multipliedBy(pool?.state.jTokenPrice);
  }, [pool?.contracts.smartYield.balance, pool?.state.jTokenPrice]);

  const totalInstantWithdrawable = React.useMemo(() => {
    if (!forfeits) {
      return undefined;
    }

    return totalWithdrawable?.minus(forfeits);
  }, [totalWithdrawable, forfeits]);

  return (
    <div className="card p-24">
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
          <Text type="p1" weight="semibold" color="primary" className="mb-16">
            2 step withdraw
          </Text>
          <Text type="small" weight="semibold" className="mb-4">
            Wait time
          </Text>
          <UseLeftTime end={(pool?.contracts.smartYield.abond?.maturesAt ?? 0) * 1_000} delay={1_000}>
            {leftTime => (
              <Text type="p1" weight="semibold" color="primary" className="mb-16">
                {leftTime > 0
                  ? getFormattedDuration(0, (pool?.contracts.smartYield.abond?.maturesAt ?? 0) * 1_000)
                  : '0s'}
              </Text>
            )}
          </UseLeftTime>
          <Tooltip
            title={formatBigValue(
              getHumanValue(totalWithdrawable, pool?.underlyingDecimals),
              pool?.underlyingDecimals,
            )}>
            <Hint
              text={
                <Grid flow="row" gap={8} align="start">
                  <Text type="p2">
                    This value is based on current junior token prices. At the actual maturity date of the junior bond,
                    the price may differ and be higher or lower.
                  </Text>
                  <ExternalLink
                    href="https://integrations.barnbridge.com/specs/smart-yield-specifications#steps-for-exit"
                    className="link-blue"
                    style={{ fontWeight: 600 }}>
                    Learn more
                  </ExternalLink>
                </Grid>
              }>
              <Text type="small" weight="semibold" className="mb-4">
                Total withdrawable amount
              </Text>
            </Hint>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(getHumanValue(totalWithdrawable, pool?.underlyingDecimals))} {pool?.underlyingSymbol}
            </Text>
          </Tooltip>
        </RadioCard>
        <RadioCard selected={type === WITHDRAW_INSTANT_KEY} onClick={handleInstantType}>
          <Icon name="withdrawal_instant" width={64} height={64} className="mb-16" />
          <Text type="p1" weight="semibold" color="primary" className="mb-16">
            Instant withdraw
          </Text>
          <Text type="small" weight="semibold" className="mb-4">
            Wait time
          </Text>
          <Text type="p1" weight="semibold" color="primary" className="mb-16">
            None
          </Text>
          <Tooltip
            title={formatBigValue(
              getHumanValue(totalInstantWithdrawable, pool?.underlyingDecimals),
              pool?.underlyingDecimals,
            )}>
            <Text type="small" weight="semibold" className="mb-4">
              Total withdrawable amount
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(getHumanValue(totalInstantWithdrawable, pool?.underlyingDecimals))}{' '}
              {pool?.underlyingSymbol}
            </Text>
          </Tooltip>
          <Text type="small" weight="semibold" color="red">
            Forfeits: {formatBigValue(getHumanValue(forfeits, pool?.underlyingDecimals), pool?.underlyingDecimals)}{' '}
            {pool?.underlyingSymbol} <Icon name="arrow-top-right" width={9} height={8} rotate={90} color="red" />
          </Text>
        </RadioCard>
      </Grid>

      {type === WITHDRAW_TWO_STEP_KEY && (
        <Alert
          className="mb-32"
          type="warning"
          message="Warning!"
          description={
            <>
              <div className="mb-8">
                The 2-step process allows a user to first signal the intention of exiting the pool. In return they
                receive an NFT that can be redeemed after the current seniors reach their maturity dates.
              </div>
              <ExternalLink
                href="https://integrations.barnbridge.com/specs/smart-yield-specifications#steps-for-exit"
                className={s.alertLink}>
                Learn more
              </ExternalLink>
            </>
          }
        />
      )}

      {type === WITHDRAW_INSTANT_KEY && (
        <Alert
          className="mb-32"
          type="warning"
          message="Warning!"
          description={
            <>
              <div className="mb-8">
                The instant withdrawal allows juniors to instantly withdraw their underlying tokens.
                <br />
                <br />
                However, in order to ensure the guaranteed gains for the current senior bonds, a locked part of each
                junior position is burnt in favor of the existing junior token holders, increasing the price.
                <br />
                <br />
                Using this function, you forfeit your locked underlying.
              </div>
              <ExternalLink
                href="https://integrations.barnbridge.com/specs/smart-yield-specifications#steps-for-exit"
                className={s.alertLink}>
                Learn more
              </ExternalLink>
            </>
          }
        />
      )}

      <Grid flow="col" gap={64} align="center" justify="space-between">
        <button type="button" className="button-back" onClick={handleCancel}>
          <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
          Cancel
        </button>
        <Button type="primary" disabled={!type} onClick={handleNextStep}>
          Next step
        </Button>
      </Grid>
    </div>
  );
};

export default InitiateWithdraw;
