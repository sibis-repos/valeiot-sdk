import { OrderByFn } from '../types';
import { UserContext } from './users';

export type ScriptRuntime = 'nodejs20.x';

export type Script = {
  id: number;
  name: string;
  description: string;
  blocked: boolean;
  runtime: ScriptRuntime;
  timeout: number; //seconds
  layerVersion: number;
  env: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
};

export type ScriptForm = {
  name: string;
  description: string;
  blocked: boolean;
  runtime: ScriptRuntime; // does not update after creation
  timeout: number; // seconds
  layerVersion: number;
  env: Record<string, string>;
};

export type ScriptInvokeForm = {
  event: string;
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
  orderBy?: 'name' | 'description' | 'runtime' | 'created_at' | 'updated_at';
  orderByFn?: OrderByFn;
};

export type ScriptLayer = {
  version: number;
  description: string;
};

export type ScriptCode = {
  code: string;
};
