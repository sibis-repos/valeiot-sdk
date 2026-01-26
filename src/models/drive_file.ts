import { OrderByFn } from './common.js';
import { TagsFilter } from './tags.js';

export type DriveFileOrderBy =
  | 'name'
  | 'description'
  | 'public'
  | 'size'
  | 'created_at'
  | 'updated_at';

export type DriveFile = {
  id: number;
  folderId: number | null;
  public: boolean;
  name: string;
  description: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DriveFileForm = {
  folderId?: number | null;
  public?: boolean;
  name: string;
  description: string;
  size: number;
};

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

export type PresignedHTTPRequest = {
  url: string;
  method: string;
  signedHeader: Record<string, string[]>;
};

export type DriveCreateResponse = {
  id: number;
  request: PresignedHTTPRequest | null;
};

export type DriveUpdateResponse = {
  request: PresignedHTTPRequest | null;
};
