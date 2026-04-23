import { OrderByFn } from './common.js';
import { TagsFilter } from './tags.js';

/**
 * Sort fields accepted by drive file listing endpoints.
 */
export type DriveFileOrderBy =
  | 'name'
  | 'description'
  | 'public'
  | 'size'
  | 'created_at'
  | 'updated_at';

/**
 * File resource stored in the Valeiot drive module.
 */
export type DriveFile = {
  id: number;
  folderId: number | null;
  public: boolean;
  name: string;
  description: string;
  size: number;
  createdAt: string;
  updatedAt: string;
};

/**
 * Payload used to create or update a drive file.
 */
export type DriveFileForm = {
  folderId?: number | null;
  public?: boolean;
  name: string;
  description: string;
  size: number;
};

/**
 * Filters used when listing drive files.
 */
export type DriveFilesListFilters = {
  folderId?: number;
  public?: boolean;
  name?: string;
  description?: string;
  tags?: TagsFilter;
  limit?: number;
  offset?: number;
  orderBy?: DriveFileOrderBy;
  orderByFn?: OrderByFn;
};

/**
 * Presigned HTTP request parameters used for upload or update flows.
 */
export type PresignedHTTPRequest = {
  url: string;
  method: string;
  signedHeader: Record<string, string[]>;
};

/**
 * Drive file creation response, optionally including a presigned upload request.
 */
export type DriveCreateResponse = {
  id: number;
  request: PresignedHTTPRequest | null;
};

/**
 * Drive file update response, optionally including a new presigned upload request.
 */
export type DriveUpdateResponse = {
  request: PresignedHTTPRequest | null;
};
