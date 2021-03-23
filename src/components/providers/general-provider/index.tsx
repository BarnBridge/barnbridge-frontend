import React from 'react';
import ReactDOM from 'react-dom';
import { useLocalStorage } from 'react-use-storage';

import { Toast } from 'components/custom/notification';
import { useWallet } from 'wallets/wallet';

export type GeneralContextType = {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: string;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
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
  // ?
};

type ProposalVotingEndingSoonType = ProposalBaseType & {
  notificationType: 'proposal-voting-ending-soon';
  // ?
};

type ProposalOutcomeType = ProposalBaseType & {
  notificationType: 'proposal-outcome';
  // ?
};

type ProposalAcceptedType = ProposalBaseType & {
  notificationType: 'proposal-accepted';
  // ?
};

type ProposalFailedType = ProposalBaseType & {
  notificationType: 'proposal-failed';
  // ?
};

type ProposalQueuedType = ProposalBaseType & {
  notificationType: 'proposal-queued';
  // ?
};

type ProposalGraceType = ProposalBaseType & {
  notificationType: 'proposal-grace';
  // ?
};

type ProposalExecutedType = ProposalBaseType & {
  notificationType: 'proposal-executed';
  metadata: {
    proposalId: number;
  };
};

type ProposalExpiredType = ProposalBaseType & {
  notificationType: 'proposal-expired';
  // ?
};

type AbrogationProposalCreatedType = ProposalBaseType & {
  notificationType: 'abrogation-proposal-created';
  metadata: {
    proposalId: number;
    proposer: string;
  };
};

type ProposalAbrogatedType = ProposalBaseType & {
  notificationType: 'proposal-abrogated';
  // ?
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
  | ProposalGraceType
  | ProposalExecutedType
  | ProposalExpiredType
  | AbrogationProposalCreatedType
  | ProposalAbrogatedType;

const GeneralContext = React.createContext<GeneralContextType>({} as any);

const mqlDark = window.matchMedia('(prefers-color-scheme: dark)');
const defaultTheme = mqlDark.matches ? 'dark' : 'light';

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

const GeneralContextProvider: React.FC<Props> = ({ children }) => {
  const [navOpen, setNavOpen] = React.useState<boolean>(false);
  const [notifications, setNotifications] = React.useState<GeneralContextType['notifications']>([]);
  const [toasts, setToasts] = React.useState<NotificationType[]>([]);
  const [notificationsReadUntil, setNotificationsReadUntil] = React.useState<
    GeneralContextType['notificationsReadUntil']
  >(1);
  const [theme, setTheme] = useLocalStorage('bb_theme', defaultTheme);
  const [storedReadUntil, setStoredReadUntil, removeStoredReadUntil] = useLocalStorage('bb_notifications_read_until');
  const wallet = useWallet();

  React.useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', theme);
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [theme]);

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
    <GeneralContext.Provider
      value={{
        navOpen,
        setNavOpen,
        theme,
        isDarkTheme: theme === 'dark',
        toggleDarkTheme: () => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        },
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
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

export function useGeneral(): GeneralContextType {
  return React.useContext<GeneralContextType>(GeneralContext);
}
