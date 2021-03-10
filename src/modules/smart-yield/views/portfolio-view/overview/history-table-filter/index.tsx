import React, { useState } from 'react';
import AntdForm from 'antd/lib/form';

import Form from 'components/antd/form';
import Popover from 'components/antd/popover';
import Select, { SelectOption } from 'components/antd/select';
import Icon from 'components/custom/icon';
import { HistoryTypes } from 'modules/smart-yield/api';
import { SYPool } from 'modules/smart-yield/providers/pool-provider';

export type HistoryTableFilterValues = {
  originator: string;
  token: string;
  transactionType: string;
};

const InitialFormValues: HistoryTableFilterValues = {
  originator: 'all',
  token: 'all',
  transactionType: 'all',
};

type Props = {
  originators: SYPool[];
  onFiltersApply: (values: HistoryTableFilterValues) => void;
};

const HistoryTableFilter: React.FC<Props> = props => {
  const { originators, onFiltersApply } = props;
  const [form] = AntdForm.useForm<HistoryTableFilterValues>();
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

  const txOpts = React.useMemo<SelectOption[]>(() => {
    return [
      {
        label: 'All transactions',
        value: 'all',
      },
      ...Array.from(HistoryTypes.entries()).map(([value, label]) => ({
        label,
        value,
      })),
    ];
  }, []);

  function handleSubmit(values: HistoryTableFilterValues) {
    setFiltersVisible(false);
    onFiltersApply(values);
  }

  const Content = (
    <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={handleSubmit}>
      <Form.Item label="Originator" name="originator" className="mb-32">
        <Select options={originatorOpts} className="full-width" />
      </Form.Item>
      <Form.Item label="Token" name="token" className="mb-32">
        <Select options={tokenOpts} className="full-width" />
      </Form.Item>
      <Form.Item label="Transaction type" name="transactionType" className="mb-32">
        <Select options={txOpts} className="full-width" />
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
        Filters
      </button>
    </Popover>
  );
};

export default HistoryTableFilter;
