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
import IconOld from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { ColumnType, Table } from 'components/custom/table';
import TableFilter, { TableFilterType } from 'components/custom/table-filter';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { TokenType, useTokens } from 'components/providers/tokensProvider';
import {
  AvalancheHttpsWeb3Provider,
  BinanceHttpsWeb3Provider,
  PolygonHttpsWeb3Provider,
} from 'components/providers/web3Provider';
import { TokenIcon, TokenIconNames } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { useFetchSyPools } from 'modules/governance/api';
import { useFetchPools as useFetchSaPools } from 'modules/smart-alpha/api';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';
import { useFetchSePools } from 'modules/smart-exposure/api';
import SeEPoolContract from 'modules/smart-exposure/contracts/seEPoolContract';
import { APISYPool } from 'modules/smart-yield/api';
import SYProviderContract from 'modules/smart-yield/contracts/syProviderContract';
import { MarketMeta, getKnownMarketById } from 'modules/smart-yield/providers/markets';
import { AvalancheNetwork } from 'networks/avalanche';
import { BinanceNetwork } from 'networks/binance';
import { MainnetNetwork } from 'networks/mainnet';
import { PolygonNetwork } from 'networks/polygon';
import { useWallet } from 'wallets/walletProvider';

import { SASection, ExtendedPoolApiType as SaExtendedPoolApiType } from './sa-section';
import { SESection, ExtendedPoolApiType as SeExtendedPoolApiType } from './se-section';

import { Web3Network } from 'networks/types';

type ExtendedAPISYPool = APISYPool & {
  providerContract: SYProviderContract | undefined;
  feesAmount: BigNumber | undefined;
  feesAmountUSD: BigNumber | undefined;
  market: MarketMeta | undefined;
  token: TokenType | undefined;
  network: Web3Network;
};

