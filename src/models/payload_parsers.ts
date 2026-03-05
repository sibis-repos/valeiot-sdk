import { OrderByFn } from './common.js';

export type PayloadParserOrderBy = 'name' | 'description' | 'created_at' | 'updated_at';

export type PayloadParserReduced = {
  id: number;
  name: string;
};

export type PayloadParser = {
  id: number;
  name: string;
  description: string;
  code: string;
  createdAt: string;
  updatedAt: string;
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
  orderBy?: PayloadParserOrderBy;
  orderByFn?: OrderByFn;
};
