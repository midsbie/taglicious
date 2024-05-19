# Taglicious

Taglicious is a versatile and extensible React component for managing tags and multi-select inputs
with customizable rendering and seamless integration with various UI libraries.

## Features

- Customizable rendering of input fields and tags.
- Context-based rendering for seamless integration with different UI libraries.
- Event handling for adding, filtering, and removing tags.
- Clear button for resetting the input and tags.
- Modular architecture allowing framework-specific implementations.

## Getting Started

This guide will help you set up and use the Taglicious library in your project.

### Installation

Start by installing the dependencies with Yarn:

```sh
yarn install
```

### Usage

Import the required components and types from the library:

```jsx
import { Tag } from "@taglicious/model";
import { Taglicious } from "@taglicious/react-bootstrap";
```

Define your tags and input handlers:

```jsx
const tags: Tag[] = [
  { value: 'tag1', label: 'Tag 1' },
  { value: 'tag2', label: 'Tag 2' },
  // ... more tags
];

const handleInputChange = React.useCallback((input: string, action: "filter" | "add"): boolean => {
  // Handle input change for filtering or adding tags
  return true;
}, []);

const handleRemove = React.useCallback((tag: Tag) => {
  // Handle tag removal
}, []);

const handleClear = React.useCallback(() => {
  // Handle clearing all tags
}, []);
```

Render the `Taglicious` component with your tags and handlers:

```jsx
<Taglicious
  placeholder={placeholder}
  value={value}
  onInputChange={handleInputChange}
  onRemove={handleRemove}
  onClear={handleClear}
/>
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and
create. All contributions are greatly appreciated.

## License

Distributed under the MIT License. See LICENSE for more information.
