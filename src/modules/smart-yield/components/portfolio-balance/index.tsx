import React from 'react';

import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import { Text, TextProps } from 'components/custom/typography';
import Progress from 'components/antd/progress';
import { formatUSDValue } from 'web3/utils';
import s from './s.module.scss';

type Props = {
  total: number;
  aggregated: number;
  aggregatedColor: TextProps['color'];
  data: [[string, number, string], [string, number, string]];

}

const PortfolioBalance: React.FC<Props> = ({
  total,
  aggregated,
  aggregatedColor,
  data: [
    [label1, value1, color1],
    [label2, value2, color2],
  ]
}) => {
  return (
    <Card noPaddingBody>
      <Text type="p1" weight="semibold" color="primary" className="p-24">
        Portfolio balance
      </Text>
      <Divider />
      <div className="p-24 grid flow-col gap-16">
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Total balance
          </Text>
          <Text type="h2" weight="bold" color="primary">
            {formatUSDValue(total)}
          </Text>
        </div>
        <div>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            Aggregated APY
          </Text>
          <Text type="p1" weight="semibold" color={aggregatedColor}>
            {aggregated}%
          </Text>
        </div>
      </div>
      <Divider />
      <Progress
        className={s.progress}
        strokeLinecap="square"
        percent={40}
        strokeWidth={8}
        trailColor={color2}
        strokeColor={color1}
      />
      <div className="p-24 grid flow-col gap-16">
        <div className={s.dataColumn} style={{ '--color': color1 } as React.CSSProperties}>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            {label1}
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatUSDValue(value1)}
          </Text>
        </div>
        <div className={s.dataColumn} style={{ '--color': color2 } as React.CSSProperties}>
          <Text type="small" weight="semibold" color="secondary" className="mb-4">
            {label2}
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatUSDValue(value2)}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default PortfolioBalance;
