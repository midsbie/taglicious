import classNames from "classnames";
import * as React from "react";
import { XCircleFill, XLg } from "react-bootstrap-icons";

import {
  Props as BaseProps,
  Taglicious as BaseTaglicious,
  RenderInputProps,
  RenderProps,
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
  const components = React.useMemo(
    () => ({
      Container,
      Input,
      Placeholder,
      Tag,
      ClearButton,
    }),
    [],
  );

  const mappedVariantClass = variantClassMapping[variant];
  if (mappedVariantClass) className = classNames(className, mappedVariantClass);

  return <BaseTaglicious className={className} {...props} components={components} />;
}

function Container({ attrs, className, children, ...props }: RenderProps) {
  const { isFocused } = attrs;
  return (
    <div {...props} className={classNames(className, { "focus-ring": isFocused })}>
      {children}
    </div>
  );
}

function Placeholder({ attrs: _, placeholder, ...props }: RenderProps) {
  return (
    <span {...props} className="text-muted">
      {placeholder}
    </span>
  );
}

function Input({ attrs: _, inputRef, ...props }: RenderInputProps) {
  return (
    <input
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      tabIndex={0}
      aria-autocomplete="list"
      aria-expanded="false"
      aria-haspopup="true"
      {...props}
      ref={inputRef as React.RefObject<HTMLInputElement>}
      className="taglicious-filter-input"
      type="text"
    />
  );
}

function Tag({ attrs: _, tag, onRemove }: RenderTagProps) {
  return (
    <div className="taglicious-tag text-bg-secondary me-2 ps-2 pe-2 rounded-1 mb-1">
      <span>{tag.label}</span>
      {onRemove && (
        <span className="taglicious-remove-btn link-light ps-2" onClick={onRemove}>
          <XCircleFill className="" />
        </span>
      )}
    </div>
  );
}

function ClearButton({ attrs: _, onClick }: RenderProps) {
  return (
    <span className="taglicious-clear-btn ms-2" onClick={onClick}>
      <XLg />
    </span>
  );
}
