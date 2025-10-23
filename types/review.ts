import { User } from "@/types/user";
import * as z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  display_name: z.string().nullable(),
  bio: z.string().nullable(),
  avatar_url: z.string().nullable(),
  date_of_birth: z.string().nullable(),
});

export const ReviewSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  work_id: z.string(),
  rating: z.number(),
  review_text: z.string(),
  users: UserSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export type Review = z.infer<typeof ReviewSchema>;

export const CreateReviewPayloadSchema = z.object({
  work_id: z.string(),
  rating: z.number(),
  review_text: z.string().optional(),
});

export type CreateReviewPayload = z.infer<typeof CreateReviewPayloadSchema>;

export const GetReviewByUserWorkResponseSchema = z.object({
  data: ReviewSchema.nullable(),
});

export type GetReviewByUserWorkResponse = z.infer<
  typeof GetReviewByUserWorkResponseSchema
>;

export const UpdateReviewResponseSchema = z.object({
  data: ReviewSchema,
});

export type UpdateReviewResponse = z.infer<typeof UpdateReviewResponseSchema>;

export const WorksReviewsResponseSchema = z.object({
  num_found: z.number,
  reviews: z.array(ReviewSchema),
});

export type WorksReviewsResponse = z.infer<typeof WorksReviewsResponseSchema>;
