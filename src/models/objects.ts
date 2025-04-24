import { OrderByFn } from './common';
import { TagsFilter } from './tags';

export type DatasourceObject = {
  id: number;
  key: string;
  createdAt: Date;
  updatedAt: Date;
  value: Record<string, any>;
};

export type DatasourceObjectForm = {
  key: string;
  value: Record<string, any>;
};

export type DatasourceObjectsListFilters = {
  key?: string;
  tags?: TagsFilter;
  limit?: number;
  offset?: number;
  orderBy?: 'name' | 'created_at' | 'updated_at';
  orderByFn?: OrderByFn;
};
