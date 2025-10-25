import { WorksReviewsResponse } from "@/types/review";
import { serverApi } from "@/lib/api.server";

export const getWorksReviews = async (
  workId: string,
  limit: number,
  offset: number,
): Promise<WorksReviewsResponse> => {
  try {
    const { data } = await serverApi.get<WorksReviewsResponse>(
      `/works/${workId}/reviews?limit=${limit}&offset=${offset}`,
    );
    return data;
  } catch (err) {
    return {
      num_found: 0,
      reviews: [],
    };
  }
};
