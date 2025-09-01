import { OrderByFn } from './common.js';
import { UserContext } from './users.js';

export type ScriptOrderBy = 'name' | 'description' | 'runtime' | 'created_at' | 'updated_at';
export type ScriptRuntime = 'nodejs20.x';
export type ScriptExecutionMode = 'cloud' | 'webhook';
export type ScriptWebhookMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

export type Script = {
  id: number;
  name: string;
  description: string;
  blocked: boolean;
  executionMode: ScriptExecutionMode;
  cloudConfig: ScriptCloudConfig;
  webhookConfig?: ScriptWebhookConfig;
  codeSize: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ScriptForm = {
  name: string;
  description: string;
  blocked: boolean;
  executionMode: ScriptExecutionMode;
  cloudConfig: ScriptCloudConfig;
  webhookConfig?: ScriptWebhookConfig;
};

export type ScriptDetails = {
  id: number;
  name: string;
  description: string;
  blocked: boolean;
  executionMode: ScriptExecutionMode;
  cloudConfig: ScriptCloudConfig;
  webhookConfig?: ScriptWebhookConfig;
  codeSize: number;
  createdAt: Date;
  updatedAt: Date;
  lastTrigger?: Date;
};

export type ScriptCloudConfig = {
  runtime: ScriptRuntime;
  timeout: number; //seconds
  layerVersion: number;
  envVariables: Record<string, string>;
};

export type ScriptWebhookConfig = {
  url: string;
  method: ScriptWebhookMethod;
  headers: Record<string, string>;
  timeout: number; // number
};

export type ScriptInvokeForm = {
  event: string;
  content: any;
};

export type ScriptInvokeResponse = {
  result: any;
  failed: boolean;
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
  orderBy?: ScriptOrderBy;
  orderByFn?: OrderByFn;
};

export type ScriptLayer = {
  version: number;
  description: string;
};

export type ScriptCode = {
  code: string;
};
