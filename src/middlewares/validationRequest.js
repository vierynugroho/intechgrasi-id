import { ZodError } from 'zod';
import ErrorResponse from '../interceptors/toError.js';
const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      if (schema.body) req.body = schema.body.parse(req.body);
      if (schema.query) req.query = schema.query.parse(req.query);
      if (schema.params) req.params = schema.params.parse(req.params);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorResponse = ErrorResponse(
          400,
          'Validation error',
          error.errors
        );

        return res.status(400).json(errorResponse);
      }
      next(error);
    }
  };
};

export default validateRequest;
