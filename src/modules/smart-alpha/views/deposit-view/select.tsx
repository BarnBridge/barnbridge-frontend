import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Alert } from 'components/alert';
import { Link } from 'components/button';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { RadioCard, RadioCards } from 'components/radio-card';
import { PoolApiType } from 'modules/smart-alpha/api';

export const SelectTranche = ({ pool }: { pool: PoolApiType }) => {
  const location = useLocation();
  const [tranche, setTranche] = useState<'senior' | 'junior' | undefined>();

  return (
    <div className="card p-24">
      <Text type="h3" weight="bold" color="primary" tag="h3" className="mb-16">
        Select your preferred side
      </Text>
      <Text type="p2" weight="semibold" color="secondary" tag="p" className="mb-32">
        You can choose between senior or junior positions. Be aware of the risk involved and read the warnings before
        going further.
      </Text>
      <RadioCards className="mb-32">
        <RadioCard selected={tranche === 'senior'} onClick={() => setTranche('senior')}>
          <Icon name="senior-side" width={64} height={64} className="mb-24" />
          <Text type="p1" weight="semibold" color="primary" className="mb-8">
            Senior side
          </Text>
        </RadioCard>
        <RadioCard selected={tranche === 'junior'} onClick={() => setTranche('junior')}>
          <Icon name="junior-side" width={64} height={64} className="mb-24" />
          <Text type="p1" weight="semibold" color="primary" className="mb-8">
            Junior side
          </Text>
        </RadioCard>
      </RadioCards>

      {tranche === 'senior' ? (
        <Alert type="warning" className="mb-32">
          Senior positions offer dampened exposure to the underlying asset's price volatility. Because the position's
          upside exposure is limited and its downside is protected, it will experience low volatility relative to the
          underlying asset.
        </Alert>
      ) : null}
      {tranche === 'junior' ? (
        <Alert type="warning" className="mb-32">
          Junior positions offer leveraged exposure to the underlying asset's price volatility. The junior positions
          have amplified exposure to both upside and downside price volatility. Upside and downside leverage are NOT
          symmetrical and both will vary week-to-week.
        </Alert>
      ) : null}

      <div className="flex">
        <Link to={`${location.pathname}/${tranche}`} variation="primary" aria-disabled={!tranche} className="ml-auto">
          Next step
        </Link>
      </div>
    </div>
  );
};
