import { FC } from 'react';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import { useNetwork } from 'components/providers/networkProvider';
import { useWallet } from 'wallets/walletProvider';

export type UnsupportedChainModalProps = ModalProps;

const UnsupportedChainModal: FC<UnsupportedChainModalProps> = props => {
  const { ...modalProps } = props;

  const { activeNetwork } = useNetwork();
  const wallet = useWallet();

  return (
    <Modal width={568} {...modalProps}>
      <Grid flow="row" gap={24} align="start">
        <Grid flow="row" gap={16}>
          <Text type="h2" weight="bold" color="primary">
            Wrong network
          </Text>
          <Text type="p1" weight="semibold" color="secondary">
            Please switch your wallet network to {activeNetwork.meta.name} to use the app
          </Text>
          <Text type="p1" color="secondary">
            If you still encounter problems, you may want to switch to a different wallet
          </Text>
        </Grid>

        <Button
          type="ghost"
          onClick={() => {
            props.onCancel?.();
            wallet.showWalletsModal();
          }}>
          Switch wallet
        </Button>
      </Grid>
    </Modal>
  );
};

export default UnsupportedChainModal;
