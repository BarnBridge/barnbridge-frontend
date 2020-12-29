import React from 'react';
import * as Antd from 'antd';
import { RadioGroupProps, RadioChangeEvent } from 'antd/lib/radio';
import cx from 'classnames';

import s from './styles.module.scss';

export type GasFeeListProps = RadioGroupProps & {
  className?: string;
};

function fetchGasPrice() {
  return fetch('https://ethgasstation.info/api/ethgasAPI.json')
    .then(result => result.json())
    .then(result => ({
      fastest: Math.round(result.fastest / 10),
      fast: Math.round(result.fast / 10),
      average: Math.round(result.average / 10),
      safeLow: Math.round(result.safeLow / 10),
    }));
}

const GasFeeList: React.FunctionComponent<GasFeeListProps> = props => {
  const { className, value, onChange, ...groupProps } = props;
  const [gasOptions, setGasOptions] = React.useState<[string, number][]>([]);

  React.useEffect(() => {
    fetchGasPrice()
      .then(prices => {
        setGasOptions([
          ['Very fast', prices.fastest],
          ['Fast', prices.fast],
          ['Standard', prices.average],
          ['Slow', prices.safeLow],
        ]);
      });
  }, []);

  function handleChange(ev: RadioChangeEvent) {
    const opt = gasOptions.find(opt => opt[0] === ev.target.value);

    if (opt) {
      props.onChange?.({
        ...ev,
        target: {
          ...ev.target,
          value: opt[1],
        },
      });
    }
  }

  const selectedValue = React.useMemo(() => {
    const opt = gasOptions.find(opt => opt[1] === value);

    if (opt) {
      return opt[0];
    }

    return undefined;
  }, [value, gasOptions]);

  return (
    <Antd.Radio.Group
      className={cx(s.group, className)}
      {...groupProps}
      value={selectedValue}
      onChange={handleChange}>
      {gasOptions.map(([label, value]) => (
        <Antd.Radio.Button key={label} value={label} className={s.option}>
          <div className={s.wrap}>
            <div className={s.info}>
              <label>{label}</label>
              <div><strong>{value}</strong> Gwei</div>
            </div>
            <div className={s.selector} />
          </div>
        </Antd.Radio.Button>
      ))}
    </Antd.Radio.Group>
  );
};

export default GasFeeList;
