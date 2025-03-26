export type Tag = {
  id: number;
  key: string;
  value: string;
};

export class TagsFilter {
  public value: Record<string, string>;
  constructor(value: Record<string, any>) {
    this.value = value;
  }

  public toString(): string {
    return Object.entries(this.value)
      .map((e) => `${e[0]}:${e[1].toString()}`)
      .toString();
  }
}
