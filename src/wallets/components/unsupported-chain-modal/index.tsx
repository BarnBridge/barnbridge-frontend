import React from 'react';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import { Heading, Paragraph } from 'components/custom/typography';
import { useEthWeb3 } from 'components/providers/eth-web3-provider';
import { useWallet } from 'wallets/wallet';

export type UnsupportedChainModalProps = ModalProps & {};

const UnsupportedChainModal: React.FunctionComponent<UnsupportedChainModalProps> = props => {
  const { ...modalProps } = props;

  const ethWeb3 = useEthWeb3();
  const wallet = useWallet();

  return (
    <Modal width={568} {...modalProps}>
      <Grid flow="row" gap={24} align="start">
        <Grid flow="row" gap={16}>
          <Heading type="h2" bold color="primary">
            Wrong network
          </Heading>
          <Paragraph type="p1" semiBold color="secondary">
            Please switch your wallet network to {ethWeb3.networkName ?? '<!>'} to use the app
          </Paragraph>
          <Paragraph type="p1" color="secondary">
            If you still encounter problems, you may want to switch to a different wallet
          </Paragraph>
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
