import express from 'express';
import { UserController } from '../controllers/user.js';
import { getUserSchema } from '../schemas/user.js';
import validateRequest from '../middlewares/validationRequest.js';

const router = express.Router();

router.get('/', UserController.getUsers);
router.get('/:id', validateRequest(getUserSchema), UserController.getUserById);

export default router;
