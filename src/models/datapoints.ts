export type DatapointAggrFunction =
  | 'max'
  | 'min'
  | 'avg'
  | 'sum'
  | 'count'
  | 'median'
  | 'stddev'
  | 'variance'
  | 'first'
  | 'last'
  | 'delta'
  | 'rate'
  | 'increase'
  | 'p90'
  | 'p95'
  | 'p99';

export type DatapointFilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte';

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
  light?: boolean;
  targetBucket?: number;
  startTime?: Date;
  stopTime?: Date;
  filters?: DatapointsFilters;
  aggrInterval?: string;
  aggrFunction?: DatapointAggrFunction;
  limit?: number;
};

export type DatapointsCreateParams = {
  skipPayloadParser?: boolean;
  targetBucket?: number;
};

export type DatapointsDeleteFilters = {
  variable: string;
  startTime: Date;
  stopTime: Date;
  limit: number;
  targetBucket?: number;
};

export type DatapointFilter = {
  operator: DatapointFilterOperator;
  value: number;
};

export class DatapointsFilters {
  private filters: DatapointFilter[];
  constructor(filters: DatapointFilter[]) {
    this.filters = filters;
  }

  public toString(): string {
    return this.filters.map((f) => `${f.operator}:${f.value}`).toString();
  }
}
