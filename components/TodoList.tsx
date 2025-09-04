import React from 'react';
import { Todo, Priority } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id:string) => void;
  onEditTodo: (id: string, text: string) => void;
  onUpdateTodoPriority: (id: string, priority: Priority) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo, onUpdateTodoPriority }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16 px-4 text-gray-600 dark:text-gray-300">
        <p className="text-lg">Your to-do list is empty.</p>
        <p>Try changing your filters or add a new task!</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-white/20 dark:divide-white/10">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
          onEdit={onEditTodo}
          onUpdatePriority={onUpdateTodoPriority}
        />
      ))}
    </ul>
  );
};

export default TodoList;