import { useMemo, useState } from 'react';
import useDebounce from '@rooks/use-debounce';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, YAxis } from 'recharts';
import { formatPercent } from 'web3/utils';

import { Button } from 'components/button';
import { Form, FormItem, useForm } from 'components/custom/form';
import { InfoTooltip } from 'components/custom/tooltip';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { Input } from 'components/input';
import { useContractFactory } from 'hooks/useContract';
import { useFetchPools } from 'modules/smart-alpha/api';
import AccountingModelContract from 'modules/smart-alpha/contracts/accountingModelContract';
import SeniorRateModelContract from 'modules/smart-alpha/contracts/seniorRateModelContract';

import s from './s.module.scss';

// import s from './s.module.scss';

const SCALE_DECIMALS = 18;

type FormType = {
  pricePerf: string;
  juniorDominance: string;
};

export const Simulate = () => {
  const [exposure, setExposure] = useState<BigNumber | undefined>();
  const [protection, setProtection] = useState<BigNumber | undefined>();
  const [juniorProfits, setJuniorProfits] = useState<BigNumber | undefined>();
  const [seniorProfits, setSeniorProfits] = useState<BigNumber | undefined>();

  const pools = useFetchPools();
  const pool = pools.data?.[0];

  const { getOrCreateContract } = useContractFactory();

  const seniorRateModelContract = useMemo(() => {
    if (!pool) {
      return;
    }

    return getOrCreateContract(pool.seniorRateModelAddress, () => {
      return new SeniorRateModelContract(pool.seniorRateModelAddress);
    });
  }, [pool]);

  const accountingModelContract = useMemo(() => {
    if (!pool) {
      return;
    }

    return getOrCreateContract(pool.accountingModelAddress, () => {
      return new AccountingModelContract(pool.accountingModelAddress);
    });
  }, [pool]);

  const form = useForm<FormType>({
    defaultValues: {
      pricePerf: '',
      juniorDominance: '',
    },
    validationScheme: {
      pricePerf: {
        rules: {
          min: -100,
          decimals: (value: string) => {
            return (BigNumber.from(value)?.decimalPlaces() ?? Number.POSITIVE_INFINITY) < SCALE_DECIMALS;
          },
        },
        messages: {
          decimals: `Maximum ${SCALE_DECIMALS} decimals allowed`,
        },
      },
      juniorDominance: {
        rules: {
          min: 0,
          max: 100,
          decimals: (value: string) => {
            return (BigNumber.from(value)?.decimalPlaces() ?? Number.POSITIVE_INFINITY) < SCALE_DECIMALS;
          },
        },
        messages: {
          decimals: `Maximum ${SCALE_DECIMALS} decimals allowed`,
        },
      },
    },
    onSubmit: () => {
      calcRates(juniorLiquidity, seniorLiquidity);

      calcProfits(pricePerf, seniorLiquidity, exposure, protection);
    },
  });

  const [pricePerfStr, juniorDominanceStr] = form.watch(['pricePerf', 'juniorDominance']);

  const juniorDominance = useMemo(() => {
    if (form.formState.errors.juniorDominance) {
      return undefined;
    }

    return BigNumber.from(juniorDominanceStr)?.div(100)?.scaleBy(SCALE_DECIMALS);
  }, [juniorDominanceStr, form.formState.errors.juniorDominance]);
  const juniorLiquidity = juniorDominance;
  const seniorLiquidity = useMemo(() => {
    return juniorDominance ? new BigNumber(1).scaleBy(SCALE_DECIMALS)?.minus(juniorDominance) : undefined;
  }, [juniorDominance]);

  const calcRates = useDebounce((juniorLiquidity: BigNumber | undefined, seniorLiquidity: BigNumber | undefined) => {
    setExposure(undefined);
    setProtection(undefined);

    if (juniorLiquidity && seniorLiquidity) {
      seniorRateModelContract?.getRates(juniorLiquidity, seniorLiquidity).then(([exposure, protection]) => {
        setExposure(exposure);
        setProtection(protection);
      });
    }
  }, 400);

  const pricePerf = useMemo(() => {
    if (form.formState.errors.pricePerf) {
      return undefined;
    }

    return BigNumber.from(pricePerfStr)?.div(100)?.scaleBy(SCALE_DECIMALS);
  }, [pricePerfStr, form.formState.errors.pricePerf]);
  const entryPrice = useMemo(() => new BigNumber(1).scaleBy(SCALE_DECIMALS)!, []);
  const currentPrice = useMemo(() => entryPrice.plus(pricePerf ?? 0), [entryPrice, pricePerf]);

  const calcProfits = useDebounce(
    (
      pricePerf: BigNumber | undefined,
      seniorLiquidity: BigNumber | undefined,
      exposure: BigNumber | undefined,
      protection: BigNumber | undefined,
    ) => {
      setJuniorProfits(undefined);
      setSeniorProfits(undefined);

      if (pricePerf && seniorLiquidity) {
        const currentPrice = entryPrice.plus(pricePerf);

        if (currentPrice) {
          if (exposure) {
            accountingModelContract
              ?.calcJuniorProfits(entryPrice, currentPrice, exposure, seniorLiquidity)
              .then(result => {
                setJuniorProfits(result);
              });
          }

          if (protection) {
            accountingModelContract
              ?.calcSeniorProfits(entryPrice, currentPrice, protection, seniorLiquidity)
              .then(result => {
                setSeniorProfits(result);
              });
          }
        }
      }
    },
    400,
  );

  const pricePerfRate = pricePerf?.unscaleBy(SCALE_DECIMALS)?.toNumber() ?? 0;

  const juniorsEnd = juniorLiquidity?.plus(juniorProfits ?? BigNumber.ZERO).minus(seniorProfits ?? BigNumber.ZERO);
  const seniorsEnd = seniorLiquidity?.plus(seniorProfits ?? BigNumber.ZERO).minus(juniorProfits ?? BigNumber.ZERO);
  const juniorValueStart = entryPrice.multipliedBy(juniorLiquidity ?? 0).unscaleBy(SCALE_DECIMALS);
  const seniorValueStart = entryPrice.multipliedBy(seniorLiquidity ?? 0).unscaleBy(SCALE_DECIMALS);
  const juniorValueEnd = currentPrice.multipliedBy(juniorsEnd ?? 0).unscaleBy(SCALE_DECIMALS);
  const seniorValueEnd = currentPrice.multipliedBy(seniorsEnd ?? 0).unscaleBy(SCALE_DECIMALS);

  const seniorProfitsRate =
    seniorValueEnd
      ?.minus(seniorValueStart ?? 0)
      .div(seniorValueStart ?? 0)
      .toNumber() ?? 0 / 100;

  const juniorProfitsRate =
    juniorValueEnd
      ?.minus(juniorValueStart ?? 0)
      .div(juniorValueStart ?? 0)
      .toNumber() ?? 0 / 100;

  return (
    <>
      <Form form={form}>
        <div className="card p-24 flex col-gap-24 flex-grow mb-32 align-start">
          <FormItem
            name="pricePerf"
            label="Price performance (%)"
            labelProps={{ hint: 'How much the underlying asset’s price changed during the epoch' }}
            className="flex-grow">
            {({ field }) => (
              <Input
                placeholder="0"
                dimension="large"
                before={<Icon name="percentage" color="icon" />}
                className="flex-grow"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          </FormItem>
          <FormItem
            name="juniorDominance"
            label="Junior dominance (%)"
            labelProps={{ hint: 'What percentage of the pool was composed of junior positions' }}
            className="flex-grow">
            {({ field }) => (
              <Input
                placeholder="0"
                dimension="large"
                before={<Icon name="percentage" color="icon" />}
                className="flex-grow"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          </FormItem>
          <Button variation="primary" className="mt-24" size="big">
            Simulate
          </Button>
        </div>
      </Form>
      <div className={s.cards}>
        <section className="card">
          <header className="card-header">
            <Text type="p1" weight="semibold" color="primary">
              Epoch outcomes (before fees)
            </Text>
          </header>
          <div className="pv-24">
            <dl>
              <div className="flex align-center mb-24 ph-24">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                    Senior performance
                    <InfoTooltip>Change in the fair price of the senior token over the course of the epoch</InfoTooltip>
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="semibold" color="primary">
                    {formatPercent(seniorProfitsRate) ?? '-'}
                  </Text>
                </dd>
              </div>
              <div className="flex align-center mb-24 ph-24">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                    Senior downside protection (Absolute %)
                    <InfoTooltip>
                      How much the underlying asset can decline before a senior position takes on losses.
                    </InfoTooltip>
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="bold" color="primary">
                    {formatPercent(protection?.unscaleBy(SCALE_DECIMALS)) ?? '-'}
                  </Text>
                </dd>
              </div>
              <div className="flex align-center mb-24 ph-24">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                    Senior upside exposure (Relative %)
                    <InfoTooltip>
                      How much of every 1% move to the upside in the underlying asset a senior position will have
                      exposure to.
                    </InfoTooltip>
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="semibold" color="primary">
                    {formatPercent(exposure?.unscaleBy(SCALE_DECIMALS)) ?? '-'}
                  </Text>
                </dd>
              </div>
              <hr className="mb-24" />
              <div className="flex align-center mb-24 ph-24">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                    Junior performance
                    <InfoTooltip>Change in the fair price of the junior token over the course of the epoch</InfoTooltip>
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="semibold" color="primary">
                    {formatPercent(juniorProfitsRate) ?? '-'}
                  </Text>
                </dd>
              </div>
              <div className="flex align-center mb-24 ph-24">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                    Upside leverage
                    <InfoTooltip>
                      How much of every 1% move to the upside in the underlying asset a senior position will have
                      exposure to.
                    </InfoTooltip>
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="semibold" color="primary">
                    0x
                  </Text>
                </dd>
              </div>
              <div className="flex align-center ph-24">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4">
                    Downside leverage
                    <InfoTooltip>
                      How much of every 1% move to the downside in the underlying asset a junior position will have
                      exposure to.
                    </InfoTooltip>
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="semibold" color="primary">
                    0x
                  </Text>
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="card">
          <header className="card-header">
            <Text type="p1" weight="semibold" color="primary">
              Performance
            </Text>
          </header>
          <div className="p-24">
            <ResponsiveContainer width={'99%'} height={300}>
              <BarChart
                data={[
                  {
                    pricePerfRate,
                    seniorProfitsRate,
                    juniorProfitsRate,
                  },
                ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                {/* <CartesianAxis /> */}
                <YAxis axisLine={false} tickLine={false} tickFormatter={value => formatPercent(value, 0) ?? ''} />

                <Bar dataKey="pricePerfRate" fill="var(--theme-red-color)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="seniorProfitsRate" fill="var(--theme-green-color)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="juniorProfitsRate" fill="var(--theme-purple-color)" radius={[4, 4, 0, 0]} />
                <Legend
                  content={({ payload }) => {
                    if (!payload) return null;

                    return (
                      <div className={s.legend}>
                        {payload.map((entry, idx) => (
                          <span
                            key={idx}
                            className={s.legendItem}
                            style={{ '--dot-color': entry.color } as React.CSSProperties}>
                            <div className="flex flow-row">
                              <Text
                                type="small"
                                weight="semibold"
                                color="secondary"
                                className={classNames(s.legendTitle, 'mb-4')}>
                                {entry.value === 'pricePerfRate' && 'Price performance'}
                                {entry.value === 'seniorProfitsRate' && 'Senior performance'}
                                {entry.value === 'juniorProfitsRate' && 'Junior performance'}
                              </Text>
                              <Text type="p1" weight="bold" color="primary">
                                {(entry.value === 'pricePerfRate' && formatPercent(pricePerfRate)) ?? '-%'}
                                {(entry.value === 'seniorProfitsRate' && formatPercent(seniorProfitsRate)) ?? '-%'}
                                {(entry.value === 'juniorProfitsRate' && formatPercent(juniorProfitsRate)) ?? '-%'}
                              </Text>
                            </div>
                          </span>
                        ))}
                      </div>
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </>
  );
};
