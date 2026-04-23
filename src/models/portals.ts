import { OrderByFn } from './common.js';
import { ThemeReduced } from './themes.js';

/**
 * Sort fields accepted by portal listing endpoints.
 */
export type PortalOrderBy = 'name' | 'description' | 'version' | 'created_at' | 'updated_at';

/**
 * Portal resource representing a publishable end-user application.
 */
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

/**
 * Expanded portal view including the resolved theme reference.
 */
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

/**
 * Payload used to create or update a portal.
 */
export type PortalForm = {
  appName: string;
  themeId?: number;
  name: string;
  description: string;
  version: string;
  content: any;
};

/**
 * Filters used when listing portals.
 */
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
