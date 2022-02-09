/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import Tooltip from 'components/antd/tooltip';
import { Button } from 'components/button';
import IconOld from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { Icon, IconNames } from 'components/icon';
import { Modal } from 'components/modal';
import { useConfig } from 'components/providers/configProvider';
import { useGeneral } from 'components/providers/generalProvider';
import { useNetwork } from 'components/providers/networkProvider';
import { useNotifications } from 'components/providers/notificationsProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import Notifications from 'wallets/components/notifications';

import s from './s.module.scss';

const LayoutSideNav: React.FC = () => {
  const { navOpen, setNavOpen } = useGeneral();
  const { features } = useConfig();
  const location = useLocation();

  React.useEffect(() => {
    setNavOpen(false);
  }, [location.pathname, setNavOpen]);

  React.useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [navOpen]);

  const displayTooltip = !isMobile && !navOpen;

  return (
    <div className={s.wrap}>
      <div className={cn('hidden-desktop', s.mask, { [s.open]: navOpen })} onClick={() => setNavOpen(false)} />
      <aside className={cn(s.aside, { [s.expanded]: navOpen, [s.open]: navOpen })}>
        <div className={s.logoContainer}>
          <button type="button" className={s.closeButton} onClick={() => setNavOpen(false)}>
            <Icon name="close" />
          </button>
          <Link to="/" className={s.logo}>
            <IconOld name="bond-square-token" />
            <IconOld name="barnbridge" width="113" color="primary" className={s.logoLabel} />
          </Link>
        </div>
        <nav className={s.top}>
          {features.faucets && (
            <NavLink to="/faucets" className={s.button} activeClassName={s.active}>
              <Tooltip title={displayTooltip && 'Faucets'} placement="right">
                <Icon name="menu-faucet" size={40} />
              </Tooltip>
              <div className={s.btnContent}>
                <Text type="caption" weight="bold" className={s.btnLabel} color="blue">
                  DAO
                </Text>
                <Text type="caption" weight="semibold" className={s.btnText}>
                  Faucets
                </Text>
              </div>
            </NavLink>
          )}
          {features.yieldFarming && (
            <NavLink to="/yield-farming" className={s.button} activeClassName={s.active}>
              <Tooltip title={displayTooltip && 'Yield Farming'} placement="right">
                <Icon name="menu-yf" size={40} />
              </Tooltip>
              <div className={s.btnContent}>
                <Text type="caption" weight="bold" className={s.btnLabel} color="blue">
                  DAO
                </Text>
                <Text type="caption" weight="semibold" className={s.btnText}>
                  Yield Farming
                </Text>
              </div>
            </NavLink>
          )}
          {features.dao && (
            <NavLink to="/governance" className={s.button} activeClassName={s.active}>
              <Tooltip title={displayTooltip && 'Governance'} placement="right">
                <Icon name="menu-dao" size={40} />
              </Tooltip>
              <div className={s.btnContent}>
                <Text type="caption" weight="bold" className={s.btnLabel} color="blue">
                  DAO
                </Text>
                <Text type="caption" weight="semibold" className={s.btnText}>
                  Governance
                </Text>
              </div>
            </NavLink>
          )}
          {features.smartYield && (
            <NavLink to="/smart-yield" className={s.button} activeClassName={s.active}>
              <Tooltip title={displayTooltip && 'SMART Yield'} placement="right">
                <Icon name="menu-sy" size={40} />
              </Tooltip>
              <div className={s.btnContent}>
                <Text type="caption" weight="bold" className={s.btnLabel} color="red">
                  SMART
                </Text>
                <Text type="caption" weight="semibold" className={s.btnText}>
                  Yield
                </Text>
              </div>
            </NavLink>
          )}
          {features.smartAlpha && (
            <NavLink to="/smart-alpha" className={s.button} activeClassName={s.active}>
              <Tooltip title={displayTooltip && 'SMART Alpha'} placement="right">
                <Icon name="menu-sa" size={40} />
              </Tooltip>
              <div className={s.btnContent}>
                <Text type="caption" weight="bold" className={s.btnLabel} color="red">
                  SMART
                </Text>
                <Text type="caption" weight="semibold" className={s.btnText}>
                  Alpha
                </Text>
              </div>
            </NavLink>
          )}
          {features.smartExposure && (
            <NavLink to="/smart-exposure" className={s.button} activeClassName={s.active}>
              <Tooltip title={displayTooltip && 'SMART Exposure'} placement="right">
                <Icon name="menu-se" size={40} />
              </Tooltip>
              <div className={s.btnContent}>
                <Text type="caption" weight="bold" className={s.btnLabel} color="red">
                  SMART
                </Text>
                <Text type="caption" weight="semibold" className={s.btnText}>
                  Exposure
                </Text>
              </div>
            </NavLink>
          )}
        </nav>
        <div className={s.bottom}>
          <NotificationsAction displayTooltip={displayTooltip} />
          <NetworkAction displayTooltip={displayTooltip} />
          <ToggleThemeButton displayTooltip={displayTooltip} />
        </div>
      </aside>
    </div>
  );
};

