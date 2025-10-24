import * as z from "zod";

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

export type EditReviewFormState =
  | {
      errors?: {
        review_text?: string[];
        rating?: string[];
      };
      message?: string;
    }
  | undefined;

export const EditReviewFormSchema = z.object({
  review_text: z.string(),
  rating: z.preprocess((val) => Number(val), z.number().min(1).max(5)),
});
