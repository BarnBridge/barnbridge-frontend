import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { formatPercent, formatUSDValue } from 'web3/utils';

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
  secondaryData?: [[string, number | undefined, string], [string, number | undefined, string]];
  footer?: ReactNode;
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
    secondaryData,
    footer,
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
      <div className="card-footer">
        <Progress
          className={s.progress}
          strokeLinecap="square"
          percent={progress}
          strokeWidth={8}
          trailColor={value2 !== undefined && value2 > 0 ? color2 : undefined}
          strokeColor={color1}
        />
        <div className="flex flow-col align-top mt-24">
          <div className={classNames(s.dataColumn, 'flex-grow')} style={{ '--color': color1 } as React.CSSProperties}>
            <Text type="small" weight="semibold" color="secondary" className="mb-4">
              {label1}
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatUSDValue(value1)}
            </Text>
          </div>
          <div className={classNames(s.dataColumn, 'flex-grow')} style={{ '--color': color2 } as React.CSSProperties}>
            <Text type="small" weight="semibold" color="secondary" className="mb-4">
              {label2}
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatUSDValue(value2)}
            </Text>
          </div>
        </div>
        {secondaryData &&
          (() => {
            const [[label3, value3, color3], [label4, value4, color4]] = secondaryData;
            const progress = ((value3 ?? 0) * 100) / ((value3 ?? 0) + (value4 ?? 0));

            return (
              <div className="flex flow-row mt-24">
                <Progress
                  className={s.progress}
                  strokeLinecap="square"
                  percent={progress}
                  strokeWidth={8}
                  trailColor={value4 !== undefined && value4 > 0 ? color4 : undefined}
                  strokeColor={color3}
                />
                <div className="flex flow-col align-top mt-24">
                  <div
                    className={classNames(s.dataColumn, 'flex-grow')}
                    style={{ '--color': color3 } as React.CSSProperties}>
                    <Text type="small" weight="semibold" color="secondary" className="mb-4">
                      {label3}
                    </Text>
                    <Text type="p1" weight="semibold" color="primary">
                      {formatUSDValue(value3)}
                    </Text>
                  </div>
                  <div
                    className={classNames(s.dataColumn, 'flex-grow')}
                    style={{ '--color': color4 } as React.CSSProperties}>
                    <Text type="small" weight="semibold" color="secondary" className="mb-4">
                      {label4}
                    </Text>
                    <Text type="p1" weight="semibold" color="primary">
                      {formatUSDValue(value4)}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })()}
        {footer}
      </div>
    </div>
  );
};

export default PortfolioBalance;
