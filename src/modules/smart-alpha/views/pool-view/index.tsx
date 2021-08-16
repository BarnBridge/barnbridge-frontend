import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Button, Link } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useFetchPool } from 'modules/smart-alpha/api';
import { useWallet } from 'wallets/walletProvider';

import { PoolPerformance } from './pool-performance';
import { TokensPrice } from './tokens-price';

import s from './s.module.scss';

const PoolView = () => {
  const { id: poolAddress } = useParams<{ id: string }>();
  const location = useLocation();
  const { data } = useFetchPool(poolAddress);
  const { getToken } = useTokens();
  const wallet = useWallet();

  const pool = data?.[0];

  if (!pool) {
    return <Spinner style={{ margin: 'auto' }} />;
  }

  const poolToken = getToken(pool.poolToken.symbol);

  return (
    <>
      <div className="mb-16">
        <Link to="/smart-alpha" variation="text-alt" icon="arrow" iconPosition="left" iconRotate={180}>
          Pools
        </Link>
      </div>
      <div className="flex align-center mb-40">
        <div className="flex align-center">
          <TokenIcon name={poolToken?.icon ?? 'unknown'} size={40} bubble2Name="usd" className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
              {pool.poolName}
            </Text>
            <Text type="small" weight="semibold" color="red">
              Epoch {pool.state.epoch}
            </Text>
          </div>
        </div>
        <div className="flex col-gap-24 ml-auto">
          <Link to={`${location.pathname}/simulate`} variation="ghost" aria-disabled={!wallet.account}>
            Simulate
          </Link>
          <Link to={`${location.pathname}/deposit`} variation="primary" aria-disabled={!wallet.account}>
            Deposit
          </Link>
        </div>
      </div>
      <div className={classNames(s.cards, 'mb-12')}>
        <section className={classNames(s.epochCard, s.epochCardPrimary)}>
          <div className={s.epochCardTitleWrap}>
            <Text type="lb2" weight="bold" tag="h3" color="red" className={s.epochCardTitle}>
              EPOCH 135 - IN PROGRESS
            </Text>
          </div>
          <header className={classNames(s.epochCardHeader, 'mb-24')}>
            <div className={s.epochCardHeaderItem}>
              <Text type="h3" weight="bold" color="primary" className="mb-4">
                32.53%
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Upside exposure rate
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <Text type="h3" weight="bold" color="primary" className="mb-4">
                16.22%
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Downside protection rate
              </Text>
            </div>
          </header>
          <dl>
            <div className={s.epochCardDlRow}>
              <dt>
                <Text type="small" weight="semibold" color="secondary">
                  wETH epoch entry price
                </Text>
              </dt>
              <dd>
                <Text type="p1" weight="semibold" color="primary">
                  $1,323.4413
                </Text>
              </dd>
            </div>
            <div className={s.epochCardDlRow}>
              <dt className="flex align-center">
                <Text type="small" weight="semibold" color="secondary">
                  Senior liquidity
                </Text>
                <span
                  className="middle-dot color-border ml-8"
                  style={{ '--dot-color': 'var(--theme-green-color)' } as React.CSSProperties}
                />
              </dt>
              <dd className="flex align-center">
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="mr-8" />
                <Text type="p1" weight="semibold" color="primary">
                  4,813.44
                </Text>
              </dd>
            </div>
            <div className={s.epochCardDlRow}>
              <dt className="flex align-center">
                <Text type="small" weight="semibold" color="secondary">
                  Junior liquidity
                </Text>
                <span
                  className="middle-dot color-border ml-8"
                  style={{ '--dot-color': 'var(--theme-purple-color)' } as React.CSSProperties}
                />
              </dt>
              <dd className="flex align-center">
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="mr-8" />
                <Text type="p1" weight="semibold" color="primary">
                  4,813.44
                </Text>
              </dd>
            </div>
          </dl>
          <div
            className={classNames(s.progress, 'mb-8')}
            style={{ '--pool-epoch-tranche-percentage': 84.77 } as React.CSSProperties}
          />
          <div className="flex align-center">
            <Text type="small" weight="semibold" color="green">
              84.77%
            </Text>
            <Text type="small" weight="semibold" color="purple" className="ml-auto">
              15.23%
            </Text>
          </div>
          <div className="flex justify-center mt-8">
            <Button variation="text" color="red">
              View queue state
            </Button>
          </div>
        </section>
        <section className={classNames(s.epochCard, s.epochCardSecondary)}>
          <div className={s.epochCardTitleWrap}>
            <Text type="lb2" weight="bold" tag="h3" color="secondary" className={s.epochCardTitle}>
              EPOCH 136- ESTIMATES
            </Text>
          </div>
          <header className={classNames(s.epochCardHeader, 'mb-24')}>
            <div className={s.epochCardHeaderItem}>
              <Text type="h3" weight="bold" color="primary" className="mb-4">
                32.53%
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Upside exposure rate
              </Text>
            </div>
            <div className={s.epochCardHeaderItem}>
              <Text type="h3" weight="bold" color="primary" className="mb-4">
                16.22%
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                Downside protection rate
              </Text>
            </div>
          </header>
          <dl>
            <div className={s.epochCardDlRow}>
              <dt>
                <Text type="small" weight="semibold" color="secondary">
                  wETH epoch entry price
                </Text>
              </dt>
              <dd>
                <Text type="p1" weight="semibold" color="primary">
                  $1,323.4413
                </Text>
              </dd>
            </div>
            <div className={s.epochCardDlRow}>
              <dt className="flex align-center">
                <Text type="small" weight="semibold" color="secondary">
                  Senior liquidity
                </Text>
                <span
                  className="middle-dot color-border ml-8"
                  style={{ '--dot-color': 'var(--theme-green-color)' } as React.CSSProperties}
                />
              </dt>
              <dd className="flex align-center">
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="mr-8" />
                <Text type="p1" weight="semibold" color="primary">
                  4,813.44
                </Text>
              </dd>
            </div>
            <div className={s.epochCardDlRow}>
              <dt className="flex align-center">
                <Text type="small" weight="semibold" color="secondary">
                  Junior liquidity
                </Text>
                <span
                  className="middle-dot color-border ml-8"
                  style={{ '--dot-color': 'var(--theme-purple-color)' } as React.CSSProperties}
                />
              </dt>
              <dd className="flex align-center">
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="mr-8" />
                <Text type="p1" weight="semibold" color="primary">
                  4,813.44
                </Text>
              </dd>
            </div>
          </dl>
          <div
            className={classNames(s.progress, 'mb-8')}
            style={{ '--pool-epoch-tranche-percentage': 84.77 } as React.CSSProperties}
          />
          <div className="flex align-center">
            <Text type="small" weight="semibold" color="green">
              84.77%
            </Text>
            <Text type="small" weight="semibold" color="purple" className="ml-auto">
              15.23%
            </Text>
          </div>
        </section>
      </div>
      <TokensPrice poolAddress={poolAddress} className="mb-32" />
      <PoolPerformance poolAddress={poolAddress} />
    </>
  );
};

