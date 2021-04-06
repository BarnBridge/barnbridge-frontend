import React from 'react';
import AntdSpin from 'antd/lib/spin';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import ContractListener from 'web3/components/contract-listener';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Web3Contract from 'web3/contracts/web3Contract';
import { formatToken, formatUSD, getEtherscanAddressUrl } from 'web3/utils';

import Select from 'components/antd/select';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { useReload } from 'hooks/useReload';
import { APISYPool, Markets, Pools, fetchSYPools } from 'modules/smart-yield/api';
import SYProviderContract from 'modules/smart-yield/contracts/syProviderContract';
import { useWallet } from 'wallets/wallet';

type SYPoolEntity = APISYPool & {
  provider: SYProviderContract;
};

type State = {
  fees: {
    items: SYPoolEntity[];
    loading: boolean;
    filters: {
      originator: string;
      token: string;
    };
  };
};

const InitialState: State = {
  fees: {
    items: [],
    loading: false,
    filters: {
      originator: 'all',
      token: 'all',
    },
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
      React.createElement(() => {
        const { provider } = entity;
        const wallet = useWallet();

        const [confirmVisible, setConfirmVisible] = React.useState(false);
        const [harvesting, setHarvesting] = React.useState(false);

        const harvest = React.useCallback(async () => {
          setConfirmVisible(false);
          setHarvesting(true);

          try {
            provider.setProvider(wallet.provider);
            provider.setAccount(wallet.account);
            await provider.transferFeesSend();
          } catch {}

          setHarvesting(false);
        }, [provider]);

        if (!wallet.isActive) {
          return null;
        }

        return (
          <>
            <button
              type="button"
              className="button-ghost ml-auto"
              disabled={!provider.underlyingFees?.gt(BigNumber.ZERO) || harvesting}
              onClick={() => setConfirmVisible(true)}>
              {harvesting && <AntdSpin spinning className="mr-8" />}
              Transfer fees
            </button>
            {confirmVisible && (
              <TxConfirmModal
                title="Confirm transfer fees"
                submitText="Transfer fees"
                onCancel={() => setConfirmVisible(false)}
                onConfirm={harvest}
              />
            )}
            <ContractListener contract={entity.provider} />
          </>
        );
      }),
  },
];

const Filters: TableFilterType[] = [
  {
    name: 'originator',
    label: 'Originators',
    defaultValue: 'all',
    itemRender: () => {
      const tokenOpts = [
        {
          value: 'all',
          label: 'All originators',
        },
        ...Array.from(Markets.entries()).map(([key, value]) => ({
          value: key,
          label: value.name ?? '-',
        })),
      ];

      return <Select options={tokenOpts} className="full-width" />;
    },
  },
  {
    name: 'token',
    label: 'Token address',
    defaultValue: 'all',
    itemRender: () => {
      const tokenOpts = [
        {
          value: 'all',
          label: 'All tokens',
        },
        ...Array.from(Pools.entries()).map(([key, value]) => ({
          value: key,
          label: value.name ?? '-',
        })),
      ];

      return <Select options={tokenOpts} className="full-width" />;
    },
  },
];

const TreasuryFees: React.FC = () => {
  const wallet = useWallet();
  const walletRef = React.useRef(wallet);
  walletRef.current = wallet;

  const [reload, version] = useReload();
  const [state, setState] = React.useState<State>(InitialState);

  function handleFilterChange(filters: Record<string, any>) {
    setState(prevState => ({
      ...prevState,
      fees: {
        ...prevState.fees,
        filters: {
          ...prevState.fees.filters,
          ...filters,
        },
      },
    }));
  }

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
              providerContract.on(Web3Contract.UPDATE_DATA, reload);
              providerContract.loadUnderlyingFees();

              const result = {
                ...item,
                provider: providerContract,
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
        items: prevState.fees.items,
      },
    }));
  }, [wallet.isActive]);

  const totalFees = React.useMemo(() => {
    return state.fees.items.reduce((a, c) => {
      return a.plus(c.provider.underlyingFees?.unscaleBy(c.underlyingDecimals)?.multipliedBy(1) ?? 0);
    }, BigNumber.ZERO);
  }, [state.fees.items, version]);

  const filteredFees = React.useMemo(() => {
    const { items, filters } = state.fees;

    return items.filter(
      item =>
        ['all', item.protocolId].includes(filters.originator) && ['all', item.underlyingSymbol].includes(filters.token),
    );
  }, [state.fees.items, state.fees.filters]);

  return (
    <>
      <Text type="p1" weight="semibold" color="secondary" className="mb-8">
        Total fees accrued
      </Text>
      <Text type="h2" weight="bold" color="primary" className="mb-40">
        {formatUSD(totalFees)}
      </Text>
      <div className="card">
        <div className="card-header flex flow-col align-center justify-space-between pv-12">
          <Text type="p1" weight="semibold" color="primary">
            Markets accrued fees
          </Text>
          <TableFilter filters={Filters} value={state.fees.filters} onChange={handleFilterChange} />
        </div>
        <Table<SYPoolEntity>
          inCard
          columns={Columns}
          dataSource={filteredFees}
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
