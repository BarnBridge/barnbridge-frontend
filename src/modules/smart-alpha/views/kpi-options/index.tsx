import { FC } from 'react';
import AntdSpin from 'antd/lib/spin';

import { useFetchKpiOptions } from 'modules/smart-alpha/api';
import { KpiOptionCard } from 'modules/smart-alpha/views/kpi-options/kpi-option-card';

import s from './s.module.scss';

const KpiOptionsView: FC = () => {
  const { loading, data: kpiOptions } = useFetchKpiOptions();

  return (
    <AntdSpin spinning={loading}>
      <div className={s.cards}>
        {kpiOptions?.map(kpiOption => (
          <KpiOptionCard key={kpiOption.poolAddress} kpiOption={kpiOption} />
        ))}
      </div>
    </AntdSpin>
  );
};

export default KpiOptionsView;
