import { z } from 'zod';

export const createUserSchema = {
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  }),
};

export const getUserSchema = {
  params: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),
};
