import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { useFetchPool } from 'modules/smart-alpha/api';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';

import { Simulate } from './simulate';

const SimulateEpoch = () => {
  const { id: poolAddress } = useParams<{ id: string }>();
  const { data: pool } = useFetchPool(poolAddress);
  const { getToken } = useTokens();
  const [reload] = useReload();

  const { getOrCreateContract } = useContractFactory();

  const smartAlphaContract = useMemo(() => {
    if (!pool) {
      return;
    }

    return getOrCreateContract(
      pool.poolAddress,
      () => {
        return new SmartAlphaContract(pool.poolAddress);
      },
      {
        afterInit: async contract => {
          contract.onUpdateData(reload);
          await contract.loadCommon();
        },
      },
    );
  }, [pool]);

  if (!pool) {
    return <Spinner style={{ margin: 'auto' }} />;
  }

  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);

  return (
    <div className="container-limit">
      <div className="mb-16">
        <Link
          to={`/smart-alpha/pools/${poolAddress}`}
          variation="text-alt"
          icon="arrow"
          iconPosition="left"
          iconRotate={180}>
          Pool details
        </Link>
      </div>
      <div className="flex align-center mb-40">
        <TokenIcon name={poolToken?.icon} size={40} bubble2Name={oracleToken?.icon} className="mr-16" />
        <div>
          <Text type="p1" weight="semibold" color="primary" tag="h2" className="mb-4">
            {pool.poolName}
          </Text>
          <Text type="small" weight="semibold" color="secondary">
            Epoch {smartAlphaContract?.epoch ?? pool.state.epoch ?? '-'}
          </Text>
        </div>
      </div>
      <Simulate pool={pool} />
    </div>
  );
};

export default SimulateEpoch;
