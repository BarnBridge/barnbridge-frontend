import React from 'react';
import { useLocalStorage } from 'react-use-storage';

import Button from 'components/antd/button';
import Icons from 'components/custom/icon';

import s from './styles.module.css';

export type WarningsContextType = {
  addWarn: (opts: WarnType) => Function;
};

const WarningsContext = React.createContext<WarningsContextType>(
  undefined as any,
);

export function useWarnings(): WarningsContextType {
  return React.useContext<WarningsContextType>(WarningsContext);
}

export type WarnType = {
  text: string;
  closable?: boolean;
  storageIdentity?: string;
};

type WarnProps = WarnType & {
  onClose?: () => void;
};

const Warn: React.FunctionComponent<WarnProps> = props => {
  const [storageState, setStorageState] = useLocalStorage(
    props.storageIdentity ?? '',
  );

  function handleClose() {
    props.onClose?.();

    if (props.storageIdentity) {
      setStorageState(false);
    }
  }

  if (props.storageIdentity && storageState === false) {
    return null;
  }

  return (
    <div className={s.component}>
      <div className={s.wrap}>
        <Icons name="warning-outlined" color="red500" />
        <span className={s.warnText}>{props.text}</span>
      </div>
      {props.closable && (
        <Button type="link" className={s.closeBtn} onClick={handleClose}>
          <Icons name="close" />
        </Button>
      )}
    </div>
  );
};

const Warnings: React.FunctionComponent = props => {
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

  const value = React.useMemo(
    () => ({
      addWarn,
    }),
    [],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WarningsContext.Provider value={value}>
      {warns.map((warn, idx) => (
        <Warn key={idx} {...warn} onClose={() => removeWarm(warn)} />
      ))}
      {props.children}
    </WarningsContext.Provider>
  );
};

export default Warnings;
