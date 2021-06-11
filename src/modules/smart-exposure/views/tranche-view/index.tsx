import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

// import { DropdownList } from 'components/custom/dropdown';
import Icon from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { getTokenBySymbol } from 'components/providers/known-tokens-provider';
import { TrancheApiType, fetchTranche } from 'modules/smart-exposure/api';
import { useWallet } from 'wallets/wallet';

import { Charts } from './charts';
import { TrancheDetails } from './details';
import { TransactionsView } from './transactions';
import { PriceTrend } from './trend';

import { calcTokensRatio } from 'modules/smart-exposure/utils';

import s from './s.module.scss';

const TrancheView: React.FC = () => {
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const location = useLocation();
  const wallet = useWallet();
  const [tranche, setTranche] = useState<TrancheApiType>();

  useEffect(() => {
    fetchTranche(poolAddress, trancheAddress).then(result => {
      setTranche(result);
    });
  }, [poolAddress, trancheAddress]);

  if (!tranche) {
    return null;
  }

  const tokenA = getTokenBySymbol(tranche.tokenA.symbol);
  const tokenB = getTokenBySymbol(tranche.tokenB.symbol);

  const [tokenARation, tokenBRation] = calcTokensRatio(tranche.targetRatio);

  return (
    <>
      <div className="flex mb-16">
        <Link to="/smart-exposure/pools" className="button-text">
          <Icon name="arrow-back" color="inherit" className="mr-8" />
          Tranches
        </Link>
      </div>
      <div className="flex align-center mb-40">
        <div className="flex">
          <IconsPair icon1={tokenA?.icon} icon2={tokenB?.icon} size={40} className="mr-16" />
          <div>
            <div className="text-p1 fw-semibold color-primary mr-4">
              {`${tokenARation}% ${tokenA?.symbol} / ${tokenBRation}% ${tokenB?.symbol}`}
            </div>
            <div className="text-sm fw-semibold color-secondary">{`${tokenA?.name} / ${tokenB?.name}`}</div>
          </div>
        </div>
        {wallet.isActive ? (
          <div className="flex col-gap-24 ml-auto">
            <Link to={`${location.pathname}/deposit`} className="button-primary">
              Deposit
            </Link>
            <Link to={`${location.pathname}/withdraw`} className="button-ghost">
              Withdraw
            </Link>
            {/* <DropdownList
              items={[
                {
                  to: `${location.pathname}/change-tranche`,
                  children: 'Change tranche',
                },
              ]}
              options={{
                placement: 'bottom-end',
              }}>
              {({ ref, setOpen, open }) => (
                <button
                  type="button"
                  className="button-ghost-alt button-icon"
                  ref={ref}
                  onClick={() => setOpen(isOpen => !isOpen)}>
                  <Icon name="vertical-dots" />
                </button>
              )}
            </DropdownList> */}
          </div>
        ) : null}
      </div>
      <div className={cn(s.trendDetailsRow, 'mb-32')}>
        <PriceTrend poolAddress={poolAddress} trancheAddress={trancheAddress} />
        <TrancheDetails tranche={tranche} />
      </div>
      <Charts tranche={tranche} className="mb-32" />
      <TransactionsView />
    </>
  );
};

export default TrancheView;
