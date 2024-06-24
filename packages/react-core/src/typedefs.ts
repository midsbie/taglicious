import { Tag } from "@taglicious/model";

export interface RenderComponents {
  Container: React.FC<RenderProps>;
  InnerWrapper?: React.FC<RenderProps>;
  TagsContainer?: React.FC<RenderProps>;
  Input: React.FC<RenderInputProps>;
  Placeholder: React.FC<RenderProps>;
  Tag: React.FC<RenderTagProps>;
  ClearButton: React.FC<RenderProps>;
}

export interface RenderAttrs {
  isFocused: boolean;
}

export interface RenderProps extends React.AllHTMLAttributes<HTMLElement> {
  attrs: RenderAttrs;
}

export interface RenderInputProps extends RenderProps {
  inputRef: React.RefObject<HTMLElement>;
}

export interface RenderTagProps<T = Element> extends RenderProps {
  tag: Tag;
  onRemove: ((ev: React.MouseEvent<T>) => void) | undefined | null;
}
