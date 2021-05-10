import QueryString from 'query-string';

export function queryfy(obj: Record<string, any>): string {
  return QueryString.stringify(obj, {
    skipNull: true,
    skipEmptyString: true,
    encode: true,
    arrayFormat: 'comma',
  });
}

export type PaginatedResult<T extends Record<string, any>> = {
  data: T[];
  meta: {
    count: number;
    block: number;
  };
};
