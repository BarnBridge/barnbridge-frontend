/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

import Tooltip from 'components/antd/tooltip';
import Icon, { IconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useConfig } from 'components/providers/configProvider';
import { useGeneral } from 'components/providers/generalProvider';

import s from './s.module.scss';

const LayoutSideNav: React.FC = () => {
  const { navOpen, setNavOpen } = useGeneral();
  const { features } = useConfig();
  const location = useLocation();
  const [expanded, setExpanded] = React.useState<boolean>(false);

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
    <>
      <div className={cn(s.mask, { [s.open]: navOpen })} onClick={() => setNavOpen(false)} />
      <aside className={cn(s.aside, { [s.expanded]: expanded, [s.open]: navOpen })}>
        <div className={s.logoContainer}>
          <button type="button" className={s.closeButton} onClick={() => setNavOpen(false)}>
            <Icon name="close-circle-outlined" />
          </button>
          <Link to="/" className={s.logo}>
            <Icon name="bond-square-token" />
            <Icon name="barnbridge" width="113" color="primary" className={s.logoLabel} />
          </Link>
        </div>
        <nav className={s.top}>
          {features.faucets && (
            <Tooltip title={displayTooltip && 'Faucets'} placement="right">
              <NavLink to="/faucets" className={s.button} activeClassName={s.active}>
                <Icon name="building" />
                <Text type="p2" weight="semibold" className={s.buttonLabel}>
                  Faucets
                </Text>
              </NavLink>
            </Tooltip>
          )}
          {features.yieldFarming && (
            <Tooltip title={displayTooltip && 'Yield Farming'} placement="right">
              <NavLink to="/yield-farming" className={s.button} activeClassName={s.active}>
                <Icon name="tractor-outlined" />
                <Text type="p2" weight="semibold" className={s.buttonLabel}>
                  Yield Farming
                </Text>
              </NavLink>
            </Tooltip>
          )}
          {features.dao && (
            <Tooltip title={displayTooltip && 'Governance'} placement="right">
              <NavLink to="/governance" className={s.button} activeClassName={s.active}>
                <Icon name="bank-outlined" />
                <Text type="p2" weight="semibold" className={s.buttonLabel}>
                  Governance
                </Text>
              </NavLink>
            </Tooltip>
          )}
          {features.smartYield && (
            <Tooltip title={displayTooltip && 'SMART Yield'} placement="right">
              <NavLink to="/smart-yield" className={s.button} activeClassName={s.active}>
                <Icon name="paper-bill-outlined" />
                <Text type="p2" weight="semibold" className={s.buttonLabel}>
                  SMART Yield
                </Text>
              </NavLink>
            </Tooltip>
          )}
          {features.smartExposure && (
            <Tooltip title={displayTooltip && 'SMART Exposure'} placement="right">
              <NavLink to="/smart-exposure" className={s.button} activeClassName={s.active}>
                <Icon name="balance" />
                <Text type="p2" weight="semibold" className={s.buttonLabel}>
                  SMART Exposure
                </Text>
              </NavLink>
            </Tooltip>
          )}
          {features.smartAlpha && (
            <Tooltip title={displayTooltip && 'SMART Alpha'} placement="right">
              <NavLink to="/smart-alpha" className={s.button} activeClassName={s.active}>
                <Icon name="paper-alpha-outlined" />
                <Text type="p2" weight="semibold" className={s.buttonLabel}>
                  SMART Alpha
                </Text>
              </NavLink>
            </Tooltip>
          )}
        </nav>
        <div className={s.bottom}>
          <Tooltip title={displayTooltip && 'Docs'} placement="right">
            <a rel="noopener noreferrer" target="_blank" href="https://docs.barnbridge.com/" className={s.button}>
              <Icon name="docs-outlined" />
              <Text type="p2" weight="semibold" className={s.buttonLabel}>
                Docs
              </Text>
            </a>
          </Tooltip>
          <ToggleThemeButton displayTooltip={displayTooltip} />
          <Tooltip title={displayTooltip && (expanded ? 'Hide menu' : 'Show menu')} placement="right">
            <button type="button" onClick={handleExpand} className={cn(s.button, 'hidden-mobile hidden-tablet')}>
              <Icon name="right-arrow-circle-outlined" style={{ transform: expanded ? 'rotate(-180deg)' : 'none' }} />
              <Text type="p2" weight="semibold" className={s.buttonLabel}>
                Hide menu
              </Text>
            </button>
          </Tooltip>
        </div>
      </aside>
    </>
  );
};

export default LayoutSideNav;

const ToggleThemeButton = ({ displayTooltip }: { displayTooltip: boolean }) => {
  const { toggleTheme, selectedTheme } = useGeneral();

  let text;
  let iconName: IconNames;
  if (selectedTheme === 'light') {
    text = 'Light Theme';
    iconName = 'sun';
  } else if (selectedTheme === 'dark') {
    text = 'Dark Theme';
    iconName = 'moon';
  } else {
    text = 'Auto Theme (OS)';
    iconName = 'weather';
  }

  return (
    <Tooltip title={displayTooltip && text} placement="right">
      <button type="button" onClick={toggleTheme} className={s.button}>
        <Icon name={iconName} />
        <Text type="p2" weight="semibold" className={s.buttonLabel}>
          {text}
        </Text>
      </button>
    </Tooltip>
  );
};
