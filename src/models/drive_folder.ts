import { OrderByFn } from './common.js';
import { TagsFilter } from './tags.js';

export type DriveFolderOrderBy = 'name' | 'description' | 'created_at' | 'updated_at';

export type DriveFolder = {
  id: number;
  parentId: number | null;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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
  orderBy?: DriveFolderOrderBy;
  orderByFn?: OrderByFn;
};
