import apiClient from "@/lib/apiClient";
import {
  CreateReviewPayload,
  GetReviewByUserWorkResponse,
  Review,
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
