import React, { useCallback, useEffect, useState } from 'react';
import type { ComponentConfig, ReusableComponent } from '../types';
import { saveToStorage, loadFromStorage } from '../utils/storage';
import { ConfigContext } from './ConfigContext';

const STORAGE_KEY = 'rcm_configurations';

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [components, setComponents] = useState<ReusableComponent[]>([]);
  const [configurations, setConfigurations] = useState<ComponentConfig[]>([]);

  // Load configurations from storage on initial mount
  useEffect(() => {
    const savedConfigs = loadFromStorage<ComponentConfig[]>(STORAGE_KEY);
    if (savedConfigs) {
      setConfigurations(savedConfigs);
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
    setComponents(prevComponents => {
      // Check if component already exists
      const exists = prevComponents.some(c => c.id === component.id);
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
