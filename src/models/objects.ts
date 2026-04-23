import { OrderByFn } from './common.js';
import { TagsFilter } from './tags.js';

/**
 * Sort fields accepted by datasource object listing endpoints.
 */
export type DatasourceObjectOrderBy = 'name' | 'created_at' | 'updated_at';

/**
 * Structured object associated with a datasource.
 */
export type DatasourceObject = {
  id: number;
  key: string;
  createdAt: string;
  updatedAt: string;
  value: Record<string, any>;
};

/**
 * Payload used to create or update a datasource object.
 */
export type DatasourceObjectForm = {
  key: string;
  value: Record<string, any>;
};

/**
 * Filters used when listing datasource objects.
 */
export type DatasourceObjectsListFilters = {
  key?: string;
  tags?: TagsFilter;
  withValue?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: DatasourceObjectOrderBy;
  orderByFn?: OrderByFn;
};
