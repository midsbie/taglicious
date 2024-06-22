import classNames from "classnames";
import * as React from "react";

import { InputChangeAction, Tag } from "@taglicious/model";

import { DefaultInnerWrapper, DefaultTagsContainer } from "./renderers";
import { RenderComponents } from "./typedefs";

export interface Props {
  readonly?: boolean;
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
  components: RenderComponents;
}

export function Taglicious({
  readonly,
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
  components,
}: PropsWithRender) {
  const inputRef = React.useRef<HTMLElement | null>(null);
  const isMountedRef = React.useRef(true);
  const [inputValue, setInputValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const isCurrentlyFocused = forcefullyFocused || isFocused;
  const {
    Container,
    InnerWrapper = DefaultInnerWrapper,
    TagsContainer = DefaultTagsContainer,
    Input,
    Placeholder,
    Tag,
    ClearButton,
  } = components;

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

  // XXX: is there ANY chance that the state mutation will NOT result in (1) the input element being
  // rendered and (2) the input ref updated before the animation frame callback runs?
  const handleSetFocus = React.useCallback(() => {
    setIsFocused(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

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
    },
    [onRemove],
  );

  const attrs = { isFocused: isCurrentlyFocused };

  const tags = [...value].map((tag, index) => {
    const removeHandler = onRemove ? (ev: React.MouseEvent) => handleRemove(ev, tag) : null;
    return (
      <Tag key={index} attrs={attrs} tag={tag} onRemove={readonly ? undefined : removeHandler} />
    );
  });

  let input;
  if (readonly || (!isCurrentlyFocused && !inputValue && value.length < 1)) {
    input = (
      <div className="taglicious-input-placeholder">
        <Placeholder attrs={attrs} placeholder={placeholder} />
      </div>
    );
  } else {
    input = (
      <div className="taglicious-input-container" data-value={inputValue}>
        <Input
          attrs={attrs}
          inputRef={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
    );
  }

  let clearButton;
  if (isClearable && (value.length > 0 || inputValue)) {
    clearButton = <ClearButton attrs={attrs} onClick={clear} />;
  }

  return (
    <Container
      attrs={attrs}
      className={classNames("taglicious", className)}
      onClick={handleSetFocus}
    >
      <InnerWrapper attrs={attrs} className="taglicious-inner-wrapper">
        <TagsContainer attrs={attrs} className="taglicious-tags-container">
          {tags}
          {input}
        </TagsContainer>

        <div className="taglicious-controls">{clearButton}</div>
      </InnerWrapper>
    </Container>
  );
}
