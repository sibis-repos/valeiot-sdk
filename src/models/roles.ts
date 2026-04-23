import { OrderByFn, RawTag } from './common';
import { Resource } from './resources';

/**
 * Tag rule matching modes supported by role permissions.
 */
export type TagRuleType = 'any' | 'by-tag' | 'by-tag-matc';
/**
 * Sort fields accepted by role listing endpoints.
 */
export type RoleOrderBy = 'name' | 'description' | 'created_at' | 'updated_at';

/**
 * Role resource used to define user permissions in Valeiot.
 */
export type Role = {
  id: number;
  name: string;
  description: string;
  permissions: RolePermissions;
  createdAt: string;
  updatedAt: string;
};

/**
 * Payload used to create or update a role.
 */
export type RoleForm = {
  name: string;
  description: string;
  permissions: RolePermissions;
};

/**
 * Reduced role representation embedded in user payloads.
 */
export type RoleReduced = {
  id: number;
  name: string;
};

/**
 * Permission set attached to a role.
 */
export type RolePermissions = {
  tagRules: TagRule[];
};

/**
 * Rule describing access to a specific resource, optionally constrained by tags.
 */
export type TagRule = {
  resource: Resource;
  fullAccess: boolean;
  tagMatch: string[];
  tags: RawTag[];
};

/**
 * Filters used when listing roles.
 */
export type RolesListFilters = {
  name?: string;
  description?: string;
  limit?: number;
  offset?: number;
  orderBy?: RoleOrderBy;
  orderByFn?: OrderByFn;
};
