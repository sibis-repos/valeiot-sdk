import { API } from './api.js';
import { DriveFolders } from './drive_folders.js';

export class Drive {
  private api: API;

  public folders: DriveFolders;

  constructor(api: API) {
    this.api = api;
    this.folders = new DriveFolders(this.api);
  }
}
