import React from 'react';
import AntdEmpty from 'antd/lib/empty';
import AntdSpin from 'antd/lib/spin';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { formatBigValue, formatPercent, formatUSDValue, shortenAddr } from 'web3/utils';

import Divider from 'components/antd/divider';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import IconBubble from 'components/custom/icon-bubble';
import StatusTag from 'components/custom/status-tag';
import { Text } from 'components/custom/typography';
import { useWeb3 } from 'components/providers/web3Provider';
import { mergeState } from 'hooks/useMergeState';
import { APISYSeniorRedeem, useSyAPI } from 'modules/smart-yield/api';
import { PoolsSYPool, usePools } from 'modules/smart-yield/providers/pools-provider';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

type ListEntity = APISYSeniorRedeem & {
  pool?: PoolsSYPool;
};

type State = {
  loading: boolean;
  data: ListEntity[];
  total: number;
  pageSize: number;
  page: number;
};

const InitialState: State = {
  loading: false,
  data: [],
  total: 0,
  pageSize: 10,
  page: 1,
};

type Props = {
  originatorFilter?: string;
  tokenFilter?: string;
};

const PastPositionsList: React.FC<Props> = props => {
  const { originatorFilter = 'all', tokenFilter = 'all' } = props;

  const wallet = useWallet();
  const { getEtherscanTxUrl } = useWeb3();
  const poolsCtx = usePools();
  const syAPI = useSyAPI();
  const { pools } = poolsCtx;

  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    if (!pools || pools.length === 0) {
      return;
    }

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
        const redeems = await syAPI.fetchSYSeniorRedeems(
          wallet.account,
          state.page,
          state.pageSize,
          originatorFilter,
          tokenFilter,
        );

        const data = redeems.data.map(item => {
          const pool = pools.find(poolItem => poolItem.smartYieldAddress === item.smartYieldAddress);

          return {
            ...item,
            pool,
          };
        });

        setState(
          mergeState<State>({
            loading: false,
            data,
            total: redeems.meta.count,
          }),
        );
      } catch {
        setState(
          mergeState<State>({
            loading: false,
            data: [],
            total: 0,
          }),
        );
      }
    })();
  }, [wallet.account, state.page, originatorFilter, tokenFilter, pools]);

  return (
    <>
      <AntdSpin spinning={state.loading}>
        {state.data.length === 0 && !state.loading && <AntdEmpty image={AntdEmpty.PRESENTED_IMAGE_SIMPLE} />}
        <div className={s.cards}>
          {state.data.map(entity => (
            <div className="card" key={entity.seniorBondId}>
              <div className="card-header flex">
                <IconBubble name={entity.pool?.meta?.icon} bubbleName={entity.pool?.market?.icon} className="mr-16" />
                <div>
                  <Text type="p1" weight="semibold" color="primary" className="mb-4">
                    {entity.pool?.underlyingSymbol}
                  </Text>
                  <Text type="small" weight="semibold">
                    {entity.pool?.market?.name}
                  </Text>
                </div>

                <StatusTag text="REDEEMED" color="blue" className="ml-auto" />
              </div>
              <div className="p-24">
                <Text type="small" weight="semibold" color="secondary">
                  Deposited
                </Text>
                <Tooltip title={entity.underlyingIn}>
                  <Text type="p1" tag="span" weight="semibold" color="primary">
                    {formatBigValue(entity.underlyingIn)}
                    {` ${entity.pool?.underlyingSymbol}`}
                  </Text>
                </Tooltip>
                <Text type="p2" weight="semibold" color="secondary">
                  {formatUSDValue(entity.underlyingIn)}
                </Text>
              </div>
              <Divider />
              <div className="p-24">
                <Text type="small" weight="semibold" color="secondary">
                  Redeemed
                </Text>
                <Tooltip title={Number(entity.underlyingIn) + Number(entity.gain) - Number(entity.fee)}>
                  <Text type="p1" tag="span" weight="semibold" color="primary">
                    {formatBigValue(Number(entity.underlyingIn) + Number(entity.gain) - Number(entity.fee))}
                    {` ${entity.pool?.underlyingSymbol}`}
                  </Text>
                </Tooltip>
                <Text type="p2" weight="semibold" color="secondary">
                  {formatUSDValue(Number(entity.underlyingIn) + Number(entity.gain) - Number(entity.fee))}
                </Text>
              </div>
              <Divider />
              <div className="p-24">
                <Text type="small" weight="semibold" color="secondary">
                  Transaction hash/timestamp
                </Text>
                <ExternalLink href={getEtherscanTxUrl(entity.transactionHash)} className="link-blue mb-4">
                  {shortenAddr(entity.transactionHash)}
                </ExternalLink>
                <Text type="small" weight="semibold" color="secondary">
                  {format(entity.blockTimestamp * 1_000, 'MM.dd.yyyy HH:mm')}
                </Text>
              </div>
              <Divider />
              <div className="p-24">
                <Text type="small" weight="semibold" color="secondary">
                  APY
                </Text>
                <Text type="p1" weight="semibold" color="green">
                  {formatPercent(
                    new BigNumber(entity.gain)
                      .dividedBy(entity.underlyingIn)
                      .dividedBy(entity.forDays)
                      .multipliedBy(365),
                  )}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </AntdSpin>
    </>
  );
};

export default PastPositionsList;
