export type DatasourceType = "entity" | "device";
export type ScriptHandler<T> = (event: ScriptEvent<T>) => Promise<any>;

export interface ScriptEvent<T = any> {
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
}

export interface FetchOptions {
  path: string;
  method: string;
  body: any;
}

export interface APIResponse<T> {
  httpStatusCode: number;
  ok: boolean;
  code: string;
  data: T;
}

export interface ID {
  id: number;
}

export interface TagForm {
  key: string;
  value: string;
}

export interface RawTag {
  key: string;
  value: string;
}

export interface DatasourceForm {
  bucketId: number;
  networkId: number;
  type: DatasourceType;
  dnid: string;
  payloadParserId: number | null;
  name: string;
  blocked: boolean;
}

export interface DatasourceObjectForm {
  key: string;
  value: Object;
}
