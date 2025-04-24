import { DriveFolder, DriveFolderForm, DriveFoldersListFilters } from '../models/drive_folder';
import { List } from '../models/list';
import { ID } from '../models/common';
import { API } from './api';
import { DriveFoldersTags } from './drive_folders_tags';

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
  public async get(options: { folderId: number }): Promise<DriveFolder> {
    return this.api.fetch({
      method: 'GET',
      path: `drive/folders/${options.folderId}`,
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
    } = {}
  ): Promise<List<DriveFolder>> {
    return this.api.fetch({
      method: 'GET',
      path: 'drive/folders',
      params: options.params,
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
  public async create(options: { body: DriveFolderForm }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'drive/folders',
      body: options.body,
    });
  }

  /**
   * Updates an existing drive folder.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(options: { parserId: number; body: DriveFolderForm }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `drive/folders/${options.parserId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a drive folder.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { parserId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `drive/folders/${options.parserId}`,
    });
  }
}
