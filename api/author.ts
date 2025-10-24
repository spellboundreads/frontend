import { serverApiClient } from "@/lib/apiClient.server";
import { GetAuthorsWorksResponse } from "@/types/api";
import { GetAuthorResponse } from "@/types/api";

export const getAuthor = async (
  authorOlid: string,
): Promise<GetAuthorResponse> => {
  const response = await serverApiClient.get<GetAuthorResponse["data"]>(
    `/authors/${authorOlid}`,
  );
  return response;
};

export const getAuthorWorks = async (
  authorOlid: string,
): Promise<GetAuthorsWorksResponse> => {
  const response = await serverApiClient.get<GetAuthorsWorksResponse["data"]>(
    `/authors/${authorOlid}/works`,
  );
  return response;
};
