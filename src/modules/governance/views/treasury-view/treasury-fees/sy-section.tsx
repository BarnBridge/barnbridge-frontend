import { ReactElement, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import uniqBy from 'lodash/uniqBy';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { formatToken, formatUSD } from 'web3/utils';

import Divider from 'components/antd/divider';
import Select from 'components/antd/select';
import { ExplorerAddressLink } from 'components/button';
import IconOld from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { ColumnType, Table } from 'components/custom/table';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { TokenType, useTokens } from 'components/providers/tokensProvider';
import { MainnetHttpsWeb3Provider, PolygonHttpsWeb3Provider } from 'components/providers/web3Provider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { APISYPool, useFetchSyPools } from 'modules/smart-yield/api';
import SYProviderContract from 'modules/smart-yield/contracts/syProviderContract';
import { MarketMeta, getKnownMarketById } from 'modules/smart-yield/providers/markets';
import { MainnetNetwork } from 'networks/mainnet';
import { PolygonNetwork } from 'networks/polygon';
import { useWallet } from 'wallets/walletProvider';

import { Web3Network } from 'networks/types';

type ExtendedPoolApiType = APISYPool & {
  providerContract: SYProviderContract | undefined;
  feesAmountToken: BigNumber | undefined;
  feesAmountUSDToken: BigNumber | undefined;
  market: MarketMeta | undefined;
  token: TokenType | undefined;
  network: Web3Network;
};

const columns: ColumnType<ExtendedPoolApiType>[] = [
  {
    heading: <div>Token Name</div>,
    render: entity => (
      <div className="flex flow-col align-center">
        <TokenIcon
          name={entity.token?.icon as TokenIconNames}
          bubble1Name={entity.market?.icon.active as TokenIconNames}
          size={32}
          className="mr-16"
        />
        <div className="flex flow-row">
          <ExplorerAddressLink address={entity.smartYieldAddress} className="flex flow-col mb-4">
            <Text type="p1" weight="semibold" color="blue" className="mr-4">
              {entity.underlyingSymbol ?? '-'}
            </Text>
            <Icon name="external" size={8} color="blue" />
          </ExplorerAddressLink>
          <Text type="small" weight="semibold" color="secondary">
            {entity.market?.name ?? '-'}
          </Text>
        </div>
      </div>
    ),
  },
  {
    heading: 'Network',
    render: entity => (
      <div className="flex flow-col col-gap-8 align-center container-box ph-12 pv-8 fit-width">
        <IconOld name={entity.network.meta.logo} />
        <Text type="p2" weight="semibold" color="secondary">
          {entity.network.type}
        </Text>
      </div>
    ),
  },
  {
    heading: <div className="text-right">Amount</div>,
    align: 'right',
    render: entity => (
      <>
        <Text
          type="p1"
          weight="semibold"
          color="primary"
          className="mb-4"
          tooltip={formatToken(entity.feesAmountToken, {
            decimals: entity.underlyingDecimals,
            tokenName: entity.underlyingSymbol,
          })}>
          {formatToken(entity.feesAmountToken, {
            compact: true,
          }) ?? '-'}
        </Text>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSD(entity.feesAmountUSDToken) ?? '-'}
        </Text>
      </>
    ),
  },
  {
    heading: '',
    render: function Render(entity: ExtendedPoolApiType) {
      const { network, feesAmountToken } = entity;

      const wallet = useWallet();

      const [confirmVisible, setConfirmVisible] = useState(false);
      const [harvesting, setHarvesting] = useState(false);

      if (network !== MainnetNetwork || !wallet.isActive) {
        return <></>;
      }

      async function harvest(args: ConfirmTxModalArgs) {
        setHarvesting(true);

        try {
          await entity.providerContract?.transferFeesSend(args.gasPrice);
          await entity.providerContract?.loadUnderlyingFees();
        } catch (e) {
          console.error(e);
        }

        setHarvesting(false);
      }

      const disabled = !feesAmountToken?.gt(0) || harvesting;

      return (
        <>
          <button
            type="button"
            className="button-ghost ml-auto"
            disabled={disabled}
            onClick={() => setConfirmVisible(true)}>
            {harvesting && <Spinner className="mr-8" />}
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
                    {formatToken(feesAmountToken, {
                      compact: true,
                      tokenName: entity.underlyingSymbol,
                    }) ?? '-'}
                  </Text>
                  <div className="flex align-center justify-center mb-8">
                    <IconOld name="warning-circle-outlined" className="mr-8" />
                    <Text type="p2" weight="semibold" align="center" color="red">
                      Warning
                    </Text>
                  </div>
                  <Text type="p2" weight="semibold" align="center" color="secondary" className="mb-32">
                    Transferring fees earns no profits for the caller - this function just transfers the fees to the DAO
                    Treasury. Make sure you are willing to spend the gas to send this transaction!
                  </Text>
                  <Divider
                    style={{
                      margin: '0 -24px',
                      width: 'calc(100% + 48px)',
                    }}
                  />
                </div>
              )}
            </TxConfirmModal>
          )}
        </>
      );
    },
  },
];

type TreasuryFilterType = {
  pool: string;
  token: string;
};

