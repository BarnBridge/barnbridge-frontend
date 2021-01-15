import React from 'react';
import cx from 'classnames';

import { ReactComponent as ArrowCircleRightIcon } from 'resources/svg/icons/arrow-circle-right.svg';
import { ReactComponent as BellIcon } from 'resources/svg/icons/bell.svg';
import { ReactComponent as ChevronRightIcon } from 'resources/svg/icons/chevron-right.svg';
import { ReactComponent as ChevronTopIcon } from 'resources/svg/icons/chevron-top.svg';
import { ReactComponent as CircleCancelIcon } from 'resources/svg/icons/circle-cancel.svg';
import { ReactComponent as CircleCheckIcon } from 'resources/svg/icons/circle-check.svg';
import { ReactComponent as CircleTimeIcon } from 'resources/svg/icons/circle-time.svg';
import { ReactComponent as CloseIcon } from 'resources/svg/icons/close.svg';
import { ReactComponent as ErrorTriangleIcon } from 'resources/svg/icons/error-triangle.svg';
import { ReactComponent as GearIcon } from 'resources/svg/icons/gear.svg';
import { ReactComponent as GlobeIcon } from 'resources/svg/icons/globe.svg';
import { ReactComponent as InfoCircleIcon } from 'resources/svg/icons/info-circle.svg';
import { ReactComponent as NavBondsIcon } from 'resources/svg/icons/nav-bonds.svg';
import { ReactComponent as NavDiscussionsIcon } from 'resources/svg/icons/nav-discussions.svg';
import { ReactComponent as NavOverviewIcon } from 'resources/svg/icons/nav-overview.svg';
import { ReactComponent as NavPoolsIcon } from 'resources/svg/icons/nav-pools.svg';
import { ReactComponent as NavProposalsIcon } from 'resources/svg/icons/nav-proposals.svg';
import { ReactComponent as NavVotingIcon } from 'resources/svg/icons/nav-voting.svg';
import { ReactComponent as NavWalletIcon } from 'resources/svg/icons/nav-wallet.svg';
import { ReactComponent as NetworkIcon } from 'resources/svg/icons/network.svg';
import { ReactComponent as PercentageIcon } from 'resources/svg/icons/percentage.svg';
import { ReactComponent as PlusCircleIcon } from 'resources/svg/icons/plus-circle.svg';
import { ReactComponent as RibbonIcon } from 'resources/svg/icons/ribbon.svg';
import { ReactComponent as ThemeMoonIcon } from 'resources/svg/icons/theme-moon.svg';
import { ReactComponent as ThemeSunIcon } from 'resources/svg/icons/theme-sun.svg';
import { ReactComponent as UserPlusIcon } from 'resources/svg/icons/user-plus.svg';

import { ReactComponent as BONDIcon } from 'resources/svg/tokens/bond.svg';
import { ReactComponent as BONDSquareIcon } from 'resources/svg/tokens/bond-square.svg';
import { ReactComponent as DAIIcon } from 'resources/svg/tokens/dai.svg';
import { ReactComponent as SUSDIcon } from 'resources/svg/tokens/susd.svg';
import { ReactComponent as UniswapIcon } from 'resources/svg/tokens/uniswap.svg';
import { ReactComponent as USDCIcon } from 'resources/svg/tokens/usdc.svg';

export type IconType =
  'arrow-circle-right'
  | 'bell'
  | 'chevron-right'
  | 'chevron-top'
  | 'circle-cancel'
  | 'circle-check'
  | 'circle-time'
  | 'close'
  | 'error-triangle'
  | 'gear'
  | 'globe'
  | 'info-circle'
  | 'nav-bonds'
  | 'nav-discussions'
  | 'nav-overview'
  | 'nav-pools'
  | 'nav-proposals'
  | 'nav-voting'
  | 'nav-wallet'
  | 'network'
  | 'percentage'
  | 'plus-circle'
  | 'ribbon'
  | 'theme-moon'
  | 'theme-sun'
  | 'user-plus'
  | 'bond'
  | 'bond-square'
  | 'dai'
  | 'susd'
  | 'uniswap'
  | 'usdc';

type SvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined;

const IconsMap: Map<IconType, SvgComponent> = new Map([
  // icons
  ['arrow-circle-right', ArrowCircleRightIcon],
  ['bell', BellIcon],
  ['chevron-right', ChevronRightIcon],
  ['chevron-top', ChevronTopIcon],
  ['circle-cancel', CircleCancelIcon],
  ['circle-check', CircleCheckIcon],
  ['circle-time', CircleTimeIcon],
  ['close', CloseIcon],
  ['error-triangle', ErrorTriangleIcon],
  ['gear', GearIcon],
  ['globe', GlobeIcon],
  ['info-circle', InfoCircleIcon],
  ['nav-bonds', NavBondsIcon],
  ['nav-discussions', NavDiscussionsIcon],
  ['nav-overview', NavOverviewIcon],
  ['nav-pools', NavPoolsIcon],
  ['nav-proposals', NavProposalsIcon],
  ['nav-voting', NavVotingIcon],
  ['nav-wallet', NavWalletIcon],
  ['network', NetworkIcon],
  ['percentage', PercentageIcon],
  ['plus-circle', PlusCircleIcon],
  ['ribbon', RibbonIcon],
  ['theme-moon', ThemeMoonIcon],
  ['theme-sun', ThemeSunIcon],
  ['user-plus', UserPlusIcon],
  // tokens
  ['bond', BONDIcon],
  ['bond-square', BONDSquareIcon],
  ['dai', DAIIcon],
  ['susd', SUSDIcon],
  ['uniswap', UniswapIcon],
  ['usdc', USDCIcon],
]);

export type IconProps = {
  type: IconType;
  size?: [number, number];
  color?: string;
};

const Icon: React.FunctionComponent<IconProps> = props => {
  const { type, size, color } = props;
  const [width = 24, height = 24] = size ?? [];

  const IconComponent = IconsMap.get(type);

  return IconComponent ? (
    <IconComponent
      className={cx(color && `clr-${color}`)}
      style={{ width, height }} />
  ) : null;
};

export default Icon;
