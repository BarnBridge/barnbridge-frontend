import React from 'react';

import Button from 'components/antd/button';
import Input from 'components/antd/input';
import Popover, { PopoverProps } from 'components/antd/popover';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

export type AddZerosPopupProps = {
  max?: number;
  onAdd: (value: number) => void;
};

const AddZerosPopup: React.FC<PopoverProps & AddZerosPopupProps> = props => {
  const { max, onAdd, ...popoverProps } = props;
  const [visible, setVisible] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');

  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    setValue(ev.target.value);
  }

  function handleCancel() {
    setVisible(false);
    setValue('');
  }

  function handleAddZeros() {
    setVisible(false);

    const val = Number(value);

    if (!Number.isNaN(val)) {
      onAdd?.(val);
    }

    setValue('');
  }

  const content = (
    <Grid flow="row" gap={24}>
      <Grid flow="row" gap={8}>
        <Text type="small" weight="semibold" color="secondary">
          Number of zeros
        </Text>
        <Grid flow="col" gap={16}>
          <Button type="ghost" onClick={() => setValue('6')}>
            6
          </Button>
          <Button type="ghost" onClick={() => setValue('8')}>
            8
          </Button>
          <Button type="ghost" onClick={() => setValue('18')}>
            18
          </Button>
          <Input type="number" value={value} max={max} placeholder={`Max ${max}`} onChange={handleChange} />
        </Grid>
      </Grid>
      <Text type="p2" weight="semibold" color="secondary">
        Use the options above to add trailing zeros to the input amount.
      </Text>
      <Grid flow="col" gap={16} justify="space-between">
        <Button type="ghost" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" onClick={handleAddZeros}>
          Add zeros
        </Button>
      </Grid>
    </Grid>
  );

  return (
    <Popover
      title="Add zeros"
      placement="bottomLeft"
      overlayStyle={{ width: 376 }}
      content={content}
      visible={visible}
      onVisibleChange={setVisible}
      {...popoverProps}>
      <Button type="link" icon={<Icon name="plus-square-outlined" width={16} height={16} />} />
    </Popover>
  );
};

export default AddZerosPopup;
