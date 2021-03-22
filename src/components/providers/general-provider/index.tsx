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

type AbrogationProposalCreatedType = ProposalBaseType & {
  notificationType: 'abrogation-proposal-created';
  metadata: {
    proposalId: number;
    proposer: string;
  };
};

type ProposalExecutedType = ProposalBaseType & {
  notificationType: 'proposal-executed';
  metadata: {
    proposalId: number;
  };
};

type ProposalCanceledType = ProposalBaseType & {
  notificationType: 'proposal-canceled';
  metadata: {
    proposalId: number;
  };
};

export type NotificationType =
  | ProposalCreatedType
  | AbrogationProposalCreatedType
  | ProposalExecutedType
  | ProposalCanceledType;

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
  const [notifications, setNotifications] = React.useState<NotificationType[]>([]);
  const [toasts, setToasts] = React.useState<NotificationType[]>([]);
  const [theme, setTheme] = useLocalStorage('bb_theme', defaultTheme);
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

  const lastNotificationTimestamp: NotificationType['startsOn'] | null = notifications.length
    ? notifications[notifications.length - 1].startsOn
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
