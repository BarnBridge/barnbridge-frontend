import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Card from 'components/antd/card';
import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Icon from 'components/custom/icon';
import { Paragraph, Small, Heading } from 'components/custom/typography';
import Grid from 'components/custom/grid';
import MarketCoinCard from 'modules/smart-yield/components/market-coin-card';
import RadioCard from 'modules/smart-yield/components/radio-card';
import PoolDetails from 'modules/smart-yield/components/pool-details';
// import s from './s.module.scss';

export default function SelectTranche() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [tranche, setTranche] = useState<'senior' | 'junior' | undefined>();

  return (
    <>
      <Grid flow="col" gap={32} colsTemplate="1fr 1fr" className="mb-32">
        <RadioCard
          selected={tranche === 'senior'}
          onClick={() => setTranche('senior')}>
          <Icon name="senior_tranche" width={64} height={64} />
          <br />
          <Small semiBold>Senior tranche</Small>
          <br />
          <Paragraph type="p1" semiBold color="grey900">
            Fixed APY
          </Paragraph>
          <br />
          <Paragraph type="p1" bold color="green500">
            6.42%
          </Paragraph>
        </RadioCard>
        <RadioCard
          selected={tranche === 'junior'}
          onClick={() => setTranche('junior')}>
          <Icon name="junior_tranche" width={64} height={64} />
          <br />
          <Small semiBold>Junior tranche</Small>
        </RadioCard>
      </Grid>
      {tranche && (
        <Alert
          className="mb-32"
          type="warning"
          message="Sed elementum nulla sit amet accumsan dapibus. Integer auctor et elit in lobortis. Fusce ex nulla, aliquam vitae quam quis, tincidunt ultricies purus."
        />
      )}
      <Grid flow="col" gap={64} align="center" justify="space-between">
        <Button
          type="light"
          onClick={() => history.push(`/smart-yield/deposit`)}>
          <Icon name="left-arrow" width={9} height={8} />
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={() => history.push(`/smart-yield/deposit/${id}/${tranche}`)}
          {...{ disabled: !tranche }}>
          Next Step
        </Button>
      </Grid>
    </>
  );
}
