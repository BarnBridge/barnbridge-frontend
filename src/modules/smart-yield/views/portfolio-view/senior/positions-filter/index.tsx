import React, { useState } from 'react';
import AntdForm from 'antd/lib/form';
import uniqBy from 'lodash/uniqBy';

import Form from 'components/antd/form';
import Popover from 'components/antd/popover';
import Select, { SelectOption } from 'components/antd/select';
import { SquareBadge } from 'components/custom/badge';
import Icon from 'components/custom/icon';
import { PoolsSYPool } from 'modules/smart-yield/providers/pools-provider';

export type PositionsFilterValues = {
  originator: string;
  token: string;
};

const InitialFormValues: PositionsFilterValues = {
  originator: 'all',
  token: 'all',
};

type Props = {
  originators: PoolsSYPool[];
  value?: PositionsFilterValues;
  onChange: (values: PositionsFilterValues) => void;
};

const PositionsFilter: React.FC<Props> = props => {
  const { originators, value = InitialFormValues, onChange } = props;
  const [form] = AntdForm.useForm<PositionsFilterValues>();
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

  const originatorOpts = React.useMemo<SelectOption[]>(() => {
    return [
      {
        label: 'All originators',
        value: 'all',
      },
      ...uniqBy(
        originators.map(originator => ({
          label: originator.market?.name ?? '-',
          value: originator.protocolId,
        })),
        'value',
      ),
    ];
  }, [originators]);

  const tokenOpts = React.useMemo<SelectOption[]>(() => {
    return [
      {
        label: 'All tokens',
        value: 'all',
      },
      ...uniqBy(
        originators.map(originator => ({
          label: originator.meta?.name ?? '-',
          value: originator.underlyingAddress,
        })),
        'value',
      ),
    ];
  }, [originators]);

  const countApplied = React.useMemo(() => {
    let count = 0;

    if (value.originator !== 'all') {
      count += 1;
    }

    if (value.token !== 'all') {
      count += 1;
    }

    return count;
  }, [value]);

  React.useEffect(() => {
    if (value !== InitialFormValues) {
      form.setFieldsValue(value ?? InitialFormValues);
    }
  }, [value]);

  function handleSubmit(values: PositionsFilterValues) {
    setFiltersVisible(false);
    onChange(values);
  }

  const Content = (
    <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={handleSubmit}>
      <Form.Item label="Originator" name="originator" className="mb-32">
        <Select options={originatorOpts} className="full-width" />
      </Form.Item>
      <Form.Item label="Token" name="token" className="mb-32">
        <Select options={tokenOpts} className="full-width" />
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
  );

  return (
    <Popover
      title="Filters"
      overlayStyle={{ width: 348 }}
      content={Content}
      visible={filtersVisible}
      onVisibleChange={setFiltersVisible}
      placement="bottomRight">
      <button type="button" className="button-ghost-monochrome pv-16 ml-auto">
        <Icon name="filter" className="mr-8" color="inherit" />
        <span className="mr-8">Filters</span>
        <SquareBadge>{countApplied}</SquareBadge>
      </button>
    </Popover>
  );
};

export default PositionsFilter;
