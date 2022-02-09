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
import { useTokens } from 'components/providers/tokensProvider';
import { MainnetHttpsWeb3Provider, PolygonHttpsWeb3Provider } from 'components/providers/web3Provider';
import { TokenIcon, TokenIconPair } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { PoolApiType, useFetchSePools } from 'modules/smart-exposure/api';
import SeEPoolContract from 'modules/smart-exposure/contracts/seEPoolContract';
import { MainnetNetwork } from 'networks/mainnet';
import { PolygonNetwork } from 'networks/polygon';
import { useWallet } from 'wallets/walletProvider';

import { Web3Network } from 'networks/types';

export type ExtendedPoolApiType = PoolApiType & {
  providerContract: SeEPoolContract | undefined;
  feesAmountTokenA: BigNumber | undefined;
  feesAmountUSDTokenA: BigNumber | undefined;
  feesAmountTokenB: BigNumber | undefined;
  feesAmountUSDTokenB: BigNumber | undefined;
  network: Web3Network;
};

const columns: ColumnType<ExtendedPoolApiType>[] = [
  {
    heading: <div>Token Name</div>,
    render: function Render(entity) {
      const { getToken } = useTokens();
      const tokenAIcon = getToken(entity.tokenA.symbol);
      const tokenBIcon = getToken(entity.tokenB.symbol);

      return (
        <div className="flex flow-col align-center">
          <TokenIconPair name1={tokenAIcon?.icon} name2={tokenBIcon?.icon} className="mr-16" />
          <div className="flex flow-row">
            <ExplorerAddressLink address={entity.poolAddress} className="flex flow-col mb-4">
              <Text type="body1" weight="semibold" color="blue" className="mr-4">
                {entity.poolName ?? '-'}
              </Text>
              <Icon name="external" size={8} color="blue" />
            </ExplorerAddressLink>
            <Text type="caption" weight="semibold" color="secondary">
              {entity.tokenA.symbol} – {entity.tokenB.symbol}
            </Text>
          </div>
        </div>
      );
    },
  },
  {
    heading: 'Network',
    render: entity => {
      return (
        <div className="flex flow-col col-gap-8 align-center container-box ph-12 pv-8 fit-width">
          <Icon name={entity.network.meta.logo} />
          <Text type="body2" weight="semibold" color="secondary">
            {entity.network.type}
          </Text>
        </div>
      );
    },
  },
  {
    heading: <div className="text-right">Token A amount</div>,
    render: entity => {
      return (
        <div className="text-right">
          <Text
            type="body1"
            weight="semibold"
            color="primary"
            className="mb-4"
            tooltip={formatToken(entity.feesAmountTokenA, {
              decimals: entity.tokenA.decimals,
              tokenName: entity.tokenA.symbol,
            })}>
            {formatToken(entity.feesAmountTokenA, {
              compact: true,
            }) ?? '-'}
          </Text>
          <Text type="caption" weight="semibold" color="secondary">
            {formatUSD(entity.feesAmountUSDTokenA) ?? '-'}
          </Text>
        </div>
      );
    },
  },
  {
    heading: <div className="text-right">Token B amount</div>,
    render: entity => {
      return (
        <div className="text-right">
          <Text
            type="body1"
            weight="semibold"
            color="primary"
            className="mb-4"
            tooltip={formatToken(entity.feesAmountTokenB, {
              decimals: entity.tokenB.decimals,
              tokenName: entity.tokenB.symbol,
            })}>
            {formatToken(entity.feesAmountTokenB, {
              compact: true,
            }) ?? '-'}
          </Text>
          <Text type="caption" weight="semibold" color="secondary">
            {formatUSD(entity.feesAmountUSDTokenB) ?? '-'}
          </Text>
        </div>
      );
    },
  },
  {
    heading: '',
    render: function Render(entity: ExtendedPoolApiType) {
      const { network, feesAmountTokenA, feesAmountTokenB } = entity;

      const wallet = useWallet();
      const { getToken } = useTokens();

      const [confirmVisible, setConfirmVisible] = useState(false);
      const [harvesting, setHarvesting] = useState(false);

      if (network !== MainnetNetwork || !wallet.isActive) {
        return <></>;
      }

      async function harvest(args: ConfirmTxModalArgs) {
        setHarvesting(true);

        try {
          await entity.providerContract?.transferFees(args.gasPrice);
          await entity.providerContract?.getCumulativeFeeA();
          await entity.providerContract?.getCumulativeFeeB();
        } catch (e) {
          console.error(e);
        } finally {
          setHarvesting(false);
        }
      }

      const disabled = !feesAmountTokenA?.gt(0) || !feesAmountTokenB?.gt(0) || harvesting;

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
                  <div className="container-box flex align-center col-gap-32 mb-32">
                    <div>
                      <Text type="caption" weight="semibold" color="secondary" className="mb-4">
                        {entity.tokenA.symbol} fee
                      </Text>
                      <Text type="body1" weight="bold" color="primary" className="flex align-center">
                        {formatToken(feesAmountTokenA) ?? '-'}
                        <TokenIcon name={getToken(entity.tokenA.symbol)?.icon} size={24} className="ml-8" />
                      </Text>
                    </div>
                    <div>
                      <Text type="caption" weight="semibold" color="secondary" className="mb-4">
                        {entity.tokenB.symbol} fee
                      </Text>
                      <Text type="body1" weight="bold" color="primary" className="flex align-center">
                        {formatToken(feesAmountTokenB) ?? '-'}
                        <TokenIcon name={getToken(entity.tokenB.symbol)?.icon} size={24} className="ml-8" />
                      </Text>
                    </div>
                  </div>
                  <div className="flex align-center justify-center mb-8">
                    <IconOld name="warning-circle-outlined" className="mr-8" />
                    <Text type="body2" weight="semibold" align="center" color="red">
                      Warning
                    </Text>
                  </div>
                  <Text type="body2" weight="semibold" align="center" color="secondary" className="mb-32">
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
};

export function useSEData(): [ExtendedPoolApiType[], BigNumber, boolean, ReactElement | null] {
  const [reload, version] = useReload();

  const { getAmountInUSD } = useTokens();
  const { getOrCreateContract, getContract, Listeners } = useContractFactory();

  const { data: poolsMainnet = [], loading: loadingMainnet } = useFetchSePools(MainnetNetwork.config.api.baseUrl);
  const { data: poolsPolygon = [], loading: loadingPolygon } = useFetchSePools(PolygonNetwork.config.api.baseUrl);

  const pools = useMemo(() => {
    function mapPool(pool: PoolApiType, network: Web3Network): ExtendedPoolApiType {
      const providerContract = getContract<SeEPoolContract>(pool.poolAddress);
      const feesAmountTokenA = providerContract?.cumulativeFeeA?.unscaleBy(pool.tokenA.decimals);
      const feesAmountUSDTokenA = getAmountInUSD(feesAmountTokenA, pool.tokenA.symbol);
      const feesAmountTokenB = providerContract?.cumulativeFeeB?.unscaleBy(pool.tokenB.decimals);
      const feesAmountUSDTokenB = getAmountInUSD(feesAmountTokenB, pool.tokenB.symbol);

      return {
        ...pool,
        network,
        providerContract,
        feesAmountTokenA,
        feesAmountUSDTokenA,
        feesAmountTokenB,
        feesAmountUSDTokenB,
      };
    }

    return [
      ...poolsMainnet.map(pool => mapPool(pool, MainnetNetwork)),
      ...poolsPolygon.map(pool => mapPool(pool, PolygonNetwork)),
    ];
  }, [poolsMainnet, poolsPolygon, version]);

  const total = useMemo(
    () =>
      BigNumber.sumEach(
        pools,
        pool => BigNumber.sum(pool.feesAmountUSDTokenA ?? 0, pool.feesAmountUSDTokenB ?? 0) ?? 0,
      ) ?? BigNumber.ZERO,
    [pools],
  );

  useEffect(() => {
    poolsMainnet.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SeEPoolContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(MainnetHttpsWeb3Provider);
          contract.onUpdateData(reload);
          contract.getCumulativeFeeA().catch(Error);
          contract.getCumulativeFeeB().catch(Error);
        },
      });
    });
  }, [poolsMainnet]);

  useEffect(() => {
    poolsPolygon?.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SeEPoolContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(PolygonHttpsWeb3Provider);
          contract.onUpdateData(reload);
          contract.getCumulativeFeeA().catch(Error);
          contract.getCumulativeFeeB().catch(Error);
        },
      });
    });
  }, [poolsPolygon]);

  return [pools, total, loadingMainnet || loadingPolygon, Listeners];
}

export const SESection = ({
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
                  value: item.poolName,
                  label: item.poolName,
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
    }),
    [poolFilter],
  );

  function handleFilterChange(filters: TreasuryFilterType) {
    setPoolFilter(filters.pool);
  }

  const filteredDataSource = useMemo(() => {
    return pools.filter(pool => ['all', pool.poolName].includes(poolFilter)) ?? [];
  }, [pools, poolFilter]);

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
            <Icon name="smart-exposure" />
          </div>
          <div className="flex flow-row row-gap-4 mr-64">
            <Text type="body1" weight="semibold" color="primary">
              SMART Exposure
            </Text>
            <Text type="caption" weight="semibold" color="secondary">
              Fees
            </Text>
          </div>
          <div className="flex flow-row row-gap-4">
            <Text type="caption" weight="semibold" color="secondary">
              Total fees accrued
            </Text>
            <Text type="body1" weight="semibold" color="primary">
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
          rowKey={row => row.poolAddress}
          loading={loading}
          // locale={{
          //   emptyText: 'No accrued fees', // TODO: Add support of empty result to Table component
          // }}
        />
      </div>
    </div>
  );
};
