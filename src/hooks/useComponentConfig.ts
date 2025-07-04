import { useContext, useEffect, useState } from 'react';
import { ConfigContext } from '../providers/ConfigContext';
import type { ConfigElement } from '../types';

export const useComponentConfig = (componentId: string, pageId: string) => {
  const context = useContext(ConfigContext);
  const [initialized, setInitialized] = useState(false);
  
  if (!context) {
    throw new Error('useComponentConfig must be used within a ConfigProvider');
  }
  
  const { getConfigForComponent, updateConfig, components } = context;
  
  // Get component definition
  const component = components.find(c => c.id === componentId);
  
  // Get the current configuration for this component instance
  const existingConfig = getConfigForComponent(componentId, pageId);
  
  useEffect(() => {
    // Only create initial config if we have the component and haven't initialized yet
    if (component && !initialized && !existingConfig) {
      const initialConfig = {
        componentId,
        pageId,
        elements: [
          // Add all base elements
          ...component.elements.map(element => ({
            id: element.id,          // Use base ID for default elements
            type: element.id,
            enabled: !element.isOptional, // Optional elements start disabled
            value: element.id === 'heading' ? 'Discussions' : undefined // Default value for headings
          }))
        ]
      };
      
      updateConfig(initialConfig);
      setInitialized(true);
    }
  }, [component, initialized, existingConfig, componentId, pageId, updateConfig]);

  // If we don't have the component definition yet, return a loading state
  if (!component) {
    return {
      config: null,
      component: null,
      toggleElement: () => {},
      addElement: () => {},
      removeElement: () => {},
      isElementEnabled: () => false,
      isRemovableElement: () => false,
      getElementsToRender: () => [],
      updateHeadingText: () => {},
      getHeadingText: () => 'Discussions'
    };
  }

  // Use existing config or wait for initialization
  const config = existingConfig || {
    componentId,
    pageId,
    elements: [] as ConfigElement[],
    headingText: 'Discussions'
  };
  
  // Toggle an element's visibility
  const toggleElement = (elementId: string) => {
    const updatedConfig = { ...config };
    
    // Find the element and toggle its enabled state
    const element = updatedConfig.elements.find(el => el.id === elementId);
    if (element) {
      element.enabled = !element.enabled;
    }
    
    updateConfig(updatedConfig);
    return updatedConfig;
  };
  
  // Update heading text for a specific element
  const updateHeadingText = (elementId: string, text: string) => {
    const updatedConfig = { ...config };
    const element = updatedConfig.elements.find(el => el.id === elementId);
    if (element) {
      element.value = text;
    }
    updateConfig(updatedConfig);
    return updatedConfig;
  };
  
  // Get heading text for a specific element
  const getHeadingText = (elementId: string): string => {
    const element = config.elements.find(el => el.id === elementId);
    return element?.value || 'Discussions';
  };
  
  // Add an element after a specific position
  const addElement = (elementType: string, afterElementId: string) => {
    const updatedConfig = { ...config };
    
    // Find the base element to get its properties
    const baseElement = component?.elements.find(e => e.id === elementType);
    if (!baseElement) return config;
    
    // Create a unique ID for the new element
    // Count existing elements of this type to generate the index
    const existingCount = updatedConfig.elements.filter(el => el.type === elementType).length;
    const newId = existingCount === 0 ? elementType : `${elementType}-${existingCount}`;
    
    // Create the new element
    const newElement: ConfigElement = {
      id: newId,
      type: elementType,
      enabled: true,
      value: elementType === 'heading' ? 'Discussions' : undefined
    };
    
    // Find the position to insert the new element
    const insertIndex = updatedConfig.elements.findIndex(el => el.id === afterElementId);
    
    if (insertIndex >= 0) {
      // Insert after the specified element
      updatedConfig.elements.splice(insertIndex + 1, 0, newElement);
    } else {
      // Add to the end if the specified element wasn't found
      updatedConfig.elements.push(newElement);
    }
    
    updateConfig(updatedConfig);
    return updatedConfig;
  };
  
  // Remove an element
  const removeElement = (elementId: string) => {
    // Don't allow removing the last instance of an element type
    const elementType = elementId.includes('-') 
      ? elementId.split('-')[0]
      : elementId;
      
    const elementsOfType = config.elements.filter(el => el.type === elementType);
    if (elementsOfType.length <= 1) return config;
    
    // Remove the element with the specified ID
    const updatedConfig = {
      ...config,
      elements: config.elements.filter(el => el.id !== elementId)
    };
    
    updateConfig(updatedConfig);
    return updatedConfig;
  };
  
  // Check if an element is enabled
  const isElementEnabled = (elementId: string) => {
    const element = config.elements.find(el => el.id === elementId);
    return element?.enabled || false;
  };
  
  // Get a list of all elements to render in order
  const getElementsToRender = () => {
    return config.elements.map(el => el.id);
  };
  
  // Check if an element can be removed (is a duplicate)
  const isRemovableElement = (elementId: string) => {
    const elementType = elementId.includes('-') 
      ? elementId.split('-')[0]
      : elementId;
      
    const elementsOfType = config.elements.filter(el => el.type === elementType);
    return elementsOfType.length > 1;
  };
  
  return {
    config,
    component,
    toggleElement,
    addElement,
    removeElement,
    isElementEnabled,
    isRemovableElement,
    getElementsToRender,
    updateHeadingText,
    getHeadingText
  };
};
