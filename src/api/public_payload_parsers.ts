import { RequestOptions } from '../models/common.js';
import { List } from '../models/list.js';
import { PayloadParser, PayloadParsersListFilters } from '../models/payload_parsers.js';
import { API } from './api.js';

/**
 * API wrapper for public payload parsers available to the current scope.
 */
export class PublicPayloadParsers {
  private api: API;

  /**
   * Creates a public payload parsers client.
   *
   * @param api Shared API transport.
   */
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
  public async get(options: { parserId: number } & RequestOptions): Promise<PayloadParser> {
    return this.api.fetch({
      method: 'GET',
      path: `public-payload-parsers/${options.parserId}`,
      modifier: options.modifier,
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
    } & RequestOptions = {}
  ): Promise<List<PayloadParser>> {
    return this.api.fetch({
      method: 'GET',
      path: 'public-payload-parsers',
      params: options.params,
      modifier: options.modifier,
    });
  }
}
