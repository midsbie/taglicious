import * as React from "react";
import { XCircleFill, XLg } from "react-bootstrap-icons";

import { InputChangeAction } from "@taglicious/model";
import { Taglicious as BaseTaglicious, RenderInputProps, RenderTagProps } from "@taglicious/react";

interface Tag {
  value: string | number;
  label: string;
}

interface Props {
  placeholder?: string;
  value: Tag[];
  onInputChange(input: string, action: InputChangeAction): boolean | Promise<boolean>;
  onRemove?(tag: Tag): void;
  onClear?(): void;
}

export function Taglicious(props: Props) {
  return (
    <BaseTaglicious
      {...props}
      renderInput={renderInput}
      renderTag={renderTag}
      renderClearButton={({ clear }) => (
        <span className="clear-btn" onClick={clear}>
          <XLg />
        </span>
      )}
    />
  );
}

function renderInput({ placeholder, inputValue, onChange, onKeyDown }: RenderInputProps) {
  return (
    <input
      className="filter-input"
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

function renderTag({ tag, onRemove }: RenderTagProps) {
  return (
    <div className="tag">
      {tag.label}
      {onRemove && (
        <span className="remove-btn" onClick={(ev) => onRemove(ev, tag)}>
          <XCircleFill />
        </span>
      )}
    </div>
  );
}
