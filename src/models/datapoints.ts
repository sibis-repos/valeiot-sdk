/**
 * Supported aggregation functions for datapoint queries.
 */
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

/**
 * Comparison operators supported in datapoint value filters.
 */
export type DatapointFilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte';

/**
 * Single time-series sample stored for a datasource variable.
 */
export type Datapoint = {
  time: string;
  variable: string;
  value: any;
};

/**
 * Payload used to create a datapoint.
 */
export type DatapointForm = {
  time?: Date;
  variable: string;
  value: any;
};

/**
 * Filters supported when listing datapoints.
 */
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

/**
 * Extra create parameters accepted by datapoint insertion endpoints.
 */
export type DatapointsCreateParams = {
  skipPayloadParser?: boolean;
  targetBucket?: number;
};

/**
 * Filters used to bulk-delete datapoints from a datasource.
 */
export type DatapointsDeleteFilters = {
  variable: string;
  startTime: Date;
  stopTime: Date;
  limit: number;
  targetBucket?: number;
};

/**
 * Single numeric comparison applied to datapoint values.
 */
export type DatapointFilter = {
  operator: DatapointFilterOperator;
  value: number;
};

/**
 * Helper used to serialize datapoint value filters to the string format expected by the API.
 */
export class DatapointsFilters {
  private filters: DatapointFilter[];

  /**
   * Creates a datapoint filter serializer.
   *
   * @param filters Filters to serialize.
   */
  constructor(filters: DatapointFilter[]) {
    this.filters = filters;
  }

  /**
   * Serializes all datapoint filters into a comma-separated API value.
   */
  public toString(): string {
    return this.filters.map((f) => `${f.operator}:${f.value}`).toString();
  }
}
