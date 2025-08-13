import { ScriptEvent } from '../models/common.js';

type EventHandler<T = any> = (ctx: EventContext<T>, event: ScriptEvent<T>) => Promise<any>;

export class EventContext<T = any> {
  public keys: Record<string, any> = {};
  private handlers: EventHandler<T>[];
  private nextHandler: number = 0;
  private data: any;
  private aborted: boolean = false;
  private event: ScriptEvent<T>;
  private resolver: (value: any) => void;

  /**
   * Creates a new EventContext to manage middleware/handler execution.
   * @param event The event being handled.
   * @param handlers Array of middleware/handlers to execute sequentially.
   * @param resolver Function to call with the final result when done.
   */
  constructor(event: ScriptEvent<T>, handlers: EventHandler<T>[], resolver: (value: any) => void) {
    this.event = event;
    this.handlers = handlers;
    this.resolver = resolver;
  }

  /**
   * Calls the next handler in the chain.
   * Executes sequentially until all handlers are done or context is aborted.
   */
  public async next(): Promise<void> {
    if (this.nextHandler >= this.handlers.length || this.aborted) {
      this.resolver(this.data);
      return;
    }

    const handler = this.handlers[this.nextHandler];
    this.nextHandler++;

    if (!handler) {
      return;
    }

    const result = await handler(this, this.event);
    if (result !== undefined) {
      this.setData(result);
    }

    await this.next();
  }

  /**
   * Aborts the event pipeline immediately.
   */
  public abort(): void {
    this.aborted = true;
  }

  /**
   * Aborts the event pipeline and sets a result value.
   * @param value The value to set as the final result.
   */
  public abortWith(value: any): void {
    this.abort();
    this.setData(value);
  }

  /**
   * Sets the final result data for this context.
   * @param value The value to set.
   */
  public setData(value: any): void {
    this.data = value;
  }

  /**
   * Stores a key-value pair in the context for sharing data across handlers.
   * @param key The key name.
   * @param value The value to store.
   */
  public set(key: string, value: any): void {
    this.keys[key] = value;
  }

  /**
   * Retrieves a value stored in the context by key.
   * @param key The key name.
   * @returns The stored value.
   */
  public get(key: string): any {
    return this.keys[key];
  }
}

export class Router {
  private parentRouter: Router | null;
  private handlers: Record<string, EventHandler<any>> = {};
  private middlewares: EventHandler<any>[] = [];
  private groups: Record<string, Router> = {};
  private groupPath: string;

  /**
   * Creates a new Router instance.
   * @param parentRouter Optional parent router for hierarchical routing.
   * @param groupPath Optional path prefix for this router group.
   */
  constructor(parentRouter: Router | null = null, groupPath: string = '') {
    this.parentRouter = parentRouter;
    this.groupPath = groupPath;
  }

  /**
   * Registers a handler for a specific event.
   * @param event The event name.
   * @param handler The handler function.
   */
  public on<T>(event: string, handler: EventHandler<T>): void {
    event = this.getFullPath(event);

    if (this.parentRouter) {
      this.parentRouter.on(event, handler);
      return;
    }

    if (this.handlers[event]) {
      throw new Error(`Handler for event ${event} already exists`);
    }

    this.handlers[event] = handler;
  }

  /**
   * Registers a middleware to run for all events in this router.
   * @param middleware Middleware function.
   */
  public use<T>(middleware: EventHandler<T>): void {
    this.middlewares.push(middleware);
  }

  /**
   * Creates a nested router group with optional middlewares.
   * @param path Path prefix for the group.
   * @param middlewares Optional middlewares to apply to the group.
   * @returns The new or existing Router group.
   */
  public group(path: string, ...middlewares: EventHandler<any>[]): Router {
    path = this.getFullPath(path);

    const group = this.groups[path];
    if (group) {
      return group;
    }

    const router = new Router(this, path);
    if (middlewares && middlewares.length > 0) {
      middlewares.forEach((mw) => router.use(mw));
    }

    this.groups[path] = router;
    return router;
  }

  /**
   * Handles an incoming event by executing middlewares and the event handler.
   * @param event The ScriptEvent to handle.
   * @returns A promise resolving to the final context data.
   */
  public async handle<T>(event: ScriptEvent<T>): Promise<any> {
    if (this.parentRouter) {
      return this.parentRouter.handle(event);
    }

    const handler = this.handlers[event.event];
    if (!handler) {
      return "HANDLER_NOT_FOUND"
    }

    const paths = this.getPossiblePaths(event.event);
    const handlers: EventHandler<T>[] = [...this.middlewares];

    paths.forEach((path) => {
      const groupMiddleware = this.groups[path]?.middlewares ?? [];
      if (groupMiddleware && groupMiddleware.length > 0) {
        handlers.push(...groupMiddleware);
      }
    });

    handlers.push(handler);

    let resolver: (value: unknown) => void = () => { };
    const resultPromise = new Promise((r) => {
      resolver = r;
    });

    const ctx = new EventContext(event, handlers, resolver);

    try {
      await ctx.next();
      return await resultPromise;
    } catch (error) {
      console.error('Error in event handler:', error);
      return "INTERNAL_ERROR";
    }
  }

  /**
   * Generates all possible paths for an event for hierarchical middleware lookup.
   * @param event Event name (possibly with slashes).
   * @returns Array of path strings.
   */
  private getPossiblePaths(event: string): string[] {
    const parts = event.split('/');
    const paths: string[] = [];

    let cur = '';
    parts.forEach((p, i) => {
      if (i === 0) {
        cur += p;
      } else {
        cur += `/${p}`;
      }
      paths.push(cur);
    });

    return paths;
  }

  /**
   * Normalizes a path by removing leading/trailing slashes and prepending the groupPath.
   * @param path The path to normalize.
   * @returns The normalized full path.
   */
  private getFullPath(path: string): string {
    path = path.replace(/^\/|\/$/g, '');
    if (this.groupPath) {
      path = `${this.groupPath}/${path}`;
    }
    return path;
  }
}
