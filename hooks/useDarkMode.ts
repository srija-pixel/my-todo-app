
import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useDarkMode(): [boolean, () => void] {
  const [isEnabled, setIsEnabled] = useLocalStorage<boolean>('dark-mode', false);

  useEffect(() => {
    const className = 'dark';
    const body = window.document.documentElement;
    if (isEnabled) {
      body.classList.add(className);
    } else {
      body.classList.remove(className);
    }
  }, [isEnabled]);

  const toggleDarkMode = () => setIsEnabled(prev => !prev);

  return [isEnabled, toggleDarkMode];
}
