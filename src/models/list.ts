/**
 * Generic paginated list response returned by collection endpoints.
 *
 * @typeParam T Item type contained in the list.
 */
export type List<T> = {
  items: T[];
  count: number;
};
