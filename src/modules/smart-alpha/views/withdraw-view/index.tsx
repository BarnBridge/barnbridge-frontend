import { useMemo } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import { Link } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useFetchPool } from 'modules/smart-alpha/api';
import { WithdrawForm } from 'modules/smart-alpha/views/withdraw-view/withdrawForm';

const WithdrawView = () => {
  const { id: poolAddress, tranche } = useParams<{ id: string; tranche: 'senior' | 'junior' }>();
  const { data: pool } = useFetchPool(poolAddress);
  const { getToken, getAsset } = useTokens();

  const isSenior = tranche === 'senior';

  const { getOrCreateContract } = useContractFactory();

  const tokenContract = useMemo(() => {
    if (!pool) {
      return undefined;
    }

    const address = isSenior ? pool.seniorTokenAddress : pool.juniorTokenAddress;
    return getOrCreateContract(
      address,
      () => {
        return new Erc20Contract([], address);
      },
      {
        afterInit: async contract => {
          await Promise.all([contract.loadCommon(), contract.loadBalance()]);
        },
      },
    );
  }, [pool, isSenior]);

  if (!pool) {
    return <Spinner style={{ margin: 'auto' }} />;
  }

  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);

  return (
    <>
      <div className="container-fit">
        <Link
          to={`/smart-alpha/portfolio/${tranche}?poolAddress=${poolAddress}`}
          variation="text-alt"
          icon="arrow"
          iconPosition="left"
          iconRotate={180}
          className="mb-16">
          Portfolio
        </Link>
        <div className="flex col-gap-64 align-center mb-32">
          <div className="flex align-center">
            <TokenIcon name={poolToken?.icon} size={40} bubble2Name={oracleToken?.icon} className="mr-16" />
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
                {formatToken(tokenContract?.balance?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
              <Text type="small" weight="semibold" color="secondary">
                {tokenContract?.symbol ?? '-'}
              </Text>
            </div>
          </div>
          <Switch>
            <Route path="/smart-alpha/pools/:id/deposit/senior">
              <div>
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Side
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="mr-4">
                  Senior
                </Text>
              </div>
            </Route>
            <Route path="/smart-alpha/pools/:id/deposit/junior">
              <div>
                <Text type="small" weight="semibold" color="secondary" className="mb-4">
                  Side
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="mr-4">
                  Junior
                </Text>
              </div>
            </Route>
          </Switch>
        </div>
        <WithdrawForm pool={pool} tokenContract={tokenContract} />
      </div>
    </>
  );
};

export default WithdrawView;
