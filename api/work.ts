import apiClient from "@/lib/apiClient";
import { Work } from "@/types/work";
import {GetWorkResponse, SearchWorkResponse} from "@/types/api";


export const findWorks = async (query: string): Promise<SearchWorkResponse> => {
  const response = await apiClient.get<SearchWorkResponse>(`/works?${query}`);
  return response.data;
};

export const getWork = async (id: string): Promise<GetWorkResponse> => {
  const response = await apiClient.get<GetWorkResponse>(`/works/${id}`);
  return response.data;
};

export const getImage = (path: string) => {
  return `https://covers.openlibrary.org/b/id/${path}-L.jpg`;
};
