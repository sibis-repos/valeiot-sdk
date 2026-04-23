import { OrderByFn } from './common.js';
import { Tag } from './tags.js';

/**
 * Action implementation types supported by the platform.
 */
export type ActionType = 'script' | 'mqtt-publish';
/**
 * Trigger sources supported by actions.
 */
export type ActionTrigger = 'scheduler' | 'variable';
/**
 * Logical operators used to combine action conditions.
 */
export type ActionGroupOperator = 'and' | 'or';

/**
 * Sort fields accepted by action listing endpoints.
 */
export type ActionOrderBy =
  | 'name'
  | 'description'
  | 'type'
  | 'trigger'
  | 'created_at'
  | 'updated_at';

/**
 * Comparison operators supported by variable-based action conditions.
 */
export type ActionOperator = '!=' | '=' | '<' | '<=' | '>' | '>=';

/**
 * Data types used to interpret action condition values.
 */
export type ActionDataType = 'number' | 'text' | 'bool';

/**
 * Base action resource.
 */
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

/**
 * Expanded action view including operational fields such as last trigger time.
 */
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

/**
 * Payload used to create or update an action.
 */
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

/**
 * Configuration for script-backed actions.
 */
export type ActionScriptConfig = {
  scriptId: number;
};

/**
 * Configuration for MQTT publish actions.
 */
export type ActionMQTTPublishConfig = {
  networkId: number;
  topic: string;
  payload: string;
  qos: number;
};

/**
 * Schedule trigger configuration based on a cron expression.
 */
export type ActionTriggerScheduleConfig = {
  cron: string;
};

/**
 * Variable trigger configuration that reacts to datasource values.
 */
export type ActionTriggerVariableConfig = {
  singleDatasource?: ActionTriggerVariableDatasource;
  multipleDatasourcesTags: Tag[];
  variablesConditions: ActionVariableCondition[];
  variablesGroupOperator: ActionGroupOperator;
};

/**
 * Single datasource scope used by variable-based action triggers.
 */
export type ActionTriggerVariableDatasource = {
  datasourceId: number;
};

/**
 * Cooldown and lock behavior applied to an action after execution.
 */
export type ActionLockConfig = {
  cooldownDuration: number; // seconds
  cooldownGroupOperator: ActionGroupOperator;
  variablesConditions: ActionVariableCondition[];
  variablesGroupOperator: ActionGroupOperator;
};

/**
 * Condition evaluated against a datasource variable.
 */
export type ActionVariableCondition = {
  variable: string;
  operator: ActionOperator;
  value: string;
  dataType: ActionDataType;
};

/**
 * Filters used when listing actions.
 */
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
