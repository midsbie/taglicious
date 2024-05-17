import classNames from "classnames";
import * as React from "react";
import { XCircleFill, XLg } from "react-bootstrap-icons";

import {
  Props as BaseProps,
  Taglicious as BaseTaglicious,
  RenderClearButtonProps,
  RenderInputProps,
  RenderTagProps,
} from "@taglicious/react";

type Variant = "input" | "select";

const variantClassMapping: Record<Variant, string> = {
  input: "form-control",
  select: "form-select",
};

export interface Props extends BaseProps {
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
      renderClearButton={renderClearButton}
    />
  );
}

function renderInput({ placeholder, value, onChange, onKeyDown }: RenderInputProps) {
  return (
    <input
      className="taglicious-filter-input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

function renderTag({ tag, onRemove }: RenderTagProps) {
  return (
    <div className="taglicious-tag text-bg-secondary me-2 ps-2 pe-2 rounded-1 mb-1">
      <span>{tag.label}</span>
      {onRemove && (
        <span className="taglicious-remove-btn link-light ps-2" onClick={(ev) => onRemove(ev, tag)}>
          <XCircleFill className="" />
        </span>
      )}
    </div>
  );
}

function renderClearButton({ onClick }: RenderClearButtonProps) {
  return (
    <span className="taglicious-clear-btn ms-2" onClick={onClick}>
      <XLg />
    </span>
  );
}
