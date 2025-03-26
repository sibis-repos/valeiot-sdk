import { kebabize } from "../tools/case-parser";
import { APIResponse, FetchOptions } from "../types";

/**
 * API class provides a wrapper for making HTTP requests to the workspace API.
 * It automatically retrieves the API URL and authentication token from the environment.
 *
 * - Requires `WORKSPACE_TOKEN` for authentication.
 * - Requires `WORKSPACE_API_URL` as the base URL.
 * - Ensures the API URL ends with `/workspace` for correct endpoint usage.
 * - Provides a `fetch` method for making API requests with standard headers.
 */
export class API {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.token = process.env.WORKSPACE_TOKEN ?? "";
    if (!this.token) {
      throw new Error(
        "Workspace token is required in environment. Please add WORKSPACE_TOKEN to your environment."
      );
    }

    this.baseUrl = process.env.WORKSPACE_API_URL ?? "";
    if (!this.baseUrl) {
      throw new Error(
        "Workspace api URL is required in environment. Please add WORKSPACE_API_URL to your environment."
      );
    }
    if (!this.baseUrl.endsWith("/workspace")) {
      throw new Error(
        "Workspace api URL must end with '/workspace'. Please update WORKSPACE_API_URL in your environment. Example: \"https://<ident>.<region>.api.valeiot.com/api/v1/workspace\""
      );
    }
  }

  /**
   * fetch makes a HTTP request to the workspace API.
   * @param options - Fetch options including method, path, and body.
   * @returns The API response wrapped in `APIResponse<T>`.
   */
  public async fetch<T>(options: FetchOptions): Promise<T> {
    const url = new URL(`${this.baseUrl}/${options.path}`);
    if (options.params) {
      Object.keys(options.params).forEach((key) => {
        try {
          let rawValue = options.params[key];
          let value: string;

          if (rawValue instanceof Date) {
            value = rawValue.toISOString();
          } else {
            value = rawValue.toString();
          }

          url.searchParams.append(kebabize(key), value);
        } catch (e) {}
      });
    }

    const request: RequestInit = {
      method: options.method,
      body: JSON.stringify(options.body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    let res: APIResponse<T>;
    try {
      res = await fetch(url, request).then(async (response) => {
        return {
          ...(await response.json()),
          ok: response.ok,
          httpStatusCode: response.status,
        } as APIResponse<T>;
      });
    } catch (e) {
      throw {
        code: `SDK_INTERNAL_ERROR (${e})`,
        httpStatusCode: 500,
        ok: false,
        data: null as T,
      };
    }

    if (!res.ok) {
      throw res;
    }

    return res.data;
  }
}
