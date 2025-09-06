import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters long')
    .max(40, 'Username must be at most 40 characters long'),

  email: z.string().email().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 character long')
    .max(40, 'Password must be at most 40 character')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});
