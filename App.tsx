import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import FilterBar from './components/FilterBar';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo, Filter, Priority } from './types';

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [searchQuery, setSearchQuery] = useState('');

  const addTodo = (text: string, priority: Priority) => {
    const newTodo: Todo = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      completed: false,
      priority,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };
  
  const updateTodoPriority = (id: string, priority: Priority) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };
  
  const filteredTodos = useMemo(() => {
    const priorityOrder = { [Priority.HIGH]: 1, [Priority.MEDIUM]: 2, [Priority.LOW]: 3 };

    return todos
      .filter((todo) => {
        const matchesFilter =
          filter === Filter.ALL ||
          (filter === Filter.ACTIVE && !todo.completed) ||
          (filter === Filter.COMPLETED && todo.completed);
        
        const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
      })
      .sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }, [todos, filter, searchQuery]);

  const activeCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);
  const hasCompleted = useMemo(() => todos.some((todo) => todo.completed), [todos]);

  return (
    <div className="min-h-screen font-sans">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2592&auto=format&fit=crop')] dark:hidden"></div>
        <div className="absolute inset-0 w-full h-full bg-cover bg-center hidden dark:block bg-[url('https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=2592&auto=format&fit=crop')]"></div>
      </div>
      
      <div className="relative container mx-auto px-6 py-12 md:py-20 max-w-2xl">
        <Header />

        <main className="mt-8">
          <div className="rounded-md shadow-2xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-md">
            <TodoInput onAddTodo={addTodo} />
            <TodoList
              todos={filteredTodos}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
              onEditTodo={editTodo}
              onUpdateTodoPriority={updateTodoPriority}
            />
            <Footer
              activeCount={activeCount}
              onClearCompleted={clearCompleted}
              hasCompleted={hasCompleted}
            />
          </div>

          <div className="mt-6 rounded-md shadow-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-4">
             <FilterBar 
                filter={filter}
                onFilterChange={setFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
             />
          </div>
        </main>
        
        <p className="text-center text-sm text-gray-200 dark:text-gray-300 mt-12" style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)' }}>
          Double-click to edit a todo.
        </p>
      </div>
    </div>
  );
};

export default App;
