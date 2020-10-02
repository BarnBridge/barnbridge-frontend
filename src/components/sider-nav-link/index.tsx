import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Antd from 'antd';
import cx from 'classnames';

import s from './styles.module.css';

export type SiderNavLinkProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
};

const SiderNavLink: React.FunctionComponent<SiderNavLinkProps> = props => {
  const history = useHistory();
  const isActivePath = Boolean(useRouteMatch({
    path: props.path,
    exact: props.path === '/',
  }));

  function handleSiderBtnClick(ev: React.MouseEvent) {
    ev.preventDefault();
    history.push(props.path);
  }

  return (
    <Antd.Tooltip title={props.label} placement="right">
      <Antd.Button
        type="link"
        icon={props.icon}
        className={cx(s.btn, isActivePath && s.active)}
        onClick={handleSiderBtnClick} />
    </Antd.Tooltip>
  );
};

export default SiderNavLink;
