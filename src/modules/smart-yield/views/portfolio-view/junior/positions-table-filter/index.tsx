import React, { useState } from 'react';
import AntdForm from 'antd/lib/form';

import Form from 'components/antd/form';
import Popover from 'components/antd/popover';
import Select, { SelectOption } from 'components/antd/select';
import Icon from 'components/custom/icon';
import { JuniorPastPositionTypes } from 'modules/smart-yield/api';
import { SYPool } from 'modules/smart-yield/providers/pool-provider';

export type PositionsTableFilterValues = {
  originator: string;
  token: string;
  withdrawType: string;
};

const InitialFormValues: PositionsTableFilterValues = {
  originator: 'all',
  token: 'all',
  withdrawType: 'all',
};

type Props = {
  originators: SYPool[];
  showWithdrawTypeFilter?: boolean;
  value?: PositionsTableFilterValues;
  onChange: (values: PositionsTableFilterValues) => void;
};

const PositionsTableFilter: React.FC<Props> = props => {
  const { originators, showWithdrawTypeFilter, value = InitialFormValues, onChange } = props;
  const [form] = AntdForm.useForm<PositionsTableFilterValues>();
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

  const originatorOpts = React.useMemo<SelectOption[]>(() => {
    return [
      {
        label: 'All originators',
        value: 'all',
      },
      ...originators.map(originator => ({
        label: originator.market?.name ?? '-',
        value: originator.protocolId,
      })),
    ];
  }, [originators]);

  const tokenOpts = React.useMemo<SelectOption[]>(() => {
    return [
      {
        label: 'All tokens',
        value: 'all',
      },
      ...originators.map(originator => ({
        label: originator.meta?.name ?? '-',
        value: originator.underlyingAddress,
      })),
    ];
  }, [originators]);

  const withdrawOpts = React.useMemo<SelectOption[]>(() => {
    return [
      {
        label: 'All withdrawals',
        value: 'all',
      },
      ...Array.from(JuniorPastPositionTypes.entries()).map(([type, label]) => ({
        label,
        value: type,
      })),
    ];
  }, []);

  function handleSubmit(values: PositionsTableFilterValues) {
    setFiltersVisible(false);
    onChange(values);
  }

  React.useEffect(() => {
    if (form.getFieldInstance('originator')) {
      form.setFieldsValue(value ?? InitialFormValues);
    }
  }, [value]);

  const Content = (
    <Form form={form} initialValues={value} validateTrigger={['onSubmit']} onFinish={handleSubmit}>
      <Form.Item label="Originator" name="originator" className="mb-32">
        <Select options={originatorOpts} className="full-width" />
      </Form.Item>
      <Form.Item label="Token" name="token" className="mb-32">
        <Select options={tokenOpts} className="full-width" />
      </Form.Item>
      {showWithdrawTypeFilter && (
        <Form.Item label="Withdraw type" name="withdrawType" className="mb-32">
          <Select options={withdrawOpts} className="full-width" />
        </Form.Item>
      )}
      <div className="grid flow-col align-center justify-space-between">
        <button type="button" onClick={() => form.resetFields()} className="button-text">
          Reset filters
        </button>
        <button type="submit" className="button-primary">
          Apply filters
        </button>
      </div>
    </Form>
  );

  return (
    <Popover
      title="Filters"
      overlayStyle={{ width: 348 }}
      content={Content}
      visible={filtersVisible}
      onVisibleChange={setFiltersVisible}
      placement="bottomRight">
      <button type="button" className="button-ghost-monochrome pv-16 mb-12 ml-auto">
        <Icon name="filter" className="mr-8" color="inherit" />
        Filters
      </button>
    </Popover>
  );
};

export default PositionsTableFilter;
