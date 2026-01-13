import { RequestOptions } from '../models/common.js';
import { MQTTPublish } from '../models/mqtt.js';
import { API } from './api.js';

export class Mqtt {
  private api: API;

  constructor(api: API) {
    this.api = api;
  }

  /**
   * Publishes a MQTT message to a network (workspace-scoped).
   * @param options Request options.
   * @default
   * response: null
   */
  public async publish(options: { body: MQTTPublish } & RequestOptions): Promise<null> {
    return this.api.fetch({
      method: 'POST',
      path: 'mqtt/publish',
      body: options.body,
      modifier: options.modifier,
    });
  }
}
