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
        You can choose between fixed, or variable interest. Be aware of the risk involved and read the warnings before
        going further
      </Text>
      <RadioCards className="mb-32">
        <RadioCard selected={tranche === 'senior'} onClick={() => setTranche('senior')}>
          <Icon name="senior_tranche" width={64} height={64} className="mb-24" />
          <Text type="p1" weight="semibold" color="primary" className="mb-8">
            Fixed APY
          </Text>
        </RadioCard>
        <RadioCard selected={tranche === 'junior'} onClick={() => setTranche('junior')}>
          <Icon name="junior_tranche" width={64} height={64} className="mb-24" />
          <Text type="p1" weight="semibold" color="primary" className="mb-8">
            Variable APY
          </Text>
        </RadioCard>
      </RadioCards>

      {tranche ? (
        <Alert type="warning" className="mb-32">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
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
