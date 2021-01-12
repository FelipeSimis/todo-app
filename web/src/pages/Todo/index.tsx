import React, { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTransition } from 'react-spring';
import { Form } from '@unform/web';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { FiChevronDown, FiLogOut } from 'react-icons/fi';

import { useTodo } from '../../hooks/todo';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Input, Task } from '../../components';

import { Container, Header, Wrapper, Select, Tasks } from './styles';

export interface Todo {
  id: string;
  completed: boolean;
  task: string;
}

const Todo: React.FC = () => {
  const [status, setStatus] = useState('');

  const { user, signOut } = useAuth();
  const { addToast } = useToast();
  const { loading, filteredTodos, handleAddTodo, handleFilterTodo } = useTodo();

  const todoWithTransition = useTransition(filteredTodos, todo => todo.id, {
    from: { opacity: 0, transform: 'translateX(-100%)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateX(105%)' },
  });

  useEffect(() => {
    handleFilterTodo(status);
  }, [handleFilterTodo, status]);

  const handleSubmit = useCallback(
    ({ task }, { reset }) => {
      if (!task) {
        addToast({
          type: 'error',
          title: 'An error occurred',
          description: 'Cannot add an empty task',
        });
      }

      handleAddTodo(task);

      reset();
    },
    [addToast, handleAddTodo]
  );

  return (
    <Container>
      <Header>
        <h3>Hello, {user.name}</h3>

        <Link to="/" onClick={signOut}>
          Logout
          <FiLogOut />
        </Link>
      </Header>

      <Wrapper>
        <h2>To-do List</h2>

        <Form onSubmit={handleSubmit}>
          <Input type="text" name="task" placeholder="Write your tasks here" />

          <Select>
            <select onChange={e => setStatus(e.target.value)}>
              <option value="all">All</option>
              <option value="checked">Completed</option>
              <option value="pending">Pending</option>
            </select>

            <FiChevronDown />
          </Select>
        </Form>

        <Tasks>
          {loading && (
            <Loader
              type="Rings"
              width={80}
              height={80}
              timeout={2000}
              color="#ff6f47"
            />
          )}

          <ul>
            {todoWithTransition.map(({ item, key, props }) => (
              <Task
                key={key}
                id={item.id}
                completed={item.completed}
                task={item.task}
                transition={props}
              />
            ))}
          </ul>
        </Tasks>
      </Wrapper>
    </Container>
  );
};

export default memo(Todo);
