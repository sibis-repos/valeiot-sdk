import { OrderByFn } from './common.js';
import { TagsFilter } from './tags.js';

export type DriveFolder = {
  id: number;
  parentId: number | null;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DriveFolderForm = {
  parentId: number | null;
  name: string;
  description: string;
};

export type DriveFoldersListFilters = {
  parentId?: number;
  name?: string;
  description?: string;
  tags?: TagsFilter;
  limit?: number;
  offset?: number;
  orderBy?: 'name' | 'description' | 'crated_at' | 'updated_at';
  orderByFn?: OrderByFn;
};
