import { useArgs } from "@storybook/preview-api";
import * as React from "react";

import { InputChangeAction, Tag } from "@taglicious/model";
import { Props, Taglicious } from "@taglicious/react-bootstrap";

import { Container } from "./Container";

export function render(args: Props) {
  const [, setArgs] = useArgs();

  const handleInputChange = React.useCallback(
    (input: string, action: InputChangeAction) => {
      if (action !== InputChangeAction.add) return false;
      setArgs({ value: args.value.concat({ value: input, label: input }) });
      return true;
    },
    [args.value],
  );

  const handleRemove = React.useCallback(
    (tag: Tag) => setArgs({ value: args.value.filter((t) => t.value !== tag.value) }),
    [args.value],
  );

  const handleClear = React.useCallback(() => setArgs({ value: [] }), [args.value]);

  return (
    <Container>
      <Taglicious
        {...args}
        onInputChange={handleInputChange}
        onRemove={handleRemove}
        onClear={handleClear}
      />
    </Container>
  );
}
