import { ErrorHandler } from '../filters/error.js';
import { UserRepository } from '../repositories/user.js';

export class UserService {
  static async getUsers() {
    const users = await UserRepository.getUsers();
    return users;
  }

  static async getUserById(id) {
    const user = await UserRepository.getUserById(id);
    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }

    return user;
  }
}
