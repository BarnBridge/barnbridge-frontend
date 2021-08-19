import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Button } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useFetchPools } from 'modules/smart-alpha/api';
import { PoolApiType } from 'modules/smart-alpha/api';

export const PortfolioPositions = () => {
  const { tranche } = useParams<{ tranche: 'senior' | 'junior' }>();
  const [activePool, setActivePool] = useState<PoolApiType | undefined>();
  const { data } = useFetchPools();
  const { getToken } = useTokens();

  useEffect(() => {
    if (data && data.length) {
      setActivePool(data[0]);
    }
  }, [data]);

  if (!data || !activePool) {
    return <Spinner />;
  }

  return (
    <>
      <Text type="h1" weight="bold" color="primary" className="mb-32">
        Positions {tranche}
      </Text>
      <div className="flex wrap col-gap-32 row-gap-32 mb-64 sm-mb-32">
        {data?.map(item => {
          const poolToken = getToken(item.poolToken.symbol);
          return (
            <button
              key={item.poolAddress}
              onClick={() => setActivePool(item)}
              className={classNames('tab-card', {
                active: item.poolAddress === activePool?.poolAddress,
              })}>
              <TokenIcon name={poolToken?.icon ?? 'unknown'} size={24} className="mr-16" />
              <Text type="p2" weight="semibold" color="primary">
                {item.poolName}
              </Text>
            </button>
          );
        })}
      </div>
      {/* <div className="flex wrap col-gap-32 row-gap-32"> */}
      <div className="css-grid" style={{ '--min': '260px' } as React.CSSProperties}>
        <WalletBalance pool={activePool} />
        <EntryQueue />
        <ExitQueue />
      </div>
    </>
  );
};

const WalletBalance = ({ pool }) => {
  const { getToken } = useTokens();
  const poolToken = getToken(pool.poolToken.symbol);

  return (
    <section className="card">
      <header className="card-header">
        <Text type="p1" weight="semibold" color="primary">
          Wallet balance
        </Text>
      </header>
      <div className="p-24">
        <div className="flex align-center mr-8">
          <Text type="h2" weight="bold" color="primary" className="mr-8">
            40,000.0000
          </Text>
          <TokenIcon name={poolToken?.icon ?? 'unknown'} size={24} className="mr-16" />
        </div>
        <Text type="small" weight="semibold" color="secondary" className="mb-24">
          0.00 USD
        </Text>
        <footer>
          <Button variation="primary">Signal withdraw</Button>
        </footer>
      </div>
    </section>
  );
};

const EntryQueue = () => {
  return (
    <section className="card">
      <header className="card-header">
        <Text type="p1" weight="semibold" color="primary">
          Entry queue
        </Text>
      </header>
      <div className="p-24">
        <dl>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Underlying in queue
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="bold" color="primary">
                23.4412
              </Text>
            </dd>
          </div>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable tokens
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                23.4412
              </Text>
            </dd>
          </div>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Entry epoch
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                #135
              </Text>
            </dd>
          </div>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable in
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                2d 4h 30m
              </Text>
            </dd>
          </div>
        </dl>
        <footer>
          <Button variation="ghost">Add to entry queue</Button>
        </footer>
      </div>
    </section>
  );
};

const ExitQueue = () => {
  return (
    <section className="card">
      <header className="card-header">
        <Text type="p1" weight="semibold" color="primary">
          Exit queue
        </Text>
      </header>
      <div className="p-24">
        <dl>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Tokens in queue
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="bold" color="primary">
                23.4412
              </Text>
            </dd>
          </div>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable underlying
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                23.4412
              </Text>
            </dd>
          </div>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Entry epoch
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                #135
              </Text>
            </dd>
          </div>
          <div>
            <dt>
              <Text type="small" weight="semibold" color="secondary">
                Redeemable in
              </Text>
            </dt>
            <dd>
              <Text type="p1" weight="semibold" color="primary">
                2d 4h 30m
              </Text>
            </dd>
          </div>
        </dl>
        <footer>
          <Button variation="ghost">Add to exit queue</Button>
        </footer>
      </div>
    </section>
  );
};
