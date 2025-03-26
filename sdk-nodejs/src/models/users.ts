import { OrderByFn } from "../types";
import { RoleReduced } from "./roles";
import { Tag, TagsFilter } from "./tags";

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

export type UserDetails = {
  id: number;
  role: RoleReduced;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
};

export type UsersListFilters = {
  name?: string;
  email?: string;
  roleId?: number;
  tags?: TagsFilter;
  limit?: number;
  offset?: number;
  orderBy?: "name" | "email" | "role_id" | "created_at" | "updated_at";
  orderByFn?: OrderByFn;
};

