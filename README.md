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

Start by installing the dependencies:

```sh
npm install
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

## Building Artifacts & Publishing to NPM

Follow these steps to build the Taglicious artifacts and publish the libraries to NPM. All commands
should be executed from the repository's root directory:

1.  Run the linter to ensure there are no warnings or errors. Address any issues before proceeding:

        npm run lint

1.  Ensure all files are formatted correctly. If any files are modified during this step, commit the
    changes:

        npm run fmt

1.  Remove any previous build artifacts to ensure a fresh build:

        npm run clean

    Or, for a more thorough cleanup:

        npm run clean:full

1.  Ensure there are no uncommitted changes:

        git status

    If the repository is clean, create a new version tag:

        npm run version <minor|major|patch>

1.  Generate the artifacts by running the build process:

        npm run build

1.  Publish the package to NPM, including all configured workspaces:

        npm publish --workspaces

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and
create. All contributions are greatly appreciated.

## License

Distributed under the MIT License. See LICENSE for more information.
