import React from 'react';

import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import { Text } from 'components/custom/typography';

const PortfolioBalance: React.FC = () => {
  return (
    <Card noPaddingBody>
      <Text type="p1" weight="semibold" color="primary" className="p-24">
        Portfolio balance
      </Text>
      <Divider />
      <div className="p-24 grid flow-col">
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Total balance
          </Text>
          <Text type="h2" weight="bold" color="primary">
            $ 103,478.6708
          </Text>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Aggregated APY
          </Text>
          <Text type="p1" weight="semibold" color="red">
            12.37%
          </Text>
        </div>
      </div>
      <Divider />
      <div className="p-24 grid flow-col">
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Senior balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            $ 55,813.4487
          </Text>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Junior balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            $ 103,478.6708
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default PortfolioBalance;
