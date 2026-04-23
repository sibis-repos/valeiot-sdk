import { OrderByFn } from './common.js';
import { TagsFilter } from './tags.js';

/**
 * Sort fields accepted by drive folder listing endpoints.
 */
export type DriveFolderOrderBy = 'name' | 'description' | 'created_at' | 'updated_at';

/**
 * Folder resource from the Valeiot drive module.
 */
export type DriveFolder = {
  id: number;
  parentId: number | null;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Payload used to create or update a drive folder.
 */
export type DriveFolderForm = {
  parentId: number | null;
  name: string;
  description: string;
};

/**
 * Filters used when listing drive folders.
 */
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
