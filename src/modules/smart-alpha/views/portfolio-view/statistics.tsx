import AntdSpin from 'antd/lib/spin';

import PortfolioBalance from 'components/portfolio-balance';
import { useWallet } from 'wallets/walletProvider';

import { TransactionsTable } from '../../components/transactions';
import { PortfolioValue } from './portfolio-value';

import s from './s.module.scss';

export const PortfolioStatistics = () => {
  const { account } = useWallet();
  return (
    <>
      <div className={s.portfolioContainer}>
        {/* <AntdSpin spinning={false}> */}
        <PortfolioBalance
          total={100_000}
          totalHint="This number doesn’t include the gains from the senior bonds that have not yet reached their maturity date."
          aggregated={null}
          aggregatedColor="red"
          data={[
            ['Senior balance', 30_000, 'var(--theme-green-color)'],
            ['Junior balance', 70_000, 'var(--theme-purple-color)'],
          ]}
        />
        {/* </AntdSpin> */}
        <PortfolioValue />
      </div>
      <TransactionsTable accountAddress={account} />
    </>
  );
};
