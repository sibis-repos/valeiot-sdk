import { OrderByFn } from './common.js';
import { ThemeReduced } from './themes.js';

export type PortalOrderBy = 'name' | 'description' | 'version' | 'created_at' | 'updated_at';

export type Portal = {
  id: number;
  createdAt: string;
  updatedAt: string;
  appName: string;
  name: string;
  themeId?: number;
  description: string;
  version: string;
  content: any;
};

export type PortalDetails = {
  id: number;
  createdAt: string;
  updatedAt: string;
  appName: string;
  name: string;
  theme?: ThemeReduced;
  description: string;
  version: string;
  content: any;
};

export type PortalForm = {
  appName: string;
  themeId?: number;
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
