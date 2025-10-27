import { WorksReviewsResponse } from "@/types/review";
import { serverApi } from "@/lib/api.server";
import { AxiosResponse } from "axios";
import { Work } from "@/types/work";

export const getWorksReviews = async (
  workId: string,
  limit: number,
  offset: number,
): Promise<WorksReviewsResponse> => {
  const response = await serverApi.get<WorksReviewsResponse["data"]>(
    `/works/${workId}/reviews?limit=${limit}&offset=${offset}`,
  );
  return response;
};