import React, { useState } from 'react';

import Button from 'components/antd/button';
import Popover from 'components/antd/popover';
import Select from 'components/antd/select';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';

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

const FiltersPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const [originatorFilter, setOriginatorFilter] = useState(originatorFilterOptions[0].value);
  const [tokenFilter, setTokenFilter] = useState(tokenFilterOptions[0].value);
  const [transactionFilter, setTransactionFilter] = useState(transactionFilterOptions[0].value);

  return (
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
  );
};

export default FiltersPopup;
