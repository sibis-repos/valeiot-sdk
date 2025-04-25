import { OrderByFn } from './common.js';

export type PayloadParserReduced = {
  id: number;
  name: string;
};

export type PayloadParser = {
  id: number;
  name: string;
  description: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PayloadParserForm = {
  name: string;
  description: string;
  code: string;
};

export type PayloadParsersListFilters = {
  name?: string;
  description?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'name' | 'description' | 'createdAt' | 'updatedAt';
  orderByFn?: OrderByFn;
};
