import React, { useCallback, useEffect, useState } from 'react';
import type { ComponentConfig, ReusableComponent, ConfigElement } from '../types';
import { saveToStorage, loadFromStorage } from '../utils/storage';
import { ConfigContext } from './ConfigContext';
import { generateId } from '../utils/registry';

const STORAGE_KEY = 'rcm_configurations';

interface ConfigProviderProps {
  children: React.ReactNode;
}

// handles upgrading old settings to new format
interface LegacyConfig {
  componentId: string;
  pageId: string;
  elementOrder?: string[];
  additionalElements?: Array<{ id: string; [key: string]: unknown }>;
  disabledElements?: string[];
  headingText?: string;
  headingTexts?: Record<string, string>;
  elements?: ConfigElement[];
}

// check if we need to upgrade this config
const isLegacyConfig = (config: LegacyConfig | ComponentConfig): config is LegacyConfig => {
  return 'elementOrder' in config || 'additionalElements' in config || 'disabledElements' in config || 'headingText' in config;
};

const migrateConfigIfNeeded = (config: LegacyConfig | ComponentConfig): ComponentConfig => {
  // Check if config uses old format
  if (isLegacyConfig(config)) {
    const elements: ConfigElement[] = [];
    
    // First add all base elements from elementOrder (if exists)
    if (Array.isArray(config.elementOrder)) {
      elements.push(
        ...config.elementOrder.map((elementId: string) => ({
          id: `${elementId}-${generateId()}`,
          type: elementId,
          enabled: Array.isArray(config.disabledElements) 
            ? !config.disabledElements.includes(elementId)
            : true
        }))
      );
    }
    
    // Then add all additional elements (if exists)
    if (Array.isArray(config.additionalElements)) {
      elements.push(
        ...config.additionalElements.map((additionalElement: { id: string }) => ({
          id: `${additionalElement.id}-${generateId()}`,
          type: additionalElement.id,
          enabled: true
        }))
      );
    }
    
    // Return new config format
    return {
      componentId: config.componentId,
      pageId: config.pageId,
      elements: elements,
      headingTexts: {
        ...config.headingTexts,
        // If there's an old headingText, assign it to the first heading element
        ...(config.headingText ? { 'heading': config.headingText } : {})
      }
    };
  }
  
  // Already using new format
  return config;
};

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [components, setComponents] = useState<ReusableComponent[]>([]);
  const [configurations, setConfigurations] = useState<ComponentConfig[]>([]);

  // Load configurations from storage on initial mount
  useEffect(() => {
    const savedConfigs = loadFromStorage<(LegacyConfig | ComponentConfig)[]>(STORAGE_KEY);
    if (savedConfigs) {
      // Migrate configurations to new format if needed
      const migratedConfigs = savedConfigs.map(migrateConfigIfNeeded);
      setConfigurations(migratedConfigs);
    }
  }, []);

  // Save configurations when they change
  useEffect(() => {
    if (configurations.length > 0) {
      saveToStorage(STORAGE_KEY, configurations);
    }
  }, [configurations]);

  // Register a new component
  const registerComponent = useCallback((component: ReusableComponent) => {
    console.log('Registering component:', component);
    setComponents(prevComponents => {
      // Check if component already exists
      const exists = prevComponents.some(c => c.id === component.id);
      console.log('Component exists?', exists, 'Current components:', prevComponents);
      if (exists) return prevComponents;
      return [...prevComponents, component];
    });
  }, []);

  // Update or create a component configuration
  const updateConfig = useCallback((config: ComponentConfig) => {
    setConfigurations(prevConfigs => {
      const index = prevConfigs.findIndex(
        c => c.componentId === config.componentId && c.pageId === config.pageId
      );
      
      if (index >= 0) {
        // Update existing config
        const updatedConfigs = [...prevConfigs];
        updatedConfigs[index] = config;
        return updatedConfigs;
      } else {
        // Add new config
        return [...prevConfigs, config];
      }
    });
  }, []);

  // Get configuration for a specific component instance
  const getConfigForComponent = useCallback((componentId: string, pageId: string) => {
    return configurations.find(
      config => config.componentId === componentId && config.pageId === pageId
    );
  }, [configurations]);

  // Get all pages where a component is used
  const getComponentUsage = useCallback((componentId: string) => {
    return configurations
      .filter(config => config.componentId === componentId)
      .map(config => config.pageId);
  }, [configurations]);

  const value = {
    components,
    configurations,
    registerComponent,
    updateConfig,
    getConfigForComponent,
    getComponentUsage,
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};
