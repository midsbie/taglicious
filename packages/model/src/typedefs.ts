export enum InputChangeAction {
  filter,
  add,
}

export type TagValue = string;

export interface Tag {
  value: TagValue;
  label: string;
}
