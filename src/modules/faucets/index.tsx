import { FauceteerProvider } from 'modules/faucets/providers/fauceteerProvider';
import FaucetListView from 'modules/faucets/views/faucet-list-view';

const FaucetsView: React.FC = () => {
  return (
    <FauceteerProvider>
      <FaucetListView />
    </FauceteerProvider>
  );
};

export default FaucetsView;
