import classNames from 'classnames';

import IconsSet from 'components/custom/icons-set';
import { TokenIcon, TokenIconNames } from 'components/token-icon';

import s from './s.module.scss';

type AprLabelPropsType = {
  icons: TokenIconNames[];
  size?: 'large';
};

export const AprLabel: React.FC<AprLabelPropsType> = ({ icons, size, children }) => {
  const iconSize = size === 'large' ? 16 : 12;

  return (
    <div
      className={classNames(s.aprLabel, {
        [s.aprLabelLarge]: size === 'large',
      })}>
      <IconsSet
        className="mr-4"
        icons={icons.map((icon, idx) => (
          <TokenIcon key={idx} name={icon} size={iconSize} />
        ))}
      />
      <div
        className={classNames(s.aprLabelText, {
          [s.aprLabelTextGradient]: icons.length > 1,
        })}>
        {children}
      </div>
    </div>
  );
};
