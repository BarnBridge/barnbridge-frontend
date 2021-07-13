import React from 'react';
import AntdSpin from 'antd/lib/spin';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { useContractManager } from 'web3/components/contractManagerProvider';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import { formatToken, formatUSD } from 'web3/utils';
import Web3Contract from 'web3/web3Contract';

import Divider from 'components/antd/divider';
import Select from 'components/antd/select';
import Table from 'components/antd/table';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { useReload } from 'hooks/useReload';
import { APISYPool, Markets, Pools, useSyAPI } from 'modules/smart-yield/api';
import SYProviderContract from 'modules/smart-yield/contracts/syProviderContract';
import { useWallet } from 'wallets/walletProvider';

type SYPoolEntity = APISYPool & {
  provider: SYProviderContract;
  reloadFees: () => void;
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

type ActionColumnProps = {
  entity: SYPoolEntity;
};

const ActionColumn: React.FC<ActionColumnProps> = props => {
  const { provider, underlyingDecimals, underlyingSymbol, reloadFees } = props.entity;
  const wallet = useWallet();

  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [harvesting, setHarvesting] = React.useState(false);

  const amount = provider.underlyingFees?.unscaleBy(underlyingDecimals);

  const harvest = React.useCallback(async () => {
    setConfirmVisible(false);
    setHarvesting(true);

    try {
      provider.setProvider(wallet.provider);
      provider.setAccount(wallet.account);
      await provider.transferFeesSend();
      reloadFees();
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
        disabled={!amount?.gt(BigNumber.ZERO) || harvesting}
        onClick={() => setConfirmVisible(true)}>
        {harvesting && <AntdSpin spinning className="mr-8" />}
        Transfer fees
      </button>
      {confirmVisible && (
        <TxConfirmModal
          title="Confirm transfer fees"
          submitText="Transfer fees"
          onCancel={() => setConfirmVisible(false)}
          onConfirm={harvest}>
          {() => (
            <div>
              <Text type="h2" weight="bold" align="center" color="primary" className="mb-16">
                {formatToken(amount, {
                  compact: true,
                  tokenName: underlyingSymbol,
                }) ?? '-'}
              </Text>
              <div className="flex align-center justify-center mb-8">
                <Icon name="warning-circle-outlined" className="mr-8" />
                <Text type="p2" weight="semibold" align="center" color="red">
                  Warning
                </Text>
              </div>
              <Text type="p2" weight="semibold" align="center" color="secondary" className="mb-32">
                Transferring fees earns no profits for the caller - this function just transfers the fees to the DAO
                Treasury. Make sure you are willing to spend the gas to send this transaction!
              </Text>
              <Divider style={{ margin: '0 -24px', width: 'calc(100% + 48px)' }} />
            </div>
          )}
        </TxConfirmModal>
      )}
    </>
  );
};

const Columns: ColumnsType<SYPoolEntity> = [
  {
    title: 'Market / Originator',
    align: 'left',
    render: function Render(_, entity) {
      const { getEtherscanAddressUrl } = useWeb3();
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
    render: function Render(_, entity) {
      const { convertTokenInUSD } = useKnownTokens();
      const amount = entity.provider.underlyingFees?.unscaleBy(entity.underlyingDecimals);
      const amountUSD = convertTokenInUSD(amount, entity.underlyingSymbol);

      return (
        <Tooltip
          placement="bottomRight"
          overlayStyle={{ maxWidth: 'inherit' }}
          title={formatToken(amount, {
            decimals: entity.underlyingDecimals,
            tokenName: entity.underlyingSymbol,
          })}>
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {formatToken(amount, {
              compact: true,
            }) ?? '-'}
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(amountUSD) ?? '-'}
          </Text>
        </Tooltip>
      );
    },
  },
  {
    align: 'right',
    width: '30%',
    render: (_, entity) => <ActionColumn entity={entity} />,
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
  const { convertTokenInUSD } = useKnownTokens();
  const walletRef = React.useRef(wallet);
  walletRef.current = wallet;
  const { getContract } = useContractManager();
  const syAPI = useSyAPI();

  const [reloadFees, versionFees] = useReload();
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

    syAPI
      .fetchSYPools()
      .then(data => {
        setState(prevState => ({
          ...prevState,
          fees: {
            ...prevState.fees,
            items: data.map(item => {
              const providerContract = getContract<SYProviderContract>(item.providerAddress, () => {
                return new SYProviderContract(item.providerAddress);
              });
              providerContract.on(Web3Contract.UPDATE_DATA, reload);

              const result = {
                ...item,
                provider: providerContract,
                reloadFees,
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
    state.fees.items.forEach(fee => {
      fee.provider.loadUnderlyingFees();
    });
  }, [state.fees.items, versionFees]);

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
      const amount = c.provider.underlyingFees?.unscaleBy(c.underlyingDecimals);
      const amountUSD = convertTokenInUSD(amount, c.underlyingSymbol);

      return a.plus(amountUSD ?? 0);
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
