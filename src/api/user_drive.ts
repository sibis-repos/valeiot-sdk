import { PresignedHTTPRequest } from '../models/drive_file.js';
import { RequestOptions } from '../models/common.js';
import { API } from './api.js';

export class UserDrive {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async getFile(options: { fileId: number } & RequestOptions): Promise<void> {
    await this.api.fetch({
      method: 'GET',
      path: `drive/files/${options.fileId}`,
      modifier: options.modifier,
    });
  }

  public async getSignedURL(
    options: { fileId: number } & RequestOptions
  ): Promise<PresignedHTTPRequest> {
    return this.api.fetch({
      method: 'GET',
      path: `drive/files/${options.fileId}`,
      modifier: options.modifier,
    });
  }
}