import { FC, useEffect, useMemo, useState } from 'react';
import BigNumber from 'bignumber.js';
import uniqBy from 'lodash/uniqBy';
import TxConfirmModal, { ConfirmTxModalArgs } from 'web3/components/tx-confirm-modal';
import { formatToken, formatUSD } from 'web3/utils';
import Web3Contract from 'web3/web3Contract';

import Divider from 'components/antd/divider';
import Select from 'components/antd/select';
import Tooltip from 'components/antd/tooltip';
import { ExplorerAddressLink } from 'components/custom/externalLink';
import Icon, { IconNames } from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Spinner } from 'components/custom/spinner';
import { ColumnType, Table } from 'components/custom/table';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { TokenType, useTokens } from 'components/providers/tokensProvider';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { APISYPool } from 'modules/smart-yield/api';
import SYProviderContract from 'modules/smart-yield/contracts/syProviderContract';
import { MarketMeta, getKnownMarketById } from 'modules/smart-yield/providers/markets';
import { useWallet } from 'wallets/walletProvider';

import { PolygonHttpsWeb3Provider } from '../../../../../components/providers/web3Provider';
import { MainnetNetwork } from '../../../../../networks/mainnet';
import { PolygonNetwork } from '../../../../../networks/polygon';
import { useFetchSyPools } from '../../../api';

type ExtendedAPISYPool = APISYPool & {
  providerContract: SYProviderContract | undefined;
  feesAmount: BigNumber | undefined;
  feesAmountUSD: BigNumber | undefined;
  market: MarketMeta | undefined;
  token: TokenType | undefined;
  isPolygon: boolean;
};

