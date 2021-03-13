import React from 'react';

import { Text } from 'components/custom/typography';
import { ReactComponent as RocketSvg } from 'resources/svg/rocket.svg';

const SmartAlphaView: React.FC = () => {
  return (
    <div className="flex flow-row row-gap-48 align-center justify-center full-height">
      <RocketSvg style={{ maxWidth: '310px', maxHeight: '377px' }} />
      <div className="grid flow-row row-gap-8">
        <Text type="h1" weight="bold" color="primary">
          Stay tuned!
        </Text>
        <Text type="p1" weight="semibold" color="secondary">
          We are launching soon
        </Text>
      </div>
    </div>
  );
};

export default SmartAlphaView;
