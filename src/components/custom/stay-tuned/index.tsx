import React from 'react';

import Grid from 'components/custom/grid';
import { Heading, Paragraph } from 'components/custom/typography';

import { ReactComponent as RocketSvg } from 'resources/svg/rocket.svg';

const StayTuned: React.FunctionComponent = () => {
  return (
    <Grid className="full-height" flow="row" gap={48} align="center" justify="center">
      <RocketSvg style={{ maxWidth: '310px', maxHeight: '377px' }} />
      <Grid flow="row" gap={8}>
        <Heading type="h1" bold color="primary">
          Stay tuned!
        </Heading>
        <Paragraph type="p1" semiBold color="secondary">
          We are launching soon
        </Paragraph>
      </Grid>
    </Grid>
  );
};

export default StayTuned;
