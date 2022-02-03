import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPercent, formatToken } from 'web3/utils';

import { useAirdrop } from 'airdrop/airdrop';
import StatusTag from 'components/custom/status-tag';
import { Tabs as ElasticTabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { useConfig } from 'components/providers/configProvider';
import { ProjectToken } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import DaoBarnContract from 'modules/governance/contracts/daoBarn';
import DaoRewardContract from 'modules/governance/contracts/daoReward';
import { useWallet } from 'wallets/walletProvider';

const DaoRewardCard: FC<{}> = () => {
  const config = useConfig();
  const wallet = useWallet();
  const [reload] = useReload();

  const [activeTab, setActiveTab] = useState('dao');

  const { getOrCreateContract } = useContractFactory({ listeners: false });
  const daoBarnContract = getOrCreateContract(
    config.contracts.dao?.barn ?? '',
    () => {
      return new DaoBarnContract(config.contracts.dao?.barn ?? '');
    },
    {
      afterInit: contract => {
        contract.onUpdateData(reload);
        contract.loadCommonData().catch(Error);
      },
    },
  );
  const daoReward = getOrCreateContract(
    config.contracts.dao?.reward ?? '',
    () => {
      return new DaoRewardContract(config.contracts.dao?.reward ?? '');
    },
    {
      afterInit: contract => {
        contract.onUpdateData(reload);
        contract.loadCommonData().catch(Error);
      },
    },
  );

  const airdropDaoConfig = config.contracts.airdrop?.dao;
  const airdrop = useAirdrop(airdropDaoConfig?.merkleDistributor, airdropDaoConfig?.data);

  const apr = daoBarnContract.bondStaked
    ? daoReward?.weeklyRewards?.multipliedBy(52).dividedBy(daoBarnContract.bondStaked)
    : undefined;

  const totalToClaim = daoReward?.toClaim?.plus(airdrop?.toClaim ?? 0);

  useEffect(() => {
    if (wallet.account) {
      daoBarnContract.setAccount(wallet.account);
      daoBarnContract.loadUserData().catch(Error);

      daoReward?.setAccount(wallet.account);
      daoReward?.loadUserData().catch(Error);

      airdrop?.setAccount(wallet.account);
      airdrop?.loadUserData().catch(Error);
    }
  }, [wallet.account]);

  return (
    <article className="card flex flow-row p-24">
      <header className="flex align-center  col-gap-24 row-gap-12 mb-24">
        <div className="flex align-center">
          <Icon name="dao-circle" size={40} />
        </div>
        <div className="flex-grow">
          <div className="flex justify-space-between align-center wrap mb-4">
            <Text type="p1" weight="semibold" color="primary">
              DAO Rewards
            </Text>

            {daoReward?.isEnded === false && (
              <StatusTag
                text={
                  <Text type="lb2" weight="bold" color="green">
                    ACTIVE
                  </Text>
                }
                color="green"
              />
            )}
            {daoReward?.isEnded && (
              <StatusTag
                text={
                  <Text type="lb2" weight="bold" color="green">
                    ENDED
                  </Text>
                }
                color="green"
                style={{ backgroundColor: 'rgba(113, 121, 128, 0.08)' }}
              />
            )}
          </div>
        </div>
      </header>
      <div className="flex flow-row flex-grow pb-24">
        <ElasticTabs
          tabs={[
            { id: 'dao', children: 'DAO statistics' },
            { id: 'my', children: 'My statistics', disabled: !wallet.isActive },
          ]}
          activeKey={activeTab}
          onClick={setActiveTab}
          variation="elastic"
          className="mb-24"
          style={{
            width: '100%',
            height: 40,
          }}
        />
        <div className="flex flow-row">
          <div className="flex align-center justify-space-between mb-24">
            <Text type="small" weight="semibold" color="secondary">
              APR
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatPercent(apr) ?? '-'}
            </Text>
          </div>
          {activeTab === 'dao' && (
            <>
              <div className="flex align-center justify-space-between mb-24">
                <Text type="small" weight="semibold" color="secondary">
                  Staked {ProjectToken.symbol}
                </Text>
                <div className="flex align-center">
                  <TokenIcon name={ProjectToken.icon} size={16} className="mr-8" />
                  <Text type="p1" weight="semibold" color="primary">
                    {formatToken(daoBarnContract.bondStaked) ?? '-'}
                  </Text>
                </div>
              </div>
              <div className="flex align-center justify-space-between mb-24">
                <Text type="small" weight="semibold" color="secondary">
                  Weekly {ProjectToken.symbol} rewards
                </Text>
                <div className="flex align-center">
                  <TokenIcon name={ProjectToken.icon} size={16} className="mr-8" />
                  <Text type="p1" weight="semibold" color="primary">
                    {formatToken(daoReward?.weeklyRewards) ?? '-'}
                  </Text>
                </div>
              </div>
            </>
          )}
          {activeTab === 'my' && (
            <>
              <div className="flex align-center justify-space-between mb-24">
                <Text type="small" weight="semibold" color="secondary">
                  Your Staked {ProjectToken.symbol}
                </Text>
                <div className="flex align-center">
                  <TokenIcon name={ProjectToken.icon} size={16} className="mr-8" />
                  <Text type="p1" weight="semibold" color="primary">
                    {formatToken(daoBarnContract.balance) ?? '-'}
                  </Text>
                </div>
              </div>
              <div className="flex align-center justify-space-between mb-24">
                <Text type="small" weight="semibold" color="secondary">
                  Your {ProjectToken.symbol} rewards
                </Text>
                <div className="flex align-center">
                  <TokenIcon name={ProjectToken.icon} size={16} className="mr-8" />
                  <Text type="p1" weight="semibold" color="primary">
                    {formatToken(totalToClaim) ?? '-'}
                  </Text>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex align-center justify-space-between col-gap-16 mt-auto">
          <Link to={`/governance`} className="button-primary flex-grow">
            Go to Governance
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DaoRewardCard;
