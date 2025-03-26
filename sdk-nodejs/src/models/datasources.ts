import { OrderByFn } from "../types";
import { BucketReduced } from "./buckets";
import { Datapoint } from "./datapoints";
import { NetworkReduced } from "./network";
import { DatasourceObject } from "./objects";
import { PayloadParserReduced } from "./payload_parser";
import { Tag, TagsFilter } from "./tags";

export type DatasourceType = "entity" | "device";

export type Datasource = {
  id: number;
  bucketId: number;
  networkId: number;
  type: DatasourceType;
  dnid: string;
  payloadParserId?: number | null;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  blocked: boolean;
};

export type DatasourceDetails = {
  id: number;
  type: DatasourceType;
  dnid: string;
  createdAt: string;
  updatedAt: string;
  lastInput?: Date;
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
  type?: "device" | "entity";
  alerted?: boolean;
  alertName?: string;
  alertCategory?: string;
  startAlertedAt?: Date;
  stopAlertedAt?: Date;
  tags?: TagsFilter;
  withObjects?: boolean;
  objectsKeys?: string[];
  withDatapoints?: boolean;
  datapointsVariables?: string[];
  limit?: number;
  offset?: number;
  orderBy?: "name" | "created_at" | "updated_at";
  orderByFn?: OrderByFn;
};

export type DatasourcesListFilters = {
  name?: string;
  type?: "device" | "entity";
  tags?: TagsFilter;
  limit?: number;
  offset?: number;
  orderBy?: "name" | "created_at" | "updated_at";
  orderByFn?: OrderByFn;
};
