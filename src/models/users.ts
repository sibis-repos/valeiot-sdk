import { OrderByFn, RawTag } from './common.js';
import { RoleReduced } from './roles.js';
import { Tag, TagsFilter } from './tags.js';
import { Permissions } from './tokens.js';

/**
 * Sort fields accepted by user listing endpoints.
 */
export type UserOrderBy = 'name' | 'email' | 'role_id' | 'created_at' | 'updated_at';

/**
 * Payload used to create or update a workspace user.
 */
export type UserForm = {
  roleId: number;
  name: string;
  email: string;
  password: string;
};

/**
 * Base user resource.
 */
export type User = {
  id: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
};

/**
 * Payload used when a logged-in user updates their own profile.
 */
export type UserSelfUpdateForm = {
  name: string;
}

/**
 * Payload used when a logged-in user changes their own password.
 */
export type UserSelfUpdatePasswordForm = {
  oldPassword: string;
  newPassword: string;
};

/** Body for workspace admin to set a user's password (PUT /workspace/users/:id/password). */
export type UserUpdatePasswordForm = {
  password: string;
};

/**
 * Expanded user view including resolved role and tags.
 */
export type UserDetails = {
  id: number;
  role: RoleReduced;
  lastActivity?: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
};

/**
 * User metadata embedded in script events and auth-related payloads.
 */
export type UserContext = {
  id: number;
  permission: Permissions;
  roleId: number;
  roleName: string;
  tags: RawTag[];
};

/**
 * Filters used when listing users.
 */
export type UsersListFilters = {
  name?: string;
  email?: string;
  roleId?: number;
  tags?: TagsFilter;
  limit?: number;
  offset?: number;
  orderBy?: UserOrderBy;
  orderByFn?: OrderByFn;
};
