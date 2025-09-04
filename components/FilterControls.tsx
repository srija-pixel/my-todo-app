
import React from 'react';
import { Filter } from '../types';

interface FilterControlsProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FilterButton: React.FC<{
    currentFilter: Filter;
    targetFilter: Filter;
    onClick: (filter: Filter) => void;
    children: React.ReactNode;
}> = ({ currentFilter, targetFilter, onClick, children }) => {
    const isActive = currentFilter === targetFilter;
    return (
        <button
            onClick={() => onClick(targetFilter)}
            className={`font-bold transition-colors duration-200 ${
                isActive ? 'text-indigo-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
        >
            {children}
        </button>
    );
}

const FilterControls: React.FC<FilterControlsProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <FilterButton currentFilter={filter} targetFilter={Filter.ALL} onClick={onFilterChange}>
        All
      </FilterButton>
      <FilterButton currentFilter={filter} targetFilter={Filter.ACTIVE} onClick={onFilterChange}>
        Active
      </FilterButton>
      <FilterButton currentFilter={filter} targetFilter={Filter.COMPLETED} onClick={onFilterChange}>
        Completed
      </FilterButton>
    </div>
  );
};

export default FilterControls;
