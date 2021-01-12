import { getRepository } from 'typeorm';

import Todo from '../models/Todo';

interface IRequest {
  provider: string;
}

class ListTodoService {
  public async execute({ provider }: IRequest): Promise<Todo[]> {
    const todoRepository = getRepository(Todo);

    const todos = await todoRepository.find({
      where: { provider },
      order: { createdAt: -1 },
    });

    return todos;
  }
}

export default ListTodoService;
