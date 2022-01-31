import { useLocalStorage } from 'react-use-storage';
import classNames from 'classnames';

import { Button } from 'components/button';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { WarnType, useNotifications } from 'components/providers/notificationsProvider';

import s from './s.module.scss';

type WarnProps = WarnType & {
  onClose?: () => void;
};

const Warn: React.FC<WarnProps> = props => {
  const { storageIdentity, text, closable, onClose } = props;

  const [storageState, setStorageState] = useLocalStorage(storageIdentity ?? '');

  function handleClose() {
    onClose?.();

    if (storageIdentity) {
      setStorageState(false);
    }
  }

  if (storageIdentity && storageState === false) {
    return null;
  }

  return (
    <div
      className={classNames(
        s.warning,
        'grid flow-col col-gap-16 sm-col-gap-12 align-center justify-space-between pv-12 ph-64 sm-ph-24',
      )}>
      <Grid flow="col" gap={16} align="center">
        <Icon name="danger" color="red" />
        <Text type="p2" weight="semibold" className={s.text}>
          {text}
        </Text>
      </Grid>
      {closable && (
        <Button type="button" variation="link" onClick={handleClose}>
          <Icon name="close" className={s.closeIcon} />
        </Button>
      )}
    </div>
  );
};

export const Warnings = () => {
  const { warns, removeWarn } = useNotifications();
  return (
    <div className={s.warnings}>
      {warns.map((warn, idx) => (
        <Warn key={idx} {...warn} onClose={() => removeWarn(warn)} />
      ))}
    </div>
  );
};
