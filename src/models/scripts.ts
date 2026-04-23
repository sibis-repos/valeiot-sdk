import { EventResult } from '../router/result.js';
import { OrderByFn } from './common.js';
import { UserContext } from './users.js';

/**
 * Sort fields accepted by script listing endpoints.
 */
export type ScriptOrderBy = 'name' | 'description' | 'runtime' | 'created_at' | 'updated_at';
/**
 * Supported cloud runtimes for Valeiot scripts.
 */
export type ScriptRuntime = 'nodejs20.x' | 'nodejs24.x';
/**
 * Script execution modes supported by the platform.
 */
export type ScriptExecutionMode = 'cloud' | 'webhook';
/**
 * HTTP methods accepted by webhook-mode scripts.
 */
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

/**
 * Payload used to create or update a script.
 */
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

/**
 * Cloud execution configuration for a script.
 */
export type ScriptCloudConfig = {
  runtime: ScriptRuntime;
  timeout: number; //seconds
  layerVersion: number;
  envVariables: Record<string, string>;
};

/**
 * Webhook execution configuration for a script.
 */
export type ScriptWebhookConfig = {
  url: string;
  method: ScriptWebhookMethod;
  headers: Record<string, string>;
  timeout: number; // number
};

/**
 * Payload used to invoke a script manually.
 */
export type ScriptInvokeForm = {
  event: string;
  content: any;
};

/**
 * Response returned after a script invocation.
 */
export type ScriptInvokeResponse = {
  result: EventResult;
  failed: boolean;
  logs: string;
};

/**
 * Metadata associated with a script event execution.
 */
export type ScriptEventMeta = {
  user?: UserContext;
  workspaceId: number;
  scriptId: number;
  time: string; // date in iso format
};

/**
 * Filters used when listing scripts.
 */
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

/**
 * Runtime layer option available for a given script runtime.
 */
export type ScriptLayer = {
  version: number;
  description: string;
};

/**
 * Source code payload for a script.
 */
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
