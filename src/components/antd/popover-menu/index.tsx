import React from 'react';
import * as Antd from 'antd';
import { PopoverProps as AntdPopoverProps } from 'antd/lib/popover';
import { MenuInfo } from 'rc-menu/lib/interface';

import { Paragraph } from 'components/custom/typography';

import s from './styles.module.scss';

export type PopoverMenuItem = {
  key: string | number;
  icon: React.ReactNode;
  title: React.ReactNode;
};

export type PopoverMenuProps = AntdPopoverProps & {
  items: PopoverMenuItem[];
  onClick: (key: string | number) => void;
};

const PopoverMenu: React.FunctionComponent<PopoverMenuProps> = props => {
  const { children, items, onClick, ...popoverProps } = props;

  const popoverRef = React.useRef<any>();

  function handleMenuClick(info: MenuInfo) {
    props.onClick?.(info.key);
    (popoverRef.current as any)?.close()
  }

  return (
    <Antd.Popover
      ref={popoverRef}
      className={s.component}
      placement="bottom"
      trigger="click"
      content={(
        <Antd.Menu onClick={handleMenuClick}>
          {items?.map(item => (
            <Antd.Menu.Item key={item.key}>
              {item.icon}
              <Paragraph type="p1" semiBold>{item.title}</Paragraph>
            </Antd.Menu.Item>
          ))}
        </Antd.Menu>
      )} {...popoverProps}>
      {children}
    </Antd.Popover>
  );
};

export default PopoverMenu;
