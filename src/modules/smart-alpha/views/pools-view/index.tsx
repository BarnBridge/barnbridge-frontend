import { useLocation } from 'react-router-dom';
import { formatPercent, formatUSD } from 'web3/utils';

import { Button, Link } from 'components/button';
// import Tooltip from 'components/antd/tooltip';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
// import { Icon } from 'components/icon';
import { TokenIcon } from 'components/token-icon';
import { PoolApiType, useFetchPools } from 'modules/smart-alpha/api';

import { getRelativeTime } from 'utils';

const PoolsView = () => {
  const { data } = useFetchPools();
  return (
    <>
      <Text type="p1" weight="semibold" color="secondary" className="mb-4">
        Total value locked
      </Text>
      <div className="mb-40 flex align-center">
        <Text type="h2" weight="bold" color="primary" className="mr-8">
          {formatUSD(123)}
        </Text>
        {/* <Tooltip title={<>TBD</>}>
          <Icon name="insured" color="green" size={32} />
        </Tooltip> */}
      </div>
      <div className="flex flex-wrap">
        {data?.map(item => (
          <PoolCard key={item.poolAddress} item={item} />
        ))}
      </div>
    </>
  );
};
export default PoolsView;

const PoolCard = ({ item }: { item: PoolApiType }) => {
  const location = useLocation();
  const { getToken } = useTokens();

  const poolToken = getToken(item.poolToken.symbol);

  return (
    <section className="card p-24">
      <header className="flex align-center">
        <TokenIcon name={poolToken?.icon ?? 'unknown'} size={40} bubble2Name="usd" />
        <div>
          <Text type="p1" weight="semibold" color="primary" tag="h2">
            {item.poolName}
          </Text>
        </div>
      </header>
      <dl>
        <div className="flex">
          <dt>Epoch senior liquidity</dt>
          <dd>
            <Text type="p1" weight="semibold" tooltip={formatUSD(item.state.seniorLiquidity)}>
              {formatUSD(item.state.seniorLiquidity, { compact: true })}
            </Text>
          </dd>
        </div>
        <div className="flex">
          <dt>Upside exposure rate</dt>
          <dd>
            <Text type="p1" weight="semibold">
              {formatPercent(Number(item.state.upsideExposureRate))}
            </Text>
          </dd>
        </div>
        <div className="flex">
          <dt>Downside protection rate</dt>
          <dd>
            <Text type="p1" weight="semibold">
              {formatPercent(Number(item.state.downsideProtectionRate))}
            </Text>
          </dd>
        </div>
        <div className="flex">
          <dt>Epoch junior liquidity</dt>
          <dd>
            <Text type="p1" weight="semibold" tooltip={formatUSD(item.state.juniorLiquidity)}>
              {formatUSD(item.state.juniorLiquidity, { compact: true })}
            </Text>
          </dd>
        </div>
        <div className="flex">
          <dt>Epoch ends in</dt>
          <dd>
            <Text type="p1" weight="semibold">
              {getRelativeTime(item.epoch1Start / 1000)}
            </Text>
          </dd>
        </div>
      </dl>
      <footer>
        <Link variation="ghost" to={`${location.pathname}/${item.poolAddress}`}>
          View details
        </Link>
      </footer>
    </section>
  );
};
