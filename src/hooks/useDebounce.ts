import React from 'react';
import Debounce from 'lodash/debounce';

export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 0,
): T {
  return React.useCallback<T>(Debounce(fn, delay) as any, []);
}
