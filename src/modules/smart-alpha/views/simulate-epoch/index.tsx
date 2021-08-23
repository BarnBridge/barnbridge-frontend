import { Bar, BarChart, Legend, ResponsiveContainer, YAxis } from 'recharts';
import { formatPercent } from 'web3/utils';

import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { Input } from 'components/input';

import s from './s.module.scss';

// import s from './s.module.scss';

const SimulateEpoch = () => {
  return (
    <>
      <div className="card p-24 col-gap-24 flex flex-grow mb-32">
        <Input placeholder="0" dimension="large" before={<Icon name="percentage" color="icon" />} className="flex-grow">
          Price performance (%)
        </Input>
        <Input placeholder="0" dimension="large" before={<Icon name="percentage" color="icon" />} className="flex-grow">
          Junior dominance (%)
        </Input>
      </div>
      <div className="flex col-gap-32 flex-grow">
        <section className="card">
          <header className="card-header">
            <Text type="p1" weight="semibold" color="primary">
              Epoch outcomes (before fees)
            </Text>
          </header>
          <div className="p-24">
            <dl>
              <div className="flex align-center mb-32">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary">
                    Senior downside protection (Absolute %)
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="bold" color="primary">
                    8.00%
                  </Text>
                </dd>
              </div>
              <div className="flex align-center mb-32">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary">
                    Senior upside exposure (Relative %)
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="semibold" color="primary">
                    78.70%
                  </Text>
                </dd>
              </div>
              <div className="flex align-center mb-32">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary">
                    Senior performance
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="semibold" color="primary">
                    -2.17%
                  </Text>
                </dd>
              </div>
              <div className="flex align-center">
                <dt className="mr-8">
                  <Text type="small" weight="semibold" color="secondary">
                    Junior performance
                  </Text>
                </dt>
                <dd className="ml-auto">
                  <Text type="p1" weight="semibold" color="primary">
                    -74.80%
                  </Text>
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="card flex-grow">
          <header className="card-header">
            <Text type="p1" weight="semibold" color="primary">
              Performance
            </Text>
          </header>
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    price: -10,
                    senior: -2.17,
                    junior: -21.7,
                  },
                ]}>
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => (value ? formatPercent(value) : value)}
                />
                <Bar dataKey="price" fill="var(--theme-red-color)" />
                <Bar dataKey="senior" fill="var(--theme-green-color)" />
                <Bar dataKey="junior" fill="var(--theme-purple-color)" />
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
                            {entry.value}
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

export default SimulateEpoch;
