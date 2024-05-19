import classNames from "classnames";
import * as React from "react";

import { InputChangeAction, Tag } from "@taglicious/model";

export interface RenderPlaceholderProps {
  placeholder?: string;
}

export interface RenderInputProps {
  inputRef: React.RefObject<HTMLElement>;
  value: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (ev: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (ev: React.FocusEvent<HTMLInputElement>) => void;
}

export interface RenderTagProps<T = Element> {
  tag: Tag;
  onRemove: ((ev: React.MouseEvent<T>, tag: Tag) => void) | undefined | null;
}

export interface RenderClearButtonProps<T = Element> {
  onClick: (ev: React.MouseEvent<T>) => void;
}

export interface Props {
  clearable?: boolean;
  autoclear?: boolean;
  className?: string;
  placeholder?: string;
  focused?: boolean;
  value: readonly Tag[];

  onFocusChange?(isFocused: boolean): void;
  onInputChange(input: string, action: InputChangeAction): boolean | Promise<boolean>;
  onRemove?(tag: Tag): void;
  onClear?(ev?: React.MouseEvent | undefined): void;
}

interface PropsWithRender extends Props {
  renderPlaceholder(props: RenderPlaceholderProps): React.ReactNode;
  renderInput(props: RenderInputProps): React.ReactNode;
  renderTag(props: RenderTagProps): React.ReactNode;
  renderClearButton(props: RenderClearButtonProps): React.ReactNode;
}

export function Taglicious({
  clearable: isClearable,
  className,
  placeholder,
  focused: forcefullyFocused,
  autoclear,
  value,
  onFocusChange,
  onInputChange,
  onRemove,
  onClear,
  renderPlaceholder,
  renderInput,
  renderTag,
  renderClearButton,
}: PropsWithRender) {
  const inputRef = React.useRef<HTMLElement | null>(null);
  const isMountedRef = React.useRef(true);
  const [inputValue, setInputValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const isCurrentlyFocused = forcefullyFocused || isFocused;

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (forcefullyFocused && !isFocused) inputRef.current?.focus();
  }, [forcefullyFocused]);

  React.useEffect(() => {
    onFocusChange?.(isFocused);
  }, [isFocused]);

  React.useEffect(() => {
    if (!autoclear || !inputValue || isCurrentlyFocused) return;

    const timeoutId = setTimeout(() => {
      setInputValue("");
      onInputChange("", InputChangeAction.filter);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [autoclear, isCurrentlyFocused]);

  const clear = React.useCallback(
    (ev?: React.MouseEvent | undefined) => {
      if (inputValue) {
        onInputChange("", InputChangeAction.filter);
        setInputValue("");
      } else {
        onClear?.(ev);
      }

      if (ev) {
        inputRef.current?.focus();
        ev.stopPropagation();
      }
    },
    [inputValue, onInputChange, onClear],
  );

  const handleSetFocus = React.useCallback(() => inputRef.current?.focus(), []);
  const handleFocus = React.useCallback(() => setIsFocused(true), []);
  const handleBlur = React.useCallback(() => setIsFocused(false), []);

  const handleKeyDown = React.useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "Backspace": {
          const last = value[value.length - 1];
          if (last && !inputValue) onRemove?.(last);
          return;
        }
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
    [inputValue, clear, onInputChange, onRemove],
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
      ev.stopPropagation();
    },
    [onRemove],
  );

  const tags = [...value].map((tag, index) => (
    <React.Fragment key={index}>
      {renderTag({ tag, onRemove: onRemove ? handleRemove : null })}
    </React.Fragment>
  ));

  let input;
  if (!isCurrentlyFocused && !inputValue && value.length < 1) {
    input = (
      <div className="taglicious-input-placeholder">{renderPlaceholder({ placeholder })}</div>
    );
  } else {
    input = (
      <div className="taglicious-input-container" data-value={inputValue}>
        {renderInput({
          inputRef,
          value: inputValue,
          onChange: handleChange,
          onKeyDown: handleKeyDown,
          onFocus: handleFocus,
          onBlur: handleBlur,
        })}
      </div>
    );
  }

  let clearButton;
  if (isClearable && (value.length > 0 || inputValue)) {
    clearButton = renderClearButton({ onClick: clear });
  }

  return (
    <div
      className={classNames("taglicious", className, { "focus-ring": isCurrentlyFocused })}
      onClick={handleSetFocus}
    >
      <div className="taglicious-outer-container">
        <div className="taglicious-tags-container">
          {tags}
          {input}
        </div>

        <div className="taglicious-controls">{clearButton}</div>
      </div>
    </div>
  );
}
