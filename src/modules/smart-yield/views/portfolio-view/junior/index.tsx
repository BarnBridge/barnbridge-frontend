import React from 'react';
import * as Antd from 'antd';
import format from 'date-fns/format';
import { ZERO_BIG_NUMBER, formatBigValue, getHumanValue } from 'web3/utils';

import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Popover from 'components/antd/popover';
import Select from 'components/antd/select';
import Tabs from 'components/antd/tabs';
import Tooltip from 'components/antd/tooltip';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { mergeState } from 'hooks/useMergeState';
import TxConfirmModal, { ConfirmTxModalArgs } from 'modules/smart-yield/components/tx-confirm-modal';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import SYJuniorBondContract from 'modules/smart-yield/contracts/syJuniorBondContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import PoolsProvider, { PoolsSYPool, usePools } from 'modules/smart-yield/views/overview-view/pools-provider';
import { useWallet } from 'wallets/wallet';

import ActivePositionsTable, { ActivePositionsTableEntity } from './active-positions-table';
import LockedPositionsTable, { LockedPositionsTableEntity } from './locked-positions-table';
import PastPositionsTable from './past-positions-table';
import PortfolioValue from './portfolio-value';

import { doSequential } from 'utils';

import s from './s.module.scss';

type State = {
  loadingActive: boolean;
  dataActive: ActivePositionsTableEntity[];
  loadingLocked: boolean;
  dataLocked: LockedPositionsTableEntity[];
};

const InitialState: State = {
  loadingActive: false,
  dataActive: [],
  loadingLocked: false,
  dataLocked: [],
};

const JuniorPortfolioInner: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('locked');
  const [filtersVisible, setFiltersVisible] = React.useState<boolean>(false);
  const [filtersActiveVisible, setFiltersActiveVisible] = React.useState<boolean>(false);

  const wallet = useWallet();
  const poolsCtx = usePools();

  const { pools } = poolsCtx;

  const [state, setState] = React.useState<State>(InitialState);
  const [redeemModal, setRedeemModal] = React.useState<LockedPositionsTableEntity | undefined>();

  React.useEffect(() => {
    if (!wallet.account) {
      return;
    }

    setState(
      mergeState<State>({
        loadingActive: true,
      }),
    );

    (async () => {
      const result = await doSequential<PoolsSYPool>(pools, async pool => {
        return new Promise<any>(async resolve => {
          const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
          smartYieldContract.setProvider(wallet.provider);
          smartYieldContract.setAccount(wallet.account);

          const smartYieldBalance = await smartYieldContract.getBalance();
          const smartYieldAbond = await smartYieldContract.getAbond();

          if (smartYieldBalance.isGreaterThan(ZERO_BIG_NUMBER)) {
            resolve({
              ...pool,
              smartYieldBalance,
              smartYieldAbond,
            });
          } else {
            resolve(undefined);
          }
        });
      });

      setState(
        mergeState<State>({
          loadingActive: false,
          dataActive: result.filter(Boolean),
        }),
      );
    })();
  }, [wallet.account, pools]);

  React.useEffect(() => {
    if (!wallet.account) {
      return;
    }

    setState(
      mergeState<State>({
        loadingLocked: true,
      }),
    );

    (async () => {
      const result = await doSequential<PoolsSYPool>(pools, async pool => {
        return new Promise<any>(async resolve => {
          const juniorBondContract = new SYJuniorBondContract(pool.juniorBondAddress);
          juniorBondContract.setProvider(wallet.provider);
          juniorBondContract.setAccount(wallet.account);

          const jBondIds = await juniorBondContract.getJuniorBondIds();

          if (jBondIds.length === 0) {
            return resolve(undefined);
          }

          const smartYieldContract = new SYSmartYieldContract(pool.smartYieldAddress);
          smartYieldContract.setProvider(wallet.provider);

          const jBonds = await smartYieldContract.getJuniorBonds(jBondIds);

          if (jBonds.length === 0) {
            return resolve(undefined);
          }

          const items = jBonds.map(jBond => {
            const item = {
              pool,
              jBond,
              redeem: () => {
                setRedeemModal(item);
              },
            };

            return item;
          });

          resolve(items);
        });
      });

      setState(
        mergeState<State>({
          loadingLocked: false,
          dataLocked: result.flat().filter(Boolean),
        }),
      );
    })();
  }, [wallet.account, pools]);

  function handleRedeemCancel() {
    setRedeemModal(undefined);
  }

  function handleRedeemConfirm(args: ConfirmTxModalArgs): Promise<void> {
    if (!redeemModal) {
      return Promise.reject();
    }

    const { pool, jBond } = redeemModal;

    const contract = new SYSmartYieldContract(pool.smartYieldAddress);
    contract.setProvider(wallet.provider);
    contract.setAccount(wallet.account);

    return contract.redeemJuniorBondSend(jBond.jBondId, args.gasPrice).then(() => {
      // reload();
    });
  }

  const activeBalance = state.dataActive?.reduce((a, c) => {
    return a.plus(getHumanValue(c.smartYieldBalance, c.underlyingDecimals)?.multipliedBy(1) ?? ZERO_BIG_NUMBER); /// price
  }, ZERO_BIG_NUMBER);

  const lockedBalance = state.dataLocked?.reduce((a, c) => {
    return a.plus(getHumanValue(c.jBond.tokens, c.pool.underlyingDecimals)?.multipliedBy(1) ?? ZERO_BIG_NUMBER); /// price
  }, ZERO_BIG_NUMBER);

  const apy = state.dataActive[0]?.state.juniorApy; /// calculate by formula

  const totalBalance = activeBalance?.plus(lockedBalance ?? ZERO_BIG_NUMBER);

  return (
    <>
      <div className={s.portfolioContainer}>
        <Antd.Spin spinning={state.loadingActive || state.loadingLocked}>
          <PortfolioBalance
            total={totalBalance?.toNumber()}
            aggregated={apy * 100}
            aggregatedColor="purple"
            data={[
              ['Active balance ', activeBalance?.toNumber(), 'var(--theme-purple-color)'],
              ['Locked balance', lockedBalance?.toNumber(), 'var(--theme-purple700-color)'],
            ]}
          />
        </Antd.Spin>
        <PortfolioValue />
      </div>
      <Card className="mb-32" noPaddingBody>
        <Tabs
          simple
          className={s.tabs}
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarExtraContent={
            <Popover
              title="Filters"
              overlayStyle={{ width: 348 }}
              content={<Filters />}
              visible={filtersVisible}
              onVisibleChange={setFiltersVisible}
              placement="bottomRight">
              <button type="button" className="button-ghost-monochrome ml-auto mb-12">
                <Icons name="filter" className="mr-8" color="inherit" />
                Filter
              </button>
            </Popover>
          }>
          <Tabs.Tab key="locked" tab="Locked positions">
            <LockedPositionsTable loading={state.loadingLocked} data={state.dataLocked} />
            {redeemModal && (
              <TxConfirmModal
                visible
                title="Redeem your junior bond"
                header={
                  <div className="grid flow-col col-gap-32">
                    <div className="grid flow-row row-gap-4">
                      <Text type="small" weight="semibold" color="secondary">
                        Redeemable balance
                      </Text>
                      <Tooltip
                        title={formatBigValue(
                          getHumanValue(redeemModal.jBond.tokens, redeemModal.pool.underlyingDecimals),
                          redeemModal.pool.underlyingDecimals,
                        )}>
                        <Text type="p1" weight="semibold" color="primary">
                          {formatBigValue(getHumanValue(redeemModal.jBond.tokens, redeemModal.pool.underlyingDecimals))}
                        </Text>
                      </Tooltip>
                    </div>
                    <div className="grid flow-row row-gap-4">
                      <Text type="small" weight="semibold" color="secondary">
                        Maturity date
                      </Text>
                      <Text type="p1" weight="semibold" color="primary">
                        {format(redeemModal.jBond.maturesAt * 1_000, 'dd.MM.yyyy')}
                      </Text>
                    </div>
                  </div>
                }
                submitText="Redeem"
                onCancel={handleRedeemCancel}
                onConfirm={handleRedeemConfirm}
              />
            )}
          </Tabs.Tab>
          <Tabs.Tab key="past" tab="Past positions">
            <PastPositionsTable />
          </Tabs.Tab>
        </Tabs>
      </Card>
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 12px 12px 24px' }}>
          <Text type="p1" weight="semibold" color="primary">
            Active positions
          </Text>
          <Popover
            title="Filters"
            overlayStyle={{ width: 348 }}
            content={<Filters />}
            visible={filtersActiveVisible}
            onVisibleChange={setFiltersActiveVisible}
            placement="bottomRight">
            <button type="button" className="button-ghost-monochrome ml-auto">
              <Icons name="filter" className="mr-8" color="inherit" />
              Filter
            </button>
          </Popover>
        </div>
        <ActivePositionsTable loading={state.loadingActive} data={state.dataActive} />
      </div>
    </>
  );
};

