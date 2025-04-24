import { List } from '../models/list';
import { Tag } from '../models/tags';
import { ID, RawTag, RequestOptions, TagForm } from '../models/common';
import { API } from './api';

export class DatasourceObjectTags {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  public async getList(
    options: {
      datasourceId: number;
      objectId: number | string;
    } & RequestOptions
  ): Promise<List<Tag>> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags`,
      modifier: options.modifier,
    });
  }

  public async get(
    options: {
      datasourceId: number;
      objectId: number | string;
      tagId: number;
    } & RequestOptions
  ): Promise<Tag> {
    return this.api.fetch({
      method: 'GET',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/${options.tagId}`,
      modifier: options.modifier,
    });
  }

  public async create(
    options: {
      datasourceId: number;
      objectId: number | string;
      body: RawTag;
    } & RequestOptions
  ): Promise<ID> {
    return this.api.fetch({
      method: 'POST',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  public async update(
    options: {
      datasourceId: number;
      objectId: number | string;
      tagId: number;
      body: TagForm;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/${options.tagId}`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  public async delete(
    options: {
      datasourceId: number;
      objectId: number | string;
      tagId: number;
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'DELETE',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/${options.tagId}`,
      modifier: options.modifier,
    });
  }

  public async set(
    options: {
      datasourceId: number;
      objectId: number | string;
      body: { tags: RawTag[] };
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags`,
      body: options.body,
      modifier: options.modifier,
    });
  }

  public async createOrReplace(
    options: {
      datasourceId: number;
      objectId: number | string;
      body: { tags: RawTag[] };
    } & RequestOptions
  ): Promise<null> {
    return this.api.fetch({
      method: 'PUT',
      path: `datasources/${options.datasourceId}/objects/${options.objectId}/tags/replace`,
      body: options.body,
      modifier: options.modifier,
    });
  }
}
