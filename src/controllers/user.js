import { UserService } from '../services/user.js';
import SuccessResponse from '../interceptors/toSuccess.js';
import ErrorResponse from '../interceptors/toError.js';

export class UserController {
  static async getUsers(req, res, next) {
    try {
      const users = await UserService.getUsers();
      const response = SuccessResponse(
        200,
        'Users retrieved successfully',
        users
      );
      res.status(response.meta.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      const response = SuccessResponse(
        200,
        'User retrieved successfully',
        user
      );
      res.status(response.meta.statusCode).json(response);
    } catch (error) {
      next(error);
    }
  }
}
