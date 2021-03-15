import React from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { formatBigValue, formatPercent, formatToken } from 'web3/utils';

import Divider from 'components/antd/divider';
import Tooltip from 'components/antd/tooltip';
import { Hint, Text } from 'components/custom/typography';

import s from './s.module.scss';

type TransactionSummaryProps = {
  className?: string;
  apy?: BigNumber;
  gain?: BigNumber;
  gainFee?: BigNumber;
  reward?: BigNumber;
  symbol?: string;
};

const TransactionSummary: React.FC<TransactionSummaryProps> = props => {
  const { className, apy, gain, gainFee, reward, symbol } = props;

  return (
    <section className={cn(s.container, className)}>
      <header className="flex ph-24 pv-16">
        <Text type="p2" weight="semibold" color="secondary">
          Transaction summary
        </Text>
      </header>
      <Divider />
      <div className="ph-24 pv-16">
        <div className="flex mb-24">
          <Hint text="This number shows the APY you get based on the deposited amount and maturity date. This is the annualized percentage.">
            <Text type="small" weight="semibold" color="secondary">
              Guaranteed APY
            </Text>
          </Hint>
          <Text type="p2" weight="bold" color="green" className="ml-auto">
            {formatPercent(apy) ?? '-'}
          </Text>
        </div>
        <div className="flex mb-24">
          <Hint text="">
            <Text type="small" weight="semibold" color="secondary">
              Gain
            </Text>
          </Hint>
          <Text type="p2" weight="bold" color="primary" className="ml-auto">
            {formatBigValue(gain)}
          </Text>
        </div>
        <div className="flex mb-24">
          <Hint text="">
            <Text type="small" weight="semibold" color="secondary">
              Fee at maturity
            </Text>
          </Hint>
          <Text type="p2" weight="bold" color="primary" className="ml-auto">
            {formatPercent(gainFee)} of gains
          </Text>
        </div>
        <div className="flex">
          <Hint text="This is the amount your senior bond will be guaranteed to be redeemable for at maturity.">
            <Text type="small" weight="semibold" color="secondary">
              Redeemable at maturity
            </Text>
          </Hint>
          <Text type="p2" weight="bold" color="primary" className="ml-auto">
            <Tooltip title={formatBigValue(reward, 18)}>
              {formatToken(reward, {
                tokenName: symbol,
              }) ?? '-'}
            </Tooltip>
          </Text>
        </div>
      </div>
    </section>
  );
};

export default TransactionSummary;
