import Tooltip from 'components/antd/tooltip';
import Icon from 'components/custom/icon';

type PropsType = {
  className?: string;
  style?: React.CSSProperties;
};

export const InfoTooltip: React.FC<PropsType> = ({ children, className, style }) => (
  <Tooltip title={children}>
    <Icon
      name="info-outlined"
      width={16}
      height={16}
      className={className}
      style={{
        flexShrink: 0,
        ...style,
      }}
    />
  </Tooltip>
);
