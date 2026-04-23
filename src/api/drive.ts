import { API } from './api.js';
import { DriveFolders } from './drive_folders.js';
import { DriveFiles } from './drive_files.js';

/**
 * Aggregated workspace API wrapper for Valeiot drive resources.
 */
export class Drive {
  private api: API;

  public folders: DriveFolders;
  public files: DriveFiles;

  /**
   * Creates a drive client and wires folder and file sub-resources.
   *
   * @param api Shared API transport.
   */
  constructor(api: API) {
    this.api = api;
    this.folders = new DriveFolders(this.api);
    this.files = new DriveFiles(this.api);
  }
}
