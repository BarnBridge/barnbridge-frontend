import React from 'react';
import BigNumber from 'bignumber.js';

import Modal, { ModalProps } from 'components/antd/modal';
import Button from 'components/antd/button';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import { Heading, Paragraph } from 'components/custom/typography';
import { formatBONDValue } from 'web3/utils';
import { getFormattedDuration } from 'utils';

export type WalletDepositConfirmModalProps = ModalProps & {
  deposit?: BigNumber;
  lockDuration?: number;
};

const WalletDepositConfirmModal: React.FunctionComponent<WalletDepositConfirmModalProps> = props => {
  const { deposit, lockDuration, ...modalProps } = props;

  return (
    <Modal width={560} {...modalProps}>
      <Grid flow="row" gap={32}>
        <Grid flow="row" gap={16}>
          <Icons
            name="warning-outlined"
            width={40}
            height={40}
            color="red"
          />
          <Grid flow="row" gap={8}>
            <Heading type="h3" semiBold color="primary">
              Are you sure you want to deposit?
            </Heading>

            <Paragraph type="p2" semiBold color="secondary">
              You are about to deposit {formatBONDValue(deposit)} $BOND.
              <br />
              You have an active lock for {getFormattedDuration(0, lockDuration)}.
            </Paragraph>
            <Paragraph type="p2" bold color="primary">
              All deposits you make until the lock timer ends will be locked for the same duration.
            </Paragraph>
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
