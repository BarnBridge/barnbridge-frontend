import React from 'react';
import AntdMenu from 'antd/lib/menu';
import AntdPopover, { PopoverProps as AntdPopoverProps } from 'antd/lib/popover';
import { MenuInfo } from 'rc-menu/lib/interface';

import s from './s.module.scss';

export type PopoverMenuItem = {
  key: string | number;
  icon?: React.ReactNode;
  title?: React.ReactNode;
};

export type PopoverMenuProps = AntdPopoverProps & {
  items: PopoverMenuItem[];
  onClick: (key: string | number) => void;
};

const PopoverMenu: React.FC<PopoverMenuProps> = props => {
  const { children, items, onClick, ...popoverProps } = props;

  const popoverRef = React.useRef<any>();

  function handleMenuClick(info: MenuInfo) {
    props.onClick?.(info.key);
    (popoverRef.current as any)?.close();
  }

  return (
    <AntdPopover
      ref={popoverRef}
      overlayClassName={s.component}
      placement="bottom"
      trigger="click"
      content={
        <AntdMenu onClick={handleMenuClick}>
          {items?.map(item => (
            <AntdMenu.Item key={item.key}>
              {item.icon}
              {item.title}
            </AntdMenu.Item>
          ))}
        </AntdMenu>
      }
      {...popoverProps}>
      {children}
    </AntdPopover>
  );
};

export default PopoverMenu;
