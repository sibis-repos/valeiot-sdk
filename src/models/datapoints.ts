export type DatapointAggrFunction = "max" | "min" | "avg";
export type DatapointFiltersOperator = ">" | ">=" | "<=" | "<" | "=" | "!=";

export type Datapoint = {
  time: Date;
  variable: string;
  value: any;
};

export type DatapointForm = {
  time?: Date;
  variable: string;
  value: any;
};

export type DatapointsListFilters = {
  variable?: string;
  startTime?: Date;
  stopTime?: Date;
  filters?: DatapointsFilters;
  aggrInterval?: string;
  aggrFunction?: DatapointAggrFunction;
  limit?: number;
};

export type DatapointsDeleteFilters = {
  variable: string;
  startTime: Date;
  stopTime: Date;
  limit: number;
};

export class DatapointsFilters {
  private filters: [DatapointFiltersOperator, any][];
  constructor(filters: [DatapointFiltersOperator, any][]) {
    this.filters = filters;
  }

  public toString(): string {
    return this.filters.map((f) => f[0] + f[1].toString()).toString();
  }
}
