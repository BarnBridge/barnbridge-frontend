import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Antd from 'antd';
import cx from 'classnames';

import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons, { NavIconNames } from 'components/custom/icon';
import { useTheme } from 'components/providers/theme-provider';

import s from './styles.module.scss';

export type NavLinkProps = {
  icon: NavIconNames;
  label: string;
  path: string;
  expanded: boolean;
};

const NavLink: React.FunctionComponent<NavLinkProps> = props => {
  const { icon, label, path, expanded } = props;

  const history = useHistory();
  const isActivePath = Boolean(useRouteMatch({ path, exact: path === '/' }));

  function handleClick() {
    history.push(path);
  }

  return (
    <Antd.Tooltip title={label} placement="right">
      <Grid flow="col" className={s.navLink}>
        <div className={cx(s.activeTick, isActivePath && s.activeTickVisible)} />
        <Button type="link" onClick={handleClick}>
          <Icons name={icon} />
          {expanded && label}
        </Button>
      </Grid>
    </Antd.Tooltip>
  );
};

export type LayoutSideNavProps = {
  className?: string;
};

const LayoutSideNav: React.FunctionComponent<LayoutSideNavProps> = props => {
  const { toggleDarkTheme, isDarkTheme } = useTheme();
  const [expanded, setExpanded] = React.useState<boolean>(false);

  function handleExpand() {
    setExpanded(prevState => !prevState);
  }

  function handleThemeToggle() {
    toggleDarkTheme();
  }

  return (
    <Antd.Layout.Sider
      className={cx(s.component, expanded && s.expanded)}
      collapsed={!expanded}
      collapsedWidth={72}
      width={200}>
      <Grid flow="row" gap={48} className={s.headerWrap}>
        <Grid flow="col" gap={12} className={s.headerLogo}>
          <Icons name="bond-square-token" />
          {expanded && <Icons name="barnbridge" width="113" color="grey900" />}
        </Grid>
        <Grid flow="row" gap={24}>
          <NavLink label="Pools" icon="savings-outlined" path="/yield-farming" expanded={expanded} />
          <NavLink label="Voting" icon="bank-outlined" path="/governance" expanded={expanded} />
          <NavLink label="Bonds" icon="paper-bill-outlined" path="/smart-yield" expanded={expanded} />
        </Grid>
      </Grid>
      <Grid flow="row" gap={48} className={s.footerWrap} colsTemplate="48px">
        <Button type="link" onClick={handleThemeToggle}>
          <Icons name={isDarkTheme ? 'sun' : 'moon'} />
          {expanded && (
            <>
              {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
            </>
          )}
        </Button>
        <Button type="link" className={s.hideLink} onClick={handleExpand}>
          <Icons name="right-arrow-circle-outlined" />
          {expanded && 'Hide menu'}
        </Button>
      </Grid>
    </Antd.Layout.Sider>
  );
};

export default LayoutSideNav;
