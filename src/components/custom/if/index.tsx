import React from 'react';

export type IFProps = {
  condition: boolean;
};

const IF: React.FunctionComponent<IFProps> = props => {
  return props.condition ? props.children as any : null;
}

export default IF;