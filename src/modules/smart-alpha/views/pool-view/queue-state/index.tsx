import { formatToken } from 'web3/utils';

import { Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { SMART_ALPHA_DECIMALS } from 'modules/smart-alpha/contracts/smartAlphaContract';

import s from './s.module.scss';

export const QueueState = ({ pool, smartAlphaContract }) => {
  const { getToken } = useTokens();

  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);

  return (
    <>
      <section className={s.section}>
        <header className={s.sectionHeader}>
          <Text type="small" weight="semibold" color="secondary" tag="h3">
            Going in
          </Text>
        </header>
        <div className={s.sectionBody}>
          <div>
            <Text type="p2" weight="semibold" color="secondary" className="mb-4">
              Juniors underlying
            </Text>
            <div className="flex align-center">
              <TokenIcon name={poolToken?.icon} size={16} className="mr-8" />
              <Text
                type="p1"
                weight="semibold"
                color="primary"
                tooltip={
                  formatToken(smartAlphaContract?.queuedJuniorsUnderlyingIn?.unscaleBy(pool.poolToken.decimals), {
                    decimals: pool.poolToken.decimals,
                    tokenName: pool.poolToken.symbol,
                  }) ?? '-'
                }>
                {formatToken(smartAlphaContract?.queuedJuniorsUnderlyingIn?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
            </div>
          </div>
          <div>
            <Text type="p2" weight="semibold" color="secondary" className="mb-4">
              Seniors underlying
            </Text>
            <div className="flex align-center">
              <TokenIcon name={poolToken?.icon} size={16} className="mr-8" />
              <Text
                type="p1"
                weight="semibold"
                color="primary"
                tooltip={
                  formatToken(smartAlphaContract?.queuedSeniorsUnderlyingIn?.unscaleBy(pool.poolToken.decimals), {
                    decimals: pool.poolToken.decimals,
                    tokenName: pool.poolToken.symbol,
                  }) ?? '-'
                }>
                {formatToken(smartAlphaContract?.queuedSeniorsUnderlyingIn?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
            </div>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <header className={s.sectionHeader}>
          <Text type="small" weight="semibold" color="secondary" tag="h3">
            Going out
          </Text>
        </header>
        <div className={s.sectionBody}>
          <div>
            <Text type="p2" weight="semibold" color="secondary" className="mb-4">
              Junior tokens
            </Text>
            <div className="flex align-center">
              <TokenIcon
                name={poolToken?.icon}
                bubble1Name="bond"
                bubble2Name={oracleToken?.icon}
                outline="purple"
                size={16}
                className="mr-8"
              />
              <Text
                type="p1"
                weight="semibold"
                color="primary"
                tooltip={
                  formatToken(smartAlphaContract?.queuedJuniorTokensBurn?.unscaleBy(SMART_ALPHA_DECIMALS), {
                    decimals: SMART_ALPHA_DECIMALS,
                    tokenName: `junior_${pool.poolName}`,
                  }) ?? '-'
                }>
                {formatToken(smartAlphaContract?.queuedJuniorTokensBurn?.unscaleBy(SMART_ALPHA_DECIMALS)) ?? '-'}
              </Text>
            </div>
          </div>
          <div>
            <Text type="p2" weight="semibold" color="secondary" className="mb-4">
              Senior tokens
            </Text>
            <div className="flex align-center">
              <TokenIcon
                name={poolToken?.icon}
                bubble1Name="bond"
                bubble2Name={oracleToken?.icon}
                outline="green"
                size={16}
                className="mr-8"
              />
              <Text
                type="p1"
                weight="semibold"
                color="primary"
                tooltip={
                  formatToken(smartAlphaContract?.queuedSeniorTokensBurn?.unscaleBy(SMART_ALPHA_DECIMALS), {
                    decimals: SMART_ALPHA_DECIMALS,
                    tokenName: `senior_${pool.poolName}`,
                  }) ?? '-'
                }>
                {formatToken(smartAlphaContract?.queuedSeniorTokensBurn?.unscaleBy(SMART_ALPHA_DECIMALS)) ?? '-'}
              </Text>
            </div>
          </div>
        </div>
      </section>
      <section className={s.section}>
        <header className={s.sectionHeader}>
          <Text type="small" weight="semibold" color="secondary" tag="h3">
            Out but not redeemed
          </Text>
        </header>
        <div className={s.sectionBody}>
          <div>
            <Text type="p2" weight="semibold" color="secondary" className="mb-4">
              Juniors underlying
            </Text>
            <div className="flex align-center">
              <TokenIcon name={poolToken?.icon} size={16} className="mr-8" />
              <Text
                type="p1"
                weight="semibold"
                color="primary"
                tooltip={
                  formatToken(smartAlphaContract?.queuedJuniorsUnderlyingOut?.unscaleBy(pool.poolToken.decimals), {
                    decimals: pool.poolToken.decimals,
                    tokenName: pool.poolToken.symbol,
                  }) ?? '-'
                }>
                {formatToken(smartAlphaContract?.queuedJuniorsUnderlyingOut?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
            </div>
          </div>
          <div>
            <Text type="p2" weight="semibold" color="secondary" className="mb-4">
              Seniors underlying
            </Text>
            <div className="flex align-center">
              <TokenIcon name={poolToken?.icon} size={16} className="mr-8" />
              <Text
                type="p1"
                weight="semibold"
                color="primary"
                tooltip={
                  formatToken(smartAlphaContract?.queuedSeniorsUnderlyingOut?.unscaleBy(pool.poolToken.decimals), {
                    decimals: pool.poolToken.decimals,
                    tokenName: pool.poolToken.symbol,
                  }) ?? '-'
                }>
                {formatToken(smartAlphaContract?.queuedSeniorsUnderlyingOut?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
              </Text>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
