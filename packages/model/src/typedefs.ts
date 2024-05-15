export enum InputChangeAction {
  filter,
  add,
}

export type TagValue = string | number;

export interface Tag {
  value: TagValue;
  label: string;
}
