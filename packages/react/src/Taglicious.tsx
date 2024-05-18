import classNames from "classnames";
import * as React from "react";

import { InputChangeAction, Tag } from "@taglicious/model";

export interface RenderInputProps {
  inputRef: React.RefObject<HTMLElement>;
  placeholder?: string;
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void;
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
  focused?: boolean;
  value: readonly Tag[];

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
  focused: forcefullyFocused = false,
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
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const clear = React.useCallback(
    (ev?: React.MouseEvent | undefined) => {
      onInputChange("", InputChangeAction.filter);
      onClear?.(ev);
      if (ev) inputRef.current?.focus();
      setInputValue("");
    },
    [onInputChange, onClear],
  );

  const handleFocus = React.useCallback(() => setIsFocused(true), []);
  const handleBlur = React.useCallback(() => setIsFocused(false), []);

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
    [inputValue, clear, onInputChange],
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
      inputRef.current?.focus();
    },
    [onRemove],
  );

  return (
    <div
      className={classNames("taglicious", className, {
        "focus-ring": forcefullyFocused || isFocused,
      })}
    >
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
              placeholder,
              value: inputValue,
              onChange: handleChange,
              onKeyDown: handleKeyDown,
              onFocus: handleFocus,
              onBlur: handleBlur,
            })}
        </div>

        <div className="taglicious-controls">
          {isClearable && (value.length > 0 || inputValue) && renderClearButton({ onClick: clear })}
        </div>
      </div>
    </div>
  );
}
