import { useLocation, useParams } from 'react-router-dom';

import { Link } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useFetchPool } from 'modules/smart-alpha/api';
import { useWallet } from 'wallets/walletProvider';

import { PoolPerformance } from './pool-performance';
import { TokensPrice } from './tokens-price';

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
