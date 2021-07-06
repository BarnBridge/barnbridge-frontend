import { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import TxStatusModal from 'web3/components/tx-status-modal';
import UserRejectedModal from 'web3/components/user-rejected-modal';
import Web3Contract, { Web3SendMeta, Web3SendState } from 'web3/web3Contract';

type Props = {
  contract?: Web3Contract;
  renderProgress?: (meta?: Web3SendMeta) => ReactNode;
  renderSuccess?: (meta?: Web3SendMeta) => ReactNode;
};

type TxStatus = {
  visible: boolean;
  state?: Web3SendState;
  meta?: Web3SendMeta;
};

const ContractListener: FC<Props> = props => {
  const { contract, renderProgress, renderSuccess } = props;

  const [userRejectedVisible, setUserRejected] = useState(false);

  const [txStatus, setTxStatus] = useState<TxStatus>({
    visible: false,
    state: undefined,
    meta: undefined,
  });

  useEffect(() => {
    if (!contract) {
      return;
    }

    function onHash(txHash: string, meta: Web3SendMeta) {
      setTxStatus(prevState => ({
        ...prevState,
        visible: true,
        state: meta.state,
        meta,
      }));
    }

    function onSuccess(result: any, meta: Web3SendMeta) {
      setTxStatus(prevState =>
        prevState.meta?.id === meta.id
          ? {
              ...prevState,
              state: meta.state,
            }
          : prevState,
      );
    }

    function onFail(error: any, meta: Web3SendMeta) {
      if (error.code === 4001) {
        setUserRejected(true);
      } else {
        setTxStatus(prevState =>
          prevState.meta?.id === meta.id
            ? {
                ...prevState,
                state: meta.state,
              }
            : prevState,
        );
      }
    }

    contract.on('tx:hash', onHash);
    contract.on('tx:success', onSuccess);
    contract.on('tx:fail', onFail);

    return () => {
      contract.off('tx:hash', onHash);
      contract.off('tx:success', onSuccess);
      contract.off('tx:fail', onFail);
    };
  }, [contract]);

  const handleUserRejectedCancel = useCallback(() => {
    setUserRejected(false);
  }, []);

  const handleStatusModalCancel = useCallback(() => {
    setTxStatus(prevState => ({
      ...prevState,
      visible: false,
      state: undefined,
      txHash: undefined,
    }));
  }, []);

  if (userRejectedVisible) {
    return <UserRejectedModal onCancel={handleUserRejectedCancel} />;
  }

  if (txStatus.visible) {
    return (
      <TxStatusModal
        state={txStatus.state}
        txHash={txStatus.meta?.txHash}
        renderProgress={() => renderProgress?.(txStatus.meta)}
        renderSuccess={() => renderSuccess?.(txStatus.meta)}
        onCancel={handleStatusModalCancel}
      />
    );
  }

  return null;
};

export default ContractListener;
