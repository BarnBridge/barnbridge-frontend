import { CSSProperties, FC, ReactNode } from 'react';

export type CP<P = {}> = P & {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export type FCx<P = {}> = FC<CP<P>>;
