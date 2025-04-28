import { OrderByFn } from './common.js';

export type PortalOrderBy = 'name' | 'description' | 'version' | 'createdAt' | 'updatedAt';

export type Portal = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  appName: string;
  name: string;
  description: string;
  version: string;
  content: any;
};

export type PortalForm = {
  appName: string;
  name: string;
  description: string;
  version: string;
  content: any;
};

export type PortalsListFilters = {
  appName?: string;
  name?: string;
  description?: string;
  version?: string;
  limit?: number;
  offset?: number;
  orderBy?: PortalOrderBy;
  orderByFn?: OrderByFn;
};
