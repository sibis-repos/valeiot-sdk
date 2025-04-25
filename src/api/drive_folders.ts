import { DriveFolder, DriveFolderForm, DriveFoldersListFilters } from '../models/drive_folder.js';
import { List } from '../models/list.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';
import { DriveFoldersTags } from './drive_folders_tags.js';

export class DriveFolders {
  private api: API;

  public tags: DriveFoldersTags;

  constructor(api: API) {
    this.api = api;
    this.tags = new DriveFoldersTags(this.api);
  }

  /**
   * Retrieves a drive folder.
   * @param options Request options.
   * @default
   * driveFolder: {
   *  id: 2,
   *  parentId: 1
   *  name: "My images",
   *  description: "",
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async get(options: { folderId: number } & RequestOptions): Promise<DriveFolder> {
    return this.api.fetch({
      method: 'GET',
      path: `drive/folders/${options.folderId}`,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves a list of driveFolders.
   * @param options Request options.
   * @default
   * driveFolders: [
   *  {
   *   id: 2,
   *   parentId: 1
   *   name: "My images",
   *   description: "",
   *   createdAt: Date,
   *   updatedAt: Date,
   *  }
   * ]
   */
  public async getList(
    options: {
      params?: DriveFoldersListFilters;
    } & RequestOptions = {}
  ): Promise<List<DriveFolder>> {
    return this.api.fetch({
      method: 'GET',
      path: 'drive/folders',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new drive folder.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1
   * }
   */
  public async create(options: { body: DriveFolderForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'drive/folders',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing drive folder.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: { parserId: number; body: DriveFolderForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `drive/folders/${options.parserId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a drive folder.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { parserId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `drive/folders/${options.parserId}`,
      modifier: options.modifier,
    });
  }
}
