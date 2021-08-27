import { useMemo } from 'react';

import PortfolioBalance from 'components/portfolio-balance';
import { useFetchPortfolioValue } from 'modules/smart-alpha/api';
import { useWallet } from 'wallets/walletProvider';

import { TransactionsTable } from '../../components/transactions';
import { PortfolioValue } from './portfolio-value';

import s from './s.module.scss';

export const PortfolioStatistics = () => {
  const { account } = useWallet();
  const { data } = useFetchPortfolioValue();

  const [seniorBalance, juniorBalance, totalBalance] = useMemo(() => {
    const last = data?.[data?.length - 1];

    if (!last) {
      return [undefined, undefined, undefined];
    }

    return [last.seniorValue, last.juniorValue, last.seniorValue + last.juniorValue];
  }, [data]);

  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance
          total={totalBalance}
          totalHint="This number doesn’t include the gains from the senior bonds that have not yet reached their maturity date."
          aggregated={null}
          aggregatedColor="red"
          data={[
            ['Senior balance', seniorBalance, 'var(--theme-green-color)'],
            ['Junior balance', juniorBalance, 'var(--theme-purple-color)'],
          ]}
        />
        <PortfolioValue />
      </div>
      <TransactionsTable accountAddress={account} />
    </>
  );
};
