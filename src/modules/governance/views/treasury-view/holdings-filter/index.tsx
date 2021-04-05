import React, { useState } from 'react';
import AntdForm from 'antd/lib/form';

import Form from 'components/antd/form';
import Popover from 'components/antd/popover';
import Badge from 'components/custom/badge';
import Icon from 'components/custom/icon';

// const Filter: React.FC<Props2> = props => {
//   const originatorOpts = React.useMemo<SelectOption[]>(() => {
//     return [
//       {
//         label: 'All originators',
//         value: 'all',
//       },
//       ...uniqBy(
//         originators.map(originator => ({
//           label: originator.market?.name ?? '-',
//           value: originator.protocolId,
//         })),
//         'value',
//       ),
//     ];
//   }, [originators]);
//
//   const tokenOpts = React.useMemo<SelectOption[]>(() => {
//     return [
//       {
//         label: 'All tokens',
//         value: 'all',
//       },
//       ...uniqBy(
//         originators.map(originator => ({
//           label: originator.meta?.name ?? '-',
//           value: originator.underlyingAddress,
//         })),
//         'value',
//       ),
//     ];
//   }, [originators]);
//
// };

type Props = {
  filters: {
    name: string;
    label: string;
    itemRender: () => React.ReactNode;
    defaultValue: any;
  }[];
  value?: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
};

const TableFilter: React.FC<Props> = props => {
  const { filters, value, onChange } = props;

  const [form] = AntdForm.useForm<Record<string, any>>();
  const [visible, setVisible] = useState<boolean>(false);

  const initialValues = React.useMemo(
    () =>
      filters.reduce((a, c) => {
        return {
          ...a,
          [c.name]: c.defaultValue,
        };
      }, {}),
    [filters],
  );

  const countApplied = React.useMemo(() => {
    let count = 0;

    if (value) {
      filters.forEach(filter => {
        if (value[filter.name] !== filter.defaultValue) {
          count++;
        }
      });
    }

    return count;
  }, [filters, value]);

  React.useEffect(() => {
    if (value) {
      form.setFieldsValue(value);
    }
  }, [value]);

  function handleSubmit(values: Record<string, any>) {
    setVisible(false);
    onChange(values);
  }

  const Content = (
    <Form form={form} initialValues={initialValues} validateTrigger={['onSubmit']} onFinish={handleSubmit}>
      {filters.map(filter => (
        <Form.Item key={filter.name} name={filter.name} label={filter.label} className="mb-32">
          {filter.itemRender()}
        </Form.Item>
      ))}
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
      visible={visible}
      onVisibleChange={setVisible}
      placement="bottomRight">
      <button type="button" className="button-ghost-monochrome pv-16">
        <Icon name="filter" className="mr-8" color="inherit" />
        <span className="mr-8">Filters</span>
        <Badge>{countApplied}</Badge>
      </button>
    </Popover>
  );
};

export default TableFilter;
