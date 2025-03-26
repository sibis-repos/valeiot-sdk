export type ScriptHandler<T> = (event: ScriptEvent<T>) => Promise<any>;
export type OrderByFn = "asc" | "desc";

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

export type FetchOptions = {
  path: string;
  method: string;
  body?: any;
  params?: any;
};

export type APIRawResponse<T> = {
  code: string;
  data: T;
};

export type APIResponse<T = null> = APIRawResponse<T> & {
  httpStatusCode: number;
  ok: boolean;
};

export type ID = {
  id: number;
};

export type TagForm = {
  key: string;
  value: string;
};

export type RawTag = {
  key: string;
  value: string;
};
