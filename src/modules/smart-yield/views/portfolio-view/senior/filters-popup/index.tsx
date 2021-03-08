import React, { useState } from 'react';
import * as Antd from 'antd';

import Form from 'components/antd/form';
import Button from 'components/antd/button';
import Popover from 'components/antd/popover';
import Select from 'components/antd/select';
import Icons from 'components/custom/icon';

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

type FormValues = {
  originator?: string;
  token?: string;
  transactionType?: string;
};


const FiltersPopup: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Antd.Form.useForm<FormValues>();

  const handleFinish = React.useCallback((values: FormData) => {
    console.log(values);
  }, []);

  return (
    <Popover
      title="Filters"
      placement="bottomLeft"
      overlayStyle={{ width: 348 }}
      content={
        <>
        <Form
          form={form}
          initialValues={{
            originator: originatorFilterOptions[0].value,
            token: tokenFilterOptions[0].value,
            transactionType: transactionFilterOptions[0].value,
          }}
          validateTrigger={['onSubmit']}
          onFinish={handleFinish}>
          <Form.Item label="Originator" name="originator" className="mb-32">
            <Select
              loading={false}
              disabled={false}
              options={originatorFilterOptions}
              fixScroll
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label="Token" name="token" className="mb-32">
            <Select
              loading={false}
              disabled={false}
              options={tokenFilterOptions}
              fixScroll
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label="Transaction type" name="transactionType" className="mb-32">
            <Select
              loading={false}
              disabled={false}
              options={transactionFilterOptions}
              fixScroll
              style={{ width: '100%' }}
            />
          </Form.Item>

          <div className="grid flow-col align-center justify-space-between">
            <button type="button" onClick={() => form.resetFields()} className="button-text">
              Reset filters
            </button>
            <button type="submit" className="button-primary">
              Apply filters
            </button>
          </div>
        </Form>
        </>
      }
      visible={visible}
      onVisibleChange={setVisible}>
      <button type="button" className="button-ghost-monochrome ml-auto" style={{ backgroundColor: 'var(--theme-card-color)' }}>
        <Icons name="filter" className="mr-8" color="inherit" />
        Filters
      </button>
    </Popover>
  );
};

export default FiltersPopup;
