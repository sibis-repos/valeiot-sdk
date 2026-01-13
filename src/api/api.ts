import { kebabize } from '../tools/case-parser.js';
import {
  APIResponse,
  FetchOptions,
  RequestModifier,
  RequestPosProcessor,
} from '../models/common.js';

export type APIOptions = {
  /**
   * baseUrl is the requests base url. Must not end with '/'.
   */
  baseUrl: string;
  /**
   * modifier is the request modifer function.
   */
  modifiers: RequestModifier[];
  /**
   * posProcessor is the request pos processor.
   */
  posProcessor?: RequestPosProcessor;
};

/**
 * API class provides a wrapper for making HTTP requests to the API.
 */
export class API {
  private options: APIOptions;

  constructor(options: APIOptions) {
    this.options = options;
  }

  /**
   * fetch makes a HTTP request to the API.
   * @param options - Fetch options including method, path, and body.
   * @returns The API response wrapped in `APIResponse<T>`.
   */
  public async fetch<T>(options: FetchOptions): Promise<T> {
    const makeRequest = async () => {
      let url: URL;

      // avoid adding '/' for base requests to not trigger CORS errors.
      if (options.path.length > 0) {
        url = new URL(`${this.options.baseUrl}/${options.path}`);
      } else {
        url = new URL(this.options.baseUrl);
      }

      if (options.params) {
        Object.keys(options.params).forEach((key) => {
          try {
            const rawValue = options.params[key];
            let value: string;

            if (rawValue instanceof Date) {
              value = rawValue.toISOString();
            } else {
              value = rawValue?.toString ? rawValue.toString() : '';
            }

            if (value) {
              url.searchParams.append(kebabize(key), value);
            }
          } catch (err) {
            console.error(err);
          }
        });
      }

      let request: RequestInit = {
        method: options.method,
        body: JSON.stringify(options.body),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // apply api modifiers
      this.options.modifiers.forEach((modifier) => (request = modifier(request)));

      // apply request modifier
      request = options.modifier ? options.modifier(request) : request;

      let res: APIResponse<T>;
      let fetchResponse: Response;
      try {
        res = await fetch(url, request).then(async (response) => {
          let json = {};

          try {
            json = await response.json();
          } catch (e) {}

          return {
            ...json,
            ok: response.ok,
            fetchResponse: response,
            httpStatusCode: response.status,
          } as APIResponse<T>;
        });
      } catch (e) {
        res = {
          code: `SDK_INTERNAL_ERROR (${e})`,
          fetchResponse: null as any,
          httpStatusCode: 500,
          ok: false,
          data: null as T,
        };
      }

      return res;
    };

    const maxReq = 3;
    let curReq = 0;
    let res: APIResponse<T>;

    while (true) {
      curReq++;
      res = await makeRequest();

      if (this.options.posProcessor != undefined && !options.ignorePostProcessor) {
        const pr = await this.options.posProcessor(res);
        res = pr.response as APIResponse<T>;

        if (pr.remakeRequest) {
          if (curReq == maxReq) {
            console.warn('max number of request remakes', options);
            break;
          }

          continue;
        }
      }

      break;
    }

    if (!res.ok) {
      throw res;
    }

    return res.data;
  }
}
