import React from 'react';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';

export default function PortfolioJunior() {
  return (
    <>
      <div className="grid mb-32" style={{ gridTemplateColumns: '40% 1fr', columnGap: 32 }}>
        <PortfolioBalance />
        <PortfolioValue />
      </div>
    </>
  );
}
