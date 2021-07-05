import React from 'react';
import AntdSpin from 'antd/lib/spin';
import last from 'lodash/last';

import { mergeState } from 'hooks/useMergeState';
import { useSyAPI } from 'modules/smart-yield/api';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';
import { useWallet } from 'wallets/walletProvider';

import HistoryTable from './history-table';

import s from './s.module.scss';

type PortfolioEntity = {
  timestamp: Date;
  value: number;
  seniorValue: number;
  juniorValue: number;
};

type State = {
  loading: boolean;
  data: PortfolioEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
};

const PortfolioOverview: React.FC = () => {
  const wallet = useWallet();
  const syAPI = useSyAPI();

  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    (async () => {
      if (!wallet.account) {
        return;
      }

      setState(
        mergeState<State>({
          loading: true,
        }),
      );

      try {
        const portfolioValues = await syAPI.fetchSYPortfolioValues(wallet.account);

        setState(
          mergeState<State>({
            loading: false,
            data: portfolioValues.map(item => ({
              timestamp: item.timestamp,
              value: item.seniorValue + item.juniorValue,
              seniorValue: item.seniorValue,
              juniorValue: item.juniorValue,
            })),
          }),
        );
      } catch {
        setState(
          mergeState<State>({
            loading: false,
            data: [],
          }),
        );
      }
    })();
  }, [wallet.account]);

  const lastData = last(state.data);

  return (
    <>
      <div className={s.portfolioContainer}>
        <AntdSpin spinning={state.loading}>
          <PortfolioBalance
            total={lastData?.value}
            totalHint="This number doesn’t include the gains from the senior bonds that have not yet reached their maturity date."
            aggregated={null}
            aggregatedColor="red"
            data={[
              ['Senior balance', lastData?.seniorValue, 'var(--theme-green-color)'],
              ['Junior balance', lastData?.juniorValue, 'var(--theme-purple-color)'],
            ]}
          />
        </AntdSpin>
        <PortfolioValue type="general" />
      </div>
      <HistoryTable />
    </>
  );
};

export default PortfolioOverview;
