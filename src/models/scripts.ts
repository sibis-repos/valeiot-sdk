import { EventResult } from '../router/result.js';
import { OrderByFn } from './common.js';
import { UserContext } from './users.js';

export type ScriptOrderBy = 'name' | 'description' | 'runtime' | 'created_at' | 'updated_at';
export type ScriptRuntime = 'nodejs20.x' | 'nodejs24.x';
export type ScriptExecutionMode = 'cloud' | 'webhook';
export type ScriptWebhookMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';

/** `updatedBy` format: `wt-<id>` (workspace token) or `ws-<owner>` (workspace session owner id). */
export type Script = {
  id: number;
  name: string;
  description: string;
  blocked: boolean;
  executionMode: ScriptExecutionMode;
  cloudConfig: ScriptCloudConfig;
  webhookConfig?: ScriptWebhookConfig;
  codeSize: number;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
};

export type ScriptForm = {
  name: string;
  description: string;
  blocked: boolean;
  executionMode: ScriptExecutionMode;
  cloudConfig: ScriptCloudConfig;
  webhookConfig?: ScriptWebhookConfig;
};

/** `updatedBy` format: `wt-<id>` (workspace token) or `ws-<owner>` (workspace session owner id). */
export type ScriptDetails = {
  id: number;
  name: string;
  description: string;
  blocked: boolean;
  executionMode: ScriptExecutionMode;
  cloudConfig: ScriptCloudConfig;
  webhookConfig?: ScriptWebhookConfig;
  codeSize: number;
  createdAt: string;
  updatedAt: string;
  lastTrigger?: string;
  updatedBy?: string;
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
  result: EventResult;
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

/** Reduced script log (list item): id and time only. */
export type ScriptLog = {
  id: number;
  time: string;
};

/** Filters for listing script logs (start-time, stop-time, limit, offset). */
export type ScriptLogsListFilters = {
  startTime?: string;
  stopTime?: string;
  limit?: number;
  offset?: number;
};

/** Full script log with payload and result (GET by id). */
export type ScriptLogDetails = {
  id: number;
  time: string;
  payload: {
    event: string;
    metadata: Record<string, any>;
    content: any;
  };
  result: {
    failed: boolean;
    result: any;
    logs: string;
  };
};
