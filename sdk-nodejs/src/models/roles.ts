import { OrderByFn, RawTag } from '../types';
import { Resource } from './resource';

export type Role = {
  id: number;
  name: string;
  description: string;
  permissions: RolePermissions;
  createdAt: Date;
  updatedAt: Date;
};

export type RoleForm = {
  name: string;
  description: string;
  permissions: RolePermissions;
};

export type RoleReduced = {
  id: number;
  name: string;
};

export type RolePermissions = {
  tagRules: RoleTagRule[];
};

export type RoleTagRule = {
  resource: Resource;
  fullAccess: boolean;
  tagMatch: string[];
  tags: RawTag[];
};

export type RolesListFilters = {
  name: string;
  description: string;
  limit: number;
  offset: number;
  orderBy: 'name' | 'description' | 'created_at' | 'updated_at';
  orderByFn: OrderByFn;
};
