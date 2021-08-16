import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatPercent } from 'web3/utils';

import Alert from 'components/antd/alert';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Hint, Text } from 'components/custom/typography';
import { RadioCard } from 'components/radio-card';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';

import s from './s.module.scss';

const SENIOR_TRANCHE_KEY = 'senior';
const JUNIOR_TRANCHE_KEY = 'junior';

const SelectTranche: React.FC = () => {
  const history = useHistory();
  const poolCtx = useSYPool();

  const { pool, marketId, tokenId } = poolCtx;

  const [tranche, setTranche] = useState<string | undefined>();

  function handleSeniorSelect() {
    setTranche(SENIOR_TRANCHE_KEY);
  }

  function handleJuniorSelect() {
    setTranche(JUNIOR_TRANCHE_KEY);
  }

  function handleCancel() {
    history.push(`/smart-yield`);
  }

  function handleNextStep() {
    history.push({
      pathname: `/smart-yield/deposit/${tranche}`,
      search: `?m=${marketId}&t=${tokenId}`,
    });
  }

  if (!pool) {
    return null;
  }

  return (
    <>
      <Text type="h3" weight="semibold" color="primary" className="mb-16">
        Select your preferred tranche
      </Text>
      <Text type="p2" weight="semibold" color="secondary" className="mb-32">
        You can choose between fixed, or variable interest.
        <br />
        Be aware of the risk involved and read the warnings before going further
      </Text>
      <div className={s.cards}>
        <RadioCard selected={tranche === SENIOR_TRANCHE_KEY} onClick={handleSeniorSelect}>
          <Icon name="senior_tranche" width={64} height={64} className="mb-24" />
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  Senior tranches are ERC-721 non-fungible tokens which provide guaranteed yield for the life of the
                  bonds.
                </Text>
                <ExternalLink href="https://docs.barnbridge.com/sy-specs/senior-tranches">Learn more</ExternalLink>
              </Grid>
            }>
            <Text type="small" weight="semibold" color="secondary" className="mb-4">
              Senior tranche
            </Text>
          </Hint>
          <Text type="p1" weight="semibold" color="primary" className="mb-8">
            Fixed APY
          </Text>
          <Text type="p1" weight="bold" color="green">
            {formatPercent(pool.state.seniorApy)}
          </Text>
        </RadioCard>
        <RadioCard selected={tranche === JUNIOR_TRANCHE_KEY} onClick={handleJuniorSelect}>
          <Icon name="junior_tranche" width={64} height={64} className="mb-24" />
          <Hint
            text={
              <Grid flow="row" gap={8} align="start">
                <Text type="p2">
                  Junior tranches are ERC-20 tokens which provide liquidity and buy risk from the senior bond investors.
                  The risk here is the risk of the underlying asset annuities going down.
                </Text>
                <ExternalLink href="https://docs.barnbridge.com/sy-specs/junior-tranches">Learn more</ExternalLink>
              </Grid>
            }>
            <Text type="small" weight="semibold" color="secondary" className="mb-4">
              Junior tranche
            </Text>
          </Hint>
          <Text type="p1" weight="semibold" color="primary" className="mb-8">
            Variable APY
          </Text>
          <Text type="p1" weight="bold" color="purple">
            {formatPercent(pool.state.juniorApy)}
          </Text>
        </RadioCard>
      </div>
      {tranche === 'senior' && (
        <Alert
          className="mb-32"
          type="warning"
          message="Warning!"
          description={
            <>
              <div className="mb-8">
                When purchasing senior bonds you will get a guaranteed fixed rate for the life of the bond. However,
                your deposits will be locked in the bond until this maturity date is reached. Make sure you read the
                docs thoroughly.
              </div>
              <ExternalLink href="https://docs.barnbridge.com/sy-specs/senior-tranches" className={s.alertLink}>
                Learn more
              </ExternalLink>
            </>
          }
        />
      )}
      {tranche === 'junior' && (
        <Alert
          className="mb-32"
          type="warning"
          message="Warning!"
          description={
            <>
              <div className="mb-8">
                When purchasing junior tokens you will get a variable rate. However, depending on the state of the pool
                and the originator APY - your actual interest rate may be lower. Make sure you read the docs thoroughly.
              </div>
              <ExternalLink href="https://docs.barnbridge.com/sy-specs/junior-tranches" className={s.alertLink}>
                Learn more
              </ExternalLink>
            </>
          }
        />
      )}
      <Grid flow="col" gap={64} align="center" justify="space-between">
        <button type="button" onClick={handleCancel} className="button-back">
          <Icon name="arrow-back" width={16} height={16} className="mr-12" color="inherit" />
          Cancel
        </button>
        <button type="button" disabled={!tranche} onClick={handleNextStep} className="button-primary">
          Next Step
        </button>
      </Grid>
    </>
  );
};

export default SelectTranche;
