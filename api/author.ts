import { clientApi } from "@/lib/api";
import { GetAuthorsWorksResponse } from "@/types/api";
import { GetAuthorResponse } from "@/types/api";

export const getAuthor = async (
  authorOlid: string,
): Promise<GetAuthorResponse> => {
  const response = await clientApi.get<GetAuthorResponse["data"]>(
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
  if (limit !== undefined) query.set("limit", limit.toString());
  if (offset !== undefined) query.set("offset", offset.toString());
  const response = await clientApi.get<GetAuthorsWorksResponse["data"]>(
    `/authors/${authorOlid}/works?${query.toString()}`,
  );
  return response;
};
