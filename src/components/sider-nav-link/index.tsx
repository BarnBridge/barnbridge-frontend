import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import * as Antd from 'antd';
import cx from 'classnames';

import FadeBlock from 'components/fade-block';

import s from './styles.module.css';

export type SiderNavLinkProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  expanded?: boolean;
  tooltip?: boolean;
  onClick?: () => void;
};

const SiderNavLink: React.FunctionComponent<SiderNavLinkProps> = props => {
  const history = useHistory();
  const isActivePath = Boolean(useRouteMatch({
    path: props.path,
    exact: props.path === '/',
  }));

  function handleSiderBtnClick() {
    history.push(props.path);
    props.onClick?.();
  }

  return (
    <Antd.Tooltip title={props.tooltip ? props.label : undefined} placement="right">
      <div className={cx(s.wrap, {[s.active]: isActivePath})}>
        <div className={s.activeMark} />
        <Antd.Button
          type="link"
          icon={props.icon}
          className={s.btn}
          onClick={handleSiderBtnClick}>
          <FadeBlock visible={props.expanded === true}>
            <span className={s.label}>{props.label}</span>
          </FadeBlock>
        </Antd.Button>
      </div>
    </Antd.Tooltip>
  );
};

export default SiderNavLink;
