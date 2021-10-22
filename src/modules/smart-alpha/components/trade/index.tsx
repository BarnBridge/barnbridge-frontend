import ExternalLink from 'components/custom/externalLink';
import { Icon } from 'components/icon';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { PoolApiType } from 'modules/smart-alpha/api';

import s from './s.module.scss';

type TradeTranchesType = ['junior', 'senior'] | ['junior'] | ['senior'];
type TrancheType = 'junior' | 'senior';

export const TradeLinks = ({
  pool,
  tranches = ['junior', 'senior'],
}: {
  pool: PoolApiType;
  tranches?: TradeTranchesType;
}) => {
  return (
    <ul className={s.list}>
      {tranches.map((tranche: TrancheType) => {
        return <Tranche key={tranche} tranche={tranche} pool={pool} />;
      })}
    </ul>
  );
};

const Tranche = ({ pool, tranche }: { pool: PoolApiType; tranche: TrancheType }) => {
  const { getToken } = useTokens();
  const poolToken = getToken(pool.poolToken.symbol);

  const data = tradePoolsLinks[pool.poolName]?.[tranche];

  if (!data) {
    console.error(`No trade links for ${tranche}_${pool.poolName}`);
    return null;
  }

  return (
    <>
      <li>
        <ExternalLink className={s.link} href={data[0]}>
          <div className={s.token}>
            <TokenIcon name={poolToken?.icon} bubble1Name="bond" bubble2Name="usd" outline="purple" size={32} />
            {tranche}_{pool.poolName}
          </div>
          <div className={s.arrowIcon}>
            <Icon name="arrow" color="icon" size={16} />
          </div>
          <div className={s.token}>
            <TokenIcon name={poolToken?.icon} bubble1Name="bond" bubble2Name="usd" outline="green" size={32} />
            {tranche === 'senior' ? 'junior' : 'senior'}_{pool.poolName}
          </div>
        </ExternalLink>
      </li>
      <li>
        <ExternalLink className={s.link} href={data[1]}>
          <div className={s.token}>
            <TokenIcon name={poolToken?.icon} bubble1Name="bond" bubble2Name="usd" outline="purple" size={32} />
            {tranche}_{pool.poolName}
          </div>
          <div className={s.arrowIcon}>
            <Icon name="arrow" color="icon" size={16} />
          </div>
          <div className={s.token}>
            <TokenIcon name={poolToken?.icon} bubble2Name="usd" size={32} />
            {pool.poolToken.symbol}
          </div>
        </ExternalLink>
      </li>
    </>
  );
};

const tradePoolsLinks = {
  'WETH-USD-1w': {
    junior: [
      'https://app.balancer.fi/#/trade/0xcd89c90ce3d565f51587033604591ba292ba1866/0xb138dd4a00f9afa14c7feaacd710f37a22fe4f12',
      'https://app.balancer.fi/#/trade/0xcd89c90ce3d565f51587033604591ba292ba1866/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    ],
    senior: [
      'https://app.balancer.fi/#/trade/0xb138dd4a00f9afa14c7feaacd710f37a22fe4f12/0xcd89c90ce3d565f51587033604591ba292ba1866',
      'https://app.balancer.fi/#/trade/0xb138dd4a00f9afa14c7feaacd710f37a22fe4f12/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    ],
  },
  'WBTC-USD-1w': {
    junior: [
      'https://app.balancer.fi/#/trade/0x2766cc123d0a005c73f7bac66ce9e6a746fc1006/0xc919d5d1053a9ab77529618e45f168b199bd823d',
      'https://app.balancer.fi/#/trade/0x2766cc123d0a005c73f7bac66ce9e6a746fc1006/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    ],
    senior: [
      'https://app.balancer.fi/#/trade/0xc919d5d1053a9ab77529618e45f168b199bd823d/0x2766cc123d0a005c73f7bac66ce9e6a746fc1006',
      'https://app.balancer.fi/#/trade/0xc919d5d1053a9ab77529618e45f168b199bd823d/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    ],
  },
};

export function hasTradeOption(poolName: string) {
  return Object.keys(tradePoolsLinks).includes(poolName);
}
