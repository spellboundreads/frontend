import { clientApi } from "@/lib/api";
import { GetWorkResponse } from "@/types/api";
import { WorksReviewsResponse } from "@/types/review";
import { AxiosResponse } from "axios";
import { Work } from "@/types/work";

export const findWorks = async (
  params: Record<string, string | string[] | undefined>,
) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v == null) return;
    if (Array.isArray(v)) v.forEach((i) => sp.append(k, i));
    else sp.append(k, v);
  });

  const { data } = await clientApi.get(`/works?${sp.toString()}`);
  return data;
};

export const getWork = async (id: string): Promise<GetWorkResponse> => {
  const response = await clientApi.get<GetWorkResponse["data"]>(`/works/${id}`);
  return response;
};

export const getImage = (path: string) => {
  return `https://covers.openlibrary.org/b/id/${path}-L.jpg`;
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
      await clientApi.get<GetNewlyAddedWorksResponse["data"]>(
        `/works/newly-added`,
      );
    return response;
  };

export const getMostReviewedWorks =
  async (): Promise<GetMostReviewedWorksResponse> => {
    const response =
      await clientApi.get<GetMostReviewedWorksResponse["data"]>(
        `/works/most-reviewed`,
      );
    return response;
  };

export const getMostShelvedWorks =
  async (): Promise<GetMostShelvedWorksResponse> => {
    const response =
      await clientApi.get<GetMostShelvedWorksResponse["data"]>(
        `/works/most-shelved`,
      );
    return response;
  };
