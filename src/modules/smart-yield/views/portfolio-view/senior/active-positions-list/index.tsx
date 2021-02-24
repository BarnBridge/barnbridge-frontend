import React from 'react';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';

import s from './s.module.scss';

const ActivePositionsList: React.FC = () => {
  return (
    <div className={s.cards}>
      <Card noPaddingBody>
        <div className="flex p-24">
          <IconBubble name="usdc-token" bubbleName="compound" className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              USDC
            </Text>
            <Text type="small" weight="semibold">
              Compound
            </Text>
          </div>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            Deposited
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            10,000.00
          </Text>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            Redeemable
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            10,381.22
          </Text>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            Time left until maturity
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            30 days 4 hours
          </Text>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            APY
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            5.33%
          </Text>
        </div>
        <Divider />
        <div className="grid flow-col gap-24 p-24" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <Button type="primary">Redeem</Button>
          <Button type="ghost">Transfer</Button>
        </div>
      </Card>
      <Card noPaddingBody>
        <div className="flex p-24">
          <IconBubble name="usdc-token" bubbleName="compound" className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              USDC
            </Text>
            <Text type="small" weight="semibold">
              Compound
            </Text>
          </div>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            Deposited
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            75,000.00
          </Text>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            Redeemable
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            10,381.22
          </Text>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            Time left until maturity
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            30 days 4 hours
          </Text>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            APY
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            5.33%
          </Text>
        </div>
        <Divider />
        <div className="grid flow-col gap-24 p-24" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <Button type="primary">Redeem</Button>
          <Button type="ghost">Transfer</Button>
        </div>
      </Card>
      <Card noPaddingBody>
        <div className="flex p-24">
          <IconBubble name="usdc-token" bubbleName="compound" className="mr-16" />
          <div>
            <Text type="p1" weight="semibold" color="primary" className="mb-4">
              USDC
            </Text>
            <Text type="small" weight="semibold">
              Compound
            </Text>
          </div>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            Deposited
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            1,000,000.00
          </Text>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            Redeemable
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            10,381.22
          </Text>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            Time left until maturity
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            30 days 4 hours
          </Text>
        </div>
        <Divider />
        <div className="p-24">
          <Text type="small" weight="semibold" color="secondary">
            APY
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            5.33%
          </Text>
        </div>
        <Divider />
        <div className="grid flow-col gap-24 p-24" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <Button type="primary">Redeem</Button>
          <Button type="ghost">Transfer</Button>
        </div>
      </Card>
    </div>
  );
};

export default ActivePositionsList;
