import React from 'react';

interface FooterProps {
  activeCount: number;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

const Footer: React.FC<FooterProps> = ({ activeCount, onClearCompleted, hasCompleted }) => {
  return (
    <div className="flex items-center justify-between p-4 text-sm text-gray-500 dark:text-gray-400 border-t border-white/20 dark:border-white/10">
      <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
      <button
        onClick={onClearCompleted}
        className={`hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200 ${
          !hasCompleted ? 'opacity-0 cursor-default' : 'opacity-100'
        }`}
        disabled={!hasCompleted}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default Footer;