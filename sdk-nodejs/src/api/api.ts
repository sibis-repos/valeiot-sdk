import { kebabize } from '../tools/case-parser';
import { APIResponse, FetchOptions } from '../types';

export type APIOptions = {
  /**
   * baseUrl is the requests base url. Must not end with '/'.
   */
  baseUrl: string;
  /**
   * headers is the additional headers for requests.
   */
  headers: Record<string, string>;
};

/**
 * API class provides a wrapper for making HTTP requests to the workspace API.
 */
export class API {
  private options: APIOptions;

  constructor(options: APIOptions) {
    this.options = options;
  }

  /**
   * fetch makes a HTTP request to the workspace API.
   * @param options - Fetch options including method, path, and body.
   * @returns The API response wrapped in `APIResponse<T>`.
   */
  public async fetch<T>(options: FetchOptions): Promise<T> {
    const url = new URL(`${this.options.baseUrl}/${options.path}`);
    if (options.params) {
      Object.keys(options.params).forEach((key) => {
        try {
          const rawValue = options.params[key];
          let value: string;

          if (rawValue instanceof Date) {
            value = rawValue.toISOString();
          } else {
            value = rawValue.toString();
          }

          url.searchParams.append(kebabize(key), value);
        } catch (err) {
          console.error(err);
        }
      });
    }

    const request: RequestInit = {
      method: options.method,
      body: JSON.stringify(options.body),
      headers: {
        'Content-Type': 'application/json',
        ...this.options.headers,
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
