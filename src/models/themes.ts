import { OrderByFn } from './common';

/**
 * Sort fields accepted by theme listing endpoints.
 */
export type ThemeOrderBy = 'name' | 'description' | 'version' | 'created_at' | 'updated_at';

/**
 * Theme resource used to style Valeiot portal experiences.
 */
export type Theme = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  version: string;
  content: any;
};

/**
 * Reduced theme representation embedded in other resource payloads.
 */
export type ThemeReduced = {
  id: number;
  name: string;
  version: string;
  content: any;
};

/**
 * Payload used to create or update a theme.
 */
export type ThemeForm = {
  name: string;
  description: string;
  version: string;
  content: any;
};

/**
 * Filters used when listing themes.
 */
export type ThemesListFilters = {
  name?: string;
  description?: string;
  version?: string;
  limit?: number;
  offset?: number;
  orderBy?: ThemeOrderBy;
  orderByFn?: OrderByFn;
};
