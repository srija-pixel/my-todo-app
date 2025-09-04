import React from 'react';
import { Filter } from '../types';
import FilterControls from './FilterControls';
import { SearchIcon } from './Icons/SearchIcons';

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange, searchQuery, onSearchChange }) => {
  return (
    <div className="flex items-center justify-between">
        <FilterControls filter={filter} onFilterChange={onFilterChange} />
        <div className="relative flex items-center">
            <span className="absolute left-3 text-gray-500 dark:text-gray-400 pointer-events-none">
                <SearchIcon />
            </span>
            <input 
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-48 bg-black/5 dark:bg-white/5 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200"
                aria-label="Search todos"
            />
        </div>
    </div>
  );
};

export default FilterBar;
