import { CSSProperties, FC } from 'react';

export type FCx<P = {}> = FC<
  P & {
    className?: string;
    style?: CSSProperties;
  }
>;
