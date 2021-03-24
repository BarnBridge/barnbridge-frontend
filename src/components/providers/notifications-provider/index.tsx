import React from 'react';
import ReactDOM from 'react-dom';
import { useLocalStorage } from 'react-use-storage';

import { Toast } from 'components/custom/notification';
import { useWallet } from 'wallets/wallet';

export type NotificationsContextType = {
  notifications: NotificationType[];
  notificationsReadUntil: number;
  setNotificationsReadUntil: (value: number) => void;
};

type ProposalBaseType = {
  id: number;
  target: string;
  startsOn: number;
  expiresOn: number;
  message: string;
  // metadata: Object | null;
};

type ProposalCreatedType = ProposalBaseType & {
  notificationType: 'proposal-created';
  metadata: {
    proposalId: number;
    proposer: string;
  };
};

type ProposalActivatedSoonType = ProposalBaseType & {
  notificationType: 'proposal-activating-soon';
  metadata: {
    proposalId: number;
    proposer: string;
  };
};

type ProposalCanceledType = ProposalBaseType & {
  notificationType: 'proposal-canceled';
  metadata: {
    proposalId: number;
  };
};

type ProposalVotingOpenType = ProposalBaseType & {
  notificationType: 'proposal-voting-open';
  metadata: {
    proposalId: number;
  };
};

type ProposalVotingEndingSoonType = ProposalBaseType & {
  notificationType: 'proposal-voting-ending-soon';
  metadata: {
    proposalId: number;
  };
};

type ProposalOutcomeType = ProposalBaseType & {
  notificationType: 'proposal-outcome';
  // ?
};

type ProposalAcceptedType = ProposalBaseType & {
  notificationType: 'proposal-accepted';
  metadata: {
    proposalId: number;
    displayDuration: number;
    proposer: string;
  };
};

type ProposalFailedType = ProposalBaseType & {
  notificationType: 'proposal-failed';
  metadata: {
    proposalId: number;
  };
};

type ProposalQueuedType = ProposalBaseType & {
  notificationType: 'proposal-queued';
  metadata: {
    proposalId: number;
    caller: string;
    displayDuration: number;
  };
};

type ProposalQueueEndingSoonType = ProposalBaseType & {
  notificationType: 'proposal-queue-ending-soon';
  metadata: {
    proposalId: number;
  };
};

type ProposalGraceType = ProposalBaseType & {
  notificationType: 'proposal-grace';
  metadata: {
    proposalId: number;
    displayDuration: number;
    proposer: string;
  };
};

type ProposalExecutedType = ProposalBaseType & {
  notificationType: 'proposal-executed';
  metadata: {
    proposalId: number;
    caller: string;
    displayDuration: number;
  };
};

type ProposalExpiresSoonType = ProposalBaseType & {
  notificationType: 'proposal-expires-soon';
  metadata: {
    proposalId: number;
  };
};

type ProposalExpiredType = ProposalBaseType & {
  notificationType: 'proposal-expired';
  metadata: {
    proposalId: number;
  };
};

type AbrogationProposalCreatedType = ProposalBaseType & {
  notificationType: 'abrogation-proposal-created';
  metadata: {
    proposalId: number;
    proposer: string;
    displayDuration: number;
  };
};

type ProposalAbrogatedType = ProposalBaseType & {
  notificationType: 'proposal-abrogated';
  metadata: {
    proposalId: number;
  };
};

export type NotificationType =
  | ProposalCreatedType
  | ProposalActivatedSoonType
  | ProposalCanceledType
  | ProposalVotingOpenType
  | ProposalVotingEndingSoonType
  | ProposalOutcomeType
  | ProposalAcceptedType
  | ProposalFailedType
  | ProposalQueuedType
  | ProposalQueueEndingSoonType
  | ProposalGraceType
  | ProposalExecutedType
  | ProposalExpiresSoonType
  | ProposalExpiredType
  | AbrogationProposalCreatedType
  | ProposalAbrogatedType;

const NotificationsContext = React.createContext<NotificationsContextType>({} as any);

export function fetchNotifications({
  target,
  timestamp,
}: {
  target?: string;
  timestamp?: number | null;
}): Promise<NotificationType[]> {
  const url = new URL('/api/notifications/list', process.env.REACT_APP_GOV_API_URL);
  if (target) {
    url.searchParams.set('target', target);
  }

  if (timestamp) {
    url.searchParams.set('timestamp', String(timestamp));
  }

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

const notificationsNode = document.querySelector('#notifications-root');

type Props = {
  children: React.ReactNode;
};

const NotificationsContextProvider: React.FC<Props> = ({ children }) => {
  const [notifications, setNotifications] = React.useState<NotificationsContextType['notifications']>([]);
  const [toasts, setToasts] = React.useState<NotificationType[]>([]);
  const [notificationsReadUntil, setNotificationsReadUntil] = React.useState<
    NotificationsContextType['notificationsReadUntil']
  >(1);
  const [storedReadUntil, setStoredReadUntil, removeStoredReadUntil] = useLocalStorage('bb_notifications_read_until');
  const wallet = useWallet();

  const addToast = React.useCallback((notification: NotificationType) => {
    setToasts(ns => [...ns, notification]);
  }, []);

  const removeToast = React.useCallback((id: NotificationType['id']) => {
    setToasts(prevNotifications => prevNotifications.filter(n => n.id !== id));
  }, []);

  React.useEffect(() => {
    if (storedReadUntil) {
      setNotificationsReadUntil(Number(storedReadUntil));
    }
  }, []);

  const setNotificationsReadUntilHandler = React.useCallback((value: number) => {
    if (value) {
      setStoredReadUntil(value);
      setNotificationsReadUntil(value);
    } else {
      removeStoredReadUntil();
      setNotificationsReadUntil(0);
    }
  }, []);

  const lastNotificationTimestamp: NotificationType['startsOn'] | null = notifications.length
    ? Math.max(...notifications.map(n => n.startsOn))
    : null;
  const timestampRef = React.useRef(lastNotificationTimestamp);
  timestampRef.current = lastNotificationTimestamp;

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (wallet.initialized) {
      fetchNotifications({ target: wallet.account }).then(setNotifications).catch(console.error);

      intervalId = setInterval(() => {
        fetchNotifications({ target: wallet.account, timestamp: timestampRef.current })
          .then(ns => {
            if (Array.isArray(ns)) {
              setNotifications(prevNs => [...prevNs.filter(prevN => prevN.expiresOn * 1000 > Date.now()), ...ns]);
              ns.forEach(n => addToast(n));
            }
          })
          .catch(console.error);
      }, 30_000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [wallet.initialized, wallet.account]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        notificationsReadUntil,
        setNotificationsReadUntil: setNotificationsReadUntilHandler,
      }}>
      {children}
      {notificationsNode &&
        ReactDOM.createPortal(
          <>
            {toasts.map(n => (
              <Toast key={n.id} n={n} onClose={removeToast} timeout={10_000} />
            ))}
          </>,
          notificationsNode,
        )}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContextProvider;

export function useNotifications(): NotificationsContextType {
  return React.useContext<NotificationsContextType>(NotificationsContext);
}
