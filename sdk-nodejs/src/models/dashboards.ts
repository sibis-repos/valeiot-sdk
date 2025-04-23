import { OrderByFn } from '../types';
import { TagsFilter } from './tags';

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
  orderBy?: 'name' | 'description' | 'version' | 'createdAt' | 'updatedAt';
  orderByFn?: OrderByFn;
};
