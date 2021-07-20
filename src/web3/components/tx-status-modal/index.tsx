import React from 'react';
import { Web3SendState } from 'web3/web3Contract';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useNetwork } from 'providers/networkProvider';
import { useWeb3 } from 'providers/web3Provider';

type Props = ModalProps & {
  state?: Web3SendState;
  txHash?: string;
  renderProgress?: () => React.ReactNode;
  renderSuccess?: () => React.ReactNode;
};

const TxStatusModal: React.FC<Props> = props => {
  const { state, txHash, renderProgress, renderSuccess, ...modalProps } = props;

  const { getEtherscanTxUrl } = useWeb3();
  const { activeNetwork } = useNetwork();

  return (
    <Modal width={560} title="Transaction status" {...modalProps}>
      <div className="grid flow-row pv-8 ph-8">
        {state === 'progress' && (
          <>
            <Icon name="tx-progress" width={180} height={160} className="mb-32 mh-auto" />
            <Text type="h3" weight="semibold" color="primary" className="mb-16 text-center">
              Your transaction is being processed ...
            </Text>
            <div className="mb-64">{renderProgress?.()}</div>
            <ExternalLink href={getEtherscanTxUrl(txHash)} className="button-primary full-width">
              View on {activeNetwork.explorer.name}
            </ExternalLink>
          </>
        )}
        {state === 'success' && (
          <>
            <Icon name="tx-success" width={180} height={160} className="mb-32 mh-auto" />
            <Text type="h3" weight="semibold" color="primary" className="mb-16 text-center">
              Congratulations!
            </Text>
            <Text type="small" weight="semibold" color="secondary" className="mb-16 text-center">
              Your transaction was successful.
            </Text>
            {renderSuccess?.()}
          </>
        )}
        {state === 'fail' && (
          <>
            <Icon name="tx-failure" width={180} height={160} className="mb-32 mh-auto" />
            <Text type="h3" weight="semibold" color="primary" className="mb-16 text-center">
              Failed!
            </Text>
            <Text type="small" weight="semibold" color="secondary" className="mb-64 text-center">
              Your transaction failed to execute.
              <br />
              Please try again.
            </Text>
            <Button htmlType="submit" type="primary" onClick={props?.onCancel}>
              Dismiss
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default TxStatusModal;
