import User from '../models/User';

export default {
  render(user: User): Omit<User, 'password' | 'hashPassword'> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      tasks: user.tasks,
    };
  },

  renderMany(users: User[]): Omit<User, 'password' | 'hashPassword'>[] {
    return users.map(user => this.render(user));
  },
};
