import { serverApiClient } from "@/lib/apiClient.server";
import { AuthResponse } from "@/types/api";
import * as z from "zod";

export const logout = async () => {
  const res = await serverApiClient.post("/auth/logout");
  return res.data;
};
