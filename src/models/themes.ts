import { OrderByFn } from './common';

export type ThemeOrderBy = 'name' | 'description' | 'version' | 'created_at' | 'updated_at';

export type Theme = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  version: string;
  content: any;
};

export type ThemeReduced = {
  id: number;
  name: string;
  version: string;
  content: any;
};

export type ThemeForm = {
  name: string;
  description: string;
  version: string;
  content: any;
};

export type ThemesListFilters = {
  name?: string;
  description?: string;
  version?: string;
  limit?: number;
  offset?: number;
  orderBy?: ThemeOrderBy;
  orderByFn?: OrderByFn;
};
