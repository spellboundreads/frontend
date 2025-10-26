import { serverApi } from "@/lib/api.server";
import {
  CreateShelfResponse,
  GetUserShelvesResponse,
  GetShelvesWithWorkResponse,
  AddWorkToShelfResponse,
} from "@/types/api";

export const getUserShelves = async (
  userId: string,
): Promise<GetUserShelvesResponse> => {
  const response = await serverApi.get<GetUserShelvesResponse["data"]>(
    `/users/${userId}/shelves`,
  );
  return response;
};

export const getShelvesWithWork = async (
  userId: string,
  workId: string,
): Promise<GetShelvesWithWorkResponse> => {
  const response = await serverApi.get<GetShelvesWithWorkResponse["data"]>(
    `/users/${userId}/shelves?work_id=${workId}`,
  );

  return response;
};
