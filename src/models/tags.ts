import { RawTag } from './common.js';

/**
 * Persisted tag object returned by tag endpoints.
 */
export type Tag = {
  id: number;
  key: string;
  value: string;
};

/**
 * Mutable helper used to build, inspect, and serialize tag filters.
 */
export class TagsFilter {
  private value: RawTag[];

  /**
   * Creates a tag filter helper from a list of raw tags.
   *
   * @param value Initial raw tags.
   */
  constructor(value: RawTag[]) {
    this.value = value;
  }

  /**
   * Adds one or more tags to the current filter set.
   *
   * @param tags Tags to append.
   */
  public add(...tags: RawTag[]): void {
    this.value.push(...tags)
  }

  /**
   * Returns the current list of raw tags.
   */
  public get(): RawTag[] {
    return this.value;
  }

  /**
   * Removes exact tag matches from the current filter set.
   *
   * @param tags Tags to remove.
   */
  public remove(...tags: RawTag[]): void {
    this.value = this.value.filter(tag => !tags.some(t => t.key == tag.key && t.value == tag.value))

  }

  /**
   * Removes all tags whose keys match any of the provided keys.
   *
   * @param keys Tag keys to remove.
   */
  public removeByKeys(...keys: string[]): void {
    this.value = this.value.filter(tag => !keys.some(k => k == tag.key))
  }

  /**
   * Serializes the tag filter to the comma-separated format expected by the API.
   */
  public toString(): string {
    return this.value.map((tag) => `${tag.key}:${tag.value}`).join(',');
  }
}
