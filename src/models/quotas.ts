/**
 * Workspace quota limits grouped by plan and purchased add-ons.
 */
export type WorkspaceQuotas = {
  plan: string;
  planQuotas: Record<string, number>;
  addonsQuotas: Record<string, number>;
};

/**
 * Current quota consumption grouped by static and monthly counters.
 */
export type WorkspaceQuotasConsumption = {
  static: Record<string, number>;
  monthly: Record<string, number>;
};
