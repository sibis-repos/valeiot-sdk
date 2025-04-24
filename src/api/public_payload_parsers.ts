import { List } from '../models/list';
import { PayloadParser, PayloadParsersListFilters } from '../models/payload_parsers';
import { API } from './api';

export class PublicPayloadParsers {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a payload parser.
   * @param options Request options.
   * @default
   * payload parser: {
   *  id: 1,
   *  name: "My payload parser",
   *  description: "",
   *  code: "function parse(payload) { return payload; }",
   *  createdAt: Date,
   *  updatedAt: Date,
   * }
   */
  public async get(options: { parserId: number }): Promise<PayloadParser> {
    return this.api.fetch({
      method: 'GET',
      path: `public-payload-parsers/${options.parserId}`,
    });
  }

  /**
   * Retrieves a list of payload parsers.
   * @param options Request options.
   * @default
   * payload parsers: [
   *  {
   *   id: 1,
   *   name: "My payload parser",
   *   description: "",
   *   code: "",
   *   createdAt: Date,
   *   updatedAt: Date,
   *  }
   * ]
   */
  public async getList(
    options: {
      params?: PayloadParsersListFilters;
    } = {}
  ): Promise<List<PayloadParser>> {
    return this.api.fetch({
      method: 'GET',
      path: 'public-payload-parsers',
      params: options.params,
    });
  }
}
