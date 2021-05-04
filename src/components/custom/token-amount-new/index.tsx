import cn from 'classnames';

import { DropdownList } from 'components/custom/dropdown';
import Icon, { TokenIconNames } from 'components/custom/icon';
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
        {before}
        <div
          className={cn(s.tokenAmountValues, {
            [s.hasBefore]: before,
          })}>
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
        {Number.isFinite(rest.max) && (
          <button
            className="button-ghost"
            style={{ alignSelf: 'center' }}
            type="button"
            onClick={() => onChange(String(rest.max))}>
            MAX
          </button>
        )}
      </div>
      {slider && Number.isFinite(rest.max) ? (
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
  showLabel?: boolean;
  tokens: KnownTokens[];
};

export const TokenSelect: React.FC<TokenSelectType> = ({ value, onChange, tokens, showLabel }) => {
  const foundToken = getTokenBySymbol(value);

  return (
    <DropdownList
      options={tokens.reduce((acc: React.ButtonHTMLAttributes<HTMLButtonElement>[], token) => {
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
      }, [])}
      referenceProps={{
        children: (
          <>
            {foundToken ? <Icon name={foundToken.icon as TokenIconNames} className="mr-4" /> : null}
            {showLabel && (
              <Text type="p1" weight="semibold" color="primary">
                {value}
              </Text>
            )}
          </>
        ),
        className: s.tokenSelectTrigger,
      }}
    />
  );
};
