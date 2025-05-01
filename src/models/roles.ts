import { OrderByFn, RawTag } from './common';
import { Resource } from './resources';

export type TagRuleType = 'any' | 'by-tag' | 'by-tag-matc';
export type RoleOrderBy = 'name' | 'description' | 'created_at' | 'updated_at';

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
  tagRules: TagRule[];
};

export type TagRule = {
  resource: Resource;
  fullAccess: boolean;
  tagMatch: string[];
  tags: RawTag[];
};

export type RolesListFilters = {
  name?: string;
  description?: string;
  limit?: number;
  offset?: number;
  orderBy?: RoleOrderBy;
  orderByFn?: OrderByFn;
};
