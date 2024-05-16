import classNames from "classnames";
import * as React from "react";
import { XCircleFill, XLg } from "react-bootstrap-icons";

import {
  Props as BaseProps,
  Taglicious as BaseTaglicious,
  RenderInputProps,
  RenderTagProps,
} from "@taglicious/react";

type Variant = "input" | "select";

const variantClassMapping: Record<Variant, string> = {
  input: "form-control",
  select: "form-select",
};

interface Props extends BaseProps {
  variant?: Variant;
}

export function Taglicious({ variant = "input", className, ...props }: Props) {
  const mappedVariantClass = variantClassMapping[variant];
  if (mappedVariantClass) className = classNames(className, mappedVariantClass);

  return (
    <BaseTaglicious
      className={className}
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
