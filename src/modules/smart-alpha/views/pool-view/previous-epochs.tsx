import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDebounce from '@rooks/use-debounce';
import classNames from 'classnames';
import { format } from 'date-fns';
import { formatNumber, formatPercent } from 'web3/utils';

import { Button } from 'components/button';
import { Text } from 'components/custom/typography';
import { Input } from 'components/input';
import { Tokens, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { EpochApiType, useFetchPreviousEpochs } from 'modules/smart-alpha/api';

import s from './pe.module.scss';

export const PreviousEpochs = ({ poolTokenSymbol }: { poolTokenSymbol: Tokens }) => {
  const { id: poolAddress } = useParams<{ id: string }>();

  const [search, setSearch] = useState<string>('');

  const { data, loading, loadNewer, loadOlder, hasNewer, hasOlder, load } = useFetchPreviousEpochs({
    limit: 2,
    poolAddress,
  });

  useEffect(() => {
    loadOlder();
  }, []);

  const handleSearchChange = useDebounce((val: string) => {
    load(val);
  }, 400);

  useEffect(() => handleSearchChange(search), [search]);

  return (
    <div style={{ paddingLeft: 116 }}>
      <Input
        type="search"
        className={classNames(s.search, 'mb-16')}
        placeholder="Search epoch"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {hasNewer ? (
        <Button type="button" variation="text" onClick={() => loadNewer()} loading={loading} className="mb-16">
          Load newer epochs
        </Button>
      ) : null}
      {data
        ? data.map(item => (
            <Epoch
              key={item.id}
              item={item}
              poolTokenSymbol={poolTokenSymbol}
              highlighted={String(item.id) === search}
            />
          ))
        : null}
      {hasOlder ? (
        <Button type="button" variation="text" onClick={() => loadOlder()} loading={loading} className="mt-16">
          Load older epochs
        </Button>
      ) : null}
    </div>
  );
};

const Epoch = ({
  item,
  poolTokenSymbol,
  highlighted,
}: {
  item: EpochApiType;
  poolTokenSymbol: Tokens;
  highlighted: boolean;
}) => {
  const startDate = new Date(item.startDate * 1000);
  const endDate = new Date(item.endDate * 1000);

  const { getToken } = useTokens();
  const poolToken = getToken(poolTokenSymbol);
  const upsideLeverage =
    1 + ((1 - Number(item.upsideExposureRate)) * Number(item.seniorLiquidity)) / Number(item.juniorLiquidity);

  return (
    <section
      className={classNames(s.card, 'card p-24', {
        [s.highlighted]: highlighted,
      })}>
      <header className="flex align-center mb-24">
        <Text type="p1" weight="semibold" tag="h3">
          Epoch {item.id}
        </Text>
        <time className={classNames(s.time, 'ml-auto')} dateTime={startDate.toJSON()}>
          {format(startDate, 'dd.MM.yyyy - hh:mm')}
        </time>
        <Text type="small" weight="semibold" color="secondary" className="mh-8">
          -
        </Text>
        <time className={s.time} dateTime={endDate.toJSON()}>
          {format(endDate, 'dd.MM.yyyy - hh:mm')}
        </time>
      </header>
      <dl className={s.list}>
        <div className={s.listGroup}>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Senior liquidity
            </Text>
            <div className="flex align-center mb-4">
              <Text type="p2" weight="semibold" className="mr-4" tooltip={item.seniorLiquidity}>
                {formatNumber(Number(item.seniorLiquidity), { decimals: 4 })}
              </Text>
              <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
            </div>
          </div>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Junior liquidity
            </Text>
            <div className="flex align-center">
              <Text type="p2" weight="semibold" className="mr-4" tooltip={item.juniorLiquidity}>
                {formatNumber(Number(item.juniorLiquidity), { decimals: 4 })}
              </Text>
              <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} />
            </div>
          </div>
        </div>

        <div className={s.listGroup}>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Upside leverage
            </Text>
            <Text type="p2" weight="semibold" color="purple">
              {formatNumber(upsideLeverage || 1, { decimals: 2 })}x
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Downside leverage
            </Text>
            <Text type="p2" weight="semibold" color="purple">
              {/* {formatNumber(upsideLeverage || 1, { decimals: 2 })}x */}
              TBD
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Upside exposure rate
            </Text>
            <Text type="p2" weight="semibold" color="green">
              {formatPercent(Number(item.upsideExposureRate))}
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Downside protection rate
            </Text>
            <Text type="p2" weight="semibold" color="green">
              {formatPercent(Number(item.downsideProtectionRate))}
            </Text>
          </div>
        </div>

        <div className={s.listGroup}>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Junior price start
            </Text>
            <Text type="p2" weight="semibold" color="primary" tooltip={item.juniorTokenPriceStart}>
              {formatNumber(Number(item.juniorTokenPriceStart), { decimals: 4 })}
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Junior Profits
            </Text>
            <Text type="p2" weight="semibold" color="primary" tooltip={item.juniorProfits}>
              {formatNumber(Number(item.juniorProfits), { decimals: 4 })}
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Senior price start
            </Text>
            <Text type="p2" weight="semibold" color="primary" tooltip={item.seniorTokenPriceStart}>
              {formatNumber(Number(item.seniorTokenPriceStart), { decimals: 4 })}
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              Senior Profits
            </Text>
            <Text type="p2" weight="semibold" color="primary" tooltip={item.seniorProfits}>
              {formatNumber(Number(item.seniorProfits), { decimals: 4 })}
            </Text>
          </div>
          <div>
            <Text type="small" weight="semibold" className="mb-8" color="secondary">
              {poolTokenSymbol} Epoch entry price
            </Text>
            <Text type="p2" weight="semibold" color="primary" tooltip={item.entryPrice}>
              {formatNumber(Number(item.entryPrice), { decimals: 4 })}
            </Text>
          </div>
        </div>
      </dl>
    </section>
  );
};
