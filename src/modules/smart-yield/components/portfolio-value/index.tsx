import React from 'react';

import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';

const PortfolioValue: React.FC = () => {
  return (
    <Card noPaddingBody>
      <Grid flow="col" colsTemplate="1fr max-content" align="center" className="p-24">
        <Text type="p1" weight="semibold" color="primary">
          Portfolio value
        </Text>
        <Text type="small" weight="semibold">
          Last month
        </Text>
      </Grid>
      <Divider />
    </Card>
  );
};

export default PortfolioValue;
