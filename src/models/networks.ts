import { OrderByFn } from './common';
import { TokenPermission } from './tokens';

export type Network = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  name: string;
  token: string;
  permission: TokenPermission;
  expiresAt?: Date | null;
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
  orderBy?: 'name' | 'description' | 'type' | 'created_at' | 'updated_at';
  orderByFn?: OrderByFn;
};
