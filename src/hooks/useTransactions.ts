import React from 'react';
import { useLazyQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { format, formatDistance } from 'date-fns';
import BigNumber from 'bignumber.js';

import { useWeb3Contracts, Web3ContractsType } from 'web3/contracts';
import { formatBigValue, shortenAddr } from 'web3/utils';

// where: {
//   token_in: $token
//   blockTimestamp_gte: $gt
//   blockTimestamp_lte: $lt
// }

const GET_TRANSACTIONS = gql`
	query {
		stakingActions (
			orderBy: blockNumber,
			orderDirection: desc,
		) {
			id
			type
			user
			token
			amount
			blockNumber
			blockTimestamp
			txHash
		}
	}
`;

export type StakingAction = {
  id: string;
  type: string;
  user: string;
  token: string;
  amount: string;
  blockNumber: number;
  blockTimestamp: string;
  txHash: string;
};

type QueryData = {
  stakingActions: StakingAction[];
};

type QueryVars = {};

export function useTransactions() {
  const [fetch, { loading, data: rawData }] = useLazyQuery<QueryData, QueryVars>(GET_TRANSACTIONS);

  const web3cRef = React.useRef<Web3ContractsType>(null as any);
  web3cRef.current = useWeb3Contracts();

  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch({
      variables: {},
    });
  }, [fetch]);

  React.useEffect(() => {
    if (!rawData) {
      return;
    }

    const transactions = (rawData?.stakingActions || []).map((item: StakingAction) => {
      const time = Number(item.blockTimestamp) * 1000;

      return {
        ...item,
        userShort: shortenAddr(item.user),
        txHashShort: shortenAddr(item.txHash),
        timestamp: format(time, 'MM/dd/yyyy'),
        timeCode: format(time, 'yyyyMMdd'),
        get timeDistance(): string {
          return formatDistance(new Date(time), new Date(), {
            addSuffix: true,
          });
        },
        get amount() {
          return web3cRef.current.getTokenHumanValue(item.token, new BigNumber(item.amount));
        },
        get amountFormat() {
          return formatBigValue(web3cRef.current.getTokenHumanValue(item.token, new BigNumber(item.amount)));
        },
      };
    });

    setData(transactions);
  }, [rawData]);

  return {
    loading,
    data,
  };
}
