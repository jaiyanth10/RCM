// browser storage helper functions
export const saveToStorage = <T,>(key: string, data: T): void => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('Error saving to local storage:', error);
  }
};
export const loadFromStorage = <T,>(key: string): T | null => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return null;
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error('Error loading from local storage:', error);
    return null;
  }
};
