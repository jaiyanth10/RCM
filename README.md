# Reusable Components Manager (RCM)

This is a demo of the Reusable Components Manager (RCM) system, which allows for the configuration and management of reusable components across different pages.

## Features

- Component Registry: Register reusable components with their sub-elements
- Per-Page Configuration: Configure components differently for each page
- Configuration UI: Manage components through a visual interface
- Element Toggle: Enable/disable specific elements of components
- Element Ordering: Reorder elements as needed
- Element Insertion: Add elements at specific positions in the component structure

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## How to Use

1. Navigate between Page 1 and Page 2 using the top navigation
2. Each page includes the same Discussion component but can be configured independently
3. Click on "Configuration" in the footer to open the configuration panel
4. Expand the "Discussions" component to see where it's being used
5. Click "Configure" for either Page 1 or Page 2 to modify that specific instance
6. Toggle elements on/off, add elements at specific positions, or remove elements as needed

## Configuration Model

Each component instance is configured using a single array of elements, where each element has:

- `id`: A unique ID for the specific element instance
- `type`: The base element type (matching one of the component's element IDs)
- `enabled`: Whether this element is currently enabled

This unified approach allows for:

1. Simple ordering of elements (the array order determines rendering order)
2. Easy toggling of elements via the enabled flag
3. Adding multiple instances of the same element type
4. Precise positioning when adding new elements

## Project Structure

```
src/
├── components/
│   ├── config-ui/ (configuration interface components)
│   │   ├── ConfigPanel.tsx
│   │   ├── ComponentList.tsx
│   │   ├── ConfigModal.tsx
│   │   └── Configuration.tsx
│   ├── reusable/ (reusable component definitions)
│   │   └── discussions/
│   │       ├── DiscussionsComponent.tsx (main component)
│   │       ├── Heading.tsx
│   │       ├── TextBox.tsx
│   │       ├── AddButton.tsx
│   │       └── DiscussionsList.tsx
│   ├── Layout.tsx (application layout)
│   └── ComponentRegistry.tsx (registers components)
├── providers/
│   ├── ConfigContext.tsx (context definition)
│   └── ConfigProvider.tsx (context provider)
├── hooks/
│   └── useComponentConfig.ts (custom hook for accessing configs)
├── types/
│   └── index.ts (type definitions)
├── utils/
│   ├── registry.ts (component registry helpers)
│   └── storage.ts (local storage utilities)
├── pages/
│   ├── Page1.tsx
│   └── Page2.tsx
└── App.tsx (main application)
```

## Future Development

This demo serves as a proof-of-concept for a more comprehensive component management system. Future development plans include:

1. Converting to a standalone npm package
2. Adding more configuration options
3. Implementing versioning for configurations
4. Adding export/import functionality
5. Creating a plugin system for extensibility
