import React from 'react';
import { useLocalStorage } from 'react-use-storage';
import cx from 'classnames';

import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Text } from 'components/custom/typography';

import s from './styles.module.scss';

export type WarningContextType = {
  addWarn: (opts: WarnType) => Function;
};

const WarningContext = React.createContext<WarningContextType>({
  addWarn: () => () => undefined,
});

export function useWarning(): WarningContextType {
  return React.useContext<WarningContextType>(WarningContext);
}

export type WarnType = {
  text: string;
  closable?: boolean;
  storageIdentity?: string;
};

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
      className={cx(
        s.warning,
        'grid flow-col col-gap-16 sm-col-gap-12 align-center justify-space-between pv-12 ph-64 sm-ph-24',
      )}>
      <Grid flow="col" gap={16} align="center">
        <Icons name="warning-outlined" color="red" />
        <Text type="p2" weight="semibold" className={s.text}>
          {text}
        </Text>
      </Grid>
      {closable && (
        <Button type="link" onClick={handleClose}>
          <Icons name="close" className={s.closeIcon} />
        </Button>
      )}
    </div>
  );
};

const WarningProvider: React.FC = props => {
  const [warns, setWarns] = React.useState<WarnType[]>([]);

  function addWarn(warn: WarnType) {
    setWarns(prevState => [...prevState, warn]);

    return () => {
      removeWarm(warn);
    };
  }

  function removeWarm(warn: WarnType) {
    setWarns(prevState => prevState.filter(w => w !== warn));
  }

  return (
    <WarningContext.Provider
      value={{
        addWarn,
      }}>
      <Grid flow="row">
        {warns.map((warn, idx) => (
          <Warn key={idx} {...warn} onClose={() => removeWarm(warn)} />
        ))}
      </Grid>
      {props.children}
    </WarningContext.Provider>
  );
};

export default WarningProvider;
