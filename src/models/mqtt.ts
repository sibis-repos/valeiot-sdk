/**
 * MQTTPublish is the payload expected by the workspace MQTT publish endpoint.
 *
 * Note: the workspace id is derived from the workspace token/session and is not
 * part of the JSON body.
 */
export type MQTTPublish = {
  /** NetworkID is the target network. */
  networkId: number;
  /** Topic is the MQTT topic. */
  topic: string;
  /** Payload is the payload (max 1024 chars server-side). */
  payload: string;
  /** QoS is the quality-of-service (0, 1, or 2). */
  qos: 0 | 1 | 2;
  /** Retain is whether the message should be retained. */
  retain: boolean;
};
