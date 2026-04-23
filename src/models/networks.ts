import { OrderByFn } from './common.js';
import { TokenPermission } from './tokens.js';

/**
 * Sort fields accepted by network listing endpoints.
 */
export type NetworkOrderBy = 'name' | 'description' | 'type' | 'created_at' | 'updated_at';

/**
 * Network resource used to group and authorize datasource communication.
 */
export type Network = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  type: string;
  description: string;
};

/**
 * Payload used to create or update a network.
 */
export type NetworkForm = {
  name: string;
  type: string;
  description: string;
};

/**
 * Reduced network representation embedded in other resource responses.
 */
export type NetworkReduced = {
  id: number;
  name: string;
  type: string;
};

/**
 * Token issued for network-level communication.
 */
export type NetworkToken = {
  id: number;
  workspaceId?: number | null;
  networkId: number;
  createdAt: string;
  name: string;
  token: string;
  permission: TokenPermission;
  expiresAt?: string | null;
};

/**
 * Mapping between a network-facing DNID and the internal datasource id.
 */
export type DNID = {
  dnid: string;
  datasourceId: number;
};

/**
 * Filters used when listing networks.
 */
export type NetworkListFilters = {
  name?: string;
  type?: string;
  limit?: number;
  offset?: number;
  orderBy?: NetworkOrderBy;
  orderByFn?: OrderByFn;
};
