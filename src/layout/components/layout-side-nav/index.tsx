/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import Tooltip from 'components/antd/tooltip';
import OldIcon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { Icon, IconNames } from 'components/icon';
import { useConfig } from 'components/providers/configProvider';
import { useGeneral } from 'components/providers/generalProvider';

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
            <OldIcon name="bond-square-token" />
            <OldIcon name="barnbridge" width="113" color="primary" className={s.logoLabel} />
          </Link>
        </div>
        <nav className={s.top}>
          {features.faucets && (
            <NavLink to="/faucets" className={s.button} activeClassName={s.active}>
              <Tooltip title={displayTooltip && 'Faucets'} placement="right">
                <Icon name="menu-faucet" size={40} />
              </Tooltip>
              <div className={s.btnContent}>
                <Text type="lb2" weight="bold" className={s.btnLabel} color="blue">
                  DAO
                </Text>
                <Text type="lb1" weight="semibold" className={s.btnText}>
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
                <Text type="lb2" weight="bold" className={s.btnLabel} color="blue">
                  DAO
                </Text>
                <Text type="lb1" weight="semibold" className={s.btnText}>
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
                <Text type="lb2" weight="bold" className={s.btnLabel} color="blue">
                  DAO
                </Text>
                <Text type="lb1" weight="semibold" className={s.btnText}>
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
                <Text type="lb2" weight="bold" className={s.btnLabel} color="red">
                  SMART
                </Text>
                <Text type="lb1" weight="semibold" className={s.btnText}>
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
                <Text type="lb2" weight="bold" className={s.btnLabel} color="red">
                  SMART
                </Text>
                <Text type="lb1" weight="semibold" className={s.btnText}>
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
                <Text type="lb2" weight="bold" className={s.btnLabel} color="red">
                  SMART
                </Text>
                <Text type="lb1" weight="semibold" className={s.btnText}>
                  Exposure
                </Text>
              </div>
            </NavLink>
          )}
        </nav>
        <div className={s.bottom}>
          <a rel="noopener noreferrer" target="_blank" href="https://docs.barnbridge.com/" className={s.button}>
            <Tooltip title={displayTooltip && 'Docs'} placement="right">
              <Icon name="menu-docs" size={40} />
            </Tooltip>
            <div className={s.btnContent}>
              <Text type="lb1" weight="semibold" className={s.btnLabel} color="primary">
                Docs
              </Text>
            </div>
          </a>
          <ToggleThemeButton displayTooltip={displayTooltip} />
        </div>
      </aside>
    </div>
  );
};

export default LayoutSideNav;

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
    <button type="button" onClick={toggleTheme} className={s.button}>
      <Tooltip title={displayTooltip && text} placement="right">
        <Icon name={iconName} size={40} />
      </Tooltip>
      <div className={s.btnContent}>
        <Text type="lb1" weight="semibold" className={s.btnLabel}>
          {text}
        </Text>
      </div>
    </button>
  );
};