const Columns: ColumnType<ExtendedAPISYPool>[] = [
  {
    heading: <div>Token Name</div>,
    render: entity => (
      <div className="flex flow-col align-center">
        <IconBubble name={entity.token?.icon} bubbleName={entity.market?.icon.active} className="mr-16" />
        <div className="flex flow-row">
          <ExplorerAddressLink address={entity.smartYieldAddress} className="flex flow-col mb-4">
            <Text type="p1" weight="semibold" color="blue" className="mr-4">
              {entity.underlyingSymbol ?? '-'}
            </Text>
            <Icon name="arrow-top-right" width={8} height={8} color="blue" />
          </ExplorerAddressLink>
          <Text type="small" weight="semibold">
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
        <Icon name={(!entity.isPolygon ? MainnetNetwork.meta.logo : PolygonNetwork.meta.logo) as IconNames} />
        <Text type="p2" weight="semibold" color="secondary">
          {!entity.isPolygon ? 'Ethereum' : 'Polygon'}
        </Text>
      </div>
    ),
  },
  {
    heading: <div className="text-right">Amount</div>,
    render: entity => (
      <Tooltip
        className="text-right"
        placement="bottomRight"
        overlayStyle={{ maxWidth: 'inherit' }}
        title={formatToken(entity.feesAmount, {
          decimals: entity.underlyingDecimals,
          tokenName: entity.underlyingSymbol,
        })}>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          {formatToken(entity.feesAmount, {
            compact: true,
          }) ?? '-'}
        </Text>
        <Text type="small" weight="semibold" color="secondary">
          {formatUSD(entity.feesAmountUSD) ?? '-'}
        </Text>
      </Tooltip>
    ),
  },
  {
    heading: '',
    render: function Render(entity: ExtendedAPISYPool) {
      const { feesAmount, isPolygon } = entity;

      const wallet = useWallet();

      const [confirmVisible, setConfirmVisible] = useState(false);
      const [harvesting, setHarvesting] = useState(false);

      if (!wallet.isActive || isPolygon) {
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

      return (
        <>
          <button
            type="button"
            className="button-ghost ml-auto"
            disabled={!feesAmount?.gt(BigNumber.ZERO) || harvesting}
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
                    {formatToken(feesAmount, {
                      compact: true,
                      tokenName: entity.underlyingSymbol,
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
    },
  },
];

type TreasuryFilterType = {
  originator: string;
  token: string;
};

const TreasuryFees: FC = () => {
  const [originatorFilter, setOriginatorFilter] = useState('all');
  const [tokenFilter, setTokenFilter] = useState('all');
  const [reload, version] = useReload();

  const { getAmountInUSD, getToken } = useTokens();
  const { getOrCreateContract, getContract, Listeners } = useContractFactory();
  const { data: syPools, loading } = useFetchSyPools();
  const { data: syPolygonPools, loading: polygonLoading } = useFetchSyPools('all', PolygonNetwork.config.api.baseUrl);

  const dataSource = useMemo(() => {
    return (
      syPools?.concat(syPolygonPools ?? []).map(pool => {
        const isPolygon = Boolean(syPolygonPools?.includes(pool));

        const providerContract = getContract<SYProviderContract>(pool.providerAddress);
        const feesAmount = providerContract?.underlyingFees?.unscaleBy(pool.underlyingDecimals);
        const feesAmountUSD = getAmountInUSD(feesAmount, pool.underlyingSymbol);
        const market = getKnownMarketById(pool.protocolId);
        const token = getToken(pool.underlyingSymbol);

        return {
          ...pool,
          providerContract,
          feesAmount,
          feesAmountUSD,
          market,
          token,
          isPolygon,
        } as ExtendedAPISYPool;
      }) ?? []
    );
  }, [getAmountInUSD, getContract, syPools, syPolygonPools, version]);

  const filters = useMemo(
    () =>
      [
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
              ...uniqBy(
                dataSource.map(item => ({
                  value: item.protocolId,
                  label: item.market?.name ?? item.protocolId,
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
                dataSource.map(item => ({
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
    [dataSource],
  );
  const filterValue = useMemo<TreasuryFilterType>(
    () => ({
      originator: originatorFilter,
      token: tokenFilter,
    }),
    [originatorFilter, tokenFilter],
  );

  const totalFeesUSD = useMemo(() => {
    return BigNumber.sumEach(dataSource, pool => pool.feesAmountUSD ?? BigNumber.ZERO);
  }, [dataSource]);

  const filteredDataSource = useMemo(() => {
    return (
      dataSource.filter(
        pool =>
          ['all', pool.protocolId].includes(originatorFilter) && ['all', pool.underlyingSymbol].includes(tokenFilter),
      ) ?? []
    );
  }, [dataSource, originatorFilter, tokenFilter]);

  useEffect(() => {
    syPools?.forEach(pool => {
      getOrCreateContract(pool.providerAddress, () => new SYProviderContract(pool.providerAddress), {
        afterInit: contract => {
          contract.on(Web3Contract.UPDATE_DATA, reload);
          contract.loadUnderlyingFees().catch(Error);
        },
      });
    });
  }, [syPools]);

  useEffect(() => {
    syPolygonPools?.forEach(pool => {
      getOrCreateContract(pool.providerAddress, () => new SYProviderContract(pool.providerAddress), {
        afterInit: contract => {
          contract.setCallProvider(PolygonHttpsWeb3Provider);
          contract.on(Web3Contract.UPDATE_DATA, reload);
          contract.loadUnderlyingFees().catch(Error);
        },
      });
    });
  }, [syPolygonPools]);

  function handleFilterChange(filters: TreasuryFilterType) {
    setOriginatorFilter(filters.originator);
    setTokenFilter(filters.token);
  }

  return (
    <>
      <Text type="h2" weight="bold" color="primary" className="mb-4">
        {formatUSD(totalFeesUSD) ?? '-'}
      </Text>
      <Text type="p2" weight="semibold" color="secondary" className="mb-32">
        Total fees accrued
      </Text>
      <div className="card mb-8">
        <div className="card-header flex flow-col align-center pv-12">
          <div
            className="p-8 mr-16"
            style={{
              backgroundColor: '#FF4339',
              color: '#fff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
            }}>
            <Icon name="paper-bill-outlined" color="inherit" />
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
              {formatUSD(totalFeesUSD) ?? '-'}
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
        <Table<ExtendedAPISYPool>
          columns={Columns}
          data={filteredDataSource}
          rowKey={row => row.smartYieldAddress}
          loading={loading || polygonLoading}
          // locale={{
          //   emptyText: 'No accrued fees', // TODO: Add support of empty result to Table component
          // }}
        />
      </div>
      {Listeners}
    </>
  );
};

export default TreasuryFees;
