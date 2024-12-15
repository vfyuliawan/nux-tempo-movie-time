import { ref, watch } from 'vue';

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const storedValue = ref<T>(defaultValue); // Initialize with default value
  
  if (process.client) {
    try {
      const item = localStorage.getItem(key);
      storedValue.value = item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      storedValue.value = defaultValue; // Fallback to default value if there's an error
    }
  }

  // Watch the stored value and sync with localStorage
  watch(storedValue, (newValue) => {
    if (process.client) {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Error writing to localStorage for key "${key}":`, error);
      }
    }
  });

  return storedValue;
};

export const getLocalStorage = <T>(key: string): T | null => {
  if (process.client) {
    try {
      const storedItem = localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : null;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return null; // Return null if there is an error
    }
  }
  return null; // Return null for server-side rendering
};
