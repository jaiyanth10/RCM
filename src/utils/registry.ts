import { v4 as uuidv4 } from 'uuid';
import type { ReusableComponent, ComponentElement } from '../types';

// makes unique ids
export const generateId = (): string => uuidv4();

// creates a new building block for components
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

// puts together a complete reusable component
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
