import { List } from '../models/list';
import {
  PayloadParser,
  PayloadParserForm,
  PayloadParsersListFilters,
} from '../models/payload_parser';
import { ID } from '../types';
import { API } from './api';

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
  public async get(options: { parserId: number }): Promise<PayloadParser> {
    return this.api.fetch({
      method: 'GET',
      path: `payload-parsers/${options.parserId}`,
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
      path: 'payload-parsers',
      params: options.params,
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
  public async create(options: { body: PayloadParserForm }): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: 'payload-parsers',
      body: options.body,
    });
  }

  /**
   * Updates an existing payload parser.
   * @param options Request options.
   * @default
   * response: null
   */
  public async update(options: { parserId: number; body: PayloadParserForm }): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `payload-parsers/${options.parserId}`,
      body: options.body,
    });
  }

  /**
   * Deletes a payload parser.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(options: { parserId: number }): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `payload-parsers/${options.parserId}`,
    });
  }
}
