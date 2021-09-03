import React from 'react';
import { useLocation } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { addSeconds, getUnixTime } from 'date-fns';
import { formatPercent, formatToken, formatUSD } from 'web3/utils';

import { Link } from 'components/button';
import { InfoTooltip } from 'components/custom/tooltip';
// import Tooltip from 'components/antd/tooltip';
import { Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
// import { Icon } from 'components/icon';
import { TokenIcon } from 'components/token-icon';
import { UseLeftTime } from 'hooks/useLeftTime';
import { PoolApiType, useFetchPools } from 'modules/smart-alpha/api';

import { getFormattedDuration } from 'utils';

import s from './s.module.scss';

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
      <div className={s.cards}>
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
  const oracleToken = getAsset(item.oracleAssetSymbol);

  const secondsFromEpoch1 = addSeconds(new Date(), item.epoch1Start * -1);
  const currentEpochProgress = getUnixTime(secondsFromEpoch1) % item.epochDuration;
  const currentEpochProgressPercent = currentEpochProgress / item.epochDuration;

  // const juniorLeverage = calcJuniorLeverage(item);

  return (
    <section
      className={classNames(s.poolCard, 'card')}
      style={{ '--pool-card-progress': currentEpochProgressPercent * 100 } as React.CSSProperties}>
      <header className="card-header flex align-center mb-32">
        <TokenIcon
          name={poolToken?.icon ?? 'unknown'}
          size={40}
          bubble2Name={oracleToken?.icon ?? 'unknown'}
          className="mr-16"
        />
        <div>
          <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
            {item.poolName}
          </Text>
          <Text type="small" weight="semibold" color="red" tag="small">
            Epoch {item.state.epoch}
          </Text>
        </div>
        <div className="ml-auto" style={{ textAlign: 'right' }}>
          <Text type="small" weight="semibold" color="secondary" tag="small" className="mb-4">
            Epoch ends in
          </Text>
          <UseLeftTime delay={1_000}>
            {() => {
              const secondsFromEpoch1 = addSeconds(new Date(), item.epoch1Start * -1);
              const currentEpochProgress = getUnixTime(secondsFromEpoch1) % item.epochDuration;

              return (
                <Text type="p1" weight="semibold">
                  {getFormattedDuration(item.epochDuration - currentEpochProgress)}
                </Text>
              );
            }}
          </UseLeftTime>
        </div>
      </header>
      <dl>
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Epoch senior liquidity
          </Text>
          <dd className="flex align-center">
            <Text
              type="p1"
              weight="semibold"
              tooltip={
                <Text type="p2" color="primary" className="flex flow-row row-gap-4">
                  <span>
                    {formatToken(item.state.seniorLiquidity, {
                      tokenName: poolToken?.symbol,
                      decimals: poolToken?.decimals,
                    })}
                  </span>
                  <span>
                    {formatUSD(BigNumber.from(item.state.seniorLiquidity)?.multipliedBy(poolToken?.price ?? 0))}
                  </span>
                </Text>
              }>
              {formatToken(item.state.seniorLiquidity, { compact: true })}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} className="ml-8" />
          </dd>
        </div>
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Upside exposure rate
            <InfoTooltip>
              Senior positions will only receive this much of every percentage point gain in the underlying asset
            </InfoTooltip>
          </Text>
          <dd>
            <Text type="p1" weight="semibold" color="green">
              {formatPercent(Number(item.state.upsideExposureRate))}
            </Text>
          </dd>
        </div>
        <div className={classNames(s.poolCardDlRow, 'mb-16')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Downside protection rate
            <InfoTooltip>Senior positions will only start taking losses beyond this decline</InfoTooltip>
          </Text>
          <dd>
            <Text type="p1" weight="semibold" color="green">
              {formatPercent(Number(item.state.downsideProtectionRate))}
            </Text>
          </dd>
        </div>
        <hr className="mb-24" />
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Epoch junior liquidity
          </Text>
          <dd className="flex align-center">
            <Text
              type="p1"
              weight="semibold"
              tooltip={
                <Text type="p2" color="primary" className="flex flow-row row-gap-4">
                  <span>
                    {formatToken(item.state.juniorLiquidity, {
                      tokenName: poolToken?.symbol,
                      decimals: poolToken?.decimals,
                    })}
                  </span>
                  <span>
                    {formatUSD(BigNumber.from(item.state.juniorLiquidity)?.multipliedBy(poolToken?.price ?? 0))}
                  </span>
                </Text>
              }>
              {formatToken(item.state.juniorLiquidity, { compact: true })}
            </Text>
            <TokenIcon name={poolToken?.icon ?? 'unknown'} className="ml-8" />
          </dd>
        </div>
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Upside leverage
            <InfoTooltip>Junior positions will have their upside amplified by this much</InfoTooltip>
          </Text>
          <dd>
            <Text type="p1" weight="semibold" color="purple">
              {/* {juniorLeverage ? `${formatNumber(juniorLeverage)}x` : `1x`} */}
              TBD
            </Text>
          </dd>
        </div>
        <div className={classNames(s.poolCardDlRow, 'mb-24')}>
          <Text type="small" weight="semibold" color="secondary" className="flex align-middle col-gap-4" tag="dt">
            Downside leverage
            <InfoTooltip>
              How much of every 1% move to the downside in the underlying asset a junior position will have exposure to.
              <br />
              <br />
              The downside leverage is only applicable until senior downside protection is fully covered, and junior
              losses are fully realized.
            </InfoTooltip>
          </Text>
          <dd>
            <Text type="p1" weight="semibold" color="purple">
              {/* {juniorLeverage ? `${formatNumber(juniorLeverage)}x` : `1x`} */}
              TBD
            </Text>
          </dd>
        </div>
      </dl>
      <footer className={s.poolCardFooter}>
        <Link variation="ghost" to={`${location.pathname}/${item.poolAddress}`}>
          View details
        </Link>
      </footer>
    </section>
  );
};

// function calcJuniorLeverage(item) {
//   if (!Number(item.state.seniorLiquidity) || !Number(item.state.juniorLiquidity)) {
//     return null;
//   }

//   return (
//     1 +
//     (1 - Number(item.state.upsideExposureRate)) *
//       (Number(item.state.seniorLiquidity) / Number(item.state.juniorLiquidity))
//   );
// }
