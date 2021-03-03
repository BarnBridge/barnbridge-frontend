import React from 'react';
import * as Antd from 'antd';
import last from 'lodash/last';

import { mergeState } from 'hooks/useMergeState';
import { fetchSYPortfolioValues } from 'modules/smart-yield/api';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';
import { useWallet } from 'wallets/wallet';

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
        const portfolioValues = await fetchSYPortfolioValues(wallet.account);

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
        <Antd.Spin spinning={state.loading}>
          <PortfolioBalance
            total={lastData?.value}
            aggregated={null}
            aggregatedColor="red"
            data={[
              ['Senior balance', lastData?.seniorValue, 'var(--theme-green-color)'],
              ['Junior balance', lastData?.juniorValue, 'var(--theme-purple-color)'],
            ]}
          />
        </Antd.Spin>
        <Antd.Spin spinning={state.loading}>
          <PortfolioValue
            title="Portfolio balance"
            data={state.data}
            color="var(--theme-red-color)"
            gradientColor="var(--theme-red-color-rgb)"
          />
        </Antd.Spin>
      </div>
      <HistoryTable />
    </>
  );
};

export default PortfolioOverview;
