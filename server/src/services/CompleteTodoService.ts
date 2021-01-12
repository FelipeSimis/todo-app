import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Todo from '../models/Todo';

interface IRequest {
  id: string;
  provider: string;
}

class CompleteTodoService {
  public async execute({ id, provider }: IRequest): Promise<Todo> {
    const todoRepository = getRepository(Todo);

    const todo = await todoRepository.findOne({
      where: { id, provider },
    });

    if (!todo) throw new AppError('Todo not found');

    const updatedTodo = await todoRepository.save({
      ...todo,
      completed: !todo.completed,
    });

    return updatedTodo;
  }
}

export default CompleteTodoService;
