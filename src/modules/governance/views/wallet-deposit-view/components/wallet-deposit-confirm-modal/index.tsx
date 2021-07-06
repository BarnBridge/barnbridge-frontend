import React from 'react';
import BigNumber from 'bignumber.js';
import { formatToken } from 'web3/utils';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';

import { getFormattedDuration } from 'utils';

export type WalletDepositConfirmModalProps = ModalProps & {
  deposit?: BigNumber;
  lockDuration?: number;
};

const WalletDepositConfirmModal: React.FC<WalletDepositConfirmModalProps> = props => {
  const { deposit, lockDuration, ...modalProps } = props;

  const { projectToken } = useKnownTokens();

  return (
    <Modal width={560} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={16}>
          <Icon name="warning-outlined" width={40} height={40} color="red" />
          <Grid flow="row" gap={8}>
            <Text type="h3" weight="semibold" color="primary">
              Are you sure you want to deposit?
            </Text>

            <Text type="p2" weight="semibold" color="secondary">
              You are about to deposit {formatToken(deposit)} ${projectToken.symbol}.
              <br />
              You have an active lock for {getFormattedDuration(0, lockDuration)}.
            </Text>
            <Text type="p2" weight="bold" color="primary">
              All deposits you make until the lock timer ends will be locked for the same duration.
            </Text>
          </Grid>
        </Grid>
        <Grid flow="col" justify="space-between">
          <Button type="default" onClick={modalProps.onCancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={modalProps.onOk}>
            Deposit
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default WalletDepositConfirmModal;
