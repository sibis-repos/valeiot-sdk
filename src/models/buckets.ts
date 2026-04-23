import { OrderByFn } from './common.js';

/**
 * Sort fields accepted by bucket listing endpoints.
 */
export type BucketOrderBy = 'name' | 'retention';

/**
 * Minimal bucket representation used inside nested resource payloads.
 */
export type BucketReduced = {
  id: number;
  name: string;
};

/**
 * Time-series bucket configuration in Valeiot.
 */
export type Bucket = {
  id: number;
  name: string;
  description: string;
  standard: boolean;
  chunkInterval: number; // days
  retention: number; // days
  compressAfter: number; // days
};

/**
 * Filters used when listing buckets.
 */
export type BucketsListFilters = {
  name?: string;
  limit?: number;
  offset?: number;
  orderBy?: BucketOrderBy;
  orderByFn?: OrderByFn;
};
