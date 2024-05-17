import classNames from "classnames";
import * as React from "react";

import { InputChangeAction, Tag } from "@taglicious/model";

export interface RenderInputProps {
  inputRef: React.RefObject<HTMLElement>;
  placeholder?: string;
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface RenderTagProps<T = Element> {
  tag: Tag;
  onRemove: (ev: React.MouseEvent<T>, tag: Tag) => void;
}

export interface RenderClearButtonProps<T = Element> {
  onClick: (ev: React.MouseEvent<T>) => void;
}

export interface Props {
  static?: boolean;
  clearable?: boolean;
  className?: string;
  placeholder?: string;
  value: Tag[];

  onInputChange(input: string, action: InputChangeAction): boolean | Promise<boolean>;
  onRemove?(tag: Tag): void;
  onClear?(ev?: React.MouseEvent | undefined): void;
}

interface PropsWithRender extends Props {
  renderInput(props: RenderInputProps): React.ReactNode;
  renderTag(props: RenderTagProps): React.ReactNode;
  renderClearButton(props: RenderClearButtonProps): React.ReactNode;
}

export function Taglicious({
  static: isStatic,
  clearable: isClearable = true,
  className,
  placeholder,
  value,
  onInputChange,
  onRemove,
  onClear,
  renderInput,
  renderTag,
  renderClearButton,
}: PropsWithRender) {
  const inputRef = React.useRef<HTMLElement | null>(null);
  const isMountedRef = React.useRef(true);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  function clear(ev?: React.MouseEvent | undefined) {
    onInputChange("", InputChangeAction.filter);
    onClear?.(ev);
    if (ev) inputRef.current?.focus();
    setInputValue("");
  }

  const handleKeyDown = React.useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "Enter": {
          const r = await onInputChange(inputValue.trim(), InputChangeAction.add);
          if (isMountedRef.current && r === true) setInputValue("");
          return;
        }
        case "Escape":
          clear();
          return;
      }
    },
    [inputValue, onInputChange],
  );

  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const next = ev.target.value;
      setInputValue(next);
      onInputChange(next.trim(), InputChangeAction.filter);
    },
    [onInputChange],
  );

  const handleRemove = React.useCallback(
    (ev: React.MouseEvent<Element>, tag: Tag) => {
      ev.stopPropagation();
      onRemove?.(tag);
    },
    [onRemove],
  );

  return (
    <div className={classNames("taglicious", className)}>
      <div className="taglicious-outer-container">
        <div className="taglicious-input-container">
          {[...value].map((tag, index) => (
            <React.Fragment key={index}>
              {renderTag({ tag, onRemove: handleRemove })}
            </React.Fragment>
          ))}
          {!isStatic &&
            renderInput({
              inputRef,
              value: inputValue,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              placeholder,
            })}
        </div>

        <div className="taglicious-controls">
          {isClearable && (value.length > 0 || inputValue) && renderClearButton({ onClick: clear })}
        </div>
      </div>
    </div>
  );
}
