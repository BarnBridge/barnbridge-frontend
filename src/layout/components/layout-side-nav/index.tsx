import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Antd from 'antd';
import cx from 'classnames';

import Button from 'components/antd/button';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import Icons, { NavIconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useTheme } from 'components/providers/theme-provider';

import s from './styles.module.scss';

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
          {expanded && <Icons name="barnbridge" width="113" color="primary" />}
        </Grid>
        <Grid flow="row" gap={24}>
          <NavLink label="Pools" icon="savings-outlined" path="/yield-farming" expanded={expanded} />
          <NavLink label="Voting" icon="bank-outlined" path="/governance" expanded={expanded} />
          <NavLink label="Bonds" icon="paper-bill-outlined" path="/bonds" expanded={expanded} />
        </Grid>
      </Grid>
      <Grid flow="row" gap={48} className={s.footerWrap} colsTemplate="48px">
        <Button type="light" onClick={handleThemeToggle}>
          <Icons name={isDarkTheme ? 'sun' : 'moon'} />
          {expanded && (
            <Text type="p2" weight="semibold" className={s.linkLabel}>
              {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
            </Text>
          )}
        </Button>
        <Button type="light" className={s.hideLink} onClick={handleExpand}>
          <Icons name="right-arrow-circle-outlined" />
          {expanded && (
            <Text type="p2" weight="semibold" className={s.linkLabel}>
              Hide menu
            </Text>
          )}
        </Button>
      </Grid>
    </Antd.Layout.Sider>
  );
};

export default LayoutSideNav;
