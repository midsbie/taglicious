import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Tag } from "@taglicious/model";
import { Taglicious } from "@taglicious/react-bootstrap";

import { render } from "./render";
import "./style.scss";

// More on how to set up stories at:
// https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Taglicious> = {
  title: "Taglicious/React Bootstrap",
  component: Taglicious,
  parameters: {
    // Optional parameter to center the component in the Canvas.
    // https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry.
  // https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // https://storybook.js.org/docs/api/argtypes
  argTypes: {
    clearable: {
      description: `\
Enables an X button in the component that clears the input field first when clicked. If the input
field is already empty, the tags are cleared. The clear button is only displayed if there is content
 in the input field or if there are selected tags.`,
    },
    value: { control: "object" },
  },
  // Use `fn` to spy on a callback arg (say, onRemove), which will appear in the actions panel once
  // invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onFocusChange: fn(),
    onInputChange: fn(),
    onRemove: fn(),
    onClear: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Taglicious>;

const defaultValue: readonly Tag[] = [
  { value: "work", label: "Work" },
  { value: "personal", label: "Personal" },
  { value: "urgent", label: "Urgent" },
];

const defaultLargeValue: readonly Tag[] = [
  { value: "react-refine", label: "react-refine" },
  { value: "slate-react", label: "slate-react" },
  { value: "usecallback", label: "usecallback" },
  { value: "react-usememo", label: "react-usememo" },
  { value: "use-reducer", label: "use-reducer" },
  { value: "use-ref", label: "use-ref" },
  { value: "react-component", label: "react-component" },
  { value: "react-create-app", label: "react-create-app" },
  { value: "use-context", label: "use-context" },
  { value: "use-effect", label: "use-effect" },
  { value: "use-state", label: "use-state" },
  { value: "context-api", label: "context-api" },
  { value: "react-native-web", label: "react-native-web" },
  { value: "react-native-ios", label: "react-native-ios" },
  { value: "react-native-android", label: "react-native-android" },
  { value: "stripe-react-native", label: "stripe-react-native" },
  { value: "react-native-stripe-api", label: "react-native-stripe-api" },
  { value: "reactive-extensions", label: "reactive-extensions" },
  { value: "react.js", label: "react.js" },
  { value: "reactor", label: "reactor" },
  { value: "reactive-extensions-js", label: "reactive-extensions-js" },
  { value: "react-stripe-elements", label: "react-stripe-elements" },
  { value: "react", label: "react" },
  { value: "reactive-forms", label: "reactive-forms" },
  { value: "spring-reactive", label: "spring-reactive" },
  { value: "spring-reactor", label: "spring-reactor" },
  { value: "react-vr", label: "react-vr" },
  { value: "react-jsx", label: "react-jsx" },
  { value: "reactjs-native", label: "reactjs-native" },
];

export const FullInteractions: Story = {
  parameters: {
    docs: {
      description: "A comprehensive setup with all interactions enabled by default.",
    },
  },
  args: {
    value: defaultValue,
    placeholder: "Add a tag",
    clearable: true,
  },
  render,
};

export const Baseline: Story = {
  parameters: {
    docs: {
      description:
        "A basic setup with minimal props, showcasing the component in its simplest form.",
    },
  },
  args: {
    value: [],
  },
  render,
};

export const Placeholder: Story = {
  parameters: {
    docs: {
      description: "Shows the Taglicious component with a placeholder text.",
    },
  },
  args: {
    value: [],
    placeholder: "Add a tag",
  },
  render,
};

export const Tags: Story = {
  parameters: {
    docs: {
      description: "Displays the component with a few initial tags.",
    },
  },
  args: {
    value: defaultValue,
  },
  render,
};

export const OverflownTags: Story = {
  parameters: {
    docs: {
      description: "Displays the component with a large number of tags overflowing the component.",
    },
  },
  args: {
    value: defaultLargeValue,
    placeholder: "Add a tag",
    clearable: true,
  },
  render,
};

export const ReadOnlyMode: Story = {
  parameters: {
    docs: {
      description: "Shows the component in read-only mode where tags can't be added or removed.",
    },
  },
  args: {
    value: defaultValue,
    readonly: true,
  },
  render,
};

export const FocusedState: Story = {
  parameters: {
    docs: {
      description: "The component is programmatically focused.",
    },
  },
  args: {
    value: defaultValue,
    focused: true,
  },
  render,
};

export const ClearableInput: Story = {
  parameters: {
    docs: {
      description:
        "The component with tags whose input and tags can be cleared using the clear button.",
    },
  },
  args: {
    value: defaultValue,
    clearable: true,
  },
  render,
};

export const SelectVariant: Story = {
  parameters: {
    docs: {
      description: "A comprehensive setup with all interactions enabled by default.",
    },
  },
  args: {
    value: defaultValue,
    placeholder: "Add a tag",
    clearable: true,
    variant: "select",
  },
  render,
};
