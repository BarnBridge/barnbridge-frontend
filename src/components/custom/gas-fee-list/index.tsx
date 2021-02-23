import React from 'react';
import * as Antd from 'antd';
import { RadioGroupProps, RadioChangeEvent } from 'antd/lib/radio';

import RadioButton from 'components/antd/radio-button';
import Grid from 'components/custom/grid';
import { Paragraph } from 'components/custom/typography';

import useMergeState from 'hooks/useMergeState';
import { fetchGasPrice } from 'web3/utils';

type GasFeeOption = {
  key: string;
  name: string;
  value: number;
};

type GasFeeListState = {
  options: GasFeeOption[];
  loading: boolean;
  selected?: GasFeeOption;
};

export type GasFeeListProps = RadioGroupProps & {
  value?: GasFeeOption;
  onChange?: (value: GasFeeOption) => void;
};

const GasFeeList: React.FunctionComponent<GasFeeListProps> = props => {
  const { className, value, onChange, ...groupProps } = props;

  const [state, setState] = useMergeState<GasFeeListState>({
    options: [],
    loading: false,
    selected: undefined,
  });

  React.useEffect(() => {
    setState({
      loading: true,
    });

    fetchGasPrice()
      .then(result => {
        const options = [
          {
            key: 'fastest',
            name: 'Very fast',
            value: result.veryFast,
          },
          {
            key: 'fast',
            name: 'Fast',
            value: result.fast,
          },
          {
            key: 'average',
            name: 'Standard',
            value: result.average,
          },
          {
            key: 'safeLow',
            name: 'Slow',
            value: result.safeLow,
          },
        ];

        setState({
          loading: false,
          options,
        });
      })
      .catch(() => {
        setState({
          loading: false,
        });
      });
  }, []);

  React.useEffect(() => {
    if (value === undefined && state.options.length > 2) {
      props.onChange?.(state.options[2]);
    }
  }, [value, state.options]);

  function handleChange(ev: RadioChangeEvent) {
    props.onChange?.(ev.target.value);
  }

  React.useEffect(() => {
    setState({
      selected: value,
    });
  }, [value]);

  return (
    <Antd.Radio.Group
      className={className}
      style={{ width: '100%' }}
      {...groupProps}
      value={state.selected}
      onChange={handleChange}>
      {state.loading ? (
        <Antd.Spin />
      ) : (
        <Grid gap={16} colsTemplate="minmax(166px, 1fr) minmax(166px, 1fr)">
          {state.options.map(option => (
            <RadioButton
              key={option.key}
              label={
                <Paragraph type="p1" semiBold color="grey900">
                  {option.name}
                </Paragraph>
              }
              hint={
                <Grid flow="col" gap={4}>
                  <Paragraph type="p1" semiBold color="grey900">
                    {option.value}
                  </Paragraph>
                  <Paragraph type="p2" color="grey500">
                    Gwei
                  </Paragraph>
                </Grid>
              }
              value={option}
            />
          ))}
        </Grid>
      )}
    </Antd.Radio.Group>
  );
};

export default GasFeeList;
