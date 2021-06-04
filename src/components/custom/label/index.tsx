import classNames from 'classnames';

import Icon, { IconNames } from 'components/custom/icon';
import IconsSet from 'components/custom/icons-set';

import s from './s.module.scss';

type AprLabelPropsType = {
  icons: IconNames[];
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
          <Icon key={idx} width={iconSize} height={iconSize} name={icon} />
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
