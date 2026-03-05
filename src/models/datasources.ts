import { OrderByFn } from './common.js';
import { BucketReduced } from './buckets.js';
import { Datapoint } from './datapoints.js';
import { NetworkReduced } from './networks.js';
import { DatasourceObject } from './objects.js';
import { PayloadParserReduced } from './payload_parsers.js';
import { Tag, TagsFilter } from './tags.js';
import { List } from './list.js';

export type ListWithTagKeys<T> = List<T> & {
  tagKeys?: string[];
};

export type DatasourceType = 'entity' | 'device';
export type DatasourceFilterMode = 'like' | 'equal';
export type DatasourceOrderBy =
  | 'name'
  | 'dnid'
  | 'created_at'
  | 'updated_at'
  | 'last_input'
  | 'network_name'
  | 'payload_parser_name';

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

export type DatasourceForm = {
  bucketId: number;
  networkId: number;
  type: DatasourceType;
  dnid: string;
  payloadParserId?: number;
  name: string;
  blocked: boolean;
};

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
