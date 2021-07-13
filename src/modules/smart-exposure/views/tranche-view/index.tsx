import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import classNames from 'classnames';
import { formatPercent } from 'web3/utils';

// import { DropdownList } from 'components/custom/dropdown';
import Icon from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TrancheApiType, useSeAPI } from 'modules/smart-exposure/api';
import { useWallet } from 'wallets/walletProvider';

import { Charts } from './charts';
import { Details } from './details';
import { TransactionsView } from './transactions';
import { PriceTrend } from './trend';

import s from './s.module.scss';

const TrancheView: React.FC = () => {
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const location = useLocation();
  const wallet = useWallet();
  const [tranche, setTranche] = useState<TrancheApiType>();
  const { getTokenBySymbol } = useKnownTokens();
  const seAPI = useSeAPI();

  useEffect(() => {
    seAPI.fetchTranche(trancheAddress).then(result => {
      setTranche(result);
    });
  }, [trancheAddress]);

  if (!tranche) {
    return null;
  }

  const tokenA = getTokenBySymbol(tranche.tokenA.symbol);
  const tokenB = getTokenBySymbol(tranche.tokenB.symbol);

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
              {`${formatPercent(Number(tranche.tokenARatio))} ${tokenA?.symbol} / ${formatPercent(
                Number(tranche.tokenBRatio),
              )} ${tokenB?.symbol}`}
            </div>
            <div className="text-sm fw-semibold color-secondary">{`${tokenA?.name} / ${tokenB?.name}`}</div>
          </div>
        </div>

        <div className="flex col-gap-24 ml-auto">
          <Link
            to={`${location.pathname}/deposit`}
            className={classNames('button-primary', { disabled: !wallet.account })}>
            Deposit
          </Link>
          <Link
            to={`${location.pathname}/withdraw`}
            className={classNames('button-ghost', { disabled: !wallet.account })}>
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
      </div>
      <div className={cn(s.trendDetailsRow, 'mb-32')}>
        <PriceTrend poolAddress={poolAddress} trancheAddress={trancheAddress} />
        <Details tranche={tranche} />
      </div>
      <Charts tranche={tranche} className="mb-32" />
      <TransactionsView tranche={tranche} />
    </>
  );
};

export default TrancheView;
