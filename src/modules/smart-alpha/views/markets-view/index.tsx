import { formatUSD } from 'web3/utils';

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
      <div>
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
    <div className="card">
      <div className="flex align-center">
        <TokenIcon name="weth" size={40} bubble2Name="usd" />
        <div>
          <Text type="p1" weight="semibold" color="primary">
            wETH-USD
          </Text>
        </div>
      </div>
    </div>
  );
};
