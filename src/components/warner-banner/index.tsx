import React from 'react';
import * as Antd from 'antd';
import { CloseOutlined, WarningOutlined } from '@ant-design/icons';
import { useLocalStorage } from 'react-use-storage';

import s from './styles.module.css';

export type WarnerBannerProps = {
  type?: string;
  text: string;
  closable?: boolean;
};

const WarnerBanner: React.FunctionComponent<WarnerBannerProps> = props => {
  const [state, setState] = useLocalStorage(props.type ?? '');

  function handleClose() {
    if (props.type) {
      setState(false);
    }
  }

  return state === undefined ? (
    <>
      <div className={s.component}>
        <div className={s.wrap}>
          <WarningOutlined className={s.warnIcon} />
          <span className={s.warnText}>{props.text}</span>
        </div>
        {props.closable && (
          <Antd.Button className={s.closeBtn} type="link" onClick={handleClose}>
            <CloseOutlined />
          </Antd.Button>
        )}
      </div>
      <div className={s.placeholder} />
    </>
  ) : null;
};

export default WarnerBanner;
