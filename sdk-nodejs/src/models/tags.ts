import { RawTag } from "../types";

export type Tag = {
  id: number;
  key: string;
  value: string;
};

export class TagsFilter {
  public value: RawTag[];
  constructor(value: RawTag[]) {
    this.value = value;
  }

  public toString(): string {
    return this.value.map((tag) => `${tag.key}:${tag.value}`).join(",");
  }
}
