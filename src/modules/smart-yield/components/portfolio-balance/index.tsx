import React from 'react';
import { formatPercent, formatUSDValue } from 'web3/utils';

import Divider from 'components/antd/divider';
import Progress from 'components/antd/progress';
import { AprLabel } from 'components/custom/label';
import { Hint, Text, TextProps } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';

import s from './s.module.scss';

type Props = {
  total?: number;
  totalHint?: string;
  aggregated: number | null;
  aggregatedApr?: number;
  aggregatedText?: React.ReactNode;
  aggregatedColor: TextProps['color'];
  data: [[string, number | undefined, string], [string, number | undefined, string]];
};

const PortfolioBalance: React.FC<Props> = (props: Props) => {
  const {
    total,
    totalHint,
    aggregated,
    aggregatedApr,
    aggregatedColor,
    aggregatedText,
    data: [[label1, value1, color1], [label2, value2, color2]],
  } = props;

  const { projectToken, getTokenBySymbol } = useKnownTokens();
  const stkAaveToken = getTokenBySymbol(KnownTokens.STK_AAVE)!;

  const progress = ((value1 ?? 0) * 100) / ((value1 ?? 0) + (value2 ?? 0));

  return (
    <div className="card">
      <div className="card-header">
        <Text type="p1" weight="semibold" color="primary">
          Portfolio balance
        </Text>
      </div>
      <div className="p-24 flexbox-grid flow-col gap-16">
        <div>
          <Hint text={totalHint}>
            <Text type="small" weight="semibold" color="secondary" className="mb-4">
              Total balance
            </Text>
          </Hint>
          <Text type="h2" weight="bold" color="primary">
            {formatUSDValue(total)}
          </Text>
        </div>
        {aggregated !== null && (
          <div>
            <Hint text={aggregatedText}>
              <Text type="small" weight="semibold" color="secondary" className="mb-4">
                Aggregated APY
              </Text>
            </Hint>
            <Text type="p1" weight="semibold" color={aggregatedColor}>
              {formatPercent(aggregated)}
            </Text>
            {Boolean(aggregatedApr) && (
              <AprLabel icons={[projectToken.icon!, stkAaveToken.icon!]}>
                {' '}
                +{formatPercent(aggregatedApr ?? 0)} APR
              </AprLabel>
            )}
          </div>
        )}
      </div>
      <Divider />
      <Progress
        className={s.progress}
        strokeLinecap="square"
        percent={progress}
        strokeWidth={8}
        trailColor={value2 !== undefined && value2 > 0 ? color2 : undefined}
        strokeColor={color1}
      />
      <div className="p-24 flexbox-grid flow-col gap-16">
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
    </div>
  );
};

export default PortfolioBalance;
