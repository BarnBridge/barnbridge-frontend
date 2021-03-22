import Icon from 'components/custom/icon';
import { NotificationType } from 'components/providers/general-provider';

import s from './s.module.scss';

type Props = {
  n: NotificationType;
  onClose?: (id: NotificationType['id']) => void;
};

const Notification: React.FC<Props> = ({ n, onClose }) => {
  return (
    <div className={s.n}>
      <Icon name="bank-outlined" width="40" height="40" className="mr-16" />
      <div>{n.message}</div>
      {onClose ? (
        <button type="button" onClick={() => onClose(n.id)} className={s.close}>
          <Icon name="close" width="40" height="40" />
        </button>
      ) : (
        <time className={s.time}>{new Date(n.startsOn * 1000).toLocaleString()}</time>
      )}
    </div>
  );
};

export default Notification;
