import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Icon from 'components/custom/icon';
import { Paragraph, Small, Text } from 'components/custom/typography';
import Grid from 'components/custom/grid';
import RadioCard from 'modules/smart-yield/components/radio-card';

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
          <Icon name="senior_tranche" width={64} height={64} className="mb-24" />
          <Text type="small" weight="semibold" className="mb-4">Senior tranche</Text>
          <Text type="p1" weight="semibold" color="primary" className="mb-8">Fixed APY</Text>
          <Text type="p1" weight="bold" color="green">6.42%</Text>
        </RadioCard>
        <RadioCard
          selected={tranche === 'junior'}
          onClick={() => setTranche('junior')}>
          <Icon name="junior_tranche" width={64} height={64} className="mb-24" />
          <Text type="small" weight="semibold" className="mb-4">Junior tranche</Text>
          <Text type="p1" weight="semibold" color="primary" className="mb-8">Variable APY</Text>
          <Text type="p1" weight="bold" color="purple">21.33%</Text>
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
