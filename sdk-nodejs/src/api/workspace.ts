import { Actions } from "./actions";
import { API } from "./api";
import { Buckets } from "./buckets";
import { Datasources } from "./datasources";
import { Scripts } from "./scripts";
import { Users } from "./users";

export class Workspace {
  private api: API;

  public buckets: Buckets;
  public datasources: Datasources;
  public users: Users;
  public actions: Actions;
  public scripts: Scripts;

  constructor() {
    this.api = new API();
    this.buckets = new Buckets(this.api);
    this.datasources = new Datasources(this.api);
    this.users = new Users(this.api);
    this.actions = new Actions(this.api);
    this.scripts = new Scripts(this.api);
  }
}
