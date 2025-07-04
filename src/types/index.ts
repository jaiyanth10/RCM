import type { ReactNode } from 'react';

// Define the structure of a component element (sub-component)
export interface ComponentElement {
  id: string;
  name: string;
  component: React.ComponentType;
  isOptional: boolean;
}

// Define the structure of a reusable component
export interface ReusableComponent {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  elements: ComponentElement[];
}

// Simplified element in a configuration
export interface ConfigElement {
  id: string;       // Unique ID for this specific element instance
  type: string;     // Base type of element (matching one of the component's element IDs)
  enabled: boolean; // Whether this element is enabled
}

// Configuration for a specific instance of a component
export interface ComponentConfig {
  componentId: string;
  pageId: string;
  elements: ConfigElement[];  // Ordered list of elements with their states
  headingTexts?: Record<string, string>;  // Custom heading texts per element
}

// Context types for our configuration provider
export interface ConfigContextType {
  components: ReusableComponent[];
  configurations: ComponentConfig[];
  registerComponent: (component: ReusableComponent) => void;
  updateConfig: (config: ComponentConfig) => void;
  getConfigForComponent: (componentId: string, pageId: string) => ComponentConfig | undefined;
  getComponentUsage: (componentId: string) => string[];  // Returns list of page IDs where component is used
}

// Props for components that use the configuration context
export interface WithConfigProps {
  componentId: string;
  pageId: string;
  children?: ReactNode;
}

// Page definition
export interface Page {
  id: string;
  name: string;
  path: string;
  component: React.ComponentType;
}
