import express from 'express';
import SuccessResponse from '../interceptors/toSuccess.js';
import userRoutes from './user.js';
const router = express.Router();

router.get('/', (req, res) => {
  const response = SuccessResponse(200, 'Welcome to the API', {
    message: 'This is the root route',
  });

  res.status(response.meta.statusCode).json(response);
});

router.use('/users', userRoutes);

export default router;