const JuniorPortfolio: React.FC = () => {
  return (
    <PoolsProvider>
      <JuniorPortfolioInner />
    </PoolsProvider>
  );
};

export default JuniorPortfolio;

const originatorFilterOptions = [
  {
    label: 'All originators',
    value: 1,
  },
  {
    label: 'All originators 2',
    value: 2,
  },
];

const tokenFilterOptions = [
  {
    label: 'All tokens',
    value: 1,
  },
  {
    label: 'All tokens 2',
    value: 2,
  },
];

const transactionFilterOptions = [
  {
    label: 'All transactions',
    value: 1,
  },
  {
    label: 'All transactions 2',
    value: 2,
  },
];

type FormValues = {
  originator?: string;
  token?: string;
  transactionType?: string;
};

const Filters: React.FC = () => {
  const [form] = Antd.Form.useForm<FormValues>();

  const handleFinish = React.useCallback((values: FormData) => {
    console.log(values);
  }, []);

  return (
    <Form
      form={form}
      initialValues={{
        originator: originatorFilterOptions[0].value,
        token: tokenFilterOptions[0].value,
        transactionType: transactionFilterOptions[0].value,
      }}
      validateTrigger={['onSubmit']}
      onFinish={handleFinish}>
      <Form.Item label="Originator" name="originator" className="mb-32">
        <Select
          loading={false}
          disabled={false}
          options={originatorFilterOptions}
          fixScroll
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Token" name="token" className="mb-32">
        <Select loading={false} disabled={false} options={tokenFilterOptions} fixScroll style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item label="Transaction type" name="transactionType" className="mb-32">
        <Select
          loading={false}
          disabled={false}
          options={transactionFilterOptions}
          fixScroll
          style={{ width: '100%' }}
        />
      </Form.Item>

      <div className="grid flow-col align-center justify-space-between">
        <button type="button" onClick={() => form.resetFields()} className="button-text">
          Reset filters
        </button>
        <button type="submit" className="button-primary">
          Apply filters
        </button>
      </div>
    </Form>
  );
};
