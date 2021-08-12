import { useLocation, useParams } from 'react-router-dom';

import { Link } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useFetchPool } from 'modules/smart-alpha/api';
import { useWallet } from 'wallets/walletProvider';

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

  return (
    <>
      <div className="mb-16">
        <Link to="/smart-alpha" variation="text-alt" icon="arrow" iconPosition="left" iconRotate={180}>
          Pools
        </Link>
      </div>
      <div className="flex align-center mb-32">
        <div className="flex align-center">
          <TokenIcon name={poolToken?.icon ?? 'unknown'} size={40} bubble2Name="usd" className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
              {pool.poolName}
            </Text>
            <Text type="small" weight="semibold" color="red">
              Epoch {pool.state.epoch}
            </Text>
          </div>
        </div>
        <div className="flex col-gap-24 ml-auto">
          <Link to={`${location.pathname}/simulate`} variation="ghost" aria-disabled={!wallet.account}>
            Simulate
          </Link>
          <Link to={`${location.pathname}/deposit`} variation="primary" aria-disabled={!wallet.account}>
            Deposit
          </Link>
        </div>
      </div>
      <div className="card p-24">
        <h3>Select your preffered side</h3>
        <p>
          You can choose between fixed, or variable interest. Be aware of the risk involved and read the warnings before
          going further
        </p>
      </div>
    </>
  );
};

export default DepositView;
