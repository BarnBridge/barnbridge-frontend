import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { Icon } from 'components/icon';

import s from './s.module.scss';

const rootNode = document.querySelector('#root');
const modalsNode = document.querySelector('#modal-root');

type Props = {
  heading?: React.ReactNode;
  closeHandler: Function;
  fullscreen?: boolean;
};

export const Modal: React.FC<Props> = ({ children, heading, closeHandler, fullscreen = false }) => {
  useEffect(() => {
    const keyboardHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeHandler?.();
      }
    };

    document.addEventListener('keydown', keyboardHandler, false);

    if (rootNode) {
      rootNode.setAttribute('inert', 'true');
      rootNode.setAttribute('aria-hidden', 'true');
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', keyboardHandler, false);
      document.body.style.overflow = '';

      if (rootNode) {
        rootNode.removeAttribute('inert');
        rootNode.removeAttribute('aria-hidden');
      }
    };
  }, []);

  if (!modalsNode) return null;

  return createPortal(
    <section className={s.dialog}>
      <div className={classNames(s.inner, { [s.fullscreen]: fullscreen })}>
        <header className={s.header}>
          <div className={s.heading}>{heading}</div>
          <button className={classNames(s.closeButton, { [s.fullscreen]: fullscreen })} onClick={() => closeHandler()}>
            <Icon name="close" size={fullscreen ? 32 : 24} />
          </button>
        </header>
        <div className={classNames(s.content, { [s.fullscreen]: fullscreen })}>{children}</div>
      </div>
    </section>,
    modalsNode,
  );
};
