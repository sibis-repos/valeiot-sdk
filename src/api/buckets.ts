import { Bucket, BucketsListFilters } from '../models/buckets.js';
import { RequestOptions } from '../models/common.js';
import { List } from '../models/list.js';
import { API } from './api.js';

export class Buckets {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of buckets.
   * @param options Request options.
   * @default
   * buckets: [
   *  {
   *    id: 1,
   *    name: "Default",
   *    description: "Default bucket",
   *    standard: true,
   *    chunkInterval: 7,
   *    retention: 30,
   *    compressAfter: 14
   *  }
   * ]
   */
  public async getList(
    options: { params?: BucketsListFilters } & RequestOptions = {}
  ): Promise<List<Bucket>> {
    return this.api.fetch({
      method: 'GET',
      path: 'buckets',
      params: options.params,
      modifier: options.modifier,
    });
  }
}
