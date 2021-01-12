import { Request, Response } from 'express';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

import users_view from '../views/users_view';

export default {
  async create(request: Request, response: Response): Promise<Response<User>> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(users_view.render(user));
  },

  async index(request: Request, response: Response): Promise<Response<User>> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.status(200).json(users_view.renderMany(users));
  },
};
