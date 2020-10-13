import React from 'react';
import * as Antd from 'antd';

import SiderNavLink, { SiderNavLinkProps } from 'components/sider-nav-link';

import { ReactComponent as LogoSvg } from 'resources/svg/logo.svg';
import { ReactComponent as LogoWithNameSvg } from 'resources/svg/logo-with-name.svg';
import { ReactComponent as ArrowCircleRightSvg } from 'resources/svg/icons/arrow-circle-right.svg';

import s from './styles.module.css';

export type SiderNavProps = {
  links: SiderNavLinkProps[];
};

const SiderNav: React.FunctionComponent<SiderNavProps> = props => {
  const [collapsed, setCollapsed] = React.useState<boolean>(true);
  const [expanded, setExpanded] = React.useState<boolean>(!collapsed);

  React.useEffect(() => {
    if (collapsed) {
      setExpanded(false);
    } else {
      setTimeout(() => {
        setExpanded(true);
      }, 400);
    }
  }, [collapsed]);

  function toggleCollapse() {
    setCollapsed(prevState => !prevState);
  }

  return (
    <Antd.Layout.Sider
      className={s.component}
      collapsed={collapsed}
      collapsedWidth={72}
      width={200}
    >
      <div className={s.header}>
        {!expanded ? <LogoSvg /> : <LogoWithNameSvg />}
      </div>

      {props.links.map(link => (
        <SiderNavLink key={link.path} {...link} expanded={expanded} />
      ))}
      <Antd.Button
        className={s.expandBtn}
        type="link"
        icon={<ArrowCircleRightSvg />}
        onClick={toggleCollapse}
      >{expanded && 'Hide menu'}</Antd.Button>
    </Antd.Layout.Sider>
  );
};

export default SiderNav;
