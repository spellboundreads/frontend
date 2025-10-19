import { GetAuthorResponse } from "@/types/api";
import apiClient from "@/lib/apiClient";

export const getAuthor = async (
  authorOlid: string
): Promise<GetAuthorResponse> => {
  const response = await apiClient.get<GetAuthorResponse["data"]>(
    `/authors/${authorOlid}`
  );
  return response;
};
