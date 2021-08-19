import { Suspense } from 'react';
import { Redirect, Route, Switch, useLocation, useParams } from 'react-router-dom';

import { Link } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useFetchPool } from 'modules/smart-alpha/api';
import { useWallet } from 'wallets/walletProvider';

import { JuniorDeposit } from './junior';
import { SelectTranche } from './select';
import { SeniorDeposit } from './senior';

const DepositView = () => {
  const { id: poolAddress } = useParams<{ id: string }>();
  const location = useLocation();
  const { data } = useFetchPool(poolAddress);
  const { getToken } = useTokens();
  const wallet = useWallet();

  const pool = data?.[0];

  if (!pool) {
    return <Spinner style={{ margin: 'auto' }} />;
  }

  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);

  return (
    <>
      <div className="container-fit">
        <div className="mb-16">
          <Switch>
            <Route path="/smart-alpha/pools/:id/deposit" exact>
              <Link
                to={`/smart-alpha/pools/${poolAddress}`}
                variation="text-alt"
                icon="arrow"
                iconPosition="left"
                iconRotate={180}>
                Pool details
              </Link>
            </Route>
            <Route path="/smart-alpha/pools/:id/deposit">
              <Link
                to={`/smart-alpha/pools/${poolAddress}/deposit`}
                variation="text-alt"
                icon="arrow"
                iconPosition="left"
                iconRotate={180}>
                Sides
              </Link>
            </Route>
          </Switch>
        </div>
        <div className="flex col-gap-64 align-center mb-32">
          <div className="flex align-center">
            <TokenIcon
              name={poolToken?.icon ?? 'unknown'}
              size={40}
              bubble2Name={oracleToken?.icon ?? 'unknown'}
              className="mr-16"
            />
            <div>
              <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
                {pool.poolName}
              </Text>
              <Text type="small" weight="semibold" color="red">
                Epoch {pool.state.epoch}
              </Text>
            </div>
          </div>
          <div>
            <Text type="small" weight="semibold" color="secondary" className="mb-4">
              Wallet balance
            </Text>
            <div className="flex align-center">
              <Text type="p1" weight="semibold" color="primary" className="mr-4">
                81.2217
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                {pool.poolToken.symbol}
              </Text>
            </div>
          </div>
          <Switch>
            <Route path="/smart-alpha/pools/:id/deposit/senior">
              <div>
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Tranche
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="mr-4">
                  Senior
                </Text>
              </div>
            </Route>
            <Route path="/smart-alpha/pools/:id/deposit/junior">
              <div>
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Tranche
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="mr-4">
                  Junior
                </Text>
              </div>
            </Route>
          </Switch>
        </div>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/smart-alpha/pools/:id/deposit" exact>
              <SelectTranche pool={pool} />
            </Route>
            <Route path="/smart-alpha/pools/:id/deposit/senior" exact>
              <SeniorDeposit pool={pool} />
            </Route>
            <Route path="/smart-alpha/pools/:id/deposit/junior" exact>
              <JuniorDeposit pool={pool} />
            </Route>
            <Redirect to={`/smart-alpha/pools/${poolAddress}/deposit`} />
          </Switch>
        </Suspense>
      </div>
    </>
  );
};

export default DepositView;
