import { RequestOptions } from '../models/common.js';
import {
  Datapoint,
  DatapointForm,
  DatapointsDeleteFilters,
  DatapointsListFilters,
} from '../models/datapoints.js';
import { List } from '../models/list.js';
import { API } from './api.js';

export class Datapoints {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Retrieves a list of datapoints for a given datasource.
   * @param options Request options.
   * @default
   * datapoints: [
   *  {
   *    time: Date,
   *    variable: "temperature",
   *    value: 22.5
   *  },
   *  {
   *    time: Date,
   *    variable: "temperature",
   *    value: 23.1
   *  }
   * ]
   */
  public async getList(
    options: {
      datasourceId: number;
      params?: DatapointsListFilters;
    } & RequestOptions
  ): Promise<List<Datapoint>> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/datapoints`,
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Retrieves the latest datapoints for a given datasource.
   * @param options Request options.
   * @default
   * datapoints: [
   *  {
   *    time: Date,
   *    variable: "humidity",
   *    value: 55
   *  },
   *  {
   *    time: Date,
   *    variable: "temperature",
   *    value: 22.9
   *  }
   * ]
   */
  public async getLatest(
    options: {
      datasourceId: number;
      params: {
        variables: string[];
      };
    } & RequestOptions
  ): Promise<Datapoint[]> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/datapoints/latest`,
      params: options.params,
      modifier: options.modifier,
    });
  }

  /**
   * Creates new datapoints for a given datasource.
   * @param options Request options.
   * @default
   * response: null
   */
  public async create(
    options: { body: DatapointForm[]; datasourceId: number } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'POST',
      path: `datasources/${options.datasourceId}/datapoints`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  /**
   * Deletes datapoints based on filters for a given datasource.
   * @param options Request options.
   * @default
   * response: null
   */
  public async delete(
    options: {
      datasourceId: number;
      params: DatapointsDeleteFilters;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `datasources/${options.datasourceId}/datapoints`,
      params: options.params,
      modifier: options.modifier,
    });
  }
}
