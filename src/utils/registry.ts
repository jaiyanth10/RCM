import { v4 as uuidv4 } from 'uuid';
import type { ReusableComponent, ComponentElement } from '../types';

// Generate unique ID for components and elements
export const generateId = (): string => uuidv4();

// Helper to create a component element definition
export const createComponentElement = (
  name: string,
  component: React.ComponentType,
  isOptional = false
): ComponentElement => ({
  id: generateId(),
  name,
  component,
  isOptional
});

// Helper to create a component definition
export const createComponent = (
  name: string,
  description: string,
  component: React.ComponentType,
  elements: ComponentElement[]
): ReusableComponent => ({
  id: generateId(),
  name,
  description,
  component,
  elements
});
