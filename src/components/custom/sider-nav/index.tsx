import React from 'react';
import * as Antd from 'antd';
import cx from 'classnames';

import { useTheme } from 'components/providers/theme-provider';

import SiderNavLink, { SiderNavLinkProps } from 'components/custom/sider-nav-link';
import FadeBlock from 'components/custom/fade-block';

import { ReactComponent as LogoSvg } from 'resources/svg/logo/logo.svg';
import { ReactComponent as BarnBridgeSvg } from 'resources/svg/logo/barnbridge.svg';
import { ReactComponent as ArrowCircleRightSvg } from 'resources/svg/icons/arrow-circle-right.svg';
import { ReactComponent as MoonSvg } from 'resources/svg/icons/theme-moon.svg';
import { ReactComponent as SunSvg } from 'resources/svg/icons/theme-sun.svg';

import s from './styles.module.css';

export type SiderNavProps = {
  links: SiderNavLinkProps[];
  className?: string;
};

const SiderNav: React.FunctionComponent<SiderNavProps> = props => {
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
      className={cx(s.component, props.className, { [s.expanded]: expanded })}
      collapsed={!expanded}
      collapsedWidth={72}
      width={200}
    >
      <div className={s.header}>
        <div className={s.logo}>
          <LogoSvg />
        </div>
        <FadeBlock className={s.brandName} visible={expanded}>
          <BarnBridgeSvg />
        </FadeBlock>
      </div>

      {props.links.map(link => (
        <SiderNavLink key={link.path} {...link} expanded={expanded} tooltip />
      ))}

      <Antd.Button type="link" className={s.themeToggle} onClick={handleThemeToggle}>
        {!isDarkTheme ? <MoonSvg /> : <SunSvg />}
        <FadeBlock visible={expanded}>
          {!isDarkTheme ? 'Dark' : 'Light'} Theme
        </FadeBlock>
      </Antd.Button>

      <Antd.Button
        className={s.expandBtn}
        type="link"
        icon={<ArrowCircleRightSvg />}
        onClick={handleExpand}>
        <FadeBlock visible={expanded}>Hide menu</FadeBlock>
      </Antd.Button>
    </Antd.Layout.Sider>
  );
};

export default SiderNav;
