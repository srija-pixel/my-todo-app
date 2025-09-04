import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { SunIcon, MoonIcon } from './Icons/ThemeIcons';

const Header: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  return (
    <header className="flex justify-between items-center">
      <h1 
        className="text-4xl font-bold tracking-widest uppercase text-white"
        style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}
      >
        Todo
      </h1>
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        className="text-white hover:text-yellow-300 dark:hover:text-indigo-300 transition-colors duration-300"
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
};

export default Header;