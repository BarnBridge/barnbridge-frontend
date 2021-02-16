import { Text } from 'components/custom/typography';
import Card from 'components/antd/card';
import React from 'react';

export default function PortfolioBalance(props: any) {
  return (
    <Card noPaddingBody {...props}>
      <Text type="p1" weight="semibold" color="primary" className="p-24">Portfolio balance</Text>
      <Card.Delimiter />
      <div className="p-24 grid flow-col">
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Total balance</Text>
          <Text type="h2" weight="bold" color="primary">$ 103,478.6708</Text>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Aggregated APY</Text>
          <Text type="p1" weight="semibold" color="red">12.37%</Text>
        </div>
      </div>
      <Card.Delimiter />
      <div className="p-24 grid flow-col">
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Senior balance</Text>
          <Text type="p1" weight="semibold" color="primary">$ 55,813.4487</Text>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">Junior balance</Text>
          <Text type="p1" weight="semibold" color="primary">$ 103,478.6708</Text>
        </div>
      </div>
    </Card>
  )
}