export function useSYData(): [ExtendedPoolApiType[], BigNumber, boolean, ReactElement | null] {
  const [reload, version] = useReload();

  const { getAmountInUSD, getToken } = useTokens();
  const { getOrCreateContract, getContract, Listeners } = useContractFactory();

  const { data: poolsMainnet = [], loading: loadingMainnet } = useFetchSyPools({
    baseUrl: MainnetNetwork.config.api.baseUrl,
  });
  const { data: poolsPolygon = [], loading: loadingPolygon } = useFetchSyPools({
    baseUrl: PolygonNetwork.config.api.baseUrl,
  });

  const pools = useMemo(() => {
    function mapPool(pool: APISYPool, network: Web3Network): ExtendedPoolApiType {
      const providerContract = getContract<SYProviderContract>(pool.providerAddress);
      const feesAmountToken = providerContract?.underlyingFees?.unscaleBy(pool.underlyingDecimals);
      const feesAmountUSDToken = getAmountInUSD(feesAmountToken, pool.underlyingSymbol);
      const market = getKnownMarketById(pool.protocolId);
      const token = getToken(pool.underlyingSymbol);

      return {
        ...pool,
        providerContract,
        feesAmountToken,
        feesAmountUSDToken,
        market,
        token,
        network,
      };
    }

    return [
      ...poolsMainnet.map(pool => mapPool(pool, MainnetNetwork)),
      ...poolsPolygon.map(pool => mapPool(pool, PolygonNetwork)),
    ];
  }, [poolsMainnet, poolsPolygon, version]);

  const total = useMemo(() => {
    return BigNumber.sumEach(pools, pool => pool.feesAmountUSDToken ?? BigNumber.ZERO) ?? BigNumber.ZERO;
  }, [pools]);

  useEffect(() => {
    poolsMainnet.forEach(pool => {
      getOrCreateContract(pool.providerAddress, () => new SYProviderContract(pool.providerAddress), {
        afterInit: contract => {
          contract.setCallProvider(MainnetHttpsWeb3Provider);
          contract.onUpdateData(reload);
          contract.loadUnderlyingFees().catch(Error);
        },
      });
    });
  }, [poolsMainnet]);

  useEffect(() => {
    poolsPolygon.forEach(pool => {
      getOrCreateContract(pool.providerAddress, () => new SYProviderContract(pool.providerAddress), {
        afterInit: contract => {
          contract.setCallProvider(PolygonHttpsWeb3Provider);
          contract.onUpdateData(reload);
          contract.loadUnderlyingFees().catch(Error);
        },
      });
    });
  }, [poolsPolygon]);

  return [pools, total, loadingMainnet || loadingPolygon, Listeners];
}

export const SYSection = ({
  pools,
  total,
  loading,
  className,
}: {
  pools: ExtendedPoolApiType[];
  total: BigNumber;
  loading: boolean;
  className?: string;
}) => {
  const [poolFilter, setPoolFilter] = useState('all');
  const [tokenFilter, setTokenFilter] = useState('all');

  const filters = useMemo(
    () =>
      [
        {
          name: 'pool',
          label: 'Originators',
          defaultValue: 'all',
          itemRender: () => {
            const tokenOpts = [
              {
                value: 'all',
                label: 'All pools',
              },
              ...uniqBy(
                pools.map(item => ({
                  value: item.protocolId,
                  label: item.protocolId,
                })),
                'value',
              ),
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
              ...uniqBy(
                pools.map(item => ({
                  value: item.underlyingSymbol,
                  label: item.token?.name ?? item.underlyingSymbol,
                })),
                'value',
              ),
            ];

            return <Select options={tokenOpts} className="full-width" />;
          },
        },
      ] as TableFilterType<TreasuryFilterType>[],
    [pools],
  );
  const filterValue = useMemo<TreasuryFilterType>(
    () => ({
      pool: poolFilter,
      token: tokenFilter,
    }),
    [poolFilter, tokenFilter],
  );

  function handleFilterChange(filters: TreasuryFilterType) {
    setPoolFilter(filters.pool);
    setTokenFilter(filters.token);
  }

  const filteredDataSource = useMemo(() => {
    return (
      pools.filter(
        pool => ['all', pool.protocolId].includes(poolFilter) && ['all', pool.underlyingSymbol].includes(tokenFilter),
      ) ?? []
    );
  }, [pools, poolFilter, tokenFilter]);

  return (
    <div className={className}>
      <div className="card mb-8">
        <div className="card-header flex flow-col align-center pv-12">
          <div
            className="p-8 mr-16"
            style={{
              backgroundColor: '#ff4339',
              color: '#fff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
            }}>
            <Icon name="smart-yield" />
          </div>
          <div className="flex flow-row row-gap-4 mr-64">
            <Text type="p1" weight="semibold" color="primary">
              SMART Yield
            </Text>
            <Text type="small" weight="semibold" color="secondary">
              Fees
            </Text>
          </div>
          <div className="flex flow-row row-gap-4">
            <Text type="small" weight="semibold" color="secondary">
              Total fees accrued
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatUSD(total) ?? '-'}
            </Text>
          </div>
          <TableFilter<TreasuryFilterType>
            className="ml-auto"
            filters={filters}
            value={filterValue}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="card">
        <Table<ExtendedPoolApiType>
          columns={columns}
          data={filteredDataSource}
          rowKey={row => row.smartYieldAddress}
          loading={loading}
          // locale={{
          //   emptyText: 'No accrued fees', // TODO: Add support of empty result to Table component
          // }}
        />
      </div>
    </div>
  );
};
