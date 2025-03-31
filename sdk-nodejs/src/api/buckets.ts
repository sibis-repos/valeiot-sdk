import { Bucket, BucketsListFilters } from "../models/buckets";
import { API } from "./api";

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
    options: { params?: BucketsListFilters } = {}
  ): Promise<Bucket[]> {
    return this.api.fetch({
      method: "GET",
      path: "buckets",
      params: options.params,
    });
  }
}
