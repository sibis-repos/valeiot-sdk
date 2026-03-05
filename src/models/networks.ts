import { OrderByFn } from './common.js';
import { TokenPermission } from './tokens.js';

export type NetworkOrderBy = 'name' | 'description' | 'type' | 'created_at' | 'updated_at';

export type Network = {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  type: string;
  description: string;
};

export type NetworkForm = {
  name: string;
  type: string;
  description: string;
};

export type NetworkReduced = {
  id: number;
  name: string;
  type: string;
};

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

export type DNID = {
  dnid: string;
  datasourceId: number;
};

export type NetworkListFilters = {
  name?: string;
  type?: string;
  limit?: number;
  offset?: number;
  orderBy?: NetworkOrderBy;
  orderByFn?: OrderByFn;
};
