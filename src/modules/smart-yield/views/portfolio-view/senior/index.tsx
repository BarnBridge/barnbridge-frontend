import React, { useState } from 'react';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import Popover from 'components/antd/popover';
import Select from 'components/antd/select';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';

const originatorFilterOptions = [
  {
    label: 'All originators',
    value: 1,
  },
  {
    label: 'All originators 2',
    value: 2,
  },
];

const tokenFilterOptions = [
  {
    label: 'All tokens',
    value: 1,
  },
  {
    label: 'All tokens 2',
    value: 2,
  },
];

const transactionFilterOptions = [
  {
    label: 'All transactions',
    value: 1,
  },
  {
    label: 'All transactions 2',
    value: 2,
  },
];

export default function PortfolioSenior() {
  const [visible, setVisible] = useState(false);

  const [originatorFilter, setOriginatorFilter] = useState(originatorFilterOptions[0].value);
  const [tokenFilter, setTokenFilter] = useState(tokenFilterOptions[0].value);
  const [transactionFilter, setTransactionFilter] = useState(transactionFilterOptions[0].value);
  return (
    <>
      <div className="grid mb-32" style={{ gridTemplateColumns: '40% 1fr', columnGap: 32 }}>
        <PortfolioBalance />
        <PortfolioValue />
      </div>
      <div className="flex align-center mb-32">
        <Text type="h3" weight="semibold" color="primary">
          Active positions
        </Text>
        <Popover
          title="Filters"
          overlayStyle={{ width: 348 }}
          content={
            <>
              <Text type="small" weight="semibold" color="secondary" className="mb-8">
                Originator
              </Text>
              <Select
                loading={false}
                disabled={false}
                options={originatorFilterOptions}
                fixScroll
                className="mb-32"
                value={originatorFilter}
                onSelect={setOriginatorFilter}
                style={{ width: '100%' }}
              />
              <Text type="small" weight="semibold" color="secondary" className="mb-8">
                Token
              </Text>
              <Select
                loading={false}
                disabled={false}
                options={tokenFilterOptions}
                fixScroll
                className="mb-32"
                value={tokenFilter}
                onSelect={setTokenFilter}
                style={{ width: '100%' }}
              />
              <Text type="small" weight="semibold" color="secondary" className="mb-8">
                Transaction type
              </Text>
              <Select
                loading={false}
                disabled={false}
                options={transactionFilterOptions}
                fixScroll
                className="mb-32"
                value={transactionFilter}
                onSelect={setTransactionFilter}
                style={{ width: '100%' }}
              />

              <div className="flex">
                <Button type="light">Reset filters</Button>
                <Button type="primary" className="ml-auto">
                  Apply filters
                </Button>
              </div>
            </>
          }
          visible={visible}
          onVisibleChange={setVisible}>
          <Button type="select" className="ml-auto">
            <Icons name="filter" />
            Filters
          </Button>
        </Popover>
      </div>
      <div className="grid flow-col gap-32">
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
            <Button type="ghost">Sell</Button>
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
            <Button type="ghost">Sell</Button>
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
            <Button type="ghost">Sell</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
