import { GetAuthorResponse, GetAuthorWorkResponse } from "@/types/api";

import { serverApiClient } from "@/lib/apiClient.server";

export const getAuthor = async (
  authorOlid: string
): Promise<GetAuthorResponse> => {
  const response = await serverApiClient.get<GetAuthorResponse["data"]>(
    `/authors/${authorOlid}`
  );
  return response;
};

export const getAuthorWorks = async (
  authorOlid: string
): Promise<GetAuthorWorkResponse> => {
  const response = await serverApiClient.get<GetAuthorWorkResponse["data"]>(
    `/authors/${authorOlid}/works`
  );
  return response;
};
