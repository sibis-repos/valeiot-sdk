import { OrderByFn } from "../types";
import { UserContext } from "./users";

export type Script = {
  id: number;
  name: string;
  description: string;
  blocked: boolean;
  runtime: string;
  timeout: number; //seconds
  layerVersion: number;
  env: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
};

export type ScriptInvokeForm = {
  event: string;
  meta: ScriptEventMeta;
  content: any;
};

export type ScriptInvokeResponse = {
  result: any;
  logs: string;
};

export type ScriptEventMeta = {
  user?: UserContext;
  workspaceId: number;
  scriptId: number;
  time: string; // date in iso format
};

export type ScriptsListFilters = {
  name?: string;
  description?: string;
  blocked?: boolean;
  runtime?: string;
  layerVersion?: string;
  limit?: number;
  offset?: number;
  orderBy?: "name" | "description" | "runtime" | "created_at" | "updated_at";
  orderByFn?: OrderByFn;
};
