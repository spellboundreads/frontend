import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]{3,16}$/,
      "Username must be between 3 and 16 characters long and can only contain letters, numbers, underscores, and hyphens",
    ),
  password: z
    .string()
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  display_name: z
    .string()
    .min(2, "Display name must be at least 2 characters long")
    .max(32, "Display name must be at most 32 characters long"),
});

export const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string(),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
export type LoginFormData = z.infer<typeof LoginFormSchema>;
