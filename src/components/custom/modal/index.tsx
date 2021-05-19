import { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import Icon from '../icon';

import s from './s.module.scss';

const rootNode = document.querySelector('#root');
const modalsNode = document.querySelector('#modal-root');

type Props = {
  heading?: ReactNode;
  closeHandler: Function;
};

export const Modal: FC<Props> = ({ children, heading, closeHandler }) => {
  const closeHandlerRef = useRef(closeHandler);

  const keyboardHandler = useCallback(event => {
    if (closeHandlerRef.current && event.key === 'Escape') {
      closeHandlerRef.current();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyboardHandler, false);

    if (rootNode) {
      rootNode.setAttribute('inert', 'true');
      rootNode.setAttribute('aria-hidden', 'true');
    }

    return () => {
      document.removeEventListener('keydown', keyboardHandler, false);

      if (rootNode) {
        rootNode.removeAttribute('inert');
        rootNode.removeAttribute('aria-hidden');
      }
    };
  }, [keyboardHandler]);

  if (!modalsNode) return null;

  return createPortal(
    <section className={s.dialog}>
      <div className={s.inner}>
        <header className={s.header}>
          <div className={s.heading}>{heading}</div>
          <button className={s.closeButton} onClick={() => closeHandler()}>
            <Icon name="close-tiny" width={24} height={24} color="inherit" />
          </button>
        </header>
        <div className={s.content}>{children}</div>
      </div>
    </section>,
    modalsNode,
  );
};
