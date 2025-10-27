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

interface GetNewlyAddedWorksResponse extends AxiosResponse {
  data: Work[];
}

interface GetMostReviewedWorksResponse extends AxiosResponse {
  data: Work[];
}

interface GetMostShelvedWorksResponse extends AxiosResponse {
  data: Work[];
}

export const getNewlyAddedWorks =
  async (): Promise<GetNewlyAddedWorksResponse> => {
    const response =
      await serverApi.get<GetNewlyAddedWorksResponse["data"]>(
        `/works/newly-added`,
      );
    return response;
  };

export const getMostReviewedWorks =
  async (): Promise<GetMostReviewedWorksResponse> => {
    const response =
      await serverApi.get<GetMostReviewedWorksResponse["data"]>(
        `/works/most-reviewed`,
      );
    return response;
  };

export const getMostShelvedWorks =
  async (): Promise<GetMostShelvedWorksResponse> => {
    const response =
      await serverApi.get<GetMostShelvedWorksResponse["data"]>(
        `/works/most-shelved`,
      );
    return response;
  };
