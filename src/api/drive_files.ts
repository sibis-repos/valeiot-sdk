import {
  DriveFile,
  DriveFileForm,
  DriveFilesListFilters,
  DriveCreateResponse,
  DriveUpdateResponse,
} from '../models/drive_file.js';
import { List } from '../models/list.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';

/**
 * Workspace API wrapper for Valeiot drive files.
 */
export class DriveFiles {
  private api: API;

  /**
   * Creates a drive files client.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a drive file.
   * @param options Request options.
   * @default
   * driveFile: {
   *  id: 1,
   *  folderId: 2,
   *  public: false,
   *  name: "document.pdf",
   *  description: "My document",
   *  size: 1024,
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async get(options: { fileId: number } & RequestOptions): Promise<DriveFile> {
    return this.api.fetch({
      method: 'GET',
      path: `drive/files/${options.fileId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of drive files.
   * @param options Request options.
   * @default
   * driveFiles: [
   *  {
   *   id: 1,
   *   folderId: 2,
   *   public: false,
   *   name: "document.pdf",
   *   description: "My document",
   *   size: 1024,
   *   createdAt: Date,
   *   updatedAt: Date,
   *  }
   * ]
   */
  public async getList(
    options: {
      params?: DriveFilesListFilters;
    } & RequestOptions = {}
  ): Promise<List<DriveFile>> {
    return this.api.fetch({
      method: 'GET',
      path: 'drive/files',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new drive file.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1,
   *  request: {
   *    url: "https://...",
   *    method: "PUT",
   *    signedHeader: {...}
   *  }
   * }
   */
  public async create(
    options: { body: DriveFileForm } & RequestOptions
  ): Promise<DriveCreateResponse> {
    return this.api.fetch({
      method: 'POST',
      path: 'drive/files',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing drive file.
   * @param options Request options.
   * @default
   * response: {
   *  request: {
   *    url: "https://...",
   *    method: "PUT",
   *    signedHeader: {...}
   *  }
   * }
   */
  public async update(
    options: {
      fileId: number;
      body: DriveFileForm;
      keepContent?: boolean;
    } & RequestOptions
  ): Promise<DriveUpdateResponse> {
    return this.api.fetch({
      method: 'PUT',
      path: `drive/files/${options.fileId}`,
      body: options.body,
      params:
        options.keepContent !== undefined ? { 'keep-content': options.keepContent } : undefined,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a drive file.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { fileId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `drive/files/${options.fileId}`,
      modifier: options.modifier,
    });
  }
}
