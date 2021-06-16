import { useEffect, useState } from 'react';

import IconsPair from 'components/custom/icons-pair';
import { ColumnType, Table } from 'components/custom/table';
import { TranchesItemApiType, fetchTranches } from 'modules/smart-exposure/api';
import { useWallet } from 'wallets/wallet';

const columns: ColumnType<TranchesItemApiType>[] = [
  {
    heading: 'Tranche / Transaction',
    render: item => (
      <div className="flex align-center">
        <IconsPair icon1="token-wbtc" icon2="token-eth" size={40} className="mr-16" style={{ flexShrink: 0 }} />
        <div className="text-p1 fw-semibold color-primary mr-4">{item.eTokenSymbol}</div>
      </div>
    ),
  },
  {
    heading: 'Pool token amount',
    render: function PoolTokenAmount(item) {
      const wallet = useWallet();
      return <div className="text-p1 fw-semibold color-primary mr-4">TBD {wallet.account}</div>;
    },
  },
  {
    heading: 'Actions',
    render: item => (
      <div className="flex align-center col-gap-24">
        <button type="button" className="button-primary">
          Withdraw
        </button>
        {/* <button type="button" className="button-ghost">
          Change tranche
        </button> */}
      </div>
    ),
  },
];

type PositionsTablePropsType = {
  poolAddress: string;
};

export const PositionsTable: React.FC<PositionsTablePropsType> = ({ poolAddress }) => {
  // const [current, setCurrent] = useState(1);
  // const total = 54;
  // const pageSize = 10;
  const [tranches, setTranches] = useState<TranchesItemApiType[]>([]);

  useEffect(() => {
    fetchTranches(poolAddress).then(setTranches);
  }, [poolAddress]);

  return (
    <>
      <Table<TranchesItemApiType> columns={columns} data={tranches} />
      {/* <TableFooter total={total} current={current} pageSize={pageSize} onChange={setCurrent}>
        {({ total, from, to }) => (
          <>
            Showing {from} to {to} out of {total} entries
          </>
        )}
      </TableFooter> */}
    </>
  );
};
