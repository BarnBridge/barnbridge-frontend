import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatToken } from 'web3/utils';

import IconsPair from 'components/custom/icons-pair';
import { ColumnType, Table } from 'components/custom/table';
import { getTokenIconBySymbol } from 'components/providers/known-tokens-provider';
import { useContract } from 'hooks/useContract';
import { TranchesItemApiType, fetchTranches } from 'modules/smart-exposure/api';

const columns: ColumnType<TranchesItemApiType>[] = [
  {
    heading: 'Tranche / Transaction',
    render: item => (
      <div className="flex align-center">
        <IconsPair
          icon1={getTokenIconBySymbol(item.tokenA.symbol)}
          icon2={getTokenIconBySymbol(item.tokenB.symbol)}
          size={40}
          className="mr-16"
          style={{ flexShrink: 0 }}
        />
        <div className="text-p1 fw-semibold color-primary mr-4">{item.eTokenSymbol}</div>
      </div>
    ),
  },
  {
    heading: 'Pool token amount',
    render: function PoolTokenAmount(item) {
      const contract = useContract(item.eTokenAddress, { loadBalance: true, loadCommon: true });

      return (
        <div className="text-p1 fw-semibold color-primary mr-4">
          {formatToken(contract?.balance?.unscaleBy(contract?.decimals)) ?? '–'}
        </div>
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

  useEffect(() => {
    fetchTranches(poolAddress).then(setTranches);
  }, [poolAddress]);

  return <Table<TranchesItemApiType> columns={columns} data={tranches} />;
};
