import { serverApiClient } from "@/lib/apiClient.server";
import {
  CreateReviewPayload,
  GetReviewByUserWorkResponse,
  UpdateReviewResponse,
} from "@/types/review";

export const createReview = async (payload: CreateReviewPayload) => {
  const response = await serverApiClient.post("/reviews", payload);
  return response;
};

export const getReviewByUserWork = async (
  workId: string,
  userId: string
): Promise<GetReviewByUserWorkResponse> => {
  try {
    const response = await serverApiClient.get<
      GetReviewByUserWorkResponse["data"]
    >(`/reviews/by-user-work/${userId}/${workId}`);
    return response;
  } catch (err) {
    console.log(err);
    return { data: null };
  }
};

export const updateReview = async (
  reviewId: string,
  reviewText: string,
  rating: number
): Promise<UpdateReviewResponse> => {
  const response = await serverApiClient.patch<UpdateReviewResponse["data"]>(
    `/reviews/${reviewId}`,
    {
      review_text: reviewText,
      rating,
    }
  );
  return response;
};
