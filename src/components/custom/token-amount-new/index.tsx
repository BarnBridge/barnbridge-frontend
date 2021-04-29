import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import cn from 'classnames';

import Icon, { TokenIconNames } from 'components/custom/icon';
import { OutsideClick } from 'components/custom/outside-click';
import { Slider } from 'components/custom/slider';
import { Text } from 'components/custom/typography';
import { KnownTokens, getTokenBySymbol } from 'components/providers/known-tokens-provider';

import s from './s.module.scss';

type TokenAmountType = {
  value: string;
  onChange: (value: string) => void;
  before: React.ReactNode;
  secondary?: React.ReactNode;
  className?: string;
  classNameBefore?: string;
  placeholder?: string;
  max?: number;
  slider?: boolean;
  decimals?: number;
};

export const TokenAmount: React.FC<TokenAmountType> = ({
  onChange,
  before,
  secondary,
  className,
  classNameBefore,
  slider,
  decimals = 6,
  ...rest
}) => {
  return (
    <div className={className}>
      <div className={s.tokenAmount}>
        {before && <div className={cn(s.tokenAmountBefore, classNameBefore)}>{before}</div>}
        <div className={s.tokenAmountValues}>
          <input
            className={s.tokenAmountValue}
            type="number"
            onChange={e => {
              onChange(e.target.value);
            }}
            {...rest}
          />
          <div className={s.tokenAmountHint}>{secondary}</div>
        </div>
        {rest.max && (
          <button
            className="button-ghost"
            style={{ alignSelf: 'center' }}
            type="button"
            onClick={() => onChange(String(rest.max))}>
            MAX
          </button>
        )}
      </div>
      {slider && rest.max ? (
        <Slider
          className={s.tokenAmountSlider}
          type="range"
          min="0"
          max={rest.max}
          value={rest.value ?? 0}
          onChange={e => {
            onChange(e.target.value);
          }}
          step={1 / 10 ** Math.min(decimals, 6)}
        />
      ) : null}
    </div>
  );
};

type TokenAmountPreviewType = {
  value: React.ReactNode;
  before: React.ReactNode;
  secondary?: React.ReactNode;
  className?: string;
};

export const TokenAmountPreview: React.FC<TokenAmountPreviewType> = ({ value, before, secondary, className }) => {
  return (
    <div className={cn(s.tokenAmountPreview, className)}>
      {before && <div className={s.tokenAmountPreviewBefore}>{before}</div>}
      <div className={s.tokenAmountPreviewValues}>
        <div className={s.tokenAmountPreviewValue}>{value}</div>
        <div className={s.tokenAmountPreviewHint}>{secondary}</div>
      </div>
    </div>
  );
};

const tooltipRoot = document.querySelector('#tooltip-root');

type TokenSelectType = {
  value: KnownTokens;
  onChange: (value: KnownTokens) => void;
  showLabel?: boolean;
  tokens: KnownTokens[];
};

export const TokenSelect: React.FC<TokenSelectType> = ({ value, onChange, tokens, showLabel }) => {
  const [open, setOpen] = useState(false);
  const foundToken = getTokenBySymbol(value);

  const [targetRef, setTargetRef] = useState(null);
  const [optionsRef, setOptionsRef] = useState(null);
  const { styles, attributes, forceUpdate } = usePopper(targetRef, optionsRef, {
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [-16, 24] } }],
  });

  useEffect(() => {
    if (open) {
      forceUpdate && forceUpdate();
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        // @ts-ignore
        ref={setTargetRef}
        className={s.tokenSelectTrigger}
        onClick={() => setOpen(isOpen => !isOpen)}>
        {foundToken ? <Icon name={foundToken.icon as TokenIconNames} className="mr-4" /> : null}
        {showLabel && (
          <Text type="p1" weight="semibold" color="primary">
            {value}
          </Text>
        )}
        <Icon
          name="dropdown"
          width="24"
          height="24"
          className={s.tokenSelectChevron}
          style={{ transform: open ? 'rotate(180deg)' : '' }}
        />
      </button>
      {tooltipRoot &&
        open &&
        ReactDOM.createPortal(
          <OutsideClick handler={() => setOpen(false)} nodes={[optionsRef, targetRef]}>
            {/*
            // @ts-ignore */}
            <ul className={s.tokenSelectList} ref={setOptionsRef} style={styles.popper} {...attributes.popper}>
              {tokens.map(token => {
                const found = getTokenBySymbol(token);
                if (!found) return null;

                return (
                  <li key={token} value={token}>
                    <button
                      className={cn(s.tokenSelectListButton, {
                        [s.active]: foundToken?.symbol === found.symbol,
                      })}
                      type="button"
                      onClick={() => {
                        onChange(token as KnownTokens);
                        setOpen(false);
                      }}>
                      <Icon name={getTokenBySymbol(token)?.icon as TokenIconNames} className="mr-8" />
                      {getTokenBySymbol(token)?.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </OutsideClick>,

          tooltipRoot,
        )}
    </>
  );
};
