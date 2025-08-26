import { RawTag } from './common.js';

export type Tag = {
  id: number;
  key: string;
  value: string;
};

export class TagsFilter {
  private value: RawTag[];

  constructor(value: RawTag[]) {
    this.value = value;
  }

  public add(...tags: RawTag[]): void {
    this.value.push(...tags)
  }

  public get(): RawTag[] {
    return this.value;
  }

  public remove(...tags: RawTag[]): void {
    this.value = this.value.filter(tag => !tags.some(t => t.key == tag.key && t.value == tag.value))

  }

  public removeByKeys(...keys: string[]): void {
    this.value = this.value.filter(tag => !keys.some(k => k == tag.key))
  }

  public toString(): string {
    return this.value.map((tag) => `${tag.key}:${tag.value}`).join(',');
  }
}