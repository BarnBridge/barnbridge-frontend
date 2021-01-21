import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Antd from 'antd';
import cx from 'classnames';

import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import IF from 'components/custom/if';
import Icon, { IconType } from 'components/custom/icon';
import { useTheme } from 'components/providers/theme-provider';

import s from './styles.module.scss';

export type NavLinkProps = {
  icon: IconType;
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
          <Icon type={icon} />
          <IF condition={expanded}>{label}</IF>
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
          <Icon type="logo" />
          <IF condition={expanded}>
            <Icon type="barn-bridge" width="auto" color="grey900" />
          </IF>
        </Grid>
        <Grid flow="row" gap={24}>
          <NavLink label="Pools" icon="nav-pools" path="/yield-farming" expanded={expanded} />
          <NavLink label="Voting" icon="nav-voting" path="/governance" expanded={expanded} />
          <NavLink label="Bonds" icon="nav-bonds" path="/bonds" expanded={expanded} />
        </Grid>
      </Grid>
      <Grid flow="row" gap={48} className={s.footerWrap} colsTemplate="48px">
        <Button type="link" onClick={handleThemeToggle}>
          <Icon type={isDarkTheme ? 'theme-sun' : 'theme-moon'} />
          <IF condition={expanded}>
            {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
          </IF>
        </Button>
        <Button type="link" className={s.hideLink} onClick={handleExpand}>
          <Icon type="arrow-circle-right" />
          <IF condition={expanded}>
            Hide menu
          </IF>
        </Button>
      </Grid>
    </Antd.Layout.Sider>
  );
};

export default LayoutSideNav;
