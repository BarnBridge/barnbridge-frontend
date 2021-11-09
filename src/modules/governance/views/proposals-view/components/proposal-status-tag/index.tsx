import { Badge, BadgeProps } from 'components/custom/badge';
import { APIProposalState, APIProposalStateMap } from 'modules/governance/api';

export type ProposalStatusTagProps = {
  className?: string;
  state: APIProposalState;
};

const ProposalStatusTag: React.FC<ProposalStatusTagProps> = ({ state, className }) => {
  let color: BadgeProps['color'] = 'grey';
  switch (state) {
    case 'ACCEPTED':
    case 'EXECUTED':
      color = 'green';
      break;
    case 'WARMUP':
    case 'ACTIVE':
    case 'QUEUED':
    case 'GRACE':
      color = 'blue';
      break;
    case 'EXPIRED':
    case 'FAILED':
    case 'CANCELED':
    case 'ABROGATED':
      color = 'red';
      break;
  }

  return (
    <Badge color={color} size="large">
      {APIProposalStateMap.get(state)}
    </Badge>
  );
};

export default ProposalStatusTag;
