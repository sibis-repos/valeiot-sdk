import { API } from './api';
import { DriveFolders } from './drive_folders';

export class Drive {
  private api: API;

  public folders: DriveFolders;

  constructor(api: API) {
    this.api = api;
    this.folders = new DriveFolders(this.api);
  }
}
