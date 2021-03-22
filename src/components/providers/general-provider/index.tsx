import React from 'react';
import { useLocalStorage } from 'react-use-storage';

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

export function fetchNotifications(target?: string): Promise<NotificationType[]> {
  const url = new URL('/api/notifications', process.env.REACT_APP_GOV_API_URL);
  if (target) {
    url.searchParams.set('target', target);
  }

  return fetch(url.toString())
    .then(result => result.json())
    .then(result => result.data);
}

const notificationsMock: NotificationType[] = [
  {
    id: 1,
    target: 'system',
    notificationType: 'proposal-created',
    startsOn: 1615305679,
    expiresOn: 1616760199,
    message: 'Proposal PID-1 created by 0xA01E9D3F3369aAF24cAc80Ba8CD611dB28d3937c',
    metadata: {
      proposalId: 1,
      proposer: '0xA01E9D3F3369aAF24cAc80Ba8CD611dB28d3937c',
    },
  },
  {
    id: 2,
    target: 'system',
    notificationType: 'proposal-created',
    startsOn: 1615380335,
    expiresOn: 1616760199,
    message: 'Proposal PID-2 created by 0xBBBbBB9B32eeF4239E6554542d1d638e382224C7',
    metadata: {
      proposalId: 2,
      proposer: '0xBBBbBB9B32eeF4239E6554542d1d638e382224C7',
    },
  },
  {
    id: 3,
    target: 'system',
    notificationType: 'proposal-created',
    startsOn: 1615817999,
    expiresOn: 1616760199,
    message: 'Proposal PID-3 created by 0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8',
    metadata: {
      proposalId: 3,
      proposer: '0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8',
    },
  },
  {
    id: 4,
    target: 'system',
    notificationType: 'abrogation-proposal-created',
    startsOn: 1615821468,
    expiresOn: 1616760199,
    message: 'Abrogation proposal for PID-3 created by 0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8',
    metadata: {
      proposalId: 3,
      proposer: '0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8',
    },
  },
  {
    id: 5,
    target: 'system',
    notificationType: 'proposal-executed',
    startsOn: 1615822464,
    expiresOn: 1616760199,
    message: 'Proposal PID-3 has been executed',
    metadata: {
      proposalId: 3,
    },
  },
  {
    id: 6,
    target: 'system',
    notificationType: 'proposal-created',
    startsOn: 1615849199,
    expiresOn: 1616760199,
    message: 'Proposal PID-4 created by 0xBBBbBB9B32eeF4239E6554542d1d638e382224C7',
    metadata: {
      proposalId: 4,
      proposer: '0xBBBbBB9B32eeF4239E6554542d1d638e382224C7',
    },
  },
  {
    id: 7,
    target: 'system',
    notificationType: 'proposal-created',
    startsOn: 1615899459,
    expiresOn: 1616760199,
    message: 'Proposal PID-5 created by 0xBBBbBB9B32eeF4239E6554542d1d638e382224C7',
    metadata: {
      proposalId: 5,
      proposer: '0xBBBbBB9B32eeF4239E6554542d1d638e382224C7',
    },
  },
  {
    id: 8,
    target: 'system',
    notificationType: 'proposal-created',
    startsOn: 1615905631,
    expiresOn: 1616760199,
    message: 'Proposal PID-6 created by 0xA01E9D3F3369aAF24cAc80Ba8CD611dB28d3937c',
    metadata: {
      proposalId: 6,
      proposer: '0xA01E9D3F3369aAF24cAc80Ba8CD611dB28d3937c',
    },
  },
  {
    id: 9,
    target: 'system',
    notificationType: 'proposal-created',
    startsOn: 1615907115,
    expiresOn: 1616760199,
    message: 'Proposal PID-7 created by 0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8',
    metadata: {
      proposalId: 7,
      proposer: '0xbbbbbbf2e986C085bF79d44BaCFA791C92b71fe8',
    },
  },
  {
    id: 10,
    target: 'system',
    notificationType: 'proposal-canceled',
    startsOn: 1615907584,
    expiresOn: 1616760199,
    message: 'Proposal PID-6 has been canceled',
    metadata: {
      proposalId: 6,
    },
  },
];

type Props = {
  children: React.ReactNode;
};

const GeneralContextProvider: React.FC<Props> = ({ children }) => {
  const [navOpen, setNavOpen] = React.useState<boolean>(false);
  const [notifications, setNotifications] = React.useState<NotificationType[]>([]);
  const [theme, setTheme] = useLocalStorage('bb_theme', defaultTheme);
  const wallet = useWallet();

  React.useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', theme);
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [theme]);

  React.useEffect(() => {
    // if (wallet.initialized) {
    //   console.log(`Fetch`, wallet.initialized, wallet.account)
    //   fetchNotifications(wallet.account).then(setNotifications);
    // }
    setTimeout(() => {
      setNotifications(notificationsMock);
    }, 1000);
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
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

export function useGeneral(): GeneralContextType {
  return React.useContext<GeneralContextType>(GeneralContext);
}
