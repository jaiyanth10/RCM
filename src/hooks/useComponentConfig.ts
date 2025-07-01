import { useContext } from 'react';
import { ConfigContext } from '../providers/ConfigContext';
import type { ComponentConfig } from '../types';

export const useComponentConfig = (componentId: string, pageId: string) => {
  const context = useContext(ConfigContext);
  
  if (!context) {
    throw new Error('useComponentConfig must be used within a ConfigProvider');
  }
  
  const { getConfigForComponent, updateConfig, components } = context;
  
  // Get the current configuration for this component instance
  const existingConfig = getConfigForComponent(componentId, pageId);
  
  // Create default config if none exists
  const config = existingConfig || {
    componentId,
    pageId,
    disabledElements: [],
    additionalElements: [],
    elementOrder: [], // New field to track element order
    headingText: 'Discussions' // Default heading text
  };
  
  // Register the component usage if it's the first time
  if (!existingConfig) {
    updateConfig(config);
  }
  
  // Get component definition
  const component = components.find(c => c.id === componentId);
  
  // Toggle an element's visibility
  const toggleElement = (elementId: string) => {
    const updatedConfig: ComponentConfig = { ...config };
    
    const isDisabled = config.disabledElements.includes(elementId);
    
    if (isDisabled) {
      // Enable the element
      updatedConfig.disabledElements = config.disabledElements.filter(id => id !== elementId);
    } else {
      // Disable the element
      updatedConfig.disabledElements = [...config.disabledElements, elementId];
    }
    
    updateConfig(updatedConfig);
    return updatedConfig;
  };
  
  // Update heading text
  const updateHeadingText = (text: string) => {
    const updatedConfig: ComponentConfig = {
      ...config,
      headingText: text
    };
    
    updateConfig(updatedConfig);
    return updatedConfig;
  };
  
  // Get heading text
  const getHeadingText = (): string => {
    return config.headingText || 'Discussions';
  };
  
  // Add an additional element, optionally after a specific element
  const addElement = (elementId: string, afterElementId?: string) => {
    if (config.additionalElements.includes(elementId)) return config;
    
    const updatedConfig: ComponentConfig = {
      ...config,
      additionalElements: [...config.additionalElements, elementId]
    };
    
    // If we're tracking element order and a position is specified
    if (afterElementId) {
      // If order is not initialized yet, initialize it with default order
      if (!updatedConfig.elementOrder || updatedConfig.elementOrder.length === 0) {
        updatedConfig.elementOrder = component ? component.elements.map(e => e.id) : [];
      }
      
      // Find the index of the element we want to insert after
      const afterIndex = updatedConfig.elementOrder.indexOf(afterElementId);
      if (afterIndex >= 0) {
        // Insert the new element after the specified element
        const newOrder = [...updatedConfig.elementOrder];
        newOrder.splice(afterIndex + 1, 0, elementId);
        updatedConfig.elementOrder = newOrder;
      } else {
        // If element not found, just add to the end
        updatedConfig.elementOrder.push(elementId);
      }
    }
    
    updateConfig(updatedConfig);
    return updatedConfig;
  };
  
  // Remove an additional element
  const removeElement = (elementId: string) => {
    if (!config.additionalElements.includes(elementId)) return config;

    const updatedConfig: ComponentConfig = {
      ...config,
      additionalElements: config.additionalElements.filter(id => id !== elementId)
    };

    // Only remove from elementOrder if this element is NOT in the default order
    if (updatedConfig.elementOrder && component) {
      const defaultOrder = component.elements.map(e => e.id);
      if (!defaultOrder.includes(elementId)) {
        updatedConfig.elementOrder = updatedConfig.elementOrder.filter(id => id !== elementId);
      }
    }

    updateConfig(updatedConfig);
    return updatedConfig;
  };
  
  // Check if an element is enabled
  const isElementEnabled = (elementId: string) => {
    return !config.disabledElements.includes(elementId);
  };
  
  // Check if an element was added additionally
  const isAdditionalElement = (elementId: string) => {
    return config.additionalElements.includes(elementId);
  };
  
  return {
    config,
    component,
    toggleElement,
    addElement,
    removeElement,
    isElementEnabled,
    isAdditionalElement,
    updateHeadingText,
    getHeadingText
  };
};
