import { OrderByFn } from './common.js';
import { Tag } from './tags.js';

export type ActionType = 'script' | 'mqtt-publish';
export type ActionTrigger = 'scheduler' | 'variable';
export type ActionGroupOperator = 'and' | 'or';

export type ActionOrderBy =
  | 'name'
  | 'description'
  | 'type'
  | 'trigger'
  | 'created_at'
  | 'updated_at';

export type ActionOperator = '!=' | '=' | '<' | '<=' | '>' | '>=';

export type ActionDataType = 'number' | 'text' | 'bool';

export type Action = {
  id: number;
  name: string;
  description: string;
  type: ActionType;
  config: ActionScriptConfig | ActionMQTTPublishConfig;
  trigger: ActionTrigger;
  triggerConfig: ActionTriggerScheduleConfig | ActionTriggerVariableConfig;
  blocked: boolean;
  lock: boolean;
  lockConfig?: ActionLockConfig;
  locked: boolean;
  lockedUntil?: string;
  createdAt: string;
  updatedAt: string;
};

export type ActionDetails = {
  id: number;
  name: string;
  description: string;
  type: ActionType;
  config: ActionScriptConfig | ActionMQTTPublishConfig;
  trigger: ActionTrigger;
  triggerConfig: ActionTriggerScheduleConfig | ActionTriggerVariableConfig;
  blocked: boolean;
  lock: boolean;
  lockConfig?: ActionLockConfig;
  locked: boolean;
  lockedUntil?: string;
  createdAt: string;
  updatedAt: string;
  lastTrigger?: string;
};

export type ActionForm = {
  name: string;
  description: string;
  type: ActionType;
  config: ActionScriptConfig | ActionMQTTPublishConfig;
  trigger: ActionTrigger;
  triggerConfig: ActionTriggerScheduleConfig | ActionTriggerVariableConfig;
  blocked: boolean;
  lock: boolean;
  lockConfig?: ActionLockConfig;
};

export type ActionScriptConfig = {
  scriptId: number;
};

export type ActionMQTTPublishConfig = {
  networkId: number;
  topic: string;
  payload: string;
  qos: number;
};

export type ActionTriggerScheduleConfig = {
  cron: string;
};

export type ActionTriggerVariableConfig = {
  singleDatasource?: ActionTriggerVariableDatasource;
  multipleDatasourcesTags: Tag[];
  variablesConditions: ActionVariableCondition[];
  variablesGroupOperator: ActionGroupOperator;
};

export type ActionTriggerVariableDatasource = {
  datasourceId: number;
};

export type ActionLockConfig = {
  cooldownDuration: number; // seconds
  cooldownGroupOperator: ActionGroupOperator;
  variablesConditions: ActionVariableCondition[];
  variablesGroupOperator: ActionGroupOperator;
};

export type ActionVariableCondition = {
  variable: string;
  operator: ActionOperator;
  value: string;
  dataType: ActionDataType;
};

export type ActionsListFilters = {
  name?: string;
  description?: string;
  actionType?: ActionType;
  actionTrigger?: ActionTrigger;
  blocked?: boolean;
  limit?: number;
  offset?: number;
  orderBy?: ActionOrderBy;
  orderByFn?: OrderByFn;
};
