import { FC, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { formatUSD } from 'web3/utils';

import { Text } from 'components/custom/typography';

import { SASection, useSAData } from './sa-section';
import { SESection, useSEData } from './se-section';
import { SYSection, useSYData } from './sy-section';

const TreasuryFees: FC = () => {
  const [syPools, syTotalFees, syLoading, syListeners] = useSYData();
  const [sePools, seTotalFees, seLoading, seListeners] = useSEData();
  const [saPools, saTotalFees, saLoading, saListeners] = useSAData();

  const totalFeesUSD = useMemo(() => {
    return BigNumber.sum(syTotalFees, seTotalFees, saTotalFees);
  }, [syTotalFees, seTotalFees, saTotalFees]);

  return (
    <>
      <Text type="h2" weight="bold" color="primary" className="mb-4">
        {formatUSD(totalFeesUSD) ?? '-'}
      </Text>
      <Text type="p2" weight="semibold" color="secondary" className="mb-32">
        Total fees accrued
      </Text>
      <SYSection pools={syPools} total={syTotalFees} loading={syLoading} className="mb-32" />
      <SESection pools={sePools} total={seTotalFees} loading={seLoading} className="mb-32" />
      <SASection pools={saPools} total={saTotalFees} loading={saLoading} />
      {syListeners}
      {seListeners}
      {saListeners}
    </>
  );
};

export default TreasuryFees;
