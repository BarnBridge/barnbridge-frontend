import React from 'react';
import AntdSpin from 'antd/lib/spin';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import Web3Contract from 'web3/contracts/web3Contract';
import { formatToken, formatUSD, getEtherscanAddressUrl } from 'web3/utils';

import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { useReload } from 'hooks/useReload';
import { APISYPool, Markets, Pools, fetchSYPools } from 'modules/smart-yield/api';
import SYProviderContract from 'modules/smart-yield/contracts/syProviderContract';
import { useWallet } from 'wallets/wallet';

type SYPoolEntity = APISYPool & {
  provider: SYProviderContract;
  canTransfer: boolean;
  harvesting: boolean;
  harvest: () => Promise<void>;
};

type State = {
  fees: {
    items: SYPoolEntity[];
    loading: boolean;
  };
};

const InitialState: State = {
  fees: {
    items: [],
    loading: false,
  },
};

const Columns: ColumnsType<SYPoolEntity> = [
  {
    title: 'Market / Originator',
    align: 'left',
    render: (_, entity) => {
      const market = Markets.get(entity.protocolId);
      const meta = Pools.get(entity.underlyingSymbol);

      return (
        <div className="flex flow-col align-center">
          <IconBubble name={meta?.icon} bubbleName={market?.icon} className="mr-16" />
          <div className="flex flow-row">
            <ExternalLink href={getEtherscanAddressUrl(entity.smartYieldAddress)} className="flex flow-col mb-4">
              <Text type="p1" weight="semibold" color="blue" className="mr-4">
                {entity.underlyingSymbol}
              </Text>
              <Icon name="arrow-top-right" width={8} height={8} color="blue" />
            </ExternalLink>
            <Text type="small" weight="semibold">
              {market?.name}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Fees Amount',
    align: 'right',
    render: (_, entity) => (
      <Tooltip
        className="flex flow-row row-gap-4"
        placement="bottomRight"
        title={formatToken(entity.provider.underlyingFees, {
          scale: entity.underlyingDecimals,
          decimals: entity.underlyingDecimals,
        })}>
        <Text type="p1" weight="semibold" color="primary">
          {formatToken(entity.provider.underlyingFees, {
            scale: entity.underlyingDecimals,
            compact: true,
          }) ?? '-'}
        </Text>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSD(entity.provider.underlyingFees?.unscaleBy(entity.underlyingDecimals)?.multipliedBy(1), true) ??
            '-'}
        </Text>
      </Tooltip>
    ),
  },
  {
    align: 'right',
    width: '30%',
    render: (_, entity) =>
      entity.canTransfer ? (
        <>
          <button
            type="button"
            className="button-ghost ml-auto"
            disabled={!entity.provider.underlyingFees?.gt(BigNumber.ZERO) || entity.harvesting}
            onClick={() => entity.harvest()}>
            {entity.harvesting && <AntdSpin spinning className="mr-8" />}
            Transfer fees
          </button>
          <ContractListener contract={entity.provider} />
        </>
      ) : null,
  },
];

const TreasuryFees: React.FC = () => {
  const wallet = useWallet();
  const walletRef = React.useRef(wallet);
  walletRef.current = wallet;

  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      fees: {
        ...prevState.fees,
        loading: true,
      },
    }));

    fetchSYPools()
      .then(data => {
        setState(prevState => ({
          ...prevState,
          fees: {
            ...prevState.fees,
            items: data.map(item => {
              const providerContract = new SYProviderContract(item.providerAddress);
              providerContract.setProvider(walletRef.current.provider);
              providerContract.on(Web3Contract.UPDATE_DATA, reload);
              providerContract.loadUnderlyingFees();

              const result = {
                ...item,
                provider: providerContract,
                canTransfer: walletRef.current.isActive,
                harvesting: false,
                harvest: () => {
                  result.harvesting = true;
                  reload();

                  providerContract.setAccount(walletRef.current.account);

                  return providerContract
                    .transferFeesSend()
                    .catch(Boolean)
                    .then(() => {
                      result.harvesting = false;
                      reload();
                    });
                },
              };

              return result;
            }),
            loading: false,
          },
        }));
      })
      .catch(() => {
        setState(prevState => ({
          ...prevState,
          fees: {
            ...prevState.fees,
            items: [],
            loading: false,
          },
        }));
      });
  }, []);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      fees: {
        ...prevState.fees,
        items: prevState.fees.items.map(fee => ({
          ...fee,
          canTransfer: wallet.isActive,
        })),
      },
    }));
  }, [wallet.isActive]);

  const totalFees = React.useMemo(() => {
    return state.fees.items.reduce((a, c) => {
      return a.plus(c.provider.underlyingFees?.unscaleBy(c.underlyingDecimals)?.multipliedBy(1) ?? 0);
    }, BigNumber.ZERO);
  }, [state.fees.items, version]);

  return (
    <>
      <Text type="p1" weight="semibold" color="secondary" className="mb-8">
        Total fees accrued
      </Text>
      <Text type="h2" weight="bold" color="primary" className="mb-40">
        {formatUSD(totalFees)}
      </Text>
      <div className="card">
        <div className="card-header">
          <Text type="p1" weight="semibold" color="primary">
            Markets accrued fees
          </Text>
        </div>
        <Table<SYPoolEntity>
          inCard
          columns={Columns}
          dataSource={state.fees.items}
          rowKey="smartYieldAddress"
          loading={state.fees.loading}
          locale={{
            emptyText: 'No accrued fees',
          }}
          scroll={{
            x: true,
          }}
        />
      </div>
    </>
  );
};

export default TreasuryFees;
