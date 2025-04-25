import { ScriptEvent } from '../models/common.js';

type EventHandler<T> = (ctx: EventContext<T>, event: ScriptEvent<T>) => Promise<any>;

export class EventContext<T = any> {
  public keys: Record<string, any> = {};
  private handlers: EventHandler<T>[];
  private nextHandler: number = 0;
  private data: any;
  private aborted: boolean = false;
  private event: ScriptEvent<T>;
  private resolver: (value: any) => void;

  constructor(event: ScriptEvent<T>, handlers: EventHandler<T>[], resolver: (value: any) => void) {
    this.event = event;
    this.handlers = handlers;
    this.resolver = resolver;
  }

  /**
   * next calls the next handler in the chain.
   */
  public async next() {
    if (this.nextHandler == this.handlers.length || this.aborted) {
      this.resolver(this.data);
      return;
    }

    const handler = this.handlers[this.nextHandler];
    this.nextHandler++;

    if (handler) {
      handler(this, this.event).then(() => this.next());
    }
  }

  /**
   * abort aborts the event pipeline.
   */
  public abort() {
    this.aborted = true;
  }

  /**
   * abortWith aborts the event pipeline and
   * sets the data.
   * @param value value is the value to be set as data.
   */
  public abortWith(value: any) {
    this.abort();
    this.setData(value);
  }

  /**
   * setData sets the data in the context.
   * @param value value is the value to be set.
   */
  public setData(value: any) {
    this.data = value;
  }

  /**
   * set sets a key value pair in the context.
   * @param key key is the key.
   * @param value value is the value.
   */
  public set(key: string, value: any) {
    this.keys[key] = value;
  }

  /**
   * get gets a value from the context.
   * @param key key is the key.
   * @returns returns the value.
   */
  public get(key: string) {
    return this.keys[key];
  }
}

export class Router {
  private parentRouter: Router | null;
  private handlers: Record<string, EventHandler<any>> = {};
  private middlewares: EventHandler<any>[] = [];
  private groups: Record<string, Router> = {};
  private groupPath: string;

  constructor(parentRouter: Router | null = null, groupPath: string = '') {
    this.parentRouter = parentRouter;
    this.groupPath = groupPath;
  }

  /**
   * on registers a handler for an event.
   * @param event event is the event to register the handler for.
   * @param handler handler is the handler to register.
   */
  public on<T>(event: string, handler: EventHandler<T>) {
    event = this.getFullPath(event);

    if (this.parentRouter) {
      this.parentRouter.on(event, handler);
      return;
    }

    if (this.handlers[event]) {
      throw new Error(`handler for event ${event} already exists`);
    }

    this.handlers[event] = handler;
  }

  /**
   * use registers a middleware for an event.
   * @param event event is the event to register the middleware for.
   * @param middleware middleware is the middleware to register.
   */
  public use<T>(middleware: EventHandler<T>) {
    this.middlewares.push(middleware);
  }

  /**
   * group creates a new router group.
   * @param path path is the path of the group.
   * @returns returns the new router group.
   */
  public group(path: string, ...middlewares: EventHandler<any>[]): Router {
    path = this.getFullPath(path);

    const group = this.groups[path];
    if (group) {
      return group;
    }

    const router = new Router(this, path);
    if (middlewares && middlewares.length > 0) {
      middlewares.forEach((middleware) => router.use(middleware));
    }

    this.groups[path] = router;
    return router;
  }

  /**
   * handle handles an event.
   * @param event event is the event to handle.
   */
  public async handle<T>(event: ScriptEvent<T>): Promise<any> {
    if (this.parentRouter) {
      return this.parentRouter.handle(event);
    }

    const handler = this.handlers[event.event];
    if (!handler) {
      throw new Error(`handler for event ${event.event} not found`);
    }

    const paths = this.getPossiblePaths(event.event);
    const handlers: EventHandler<T>[] = [...this.middlewares];

    paths.forEach((path) => {
      const groupMiddleware = this.groups[path]?.middlewares ?? [];
      handlers.push(...groupMiddleware);
    });
    handlers.push(handler);

    let resolver: (value: unknown) => void = () => {};
    const resultPromise = new Promise((r) => (resolver = r));

    const ctx = new EventContext(event, handlers, resolver);
    ctx.next();

    return await resultPromise;
  }

  private getPossiblePaths(event: string): string[] {
    const splited = event.split('/');
    const paths: string[] = [];

    let curPath = '';
    splited.forEach((path, i) => {
      // add "/" if is not last path
      if (i != 0) {
        path = `/${path}`;
      }

      curPath += path;

      paths.push(curPath);
    });

    return paths;
  }

  private getFullPath(path: string): string {
    if (path.startsWith('/')) {
      path.slice(1);
    }
    if (path.endsWith('/')) {
      path.slice(0, -1);
    }

    if (this.groupPath) {
      path = `${this.groupPath}/${path}`;
    }
    return path;
  }
}
