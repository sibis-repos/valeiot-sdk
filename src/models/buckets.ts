import { OrderByFn } from './common.js';

export type BucketOrderBy = 'name' | 'retention';

export type BucketReduced = {
  id: number;
  name: string;
};

export type Bucket = {
  id: number;
  name: string;
  description: string;
  standard: boolean;
  chunkInterval: number; // days
  retention: number; // days
  compressAfter: number; // days
};

export type BucketsListFilters = {
  name?: string;
  limit?: number;
  offset?: number;
  orderBy?: BucketOrderBy;
  orderByFn?: OrderByFn;
};
