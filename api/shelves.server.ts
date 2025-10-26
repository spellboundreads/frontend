import { serverApi } from "@/lib/api.server";
import { CreateShelfResponse } from "@/types/api";

export const createShelf = async (
  name: string,
  description?: string,
  isPublic: boolean,
): Promise<CreateShelfResponse> => {
  try {
    const response = await serverApi.post<CreateShelfResponse["data"]>(
      "/api/shelves",
      {
        name,
        description: description || null,
        isPublic,
      },
    );
    return response;
  } catch (err) {
    return {
      data: null,
    };
  }
};

export const getUserShelves = async (
  userId: string,
): Promise<GetUserShelvesResponse> => {
  try {
    const response = await serverApi.get<GetUserShelvesResponse["data"]>(
      `/users/${userId}/shelves`,
    );
    return response;
  } catch (err) {
    return {
      data: null,
    };
  }
};

export const addWorkToShelf = async (
  shelfId: string,
  workId: string[],
): Promise<AddWorkToShelfResponse> => {
  try {
    const response = await serverApi.post<AddWorkToShelfResponse["data"]>(
      `/shelves/${shelfId}/works`,
      {
        workIds,
      },
    );
    return response;
  } catch (err) {
    return {
      data: null,
    };
  }
};
