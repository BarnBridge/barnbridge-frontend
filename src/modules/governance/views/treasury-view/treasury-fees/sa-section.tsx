import { useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import uniqBy from 'lodash/uniqBy';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { formatToken, formatUSD } from 'web3/utils';

import Divider from 'components/antd/divider';
import Select from 'components/antd/select';
import { ExplorerAddressLink } from 'components/custom/externalLink';
import IconOld from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { ColumnType, Table } from 'components/custom/table';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { PoolApiType } from 'modules/smart-alpha/api';
import SaContract from 'modules/smart-alpha/contracts/smartAlphaContract';
import { MainnetNetwork } from 'networks/mainnet';
import { PolygonNetwork } from 'networks/polygon';
import { useWallet } from 'wallets/walletProvider';

export type ExtendedPoolApiType = PoolApiType & {
  providerContract: SaContract | undefined;
  isPolygon: boolean;
  feesAmountToken: BigNumber | undefined;
  feesAmountUSDToken: BigNumber | undefined;
};

const columns: ColumnType<ExtendedPoolApiType>[] = [
  {
    heading: <div>Token Name</div>,
    render: function Render(entity) {
      const { getToken } = useTokens();
      const token = getToken(entity.poolToken.symbol);
      const oracle = getAsset(entity.oracleAssetSymbol);
      return (
        <div className="flex flow-col align-center">
          <TokenIcon
            name={token?.icon ?? 'unknown'}
            bubble2Name={oracle?.icon ?? 'unknown'}
            size={32}
            className="mr-16"
          />
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
          <IconOld name={!entity.isPolygon ? MainnetNetwork.meta.logo : PolygonNetwork.meta.logo} />
          <Text type="p2" weight="semibold" color="secondary">
            {!entity.isPolygon ? 'Ethereum' : 'Polygon'}
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
          <Text type="p1" weight="semibold" color="primary" className="mb-4">
            {formatToken(entity.feesAmountToken ?? BigNumber.ZERO, {
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
      const { feesAmountToken, isPolygon } = entity;

      const wallet = useWallet();
      const { getTokenIconBySymbol } = useKnownTokens();
      const [confirmVisible, setConfirmVisible] = useState(false);
      const [harvesting, setHarvesting] = useState(false);

      if (!wallet.isActive || isPolygon) {
        return <></>;
      }

      async function harvest(args: ConfirmTxModalArgs) {
        setHarvesting(true);

        try {
          await entity.providerContract?.transferFees(args.gasPrice);
          await entity.providerContract?.getFeesAccrued();
        } catch (e) {
          console.error(e);
        } finally {
          setHarvesting(false);
        }
      }

      return (
        <>
          <button
            type="button"
            className="button-ghost ml-auto"
            disabled={!feesAmountToken?.gt(BigNumber.ZERO) || harvesting}
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
                        <TokenIcon name={getTokenIconBySymbol(entity.poolToken.symbol)} size={24} className="ml-8" />
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

export const SASection = ({
  pools,
  total,
  loadingMainnet,
  loadingPolygon,
  className,
}: {
  pools: ExtendedPoolApiType[];
  total: BigNumber;
  loadingMainnet: boolean;
  loadingPolygon: boolean;
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
          loading={loadingMainnet || loadingPolygon}
          // locale={{
          //   emptyText: 'No accrued fees', // TODO: Add support of empty result to Table component
          // }}
        />
      </div>
    </div>
  );
};
