import apiClient from "@/lib/apiClient";
import { CreateReviewPayload } from "@/types/review";

export const createReview = async (payload: CreateReviewPayload) => {
  const response = await apiClient.post("/reviews", payload);
  return response;
};
