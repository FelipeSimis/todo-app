import { Request, Response } from 'express';

import User from '../models/User';

import AuthenticateUserService from '../services/AuthenticateUserService';

import users_view from '../views/users_view';

export default {
  async authenticate(
    request: Request,
    response: Response
  ): Promise<Response<User>> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(200).json({ user: users_view.render(user), token });
  },
};
