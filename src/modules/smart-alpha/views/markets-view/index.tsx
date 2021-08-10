import { formatUSD } from 'web3/utils';

import { Button, Link } from 'components/button';
// import Tooltip from 'components/antd/tooltip';
import { Text } from 'components/custom/typography';
// import { Icon } from 'components/icon';
import { TokenIcon } from 'components/token-icon';

const MarketsView = () => {
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
        <MarketCard />
        <MarketCard />
        <MarketCard />
      </div>
    </>
  );
};
export default MarketsView;

const MarketCard = () => {
  return (
    <section className="card p-24">
      <header className="flex align-center">
        <TokenIcon name="weth" size={40} bubble2Name="usd" />
        <div>
          <Text type="p1" weight="semibold" color="primary" tag="h2">
            wETH-USD
          </Text>
        </div>
      </header>
      <dl>
        <div className="flex">
          <dt>Epoch senior liquidity</dt>
          <dd>
            <Text type="p1" weight="semibold" tooltip={formatUSD('32500000')}>
              {formatUSD('32500000', { compact: true })}
            </Text>
          </dd>
        </div>
        <div className="flex">
          <dt>Upside exposure rate</dt>
          <dd>
            <Text type="p1" weight="semibold" tooltip={formatUSD('32500000')}>
              {formatUSD('32500000', { compact: true })}
            </Text>
          </dd>
        </div>
        <div className="flex">
          <dt>Downside protection rate</dt>
          <dd>
            <Text type="p1" weight="semibold" tooltip={formatUSD('32500000')}>
              {formatUSD('32500000', { compact: true })}
            </Text>
          </dd>
        </div>
        <div className="flex">
          <dt>Epoch junior liquidity</dt>
          <dd>
            <Text type="p1" weight="semibold" tooltip={formatUSD('32500000')}>
              {formatUSD('32500000', { compact: true })}
            </Text>
          </dd>
        </div>
        <div className="flex">
          <dt>Epoch ends in</dt>
          <dd>
            <Text type="p1" weight="semibold" tooltip={formatUSD('32500000')}>
              {formatUSD('32500000', { compact: true })}
            </Text>
          </dd>
        </div>
      </dl>
      <footer>
        <Link variation="ghost" to="/smart-alpha/markets/2">
          View details
        </Link>
      </footer>
    </section>
  );
};
