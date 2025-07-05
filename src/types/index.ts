import type { ReactNode } from 'react';

// sub-component building block 
export interface ComponentElement {
  id: string;
  name: string;
  component: React.ComponentType;
  isOptional: boolean;
}

// complete reusable component with its sub-components
export interface ReusableComponent {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  elements: ComponentElement[];
}

export interface ConfigElement {
  id: string;
  type: string;     
  enabled: boolean; 
  value?: string;   // stores custom text for things like headings
}

// how a component is set up on a specific page
export interface ComponentConfig {
  componentId: string;
  pageId: string;
  elements: ConfigElement[];  // list of enabled/disabled parts
  headingTexts?: Record<string, string>;  // custom heading text
}

// all the tools for managing components
export interface ConfigContextType {
  components: ReusableComponent[];
  configurations: ComponentConfig[];
  registerComponent: (component: ReusableComponent) => void;
  updateConfig: (config: ComponentConfig) => void;
  getConfigForComponent: (componentId: string, pageId: string) => ComponentConfig | undefined;
  getComponentUsage: (componentId: string) => string[];  // where is this component used
}

// props needed to configure a component
export interface WithConfigProps {
  componentId: string;
  pageId: string;
  children?: ReactNode;
}

// basic page info
export interface Page {
  id: string;
  name: string;
  path: string;
  component: React.ComponentType;
}
