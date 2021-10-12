import AntdSpin from 'antd/lib/spin';

import { Alert } from 'components/alert';
import { useFetchKpiOptions } from 'modules/smart-alpha/api';
import { KpiOptionCard } from 'modules/smart-alpha/views/kpi-options/kpi-option-card';

import s from './s.module.scss';

const KpiOptionsView: React.FC = () => {
  const { loading, data: kpiOptions } = useFetchKpiOptions();

  return (
    <AntdSpin spinning={loading}>
      <div className="mh-auto" style={{ maxWidth: '1240px' }}>
        <Alert type="info" className="mb-32">
          Check out our ongoing Key Performance Indicator option program by depositing into either the WETH (USD) or
          WBTC (USD) Balancer pools linked below:
          <div>
            <a
              href="https://pools.balancer.exchange/#/pool/0x86859d09d5fd6bdbab2db4f0073ddadaa57018b1"
              rel="noopener noreferrer"
              target="_blank">
              Balancer Pool 1
            </a>{' '}
            <a
              href="https://pools.balancer.exchange/#/pool/0xc4e5e56110ea66963ae59d18df9f30ac960fea18"
              rel="noopener noreferrer"
              target="_blank">
              Balancer Pool 2
            </a>
          </div>
        </Alert>
        <div className={s.cards}>
          {kpiOptions?.map(kpiOption => (
            <KpiOptionCard key={kpiOption.poolAddress} kpiOption={kpiOption} />
          ))}
        </div>
      </div>
    </AntdSpin>
  );
};

export default KpiOptionsView;
