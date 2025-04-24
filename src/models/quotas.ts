export type WorkspaceQuotas = {
  plan: string;
  planQuotas: Record<string, number>;
  addonsQuotas: Record<string, number>;
};

export type WorkspaceQuotasConsumption = {
  static: Record<string, number>;
  monthly: Record<string, number>;
};
