import { List } from '../models/list.js';
import {
  PayloadParser,
  PayloadParserForm,
  PayloadParsersListFilters,
} from '../models/payload_parsers.js';
import { ID, RequestOptions } from '../models/common.js';
import { API } from './api.js';

export class PayloadParsers {
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
  public async get(options: { parserId: number } & RequestOptions): Promise<PayloadParser> {
    return this.api.fetch({
      method: 'GET',
      path: `payload-parsers/${options.parserId}`,
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
      path: 'payload-parsers',
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates a new payload parser.
   * @param options Request options.
   * @default
   * response: {
   *  id: 1
   * }
   */
  public async create(options: { body: PayloadParserForm } & RequestOptions): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'payload-parsers',
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Updates an existing payload parser.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(
    options: { parserId: number; body: PayloadParserForm } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `payload-parsers/${options.parserId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes a payload parser.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { parserId: number } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `payload-parsers/${options.parserId}`,
      modifier: options.modifier,
    });
  }
}
