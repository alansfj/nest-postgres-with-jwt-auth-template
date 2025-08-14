import { z } from 'zod';
import { createUserSchema } from 'src/common/schemas/create-user.schema';

export type CreateUserDtoInput = Required<z.infer<typeof createUserSchema>>;
