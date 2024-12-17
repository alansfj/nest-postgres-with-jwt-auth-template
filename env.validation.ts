import { z, ZodError } from 'zod';

export function validate(config: Record<string, any>) {
  try {
    return configSchema.parse(config);
  } catch (error) {
    let message = '';

    if (error instanceof ZodError) {
      const issue = error.issues[0];
      message = `${issue.path[0]} - ${issue.message}`;
    } else {
      message = 'Something went wrong.';
    }

    throw new Error(`Error on validating enviroment variables: ${message}`);
  }
}

const configSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, { message: 'PORT must be a number' })
    .transform((val) => Number(val))
    .refine((port) => port >= 1 && port <= 65535, {
      message: 'PORT must be greater than 1 and less than 65535',
    }),
});
