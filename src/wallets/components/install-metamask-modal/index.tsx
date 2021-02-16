import React from 'react';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import Grid from 'components/custom/grid';
import { Heading, Text } from 'components/custom/typography';

const METAMASK_CHROME_EXT_URL = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';

const InstallMetaMaskModal: React.FC<ModalProps> = props => {
  const { ...modalProps } = props;

  return (
    <Modal width={568} {...modalProps}>
      <Grid flow="row" gap={24}>
        <Grid flow="row" gap={16}>
          <Heading type="h2" bold color="primary">
            Install MetaMask
          </Heading>
          <Text type="p1" semiBold color="secondary">
            You need to have <Text tag="span" type="p1" bold color="primary">MetaMask</Text> installed to continue.
            <br />
            Once you have installed it, please refresh the page
          </Text>
        </Grid>
        <Grid flow="col" justify="space-between">
          <Button
            type="primary"
            href={METAMASK_CHROME_EXT_URL}
            rel="noopener noreferrer"
            target="_blank">
            Install MetaMask
          </Button>

          <Button type="ghost" onClick={props.onCancel}>
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default InstallMetaMaskModal;
