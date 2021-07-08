import React from 'react';
import BigNumber from 'bignumber.js';
import { formatToken } from 'web3/utils';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';

import { getFormattedDuration } from 'utils';

export type WalletLockConfirmModalProps = ModalProps & {
  balance?: BigNumber;
  duration?: number;
};

const WalletLockConfirmModal: React.FC<WalletLockConfirmModalProps> = props => {
  const { balance, duration, ...modalProps } = props;

  return (
    <Modal width={560} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={16}>
          <Icon name="warning-outlined" width={40} height={40} color="red" />
          <Grid flow="row" gap={8}>
            <Text type="h3" weight="semibold" color="primary">
              Are you sure you want to lock your balance?
            </Text>
            <Text type="p2" weight="semibold" color="secondary">
              You are about to lock {formatToken(balance)} $BOND for {getFormattedDuration(0, duration)}.
              <br />
              <br />
              You cannot undo this or partially lock your balance.
              <br />
              <br />
              Locked tokens will be unavailable for withdrawal until the lock timer ends.
              <br />
              <br />
              All future deposits you make will be locked for the same time.
              <br />
              <br />
            </Text>
            <Text type="p2" weight="bold" color="primary">
              The multiplier you get for locking tokens only applies to your voting power, it does not earn more
              rewards.
            </Text>
          </Grid>
        </Grid>
        <Grid flow="col" justify="space-between">
          <Button type="default" onClick={modalProps.onCancel}>
            Cancel
          </Button>
          <Button type="primary" onClick={modalProps.onOk}>
            Lock balance
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default WalletLockConfirmModal;
