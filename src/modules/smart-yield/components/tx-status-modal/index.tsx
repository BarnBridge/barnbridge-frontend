import React from 'react';

import Button from 'components/antd/button';
import Modal, { ModalProps } from 'components/antd/modal';
import ExternalLink from 'components/custom/externalLink';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useNetwork } from 'providers/networkProvider';

type Props = ModalProps & {
  type?: 'deposit' | 'withdraw' | 'redeem' | 'transfer' | 'redeemJunior';
  state?: 'progress' | 'success' | 'failure';
  txLink?: string;
  onSuccessClick?: () => void;
};

const TxStatusModal: React.FC<Props> = props => {
  const { type, state, txLink, onSuccessClick, ...modalProps } = props;
  const { activeNetwork } = useNetwork();

  return (
    <Modal width={560} title="Transaction status" {...modalProps}>
      <div className="grid flow-row pv-8 ph-8">
        {state === 'progress' && (
          <>
            <Icon name="tx-progress" width={180} height={160} className="mb-32 mh-auto" />
            <Text type="h3" weight="semibold" color="primary" className="mb-64 text-center">
              Your transaction is being processed ...
            </Text>
            <ExternalLink href={txLink}>
              <Button htmlType="submit" type="primary" className="full-width">
                View on {activeNetwork.explorer.name}
              </Button>
            </ExternalLink>
          </>
        )}
        {state === 'success' && (
          <>
            <Icon name="tx-success" width={180} height={160} className="mb-32 mh-auto" />
            <Text type="h3" weight="semibold" color="primary" className="mb-16 text-center">
              Congratulations!
            </Text>
            <Text type="small" weight="semibold" color="secondary" className="mb-64 text-center">
              Your transaction was successful.
              <br />
              {type === 'deposit' && 'You can see your new position in your portfolio'}
              {type === 'withdraw' && 'You can see your past positions in your portfolio'}
              {type === 'redeem' && 'You can see your past positions in your portfolio'}
              {type === 'redeemJunior' && 'You can see your past positions in your portfolio'}
            </Text>
            {type !== 'transfer' && (
              <Button htmlType="submit" type="primary" onClick={onSuccessClick}>
                See your portfolio
              </Button>
            )}
          </>
        )}
        {state === 'failure' && (
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
