import { createContext } from 'react';
import type { ConfigContextType } from '../types';

// shared space for component settings
export const ConfigContext = createContext<ConfigContextType>({
  components: [],
  configurations: [],
  registerComponent: () => {},
  updateConfig: () => {},
  getConfigForComponent: () => undefined,
  getComponentUsage: () => [],
});
