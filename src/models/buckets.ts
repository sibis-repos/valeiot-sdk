import { OrderByFn } from './common';

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
  orderBy?: 'name' | 'retention';
  orderByFn?: OrderByFn;
};
