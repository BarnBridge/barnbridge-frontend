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
import {
  AvalancheHttpsWeb3Provider,
  BinanceHttpsWeb3Provider,
  MainnetHttpsWeb3Provider,
  PolygonHttpsWeb3Provider,
} from 'components/providers/web3Provider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { PoolApiType, useFetchSaPools } from 'modules/smart-alpha/api';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';
import { AvalancheNetwork } from 'networks/avalanche';
import { BinanceNetwork } from 'networks/binance';
import { MainnetNetwork } from 'networks/mainnet';
import { PolygonNetwork } from 'networks/polygon';
import { useWallet } from 'wallets/walletProvider';

import { Web3Network } from 'networks/types';

export type ExtendedPoolApiType = PoolApiType & {
  saContract: SmartAlphaContract | undefined;
  feesAmountToken: BigNumber | undefined;
  feesAmountUSDToken: BigNumber | undefined;
  network: Web3Network;
};

const columns: ColumnType<ExtendedPoolApiType>[] = [
  {
    heading: <div>Token Name</div>,
    render: function Render(entity) {
      const { getToken, getAsset } = useTokens();
      const token = getToken(entity.poolToken.symbol, entity.network);
      const oracle = getAsset(entity.oracleAssetSymbol);

      return (
        <div className="flex flow-col align-center">
          <TokenIcon name={token?.icon} bubble2Name={oracle?.icon} size={32} className="mr-16" />
          <div className="flex flow-row">
            <ExplorerAddressLink address={entity.poolAddress} className="flex flow-col mb-4">
              <Text type="p1" weight="semibold" color="blue" className="mr-4">
                {entity.poolName ?? '-'}
              </Text>
              <Icon name="external" size={8} color="blue" />
            </ExplorerAddressLink>
            <Text type="small" weight="semibold" color="secondary">
              {entity.poolToken.symbol}
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
          <Text type="p2" weight="semibold" color="secondary">
            {entity.network.type}
          </Text>
        </div>
      );
    },
  },
  {
    heading: <div className="text-right">Token amount</div>,
    render: entity => {
      return (
        <div className="text-right">
          <Text
            type="p1"
            weight="semibold"
            color="primary"
            className="mb-4"
            tooltip={formatToken(entity.feesAmountToken, {
              decimals: entity.poolToken.decimals,
              tokenName: entity.poolToken.symbol,
            })}>
            {formatToken(entity.feesAmountToken, {
              compact: true,
            }) ?? '-'}
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            {formatUSD(entity.feesAmountUSDToken) ?? '-'}
          </Text>
        </div>
      );
    },
  },
  {
    heading: '',
    render: function Render(entity: ExtendedPoolApiType) {
      const { network, feesAmountToken } = entity;

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
          await entity.saContract?.transferFees(args.gasPrice);
          await entity.saContract?.getFeesAccrued();
        } catch (e) {
          console.error(e);
        } finally {
          setHarvesting(false);
        }
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
                  <div className="container-box flex align-center col-gap-32 mb-32">
                    <div>
                      <Text type="small" weight="semibold" color="secondary" className="mb-4">
                        {entity.poolToken.symbol} fee
                      </Text>
                      <Text type="p1" weight="bold" color="primary" className="flex align-center">
                        {formatToken(feesAmountToken) ?? '-'}
                        <TokenIcon name={getToken(entity.poolToken.symbol)?.icon} size={24} className="ml-8" />
                      </Text>
                    </div>
                  </div>
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
};

export function useSAData(): [ExtendedPoolApiType[], BigNumber, boolean, ReactElement | null] {
  const [reload, version] = useReload();

  const { getAmountInUSD } = useTokens();
  const { getOrCreateContract, getContract, Listeners } = useContractFactory();

  const { data: poolsMainnet = [], loading: loadingMainnet } = useFetchSaPools({
    baseUrl: MainnetNetwork.config.api.baseUrl,
  });
  const { data: poolsPolygon = [], loading: loadingPolygon } = useFetchSaPools({
    baseUrl: PolygonNetwork.config.api.baseUrl,
  });
  const { data: poolsAvalanche = [], loading: loadingAvalanche } = useFetchSaPools({
    baseUrl: AvalancheNetwork.config.api.baseUrl,
  });
  const { data: poolsBinance = [], loading: loadingBinance } = useFetchSaPools({
    baseUrl: BinanceNetwork.config.api.baseUrl,
  });

  const pools = useMemo(() => {
    function mapPool(pool: PoolApiType, network: Web3Network): ExtendedPoolApiType {
      const saContract = getContract<SmartAlphaContract>(pool.poolAddress);
      const feesAmountToken = saContract?.feesAccrued?.unscaleBy(pool.poolToken.decimals);
      const feesAmountUSDToken = getAmountInUSD(feesAmountToken, pool.poolToken.symbol, network);

      return {
        ...pool,
        network,
        saContract,
        feesAmountToken,
        feesAmountUSDToken,
      };
    }

    return [
      ...poolsMainnet.map(pool => mapPool(pool, MainnetNetwork)),
      ...poolsPolygon.map(pool => mapPool(pool, PolygonNetwork)),
      ...poolsAvalanche.map(pool => mapPool(pool, AvalancheNetwork)),
      ...poolsBinance.map(pool => mapPool(pool, BinanceNetwork)),
    ];
  }, [poolsMainnet, poolsPolygon, poolsAvalanche, poolsBinance, version]);

  useEffect(() => {
    poolsMainnet.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SmartAlphaContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(MainnetHttpsWeb3Provider);
          contract.onUpdateData(reload);
          contract.getFeesAccrued().catch(Error);
        },
      });
    });
  }, [poolsMainnet]);

  useEffect(() => {
    poolsPolygon.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SmartAlphaContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(PolygonHttpsWeb3Provider);
          contract.onUpdateData(reload);
          contract.getFeesAccrued().catch(Error);
        },
      });
    });
  }, [poolsPolygon]);

  useEffect(() => {
    poolsAvalanche.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SmartAlphaContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(AvalancheHttpsWeb3Provider);
          contract.onUpdateData(reload);
          contract.getFeesAccrued().catch(Error);
        },
      });
    });
  }, [poolsAvalanche]);

  useEffect(() => {
    poolsBinance.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SmartAlphaContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(BinanceHttpsWeb3Provider);
          contract.onUpdateData(reload);
          contract.getFeesAccrued().catch(Error);
        },
      });
    });
  }, [poolsBinance]);

  const total = useMemo(() => {
    return BigNumber.sumEach(pools, pool => pool.feesAmountUSDToken ?? BigNumber.ZERO) ?? BigNumber.ZERO;
  }, [pools]);

  return [pools, total, loadingMainnet || loadingPolygon || loadingAvalanche || loadingBinance, Listeners];
}

export const SASection = ({
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
            <Text type="p1" weight="semibold" color="primary">
              SMART Alpha
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