const Columns: ColumnType<ExtendedAPISYPool>[] = [
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
      const { feesAmount, network } = entity;

      const wallet = useWallet();

      const [confirmVisible, setConfirmVisible] = useState(false);
      const [harvesting, setHarvesting] = useState(false);

      if (!wallet.isActive || network !== MainnetNetwork) {
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
  originator: string;
  token: string;
};

const TreasuryFees: FC = () => {
  const [originatorFilter, setOriginatorFilter] = useState('all');
  const [tokenFilter, setTokenFilter] = useState('all');
  const [reloadSy, versionSy] = useReload();
  const [reloadSe, versionSe] = useReload();
  const [reloadSa, versionSa] = useReload();

  const { getAmountInUSD, getToken } = useTokens();
  const { getOrCreateContract, getContract, Listeners } = useContractFactory();
  const { data: syPools, loading } = useFetchSyPools();
  const { data: syPolygonPools, loading: polygonLoading } = useFetchSyPools('all', PolygonNetwork.config.api.baseUrl);

  const dataSource = useMemo(() => {
    return (
      syPools?.concat(syPolygonPools ?? []).map(pool => {
        const providerContract = getContract<SYProviderContract>(pool.providerAddress);
        const feesAmount = providerContract?.underlyingFees?.unscaleBy(pool.underlyingDecimals);
        const feesAmountUSD = getAmountInUSD(feesAmount, pool.underlyingSymbol);
        const market = getKnownMarketById(pool.protocolId);
        const token = getToken(pool.underlyingSymbol);

        let network = MainnetNetwork;

        if (syPolygonPools?.includes(pool)) {
          network = PolygonNetwork;
        }

        return {
          ...pool,
          providerContract,
          feesAmount,
          feesAmountUSD,
          market,
          token,
          network,
        } as ExtendedAPISYPool;
      }) ?? []
    );
  }, [getAmountInUSD, getContract, syPools, syPolygonPools, versionSy]);

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
          contract.on(Web3Contract.UPDATE_DATA, reloadSy);
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
          contract.on(Web3Contract.UPDATE_DATA, reloadSy);
          contract.loadUnderlyingFees().catch(Error);
        },
      });
    });
  }, [syPolygonPools]);

  function handleFilterChange(filters: TreasuryFilterType) {
    setOriginatorFilter(filters.originator);
    setTokenFilter(filters.token);
  }

  const { data: sePoolsMainnet = [], loading: loadingMainnet } = useFetchSePools();
  const { data: sePoolsPolygon = [], loading: loadingPolygon } = useFetchSePools(PolygonNetwork.config.api.baseUrl);

  const sePools = useMemo(() => {
    return (sePoolsMainnet ?? []).concat(sePoolsPolygon ?? []).map(pool => {
      const providerContract = getContract<SeEPoolContract>(pool.poolAddress);
      const feesAmountTokenA = providerContract?.cumulativeFeeA?.unscaleBy(pool.tokenA.decimals);
      const feesAmountUSDTokenA = getAmountInUSD(feesAmountTokenA, pool.tokenA.symbol);
      const feesAmountTokenB = providerContract?.cumulativeFeeB?.unscaleBy(pool.tokenB.decimals);
      const feesAmountUSDTokenB = getAmountInUSD(feesAmountTokenB, pool.tokenB.symbol);

      let network = MainnetNetwork;

      if (sePoolsPolygon?.includes(pool)) {
        network = PolygonNetwork;
      }

      return {
        ...pool,
        network,
        providerContract,
        feesAmountTokenA,
        feesAmountUSDTokenA,
        feesAmountTokenB,
        feesAmountUSDTokenB,
      } as SeExtendedPoolApiType;
    });
  }, [sePoolsMainnet, sePoolsPolygon, versionSe]);

  useEffect(() => {
    sePoolsMainnet?.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SeEPoolContract(pool.poolAddress), {
        afterInit: contract => {
          contract.on(Web3Contract.UPDATE_DATA, reloadSe);
          contract.getCumulativeFeeA().catch(Error);
          contract.getCumulativeFeeB().catch(Error);
        },
      });
    });
  }, [sePoolsMainnet]);

  useEffect(() => {
    sePoolsPolygon?.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SeEPoolContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(PolygonHttpsWeb3Provider);
          contract.on(Web3Contract.UPDATE_DATA, reloadSe);
          contract.getCumulativeFeeA().catch(Error);
          contract.getCumulativeFeeB().catch(Error);
        },
      });
    });
  }, [sePoolsPolygon]);

  const { data: saPoolsMainnet = [], loading: saLoadingMainnet } = useFetchSaPools();
  const { data: saPoolsPolygon = [], loading: saLoadingPolygon } = useFetchSaPools({
    baseUrl: PolygonNetwork.config.api.baseUrl,
  });
  const { data: saPoolsAvalanche = [], loading: saLoadingAvalanche } = useFetchSaPools({
    baseUrl: AvalancheNetwork.config.api.baseUrl,
  });
  const { data: saPoolsBinance = [], loading: saLoadingBinance } = useFetchSaPools({
    baseUrl: BinanceNetwork.config.api.baseUrl,
  });

  const saPools = useMemo(() => {
    return (saPoolsMainnet ?? [])
      .concat(saPoolsPolygon ?? [])
      .concat(saPoolsAvalanche ?? [])
      .concat(saPoolsBinance ?? [])
      .map(pool => {
        let network = MainnetNetwork;

        if (saPoolsPolygon?.includes(pool)) {
          network = PolygonNetwork;
        } else if (saPoolsAvalanche?.includes(pool)) {
          network = AvalancheNetwork;
        } else if (saPoolsBinance?.includes(pool)) {
          network = BinanceNetwork;
        }

        const providerContract = getContract<SmartAlphaContract>(pool.poolAddress);
        const feesAmountToken = providerContract?.feesAccrued?.unscaleBy(pool.poolToken.decimals);
        const feesAmountUSDToken = getAmountInUSD(feesAmountToken, pool.poolToken.symbol, network);

        return {
          ...pool,
          network,
          providerContract,
          feesAmountToken,
          feesAmountUSDToken,
        } as SaExtendedPoolApiType;
      });
  }, [saPoolsMainnet, saPoolsPolygon, saPoolsAvalanche, versionSa]);

  useEffect(() => {
    saPoolsMainnet?.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SmartAlphaContract(pool.poolAddress), {
        afterInit: contract => {
          contract.on(Web3Contract.UPDATE_DATA, reloadSa);
          contract.getFeesAccrued().catch(Error);
        },
      });
    });
  }, [saPoolsMainnet]);

  useEffect(() => {
    saPoolsPolygon?.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SmartAlphaContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(PolygonHttpsWeb3Provider);
          contract.on(Web3Contract.UPDATE_DATA, reloadSa);
          contract.getFeesAccrued().catch(Error);
        },
      });
    });
  }, [saPoolsPolygon]);

  useEffect(() => {
    saPoolsAvalanche?.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SmartAlphaContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(AvalancheHttpsWeb3Provider);
          contract.on(Web3Contract.UPDATE_DATA, reloadSa);
          contract.getFeesAccrued().catch(Error);
        },
      });
    });
  }, [saPoolsAvalanche]);

  useEffect(() => {
    saPoolsBinance?.forEach(pool => {
      getOrCreateContract(pool.poolAddress, () => new SmartAlphaContract(pool.poolAddress), {
        afterInit: contract => {
          contract.setCallProvider(BinanceHttpsWeb3Provider);
          contract.on(Web3Contract.UPDATE_DATA, reloadSa);
          contract.getFeesAccrued().catch(Error);
        },
      });
    });
  }, [saPoolsBinance]);

  const totalFeesUSDSy = useMemo(() => {
    return BigNumber.sumEach(dataSource, pool => pool.feesAmountUSD ?? BigNumber.ZERO) ?? 0;
  }, [dataSource, sePools]);

  const totalFeesUSDSe = useMemo(() => {
    return (
      BigNumber.sumEach(
        sePools,
        pool => BigNumber.sum(pool.feesAmountUSDTokenA ?? 0, pool.feesAmountUSDTokenB ?? 0) ?? 0,
      ) ?? BigNumber.ZERO
    );
  }, [sePools]);

  const totalFeesUSDSa = useMemo(() => {
    return BigNumber.sumEach(saPools, pool => pool.feesAmountUSDToken ?? BigNumber.ZERO) ?? BigNumber.ZERO;
  }, [saPools]);

  const totalFeesUSD = useMemo(() => {
    return BigNumber.sum(totalFeesUSDSy, totalFeesUSDSe, totalFeesUSDSa);
  }, [totalFeesUSDSy, totalFeesUSDSe, totalFeesUSDSa]);

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
              {formatUSD(totalFeesUSDSy) ?? '-'}
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
      <div className="card mb-32">
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
      <SESection pools={sePools} total={totalFeesUSDSe} loading={loadingMainnet || loadingPolygon} className="mb-32" />
      <SASection
        pools={saPools}
        total={totalFeesUSDSa}
        loading={saLoadingMainnet || saLoadingPolygon || saLoadingAvalanche || saLoadingBinance}
      />
      {Listeners}
    </>
  );
};

export default TreasuryFees;
