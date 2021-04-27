import { useMemo } from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import Icon, { TokenIconNames } from 'components/custom/icon';
import { Slider } from 'components/custom/slider';
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

type TokenSelectType = {
  value: KnownTokens;
  onChange: (value: KnownTokens) => void;
  tokens: KnownTokens[];
};

export const TokenSelect: React.FC<TokenSelectType> = ({ value, onChange, tokens }) => {
  const id = useMemo(() => nanoid(), []);

  const foundToken = getTokenBySymbol(value);

  return (
    <label htmlFor={id} className={s.tokenSelect}>
      {foundToken ? <Icon name={foundToken.icon as TokenIconNames} /> : null}
      <Icon name="dropdown" width="24" height="24" className={s.tokenSelectChevron} />
      <select id={id} value={value} onChange={e => onChange(e.target.value as KnownTokens)}>
        {tokens.map(token => (
          <option key={token} value={token}>
            {getTokenBySymbol(token)?.name}
          </option>
        ))}
      </select>
    </label>
  );
};
