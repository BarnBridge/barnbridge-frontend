import { CSSProperties, FC, ReactNode } from 'react';

export type SCP<P = {}> = P & {
  className?: string;
  style?: CSSProperties;
};

export type CP<P = {}> = P & {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export type FCx<P = {}> = FC<CP<P>>;
