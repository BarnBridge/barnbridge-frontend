import React from 'react';

import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { ReactComponent as RocketSvg } from 'resources/svg/rocket.svg';

const StayTuned: React.FC = () => {
  return (
    <Grid className="full-height" flow="row" gap={48} align="center" justify="center">
      <RocketSvg style={{ maxWidth: '310px', maxHeight: '377px' }} />
      <Grid flow="row" gap={8}>
        <Text type="h1" weight="bold" color="primary">
          Stay tuned!
        </Text>
        <Text type="p1" weight="semibold" color="secondary">
          We are launching soon
        </Text>
      </Grid>
    </Grid>
  );
};

export default StayTuned;
