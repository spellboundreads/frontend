import apiClient from "@/lib/apiClient";
import { GetWorkResponse, SearchWorkResponse } from "@/types/api";

export const findWorks = async (query: string): Promise<SearchWorkResponse> => {
  const response = await apiClient.get<SearchWorkResponse["data"]>(
    `/works?${query}`
  );
  return response;
};

export const getWork = async (id: string): Promise<GetWorkResponse> => {
  const response = await apiClient.get<GetWorkResponse["data"]>(`/works/${id}`);
  return response;
};

export const getImage = (path: string) => {
  return `https://covers.openlibrary.org/b/id/${path}-L.jpg`;
};
