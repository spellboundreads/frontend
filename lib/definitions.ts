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

export type CreateReviewFormState =
  | {
      errors?: {
        review_text: string[];
        rating: string[];
        work_id: string[];
      };
      message?: string;
    }
  | undefined;

export const CreateReviewFormSchema = z.object({
  work_id: z.string(),
  review_text: z.string(),
  rating: z.preprocess((val) => Number(val), z.number().min(1).max(5)),
});
