import { useCallback, useMemo, useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = getStorage(key);
    return item === undefined ? initialValue : item;
  });

  const setValue = useCallback(value => {
    if (typeof value === 'function') {
      setStoredValue(initialValue => {
        const newValue = value(initialValue);
        updateStorage(key, newValue);
        return newValue;
      });
    } else {
      updateStorage(key, value);
      setStoredValue(value);
    }
  }, [key]);

  return useMemo(() => [storedValue, setValue], [setValue, storedValue]);
}

export default useLocalStorage;

const getStorage = key => {
  try {
    const length = window.localStorage.length;
    let item = undefined;
    for (let i = 0; i < length && item === undefined; i++) {
      if (window.localStorage.key(i) === key) {
        item = window.localStorage.getItem(key);
      }
    }
    return typeof item === 'string' ? JSON.parse(item) : item;
  } catch (error) {
    console.error(`useLocalStorage can't access localStorage for "${key}"`, error);
  }
};

const updateStorage = (key, newValue) => {
  try {
    if (newValue === undefined) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }
  } catch (error) {}
};
