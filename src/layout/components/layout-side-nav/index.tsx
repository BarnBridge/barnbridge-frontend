/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
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

  const [expanded, setExpanded] = useState(false);

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

  function handleExpand() {
    setExpanded(prevState => !prevState);
  }

  const displayTooltip = !isMobile && !expanded;

  return (
    <div className={s.wrap}>
      <div className={cn(s.mask, { [s.open]: navOpen })} onClick={() => setNavOpen(false)} />
      <aside className={cn(s.aside, { [s.expanded]: expanded, [s.open]: navOpen })}>
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
            <Tooltip title={displayTooltip && 'Faucets'} placement="right">
              <NavLink to="/faucets" className={s.button} activeClassName={s.active}>
                <Icon name="menu-faucet" size={40} static />
                <div className={s.btnContent}>
                  <Text type="lb2" weight="bold" className={s.btnLabel} color="blue">
                    DAO
                  </Text>
                  <Text type="lb1" weight="semibold" className={s.btnText}>
                    Faucets
                  </Text>
                </div>
              </NavLink>
            </Tooltip>
          )}
          {features.yieldFarming && (
            <Tooltip title={displayTooltip && 'Yield Farming'} placement="right">
              <NavLink to="/yield-farming" className={s.button} activeClassName={s.active}>
                <Icon name="menu-yf" size={40} static />
                <div className={s.btnContent}>
                  <Text type="lb2" weight="bold" className={s.btnLabel} color="blue">
                    DAO
                  </Text>
                  <Text type="lb1" weight="semibold" className={s.btnText}>
                    Yield Farming
                  </Text>
                </div>
              </NavLink>
            </Tooltip>
          )}
          {features.dao && (
            <Tooltip title={displayTooltip && 'Governance'} placement="right">
              <NavLink to="/governance" className={s.button} activeClassName={s.active}>
                <Icon name="menu-dao" size={40} static />
                <div className={s.btnContent}>
                  <Text type="lb2" weight="bold" className={s.btnLabel} color="blue">
                    DAO
                  </Text>
                  <Text type="lb1" weight="semibold" className={s.btnText}>
                    Governance
                  </Text>
                </div>
              </NavLink>
            </Tooltip>
          )}
          {features.smartYield && (
            <Tooltip title={displayTooltip && 'SMART Yield'} placement="right">
              <NavLink to="/smart-yield" className={s.button} activeClassName={s.active}>
                <Icon name="menu-sy" size={40} static />
                <div className={s.btnContent}>
                  <Text type="lb2" weight="bold" className={s.btnLabel} color="red">
                    SMART
                  </Text>
                  <Text type="lb1" weight="semibold" className={s.btnText}>
                    Yield
                  </Text>
                </div>
              </NavLink>
            </Tooltip>
          )}
          {features.smartAlpha && (
            <Tooltip title={displayTooltip && 'SMART Alpha'} placement="right">
              <NavLink to="/smart-alpha" className={s.button} activeClassName={s.active}>
                <Icon name="menu-sa" size={40} static />
                <div className={s.btnContent}>
                  <Text type="lb2" weight="bold" className={s.btnLabel} color="red">
                    SMART
                  </Text>
                  <Text type="lb1" weight="semibold" className={s.btnText}>
                    Alpha
                  </Text>
                </div>
              </NavLink>
            </Tooltip>
          )}
          {features.smartExposure && (
            <Tooltip title={displayTooltip && 'SMART Exposure'} placement="right">
              <NavLink to="/smart-exposure" className={s.button} activeClassName={s.active}>
                <Icon name="menu-se" size={40} static />
                <div className={s.btnContent}>
                  <Text type="lb2" weight="bold" className={s.btnLabel} color="red">
                    SMART
                  </Text>
                  <Text type="lb1" weight="semibold" className={s.btnText}>
                    Exposure
                  </Text>
                </div>
              </NavLink>
            </Tooltip>
          )}
        </nav>
        <div className={s.bottom}>
          <Tooltip title={displayTooltip && 'Docs'} placement="right">
            <a rel="noopener noreferrer" target="_blank" href="https://docs.barnbridge.com/" className={s.button}>
              <Icon name="menu-docs" size={40} static />
              <div className={s.btnContent}>
                <Text type="lb1" weight="semibold" className={s.btnLabel} color="primary">
                  Docs
                </Text>
              </div>
            </a>
          </Tooltip>
          <ToggleThemeButton displayTooltip={displayTooltip} />
        </div>
      </aside>
      <button type="button" className={cn('button-text', s.asideBtn)} onClick={handleExpand}>
        <Icon name="circle-arrow" rotate={expanded ? 180 : 0} />
      </button>
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
    <Tooltip title={displayTooltip && text} placement="right">
      <button type="button" onClick={toggleTheme} className={s.button}>
        <Icon name={iconName} size={40} static />
        <div className={s.btnContent}>
          <Text type="lb1" weight="semibold" className={s.btnLabel}>
            {text}
          </Text>
        </div>
      </button>
    </Tooltip>
  );
};
