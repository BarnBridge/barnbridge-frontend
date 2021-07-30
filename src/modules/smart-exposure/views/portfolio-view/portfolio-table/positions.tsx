import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatToken, formatUSD } from 'web3/utils';

import { ColumnType, Table } from 'components/custom/table';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIconPair } from 'components/token-icon';
import { useContract } from 'hooks/useContract';
import { TranchesItemApiType, useSeAPI } from 'modules/smart-exposure/api';

const columns: ColumnType<TranchesItemApiType>[] = [
  {
    heading: 'Tranche / Transaction',
    render: function Render(item) {
      const { getTokenIconBySymbol } = useKnownTokens();

      return (
        <div className="flex align-center">
          <TokenIconPair
            name1={getTokenIconBySymbol(item.tokenA.symbol)}
            name2={getTokenIconBySymbol(item.tokenB.symbol)}
            size={40}
            className="mr-16"
            style={{ flexShrink: 0 }}
          />
          <div className="text-p1 fw-semibold color-primary mr-4">{item.eTokenSymbol}</div>
        </div>
      );
    },
  },
  {
    heading: 'Pool token amount',
    render: function PoolTokenAmount(item) {
      const contract = useContract(item.eTokenAddress, { loadBalance: true, loadCommon: true });

      const unscaledBalance = contract?.balance?.unscaleBy(contract?.decimals);

      return (
        <>
          <div className="text-p1 fw-semibold color-primary mb-4">{formatToken(unscaledBalance) ?? '–'}</div>
          <div className="text-sm fw-semibold color-secondary">
            {formatUSD(unscaledBalance?.multipliedBy(item.state.eTokenPrice)) ?? '–'}
          </div>
        </>
      );
    },
  },
  {
    heading: 'Actions',
    render: item => (
      <div className="flex align-center col-gap-24">
        <Link
          to={`/smart-exposure/pools/${item.poolAddress}/${item.eTokenAddress}/withdraw`}
          className="button-primary">
          Withdraw
        </Link>
        {/* <button type="button" className="button-ghost">
        Change tranche
      </button> */}
      </div>
    ),
  },
];

type PositionsTablePropsType = {
  poolAddress?: string;
};

export const PositionsTable: React.FC<PositionsTablePropsType> = ({ poolAddress }) => {
  const [tranches, setTranches] = useState<TranchesItemApiType[]>([]);
  const seAPI = useSeAPI();

  useEffect(() => {
    seAPI.fetchTranches(poolAddress).then(setTranches);
  }, [poolAddress]);

  return <Table<TranchesItemApiType> columns={columns} data={tranches} rowKey={item => item.eTokenAddress} />;
};