export default PoolView;

// const filtersOptions: TableFilterType[] = [
//   {
//     name: 'transactionType',
//     label: 'Transaction type',
//     defaultValue: '',
//     itemRender: () => {
//       const tokenOpts = [
//         {
//           value: '',
//           label: 'All types',
//         },
//         {
//           value: 'DEPOSIT',
//           label: 'Deposit',
//         },
//         {
//           value: 'WITHDRAW',
//           label: 'Withdraw',
//         },
//       ];

//       return <Select options={tokenOpts} className="full-width" />;
//     },
//   },
// ];

// type FiltersStateType = {
//   transactionType: TransactionApiType['transactionType'] | '';
// };

// const initialFiltersState: FiltersStateType = {
//   transactionType: '',
// };

// const TransactionHistory: React.FC<{ className?: string }> = ({ className }) => {
//   const [filtersState, setFiltersState] = useState<FiltersStateType>(initialFiltersState);

//   return (
//     <div className="card">
//       <header
//         className="flex align-center"
//         style={{
//           borderBottom: '1px solid var(--theme-border-color)',
//           padding: '12px 16px 12px 24px',
//           overflowX: 'auto',
//         }}>
//         <div className="text-p1 fw-semibold color-primary mr-8">Transaction history</div>
//         <TableFilter filters={filtersOptions} value={filtersState} onChange={handleFilterChange} className="ml-auto" />
//       </header>
//       <TransactionsTable transactionType={filtersState.transactionType || undefined} />
//     </div>
//   );
// };
