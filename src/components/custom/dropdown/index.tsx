import React, { HTMLProps } from 'react';
import ReactDOM from 'react-dom';
import { Modifier, usePopper } from 'react-popper';
import { Link, LinkProps } from 'react-router-dom';
import * as PopperJS from '@popperjs/core';
import { ModifierPhases } from '@popperjs/core';
import classNames from 'classnames';
import outy from 'outy';

import { Icon } from 'components/icon';

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

export type DropdownBaseProps = {
  content: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => React.ReactNode;
  options?: Partial<PopperJS.Options>;
  children: ({
    ref,
    setOpen,
    open,
  }: {
    ref: React.MutableRefObject<null>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
  }) => void;
};

export const DropdownBase: React.FC<DropdownBaseProps> = ({ content, children, options }) => {
  const [open, setOpen] = React.useState(false);
  const referenceElement = React.useRef(null);
  const popperElement = React.useRef(null);

  const { styles, attributes, forceUpdate } = usePopper(referenceElement.current, popperElement.current, {
    placement: 'bottom-start',
    strategy: 'absolute',
    modifiers,
    ...options,
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
      outyInstance = outy(nodes, ['click' as unknown as MouseEvent, 'touchstart' as unknown as TouchEvent], () =>
        setOpen(false),
      );
    }

    return () => {
      outyInstance?.remove();
    };
  }, [open]);

  return (
    <>
      {children({ ref: referenceElement, setOpen, open })}
      {ReactDOM.createPortal(
        <div
          ref={popperElement}
          style={{
            ...styles.popper,
            // visibility: open ? 'visible' : 'hidden',
            display: open ? '' : 'none',
          }}
          {...attributes.popper}>
          {content(setOpen)}
        </div>,
        document.querySelector('#tooltip-root') || document.body,
      )}
    </>
  );
};

export type DropdownListProps = {
  items: (HTMLProps<HTMLButtonElement> | HTMLProps<HTMLLinkElement> | LinkProps)[];
  options?: Partial<PopperJS.Options>;
  children: ({
    ref,
    setOpen,
    open,
  }: {
    ref: React.MutableRefObject<null>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
  }) => void;
};

export const DropdownList: React.FC<DropdownListProps> = ({ items, children, options }) => {
  return (
    <DropdownBase
      content={setOpen => (
        <ul className={s.tokenSelectList}>
          {items.map(({ onClick, ...rest }, idx) => {
            if (rest.href) {
              return (
                <li key={idx}>
                  {/**
                   @ts-ignore */}
                  <a
                    href={rest.href}
                    {...rest}
                    className={s.tokenSelectListButton}
                    onClick={e => {
                      // if (onClick) onClick(e);
                      setOpen(false);
                    }}>
                    {rest.children}
                  </a>
                </li>
              );
            }

            // @ts-ignore
            if (rest.to) {
              return (
                <li key={idx}>
                  {/**
                   @ts-ignore */}
                  <Link
                    {...rest}
                    className={s.tokenSelectListButton}
                    onClick={e => {
                      // if (onClick) onClick(e);
                      setOpen(false);
                    }}
                  />
                </li>
              );
            }

            return (
              <li key={idx}>
                {/**
                 @ts-ignore */}
                <button
                  {...rest}
                  className={s.tokenSelectListButton}
                  onClick={e => {
                    // @ts-ignore
                    if (onClick) onClick(e);
                    setOpen(false);
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
      options={options}>
      {children}
    </DropdownBase>
  );
};

type DropdownProps = {
  items: (HTMLProps<HTMLButtonElement> | HTMLProps<HTMLLinkElement> | LinkProps)[];
  className?: string;
  style?: React.CSSProperties;
  size?: 'normal' | 'large';
};

export const Dropdown: React.FC<DropdownProps> = ({ items, children, className, size = 'normal', style }) => {
  return (
    <DropdownList items={items}>
      {({ ref, setOpen, open }) => (
        <button
          type="button"
          ref={ref}
          onClick={() => setOpen(isOpen => !isOpen)}
          className={classNames(s.dropdown, s[size], className)}
          style={style}>
          <div className="flex align-center flex-grow pr-16">{children}</div>
          <Icon
            name="dropdown"
            size="24"
            className={s.dropdownChevron}
            style={{ transform: open ? 'rotate(180deg)' : '' }}
          />
        </button>
      )}
    </DropdownList>
  );
};
