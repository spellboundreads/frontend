import { GetAuthorResponse, GetAuthorWorkResponse } from "@/types/api";

import apiClient from "@/lib/apiClient";

export const getAuthor = async (
  authorOlid: string
): Promise<GetAuthorResponse> => {
  const response = await apiClient.get<GetAuthorResponse["data"]>(
    `/authors/${authorOlid}`
  );
  return response;
};

export const getAuthorWorks = async (
  authorOlid: string
): Promise<GetAuthorWorkResponse> => {
  const response = await apiClient.get<GetAuthorWorkResponse["data"]>(
    `/authors/${authorOlid}/works`
  );
  return response;
};
