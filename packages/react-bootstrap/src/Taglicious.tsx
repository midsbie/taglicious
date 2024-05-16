import * as React from "react";
import { XCircleFill, XLg } from "react-bootstrap-icons";

import {
  Props as BaseProps,
  Taglicious as BaseTaglicious,
  RenderInputProps,
  RenderTagProps,
} from "@taglicious/react";

interface Tag {
  value: string | number;
  label: string;
}

interface Props extends BaseProps {
}

export function Taglicious(props: Props) {
  return (
    <BaseTaglicious
      {...props}
      renderInput={renderInput}
      renderTag={renderTag}
      renderClearButton={({ clear }) => (
        <span className="taglicious-clear-btn" onClick={clear}>
          <XLg />
        </span>
      )}
    />
  );
}

function renderInput({ placeholder, inputValue, onChange, onKeyDown }: RenderInputProps) {
  return (
    <input
      className="taglicious-filter-input"
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
    <div className="taglicious-tag">
      {tag.label}
      {onRemove && (
        <span className="taglicious-remove-btn" onClick={(ev) => onRemove(ev, tag)}>
          <XCircleFill />
        </span>
      )}
    </div>
  );
}
