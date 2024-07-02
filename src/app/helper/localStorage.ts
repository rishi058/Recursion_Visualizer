import { useState, useEffect } from 'react';

// const [value, setValue] = useLocalStorageState('key', 'deafault_value');
export default function useLocalStorageState(key: string, defaultValue: string): [string, (value: string) => void] {
  const [state, setState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue === null || storedValue === undefined) {
        return defaultValue;
      }
      return storedValue || defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, state);
    }
  }, [key, state]);

  return [state, setState];
}