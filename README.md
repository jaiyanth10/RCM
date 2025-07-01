# Reusable Components Manager (RCM)

This is a demo of the Reusable Components Manager (RCM) system, which allows for the configuration and management of reusable components across different pages.

## Features

- Component Registry: Register reusable components with their sub-elements
- Per-Page Configuration: Configure components differently for each page
- Configuration UI: Manage components through a visual interface
- Element Toggle: Enable/disable specific elements of components
- Additional Elements: Add extra instances of elements to components

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
6. Toggle elements on/off or add additional elements as needed
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
