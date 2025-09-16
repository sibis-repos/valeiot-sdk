import { OrderByFn, RawTag } from './common.js';
import { RoleReduced } from './roles.js';
import { Tag, TagsFilter } from './tags.js';
import { Permissions } from './tokens.js';

export type UserOrderBy = 'name' | 'email' | 'role_id' | 'created_at' | 'updated_at';

export type UserForm = {
  roleId: number;
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
};

export type UserSelfUpdateForm = {
  name: string;
}

export type UserSelfUpdatePasswordForm = {
  oldPassword: string;
  newPassword: string;
};

export type UserDetails = {
  id: number;
  role: RoleReduced;
  lastActivity?: Date;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
};

export type UserContext = {
  id: number;
  permission: Permissions;
  roleId: number;
  roleName: string;
  tags: RawTag[];
};

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
