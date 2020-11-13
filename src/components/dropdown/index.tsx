import React from 'react';
import * as Antd from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { CaretDownOutlined } from '@ant-design/icons';
import cx from 'classnames';

import s from './styles.module.css';

export type DropdownOption = {
  value: string | number;
  label: string;
};

export type DropdownProps = {
  className?: string;
  button?: boolean;
  label?: string;
  items: DropdownOption[];
  selected?: string | number;
  disabled?: boolean;
  onSelect?: (selected: string | number) => void;
};

const Dropdown: React.FunctionComponent<DropdownProps> = props => {
  const { className, button, label, items, selected, disabled } = props;

  const propsRef = React.useRef(props);
  propsRef.current = props;

  const menu = React.useMemo(() => {
    const onSelect = ({ key }: MenuInfo) => {
      propsRef.current.onSelect?.(key);
    };

    return (
      <Antd.Menu selectedKeys={[String(selected)]} onClick={onSelect}>
        {items.map(item => (
          <Antd.Menu.Item key={item.value}>
            {item.label}
          </Antd.Menu.Item>
        ))}
      </Antd.Menu>
    );
  }, [items, selected]);

  const selectedItem = React.useMemo<DropdownOption | undefined>(() => {
    return items.find(item => String(item.value) === String(selected));
  }, [items, selected]);

  return (
    <Antd.Dropdown className={cx(s.component, className)} overlay={menu} disabled={disabled}>
      {button ? (
        <Antd.Button>
          {label && (
            <span className={s.label}>{label}</span>
          )}
          {selectedItem && (
            <span className={s.selected}>{selectedItem?.label}</span>
          )}
          <CaretDownOutlined className={s.caret} />
        </Antd.Button>
      ) : (
        <a href="?" onClick={e => e.preventDefault()}>
          <span className={s.selected}>{selectedItem?.label || label}</span>
          <CaretDownOutlined />
        </a>
      )}
    </Antd.Dropdown>
  );
};

export default Dropdown;
