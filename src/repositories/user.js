import prisma from '../config/database.js';

export class UserRepository {
  static async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  static async getUserById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
}
