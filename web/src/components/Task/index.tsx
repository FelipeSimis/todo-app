import React, { memo } from 'react';
import { CSSProperties } from 'styled-components';

import { FiCheck, FiTrash } from 'react-icons/fi';

import { useTodo } from '../../hooks/todo';

import { Container } from './styles';

interface Props {
  id: string;
  completed: boolean;
  task: string;
  transition: CSSProperties;
}

const Task: React.FC<Props> = ({ id, completed, task, transition }) => {
  const { handleCompleteTodo, handleDeleteTodo } = useTodo();

  return (
    <Container className={completed ? 'completed' : ''} style={transition}>
      <span>{task}</span>

      <div>
        <button type="button" onClick={() => handleCompleteTodo(id)}>
          <FiCheck />
        </button>

        <button type="button" onClick={() => handleDeleteTodo(id)}>
          <FiTrash />
        </button>
      </div>
    </Container>
  );
};

export default memo(Task);
