import React, { useState, useEffect, useRef } from 'react';
import { Todo, Priority } from '../types';
import { DeleteIcon } from './Icons/DeleteIcons.tsx';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onUpdatePriority: (id: string, priority: Priority) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit, onUpdatePriority }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
    } else {
      // Revert if empty instead of deleting. Deletion should be explicit.
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  
  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  const getPriorityClasses = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH: return { border: 'border-red-500', text: 'text-red-500' };
      case Priority.MEDIUM: return { border: 'border-yellow-500', text: 'text-yellow-500' };
      case Priority.LOW: return { border: 'border-blue-500', text: 'text-blue-500' };
      default: return { border: 'border-gray-400', text: 'text-gray-400' };
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onUpdatePriority(todo.id, e.target.value as Priority);
  }

  const priorityClasses = getPriorityClasses(todo.priority);

  return (
    <li className="group flex items-center p-4 transition-colors duration-200 ease-in-out hover:bg-black/5 dark:hover:bg-white/5">
      <div className="flex-grow flex items-center">
        <div 
          className={`relative w-6 h-6 rounded-full border-2 ${priorityClasses.border} flex-shrink-0 mr-4 cursor-pointer flex items-center justify-center transition-all duration-300 ${todo.completed ? 'bg-green-500/20 border-green-500' : ''}`}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed && (
            <svg className="w-4 h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        
        <div className="flex-grow">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent focus:outline-none text-lg text-gray-800 dark:text-gray-200"
            />
          ) : (
            <p
              onDoubleClick={handleDoubleClick}
              className={`cursor-pointer text-lg ${
                todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              {todo.text}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <select 
          value={todo.priority} 
          onChange={handlePriorityChange}
          className={`bg-transparent rounded-md p-1 border-none focus:outline-none focus:ring-0 text-sm opacity-0 group-hover:opacity-100 transition-opacity appearance-none font-semibold ${priorityClasses.text}`}
          aria-label="Change priority"
        >
            <option className="text-gray-800" value={Priority.LOW}>Low</option>
            <option className="text-gray-800" value={Priority.MEDIUM}>Medium</option>
            <option className="text-gray-800" value={Priority.HIGH}>High</option>
        </select>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Delete todo"
        >
          <DeleteIcon />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
