import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import AntdLayout from 'antd/lib/layout';
import cn from 'classnames';

import Button from 'components/antd/button';
import Tooltip from 'components/antd/tooltip';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon, { NavIconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/general-provider';
import { useTheme } from 'components/providers/theme-provider';

import s from './s.module.scss';

export type NavLinkProps = {
  icon: NavIconNames;
  label: string;
  path: string;
  expanded: boolean;
};

const NavLink: React.FC<NavLinkProps> = props => {
  const { icon, label, path, expanded } = props;

  const history = useHistory();
  const isActivePath = Boolean(useRouteMatch({ path, exact: path === '/' }));

  function handleClick() {
    history.push(path);
  }

  return (
    <Tooltip title={label} placement="right">
      <Grid flow="col" className={cn(s.navLink, isActivePath && s.isActive)}>
        <div className={s.activeTick} />
        <Button type="light" onClick={handleClick}>
          <Icon name={icon} />
          {expanded && (
            <Text type="p2" weight="semibold" className={s.linkLabel}>
              {label}
            </Text>
          )}
        </Button>
      </Grid>
    </Tooltip>
  );
};

const LayoutSideNav: React.FC = () => {
  const { toggleDarkTheme, isDarkTheme } = useTheme();
  const { navOpen, setNavOpen } = useGeneral();
  const location = useLocation();
  const [expanded, setExpanded] = React.useState<boolean>(false);

  React.useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  function handleExpand() {
    setExpanded(prevState => !prevState);
  }

  function handleThemeToggle() {
    toggleDarkTheme();
  }

  return (
    <>
      <div className={cn(s.mask, { [s.open]: navOpen })} />
      <AntdLayout.Sider
        className={cn(s.component, (expanded || navOpen) && s.expanded, {
          [s.open]: navOpen,
        })}
        collapsed={!expanded && !navOpen}
        collapsedWidth={72}
        width={200}>
        <Grid flow="col" gap={12} className={cn(s.headerLogo, 'mb-48')}>
          <button type="button" className={s.closeButton} onClick={() => setNavOpen(false)}>
            <Icon name="close-circle-outlined" />
          </button>
          <Icon name="bond-square-token" />
          {(expanded || navOpen) && <Icon name="barnbridge" width="113" color="primary" />}
        </Grid>
        <Grid flow="row" gap={24}>
          <NavLink label="Yield Farming" icon="savings-outlined" path="/yield-farming" expanded={expanded || navOpen} />
          <NavLink label="Governance" icon="bank-outlined" path="/governance" expanded={expanded || navOpen} />
          <NavLink label="Smart Yield" icon="paper-bill-outlined" path="/smart-yield" expanded={expanded || navOpen} />
        </Grid>
        <Grid flow="row" gap={24} className={s.footerWrap} colsTemplate="48px">
          <ExternalLink href="https://docs.barnbridge.com/">
            <Button type="light">
              <Icon name="docs-outlined" />
              {(expanded || navOpen) && (
                <Text type="p2" weight="semibold" className={s.linkLabel}>
                  Docs
                </Text>
              )}
            </Button>
          </ExternalLink>
          <Button type="light" onClick={handleThemeToggle}>
            <Icon name={isDarkTheme ? 'sun' : 'moon'} />
            {(expanded || navOpen) && (
              <Text type="p2" weight="semibold" className={s.linkLabel}>
                {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
              </Text>
            )}
          </Button>
          {!navOpen && (
            <Button type="light" className={s.hideLink} onClick={handleExpand}>
              <Icon name="right-arrow-circle-outlined" />
              {expanded && (
                <Text type="p2" weight="semibold" className={s.linkLabel}>
                  Hide menu
                </Text>
              )}
            </Button>
          )}
        </Grid>
      </AntdLayout.Sider>
    </>
  );
};

export default LayoutSideNav;
