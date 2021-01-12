import { Request, Response } from 'express';

import Todo from '../models/Todo';

import CreateTodoService from '../services/CreateTodoService';
import CompleteTodoService from '../services/CompleteTodoService';
import DeleteTodoService from '../services/DeleteTodoService';
import ListTodoService from '../services/ListTodoService';

export default {
  async create(request: Request, response: Response): Promise<Response<Todo>> {
    const { task } = request.body;
    const { id } = request.user;

    const createTodo = new CreateTodoService();

    const todo = await createTodo.execute({
      task,
      provider: id,
    });

    return response.status(201).json(todo);
  },

  async complete(
    request: Request,
    response: Response
  ): Promise<Response<Todo>> {
    const { id } = request.params;
    const { id: provider } = request.user;

    const completeTodo = new CompleteTodoService();

    const todo = await completeTodo.execute({
      id,
      provider,
    });

    return response.status(200).json(todo);
  },

  async delete(
    request: Request,
    response: Response
  ): Promise<Response<string>> {
    const { id } = request.params;
    const { id: provider } = request.user;

    const deleteTodo = new DeleteTodoService();

    await deleteTodo.execute({
      id,
      provider,
    });

    return response.status(200).json({ message: 'Todo deleted successfully' });
  },

  async index(request: Request, response: Response): Promise<Response<Todo>> {
    const { id } = request.user;

    const listTodo = new ListTodoService();

    const todos = await listTodo.execute({
      provider: id,
    });

    return response.status(200).json(todos);
  },
};
