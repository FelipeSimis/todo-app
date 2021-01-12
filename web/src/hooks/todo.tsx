import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '../services';

import { useAuth } from './auth';

interface Todo {
  id: string;
  completed: boolean;
  task: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TodoContextData {
  loading: boolean;
  filteredTodos: Todo[];
  handleAddTodo: (taskName: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleCompleteTodo: (id: string) => void;
  handleFilterTodo: (type: string) => void;
}

const TodoContext = createContext<TodoContextData>({} as TodoContextData);

const TodoProvider: React.FC = memo(({ children }) => {
  const { token } = useAuth();

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAddTodo = useCallback(
    async (taskName: string) => {
      if (!taskName) return;

      const { data } = await api.post(
        '/todos',
        {
          task: taskName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTodoList(state => [...state, data]);
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      setLoading(true);

      setTimeout(() => {
        api
          .get('/todos', { headers: { Authorization: `Bearer ${token}` } })
          .then(({ data }) => {
            setTodoList(data);

            setLoading(false);
          });
      }, 1000);
    } else {
      setTodoList([]);
      setFilteredTodos([]);
    }
  }, [token]);

  const handleDeleteTodo = useCallback(
    async (id: string) => {
      await api.delete(`/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodoList(state => state.filter(todo => todo.id !== id));
    },
    [token]
  );

  const handleCompleteTodo = useCallback(
    async (id: string) => {
      api.patch(
        `/todos/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodoList(state =>
        state.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        })
      );
    },
    [token]
  );

  const handleFilterTodo = useCallback(
    (type: string) => {
      switch (type) {
        case 'checked':
          setFilteredTodos(todoList.filter(todo => todo.completed));
          break;
        case 'pending':
          setFilteredTodos(todoList.filter(todo => !todo.completed));
          break;
        default:
          setFilteredTodos(todoList);
      }
    },
    [todoList]
  );

  return (
    <TodoContext.Provider
      value={{
        loading,
        filteredTodos,
        handleAddTodo,
        handleDeleteTodo,
        handleCompleteTodo,
        handleFilterTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
});

function useTodo(): TodoContextData {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }

  return context;
}

export { TodoProvider, useTodo };
