import apiClient from "@/lib/apiClient";
import {
  CreateReviewPayload,
  GetReviewByUserWorkResponse,
  UpdateReviewResponse,
} from "@/types/review";

export const createReview = async (payload: CreateReviewPayload) => {
  const response = await apiClient.post("/reviews", payload);
  return response;
};

export const getReviewByUserWork = async (
  workId: string,
  userId: string
): Promise<GetReviewByUserWorkResponse> => {
  const response = await apiClient.get<GetReviewByUserWorkResponse["data"]>(
    `/reviews/by-user-work/${userId}/${workId}`
  );
  return response;
};

export const updateReview = async (
  reviewId: string,
  reviewText: string,
  rating: number
): Promise<UpdateReviewResponse> => {
  const response = await apiClient.patch<UpdateReviewResponse["data"]>(
    `/reviews/${reviewId}`,
    {
      review_text: reviewText,
      rating,
    }
  );
  return response;
};
