import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(32, "Username must be at most 32 characters long"),
  password: z
    .string()
    .regex(
      `/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/`,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  display_name: z.string().min(2).max(32),
});

export const LoginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string(),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
export type LoginFormData = z.infer<typeof LoginFormSchema>;
