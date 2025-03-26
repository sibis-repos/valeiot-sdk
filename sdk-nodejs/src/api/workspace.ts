import { API } from "./api";
import { Datasources } from "./datasources";
import { Users } from "./users";

export class Workspace {
  private api: API;

  public datasources: Datasources;
  public users: Users;

  constructor() {
    this.api = new API();
    this.datasources = new Datasources(this.api);
    this.users = new Users(this.api);
  }
}
