import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Todo from '../models/Todo';

interface IRequest {
  id: string;
  provider: string;
}

class DeleteTodoService {
  public async execute({ id, provider }: IRequest): Promise<void> {
    const todoRepository = getRepository(Todo);

    const todo = await todoRepository.findOne({
      where: { id, provider },
    });

    if (!todo) throw new AppError('Todo not found');

    await todoRepository.delete(id);
  }
}

export default DeleteTodoService;
