import React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import * as Antd from 'antd';
import cx from 'classnames';

import Button from 'components/antd/button';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import Icons, { NavIconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useTheme } from 'components/providers/theme-provider';
import { useGeneral } from 'components/providers/general-provider';

import s from './styles.module.scss';
import ExternalLink from 'components/custom/externalLink';

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
      <Grid flow="col" className={cx(s.navLink, isActivePath && s.isActive)}>
        <div className={s.activeTick} />
        <Button type="light" onClick={handleClick}>
          <Icons name={icon} />
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
      <div className={cx(s.mask, { [s.open]: navOpen })} />
      <Antd.Layout.Sider
        className={cx(s.component, (expanded || navOpen) && s.expanded, {
          [s.open]: navOpen,
        })}
        collapsed={!expanded && !navOpen}
        collapsedWidth={72}
        width={200}>
        <Grid flow="col" gap={12} className={cx(s.headerLogo, 'mb-48')}>
          <button type="button" className={s.closeButton} onClick={() => setNavOpen(false)}>
            <Icons name="close-circle-outlined" />
          </button>
          <Icons name="bond-square-token" />
          {(expanded || navOpen) && <Icons name="barnbridge" width="113" color="primary" />}
        </Grid>
        <Grid flow="row" gap={24}>
          <NavLink label="Yield Farming" icon="savings-outlined" path="/yield-farming" expanded={(expanded || navOpen)} />
          <NavLink label="Governance" icon="bank-outlined" path="/governance" expanded={(expanded || navOpen)} />
          <NavLink label="Smart Yield" icon="paper-bill-outlined" path="/smart-yield" expanded={(expanded || navOpen)} />
        </Grid>
        <Grid flow="row" gap={48} className={s.footerWrap} colsTemplate="48px">
          <ExternalLink href="https://docs.barnbridge.com/">
            <Button type="light">
              <Icons name="docs-outlined" />
              {(expanded || navOpen) && (
                <Text type="p2" weight="semibold" className={s.linkLabel}>
                  Docs
                </Text>
              )}
            </Button>
          </ExternalLink>
          <Button type="light" onClick={handleThemeToggle}>
            <Icons name={isDarkTheme ? 'sun' : 'moon'} />
            {(expanded || navOpen) && (
              <Text type="p2" weight="semibold" className={s.linkLabel}>
                {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
              </Text>
            )}
          </Button>
          {!navOpen && <Button type="light" className={s.hideLink} onClick={handleExpand}>
            <Icons name="right-arrow-circle-outlined" />
            {expanded && (
              <Text type="p2" weight="semibold" className={s.linkLabel}>
                Hide menu
              </Text>
            )}
          </Button>}
        </Grid>
      </Antd.Layout.Sider>
    </>
  );
};

export default LayoutSideNav;
