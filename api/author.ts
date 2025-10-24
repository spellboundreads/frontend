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
  limit?: number,
  offset?: number,
): Promise<GetAuthorsWorksResponse> => {
  const query = new URLSearchParams();
  if (limit) query.set("limit", limit.toString());
  if (offset) query.set("offset", offset.toString());
  const response = await serverApiClient.get<GetAuthorsWorksResponse["data"]>(
    `/authors/${authorOlid}/works?${query.toString()}`,
  );
  return response;
};
