import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string(),
});

export const RegisterFormSchema = z.object({
  username: z.string().trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string(),
});

export type RegisterFormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
