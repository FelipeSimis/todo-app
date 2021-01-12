import { getRepository } from 'typeorm';

import User from '../models/User';

import AppError from '../errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if (userExists) throw new AppError('Email address already in use.');

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
