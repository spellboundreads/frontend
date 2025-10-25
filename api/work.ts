import { clientApi } from "@/lib/api";
import { GetWorkResponse } from "@/types/api";
import { WorksReviewsResponse } from "@/types/review";

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
