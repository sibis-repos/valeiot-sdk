import {
  APIResponse,
  DatasourceForm,
  DatasourceObjectForm,
  FetchOptions,
  ID,
  TagForm,
} from "./types";


export class Workspace {
  private apiURL: string;
  private token: string;

  constructor() {
    this.token = process.env.WORKSPACE_TOKEN ?? "";
    if (!this.token) {
      throw new Error(
        "Workspace token is required in environment. Please add WORKSPACE_TOKEN to your environment."
      );
    }

    this.apiURL = process.env.WORKSPACE_API_URL ?? "";
    if (!this.apiURL) {
      throw new Error(
        "Workspace api URL is required in environment. Please add WORKSPACE_API_URL to your environment."
      );
    }
    if (!this.apiURL.endsWith("/workspace")) {
      throw new Error(
        "Workspace api URL must end with '/workspace'. Please update WORKSPACE_API_URL in your environment. Example: \"https://<ident>.<region>.api.valeiot.com/api/v1/workspace\""
      );
    }
  }

  /**
   * fetch makes a http request to the workspace api.
   * @param options options is the fetch options.
   * @returns returns the api response.
   */
  private async fetch<T>(options: FetchOptions): Promise<APIResponse<T>> {
    const url = `${this.apiURL}/${options.path}`;
    const request: RequestInit = {
      method: options.method,
      body: JSON.stringify(options.body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    const res = await fetch(url, request).then(async (response) => {
      const res: APIResponse<T> = await response.json();
      res.httpStatusCode = response.status;
      res.ok = response.status === 200;
      return res;
    });

    return res;
  }

  /**
   * createDatasources creates a datasource in the workspace.
   * @param datasource is the datasource form to create.
   * @returns returns the api response with the datasource id.
   */
  public async createDatasource(
    datasource: DatasourceForm
  ): Promise<APIResponse<ID>> {
    const options: FetchOptions = {
      method: "POST",
      path: "datasources",
      body: datasource,
    };
    return this.fetch(options);
  }

  /**
   * setDatasourceTags sets the tags for a datasource.
   * @param datasourceId datasourceId is the datasource id.
   * @param tags tags is the tags form to set.
   * @returns returns the api response.
   */
  public async setDatasourceTags(
    datasourceId: number,
    tags: TagForm[]
  ): Promise<APIResponse<ID>> {
    const options: FetchOptions = {
      method: "PUT",
      path: `datasources/${datasourceId}/tags`,
      body: { tags: tags },
    };
    return this.fetch(options);
  }

  /**
   * createDatasourceObject creates a datasource object
   * in the workspace.
   * @param datasourceId datasourceId is the datasource id.
   * @param object object is the object form to create.
   * @returns retusnt the api response with the datasoruce
   * object id.
   */
  public async createDatasourceObject(
    datasourceId: number,
    object: DatasourceObjectForm
  ) {
    const options: FetchOptions = {
      method: "POST",
      path: `datasources/${datasourceId}/objects`,
      body: object,
    };
    return this.fetch(options);
  }
}
