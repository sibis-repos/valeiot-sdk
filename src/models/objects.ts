import { OrderByFn } from './common.js';
import { TagsFilter } from './tags.js';

export type DatasourceObjectOrderBy = 'name' | 'created_at' | 'updated_at';

export type DatasourceObject = {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  value: Record<string, any>;
};

export type DatasourceObjectForm = {
  key: string;
  value: Record<string, any>;
};

export type DatasourceObjectsListFilters = {
  key?: string;
  tags?: TagsFilter;
  withValue?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: DatasourceObjectOrderBy;
  orderByFn?: OrderByFn;
};
