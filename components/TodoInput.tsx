import React, { useState } from 'react';
import { Priority } from '../types';

interface TodoInputProps {
  onAddTodo: (text: string, priority: Priority) => void;
}

const PriorityButton: React.FC<{
  priority: Priority;
  currentPriority: Priority;
  onClick: (priority: Priority) => void;
  label: string;
  colorClass: string;
}> = ({ priority, currentPriority, onClick, label, colorClass }) => {
  const isActive = currentPriority === priority;
  return (
    <button
      type="button"
      onClick={() => onClick(priority)}
      className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
        isActive
          ? `${colorClass} text-white shadow-lg`
          : 'bg-black/10 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-black/20 dark:hover:bg-white/20'
      }`}
    >
      {label}
    </button>
  );
};

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAddTodo(trimmedText, priority);
      setText('');
      setPriority(Priority.MEDIUM);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-white/20 dark:border-white/10">
      <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-md px-4 py-3">
        <div className="w-6 h-6 border-2 border-gray-400/50 dark:border-gray-500/50 rounded-full mr-4 flex-shrink-0"></div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Create a new todo..."
          className="w-full bg-transparent focus:outline-none text-lg text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
      </div>
      <div className="flex items-center justify-end mt-3 space-x-2">
         <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Priority:</span>
         <PriorityButton priority={Priority.LOW} currentPriority={priority} onClick={setPriority} label="Low" colorClass="bg-blue-500" />
         <PriorityButton priority={Priority.MEDIUM} currentPriority={priority} onClick={setPriority} label="Medium" colorClass="bg-yellow-500" />
         <PriorityButton priority={Priority.HIGH} currentPriority={priority} onClick={setPriority} label="High" colorClass="bg-red-500" />
      </div>
    </form>
  );
};

export default TodoInput;