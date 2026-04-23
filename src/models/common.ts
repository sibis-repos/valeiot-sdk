/**
 * Handler signature used by script runtimes that process a single event payload.
 *
 * @typeParam T Event content type.
 */
export type ScriptHandler<T> = (event: ScriptEvent<T>) => Promise<any>;
/**
 * Sort direction accepted by list endpoints.
 */
export type OrderByFn = 'asc' | 'desc';
/**
 * Function used to mutate the generated `RequestInit` before dispatch.
 */
export type RequestModifier = (r: RequestInit) => RequestInit;
/**
 * Function executed after a response is received, usually to refresh auth or retry the request.
 */
export type RequestPosProcessor = (r: APIResponse<any>) => Promise<PosProcessorResponse>;

/**
 * Result produced by a post-processor after inspecting an API response.
 */
export type PosProcessorResponse = {
  response: APIResponse;
  remakeRequest?: boolean;
};

/**
 * Standard event payload delivered to scripts and router handlers.
 *
 * @typeParam T Event content type.
 */
export type ScriptEvent<T = any> = {
  event: string;
  metadata: {
    workspaceId: number;
    scriptId: number;
    time: string;
    user?: {
      id: number;
      roleId: number;
      roleName: string;
      permission: string;
      tags: RawTag[];
    };
  };
  content: T;
};

/**
 * Metadata for an attachment referenced by a script execution.
 */
export type ScriptAttachment = {
  filename: string;
  size: number;
};

/**
 * Shared optional request options accepted by API resource methods.
 */
export type RequestOptions = {
  modifier?: RequestModifier;
};

/**
 * Internal transport options used by `API.fetch()`.
 */
export type FetchOptions = RequestOptions & {
  path: string;
  method: string;
  body?: any;
  params?: any;
  ignorePostProcessor?: boolean;
};

/**
 * Raw API envelope before transport metadata is attached.
 *
 * @typeParam T Response payload type.
 */
export type APIRawResponse<T> = {
  code: string;
  data: T;
};

/**
 * API response envelope enriched with HTTP transport details.
 *
 * @typeParam T Response payload type.
 */
export type APIResponse<T = null> = APIRawResponse<T> & {
  httpStatusCode: number;
  fetchResponse: Response;
  ok: boolean;
};

/**
 * Standard identifier payload returned by create and delete endpoints.
 */
export type ID = {
  id: number;
};

/**
 * Generic tag payload used in create or update flows.
 */
export type TagForm = {
  key: string;
  value: string;
};

/**
 * Raw tag representation used across filters, users, and permissions.
 */
export type RawTag = {
  key: string;
  value: string;
};
