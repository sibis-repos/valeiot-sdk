import { OrderByFn } from './common.js';
import { BucketReduced } from './buckets.js';
import { Datapoint } from './datapoints.js';
import { NetworkReduced } from './networks.js';
import { DatasourceObject } from './objects.js';
import { PayloadParserReduced } from './payload_parsers.js';
import { Tag, TagsFilter } from './tags.js';
import { List } from './list.js';

/**
 * Generic list response enriched with the available tag keys for the result set.
 *
 * @typeParam T Item type contained in the list.
 */
export type ListWithTagKeys<T> = List<T> & {
  tagKeys?: string[];
};

/**
 * Datasource kinds supported by Valeiot.
 */
export type DatasourceType = 'entity' | 'device';
/**
 * String matching modes supported by datasource filters.
 */
export type DatasourceFilterMode = 'like' | 'equal';
/**
 * Sort fields accepted by datasource listing endpoints.
 */
export type DatasourceOrderBy =
  | 'name'
  | 'dnid'
  | 'created_at'
  | 'updated_at'
  | 'last_input'
  | 'network_name'
  | 'payload_parser_name';

/**
 * Base datasource representation shared by devices and entities.
 */
export type Datasource = {
  id: number;
  bucketId: number;
  networkId: number;
  type: DatasourceType;
  dnid: string;
  payloadParserId?: number | null;
  createdAt: string;
  updatedAt: string;
  lastInput?: string;
  name: string;
  blocked: boolean;
};

/**
 * Expanded datasource view including related resources, tags, objects, and datapoints.
 */
export type DatasourceDetails = {
  id: number;
  type: DatasourceType;
  dnid: string;
  createdAt: string;
  updatedAt: string;
  lastInput?: string;
  name: string;
  blocked: boolean;
  bucket: BucketReduced;
  network: NetworkReduced;
  payloadParser?: PayloadParserReduced | null;
  tags: Tag[];
  objects: DatasourceObject[];
  datapoints: Datapoint[];
};

/**
 * Payload used to create or update a datasource.
 */
export type DatasourceForm = {
  bucketId: number;
  networkId: number;
  type: DatasourceType;
  dnid: string;
  payloadParserId?: number;
  name: string;
  blocked: boolean;
};

/**
 * Filters used when listing datasource details with optional related data expansion.
 */
export type DatasourcesDetailsListFilters = {
  name?: string;
  nameFilterMode?: DatasourceFilterMode;
  dnid?: string;
  dnidFilterMode?: DatasourceFilterMode;
  type?: DatasourceType;
  networkId?: number;
  networkName?: string;
  networkNameFilterMode?: DatasourceFilterMode;
  payloadParserId?: number;
  payloadParserName?: string;
  payloadParserNameFilterMode?: DatasourceFilterMode;
  tags?: TagsFilter;
  withObjects?: boolean;
  objectsKeys?: string;
  withDatapoints?: boolean;
  datapointsVariables?: string;
  withTagKeys?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: DatasourceOrderBy;
  orderByFn?: OrderByFn;
};

/**
 * Filters used when listing base datasource records.
 */
export type DatasourcesListFilters = {
  name?: string;
  nameFilterMode?: DatasourceFilterMode;
  dnid?: string;
  dnidFilterMode?: DatasourceFilterMode;
  type?: DatasourceType;
  tags?: TagsFilter;
  limit?: number;
  offset?: number;
  orderBy?: DatasourceOrderBy;
  orderByFn?: OrderByFn;
};
