import * as React from "react";

import { InputChangeAction, Tag } from "@taglicious/model";

export interface RenderInputProps {
  placeholder?: string;
  inputValue: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface RenderTagProps {
  tag: Tag;
  onRemove: (ev: React.MouseEvent<HTMLElement>, tag: Tag) => void;
}

interface Props {
  placeholder?: string;
  value: Tag[];

  onInputChange(input: string, action: InputChangeAction): boolean | Promise<boolean>;
  onRemove?(tag: Tag): void;
  onClear?(): void;

  renderInput(props: RenderInputProps): React.ReactNode;
  renderTag(props: RenderTagProps): React.ReactNode;
  renderClearButton(props: { clear: () => void }): React.ReactNode;
}

export function Taglicious({
  placeholder,
  value,
  onInputChange,
  onRemove,
  onClear,
  renderInput,
  renderTag,
  renderClearButton,
}: Props) {
  const isMountedRef = React.useRef(true);
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  function clear() {
    onInputChange("", InputChangeAction.filter);
    onClear?.();
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
    (ev: React.MouseEvent<HTMLElement>, tag: Tag) => {
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
          {renderInput({
            inputValue,
            onChange: handleChange,
            onKeyDown: handleKeyDown,
            placeholder,
          })}
        </div>

        <div className="taglicious-controls">
          {(value.length > 0 || inputValue) && renderClearButton({ clear })}
        </div>
      </div>
    </div>
  );
}
