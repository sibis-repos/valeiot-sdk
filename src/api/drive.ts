import { API } from './api.js';
import { DriveFolders } from './drive_folders.js';
import { DriveFiles } from './drive_files.js';

export class Drive {
  private api: API;

  public folders: DriveFolders;
  public files: DriveFiles;

  constructor(api: API) {
    this.api = api;
    this.folders = new DriveFolders(this.api);
    this.files = new DriveFiles(this.api);
  }
}
