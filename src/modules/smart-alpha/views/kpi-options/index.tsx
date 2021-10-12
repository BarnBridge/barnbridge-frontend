import AntdSpin from 'antd/lib/spin';

import { useFetchKpiOptions } from 'modules/smart-alpha/api';
import { KpiOptionCard } from 'modules/smart-alpha/views/kpi-options/kpi-option-card';

const KpiOptionsView: React.FC = () => {
  const { loading, data: kpiOptions } = useFetchKpiOptions();

  return (
    <AntdSpin spinning={loading}>
      {kpiOptions?.map(kpiOption => (
        <KpiOptionCard key={kpiOption.poolAddress} kpiOption={kpiOption} />
      ))}
    </AntdSpin>
  );
};

export default KpiOptionsView;
