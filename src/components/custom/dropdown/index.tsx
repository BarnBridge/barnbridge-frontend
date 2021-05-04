import React from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { Modifier, ModifierPhases } from '@popperjs/core';
import outy from 'outy';

import Icon from 'components/custom/icon';

import s from './s.module.scss';

const modifiers: readonly Partial<Modifier<string, object>>[] = [
  { name: 'offset', options: { offset: [0, 8] } },
  {
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite' as ModifierPhases,
    requires: ['computeStyles'],
    fn({ state }) {
      state.styles.popper.minWidth = `${state.rects.reference.width}px`;
    },
    effect({ state }) {
      // @ts-ignore
      state.elements.popper.style.minWidth = `${state.elements.reference.offsetWidth}px`;
    },
  },
];

type DropdownListProps = {
  options: React.ButtonHTMLAttributes<HTMLButtonElement>[];
  referenceProps: React.ButtonHTMLAttributes<HTMLButtonElement>;
};

export const DropdownList: React.FC<DropdownListProps> = ({
  options,
  referenceProps: { children: referenceChildren, ...restReferenceProps },
}) => {
  const [open, setOpen] = React.useState(false);
  const referenceElement = React.useRef(null);
  const popperElement = React.useRef(null);

  const { styles, attributes, forceUpdate } = usePopper(referenceElement.current, popperElement.current, {
    placement: 'bottom-start',
    strategy: 'absolute',
    modifiers,
  });

  React.useEffect(() => {
    let outyInstance: ReturnType<typeof outy>;
    if (forceUpdate) {
      forceUpdate();
    }

    if (open) {
      const nodes: HTMLElement[] = [];

      const referenceWrapEl = referenceElement.current;
      if (referenceWrapEl) {
        nodes.push(referenceWrapEl);
      }
      const popperEl = popperElement.current;
      if (popperEl) {
        nodes.push(popperEl);
      }
      outyInstance = outy(nodes, [('click' as unknown) as MouseEvent, ('touchstart' as unknown) as TouchEvent], () =>
        setOpen(false),
      );
    }

    return () => {
      outyInstance?.remove();
    };
  }, [open]);

  return (
    <>
      <button type="button" {...restReferenceProps} ref={referenceElement} onClick={() => setOpen(isOpen => !isOpen)}>
        {referenceChildren}
        <Icon
          name="dropdown"
          width="24"
          height="24"
          className={s.tokenSelectChevron}
          style={{ transform: open ? 'rotate(180deg)' : '' }}
        />
      </button>
      {ReactDOM.createPortal(
        <div
          ref={popperElement}
          style={{
            ...styles.popper,
            // visibility: open ? 'visible' : 'hidden',
            display: open ? '' : 'none',
          }}
          {...attributes.popper}>
          <ul className={s.tokenSelectList}>
            {options.map(({ onClick, ...rest }, idx) => (
              <li key={idx}>
                <button
                  {...rest}
                  className={s.tokenSelectListButton}
                  onClick={e => {
                    if (onClick) onClick(e);
                    setOpen(false);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>,
        document.querySelector('#tooltip-root') || document.body,
      )}
    </>
  );
};
