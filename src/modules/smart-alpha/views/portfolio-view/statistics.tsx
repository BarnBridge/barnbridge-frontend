import React, { useMemo } from 'react';

import PortfolioBalance from 'components/portfolio-balance';
import { useFetchPortfolioValue } from 'modules/smart-alpha/api';
import { useWallet } from 'wallets/walletProvider';

import { TransactionsTable } from '../../components/transactions';
import { PortfolioValue } from './portfolio-value';

import s from './s.module.scss';

export const PortfolioStatistics = () => {
  const { account } = useWallet();
  const { data } = useFetchPortfolioValue();

  const [seniorBalance, juniorBalance, entryQueueValue, exitQueueValue, totalBalance] = useMemo(() => {
    const last = data?.[data?.length - 1];

    if (!last) {
      return [undefined, undefined, undefined];
    }

    return [
      last.seniorValue,
      last.juniorValue,
      last.entryQueueValue,
      last.exitQueueValue,
      last.seniorValue + last.juniorValue + last.entryQueueValue + last.exitQueueValue,
    ];
  }, [data]);

  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance
          total={totalBalance}
          totalHint="This figure shows the USD-denominated value of the junior and senior tokens in your wallet."
          aggregated={null}
          aggregatedColor="red"
          data={[
            ['Senior balance', seniorBalance, 'var(--theme-green-color)'],
            ['Junior balance', juniorBalance, 'var(--theme-purple-color)'],
          ]}
          secondaryData={[
            ['Entry Queue', entryQueueValue, '#4F6AE5'],
            ['Exit Queue', exitQueueValue, '#B9C3F5'],
          ]}
        />
        <PortfolioValue />
      </div>
      <TransactionsTable accountAddress={account} />
    </>
  );
};
