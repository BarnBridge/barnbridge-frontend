import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Antd from 'antd';

import s from './styles.module.css';

export type SiderNavLinkProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  expanded?: boolean;
};

const SiderNavLink: React.FunctionComponent<SiderNavLinkProps> = props => {
  const history = useHistory();
  const isActivePath = Boolean(useRouteMatch({
    path: props.path,
    exact: props.path === '/',
  }));

  function handleSiderBtnClick() {
    history.push(props.path);
  }

  return (
    <Antd.Tooltip title={props.label} placement="right">
      <div className={s.wrap}>
        {isActivePath && (
          <div className={s.activeMark} />
        )}
        <Antd.Button
          type="link"
          icon={props.icon}
          className={s.btn}
          onClick={handleSiderBtnClick}>
          {props.expanded && (
            <span className={s.label}>{props.label}</span>
          )}
        </Antd.Button>
      </div>
    </Antd.Tooltip>
  );
};

export default SiderNavLink;
