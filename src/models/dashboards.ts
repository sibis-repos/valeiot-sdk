import { OrderByFn } from './common.js';
import { TagsFilter } from './tags.js';

/**
 * Sort fields accepted by dashboard listing endpoints.
 */
export type DashboardOrderBy = 'name' | 'description' | 'version' | 'created_at' | 'updated_at';

/**
 * Dashboard resource used for data visualization inside Valeiot.
 */
export type Dashboard = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  version: string;
  content: any;
};

/**
 * Payload used to create or update a dashboard.
 */
export type DashboardForm = {
  name: string;
  description: string;
  version: string;
  content: any;
};

/**
 * Filters used when listing dashboards.
 */
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
