import { OrderByFn } from './common.js';
import { TagsFilter } from './tags.js';

export type DashboardOrderBy = 'name' | 'description' | 'version' | 'createdAt' | 'updatedAt';

export type Dashboard = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  version: string;
  content: any;
};

export type DashboardForm = {
  name: string;
  description: string;
  version: string;
  content: any;
};

export type DashboardsListFilters = {
  name?: string;
  description?: string;
  version?: string;
  tags?: TagsFilter;
  limit?: number;
  offset?: number;
  orderBy?: DashboardOrderBy;
  orderByFn?: OrderByFn;
};
