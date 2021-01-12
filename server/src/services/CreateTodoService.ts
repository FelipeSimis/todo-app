import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Todo from '../models/Todo';
import User from '../models/User';

import users_view from '../views/users_view';

interface IRequest {
  task: string;
  provider: string;
}

class CreateTodoService {
  public async execute({ task, provider }: IRequest): Promise<Todo> {
    const todoRepository = getRepository(Todo);
    const userRepository = getRepository(User);

    const todoExists = await todoRepository.findOne({
      where: { task, provider },
    });

    const user = await userRepository.findOne(provider);

    if (!user) throw new AppError('User not found');

    if (todoExists) throw new AppError('Todo already exists');

    const todo = todoRepository.create({
      task,
      provider: users_view.render(user),
    });

    await todoRepository.save(todo);

    return todo;
  }
}

export default CreateTodoService;
