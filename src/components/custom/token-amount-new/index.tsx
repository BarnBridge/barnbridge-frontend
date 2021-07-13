import { ButtonHTMLAttributes, CSSProperties, FC, ForwardedRef, ReactNode, forwardRef } from 'react';
import BigNumber from 'bignumber.js';
import cn from 'classnames';
import classNames from 'classnames';

import { DropdownList } from 'components/custom/dropdown';
import Icon, { TokenIconNames } from 'components/custom/icon';
import { Slider } from 'components/custom/slider';
import { Text } from 'components/custom/typography';
import { KnownTokens, useKnownTokens } from 'components/providers/knownTokensProvider';

import s from './s.module.scss';

type TokenAmountType = {
  value: string;
  onChange: (value: string) => void;
  before: ReactNode;
  secondary?: ReactNode;
  className?: string;
  classNameBefore?: string;
  placeholder?: string;
  disabled?: boolean;
  max?: BigNumber | number;
  slider?: boolean;
  decimals?: number;
  errors?: string[];
  ref?: ForwardedRef<HTMLInputElement>;
};

export const TokenAmount: FC<TokenAmountType> = forwardRef<HTMLInputElement, TokenAmountType>(
  (
    {
      onChange,
      before,
      secondary,
      className,
      classNameBefore,
      slider,
      errors = [],
      decimals = 6,
      max: maxValue,
      ...rest
    },
    ref,
  ) => {
    const max = BigNumber.from(maxValue) ?? BigNumber.ZERO;

    return (
      <div className={className}>
        <div className={classNames(s.tokenAmount, { [s.error]: errors.length })}>
          {before && <div className={cn(s.tokenAmountBefore, classNameBefore)}>{before}</div>}
          <div className={s.tokenAmountValues}>
            <input
              ref={ref}
              className={s.tokenAmountValue}
              type="text"
              inputMode="decimal"
              pattern="[0-9]+([\.,][0-9]+)?"
              onWheel={ev => {
                ev.currentTarget.blur();
              }}
              onChange={e => {
                onChange(e.target.value);
              }}
              {...rest}
            />
            <div className={s.tokenAmountHint}>{secondary}</div>
          </div>
          {!max.isZero() && (
            <button
              type="button"
              className="button-ghost"
              style={{ alignSelf: 'center' }}
              disabled={rest.disabled || max.isZero()}
              onClick={() => onChange(max.toString())}>
              MAX
            </button>
          )}
        </div>
        {!!errors.length &&
          errors.map((error, idx) => (
            <Text key={idx} type="small" weight="semibold" color="red" style={{ marginTop: '8px' }}>
              {error}
            </Text>
          ))}
        {slider && !max.isZero() ? (
          <Slider
            type="range"
            className={s.tokenAmountSlider}
            min="0"
            max={max.toString()}
            step={1 / 10 ** Math.min(decimals, 6)}
            value={rest.value ?? 0}
            disabled={rest.disabled || max.isZero()}
            onChange={e => {
              onChange(e.target.value);
            }}
          />
        ) : null}
      </div>
    );
  },
);

type TokenAmountPreviewType = {
  value?: string;
  before: ReactNode;
  secondary?: ReactNode;
  className?: string;
  classNameBefore?: string;
};

export const TokenAmountPreview: FC<TokenAmountPreviewType> = ({
  value,
  before,
  secondary,
  className,
  classNameBefore,
}) => {
  return (
    <div className={cn(s.tokenAmountPreview, className)}>
      {before && <div className={cn(s.tokenAmountPreviewBefore, classNameBefore)}>{before}</div>}
      <div className={s.tokenAmountPreviewValues}>
        <input className={s.tokenAmountPreviewValue} type="text" value={value || ''} readOnly />
        <div className={s.tokenAmountPreviewHint}>{secondary}</div>
      </div>
    </div>
  );
};

type TokenSelectType = {
  value: KnownTokens;
  onChange: (value: KnownTokens) => void;
  tokens: KnownTokens[];
  className?: string;
  style?: CSSProperties;
};

export const TokenSelect: FC<TokenSelectType> = ({ value, onChange, tokens, className, style }) => {
  const { getTokenBySymbol } = useKnownTokens();
  const foundToken = getTokenBySymbol(value);

  return (
    <DropdownList
      items={tokens.reduce((acc: ButtonHTMLAttributes<HTMLButtonElement>[], token) => {
        const found = getTokenBySymbol(token);
        if (!found) return acc;
        return [
          ...acc,
          {
            onClick: () => {
              onChange(token as KnownTokens);
            },
            children: (
              <>
                <Icon name={getTokenBySymbol(token)?.icon as TokenIconNames} className="mr-8" />
                {getTokenBySymbol(token)?.name}
              </>
            ),
            'aria-selected': foundToken?.symbol === found.symbol ? 'true' : 'false',
          },
        ];
      }, [])}>
      {({ ref, setOpen, open }) => (
        <button
          type="button"
          ref={ref}
          onClick={() => setOpen(isOpen => !isOpen)}
          className={cn(s.tokenAmountSelectToken, className)}
          style={style}>
          {foundToken ? (
            <Icon name={foundToken.icon as TokenIconNames} width={24} height={24} className="mr-16" />
          ) : null}
          <Text type="p1" weight="semibold" color="primary">
            {foundToken?.symbol}
          </Text>
          <Icon
            name="dropdown"
            width="24"
            height="24"
            className="token-select-chevron"
            style={{
              marginLeft: 4,
              transform: open ? 'rotate(180deg)' : '',
            }}
          />
        </button>
      )}
    </DropdownList>
  );
};