export default LayoutSideNav;

const NotificationsAction: React.FC<{ displayTooltip: boolean }> = ({ displayTooltip }) => {
  const { setNotificationsReadUntil, notifications, notificationsReadUntil } = useNotifications();
  const [open, setOpen] = useState(false);

  const markAllAsRead = () => {
    if (notifications.length) {
      setNotificationsReadUntil(Math.max(...notifications.map(n => n.startsOn)));
    }
  };
  const hasUnread = notificationsReadUntil ? notifications.some(n => n.startsOn > notificationsReadUntil) : false;

  return (
    <>
      {open && (
        <Modal
          heading={
            <Text type="h3" weight="bold" color="primary">
              Notifications
            </Text>
          }
          closeHandler={() => setOpen(false)}>
          <div className="flex">
            {hasUnread && (
              <Button type="button" variation="link" className="ml-auto" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
          <Notifications />
        </Modal>
      )}
      <button type="button" className={s.button} onClick={() => setOpen(prevOpen => !prevOpen)}>
        <Tooltip title={displayTooltip && 'Notifications'} placement={isMobile ? 'right' : 'left'}>
          <div style={{ width: 40, height: 40, flexShrink: 0 }} className="flex align-center justify-center">
            <Icon name={hasUnread ? 'notification-active' : 'notification'} size={40} />
          </div>
        </Tooltip>
        <div className={s.btnContent}>
          <Text type="caption" weight="semibold">
            Notifications
          </Text>
        </div>
      </button>
    </>
  );
};

const NetworkAction: React.FC<{ displayTooltip: boolean }> = ({ displayTooltip }) => {
  const { activeNetwork } = useNetwork();
  const { showNetworkSelect } = useWeb3();

  return (
    <button type="button" onClick={() => showNetworkSelect()} className={cn(s.button, 'hidden-desktop')}>
      <Tooltip title={displayTooltip && activeNetwork.meta.name} placement={isMobile ? 'right' : 'left'}>
        <Icon name={activeNetwork.meta.logo} size={40} />
      </Tooltip>
      <Tooltip title={activeNetwork.meta.name} placement={isMobile ? 'right' : 'left'}>
        <Text type="caption" weight="semibold" className={s.btnContent} ellipsis>
          {activeNetwork.meta.name}
        </Text>
      </Tooltip>
    </button>
  );
};

const ToggleThemeButton = ({ displayTooltip }: { displayTooltip: boolean }) => {
  const { toggleTheme, selectedTheme } = useGeneral();

  let text;
  let iconName: IconNames;

  if (selectedTheme === 'light') {
    text = 'Light Theme';
    iconName = 'menu-theme-light';
  } else if (selectedTheme === 'dark') {
    text = 'Dark Theme';
    iconName = 'menu-theme-dark';
  } else {
    text = 'Auto Theme (OS)';
    iconName = 'menu-theme-auto';
  }

  return (
    <button type="button" onClick={toggleTheme} className={cn(s.themeButton, s.button)}>
      <Tooltip title={displayTooltip && text} placement={isMobile ? 'right' : 'left'}>
        <Icon name={iconName} size={40} />
      </Tooltip>
      <div className={s.btnContent}>
        <Text type="caption" weight="semibold">
          {text}
        </Text>
      </div>
    </button>
  );
};
