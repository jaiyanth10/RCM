import { createContext } from 'react';
import type { ConfigContextType } from '../types';

// Create context with default values
export const ConfigContext = createContext<ConfigContextType>({
  components: [],
  configurations: [],
  registerComponent: () => {},
  updateConfig: () => {},
  getConfigForComponent: () => undefined,
  getComponentUsage: () => [],
});
