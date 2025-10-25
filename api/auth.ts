import { serverApi } from "@/lib/api.server";
import { AuthResponse } from "@/types/api";
import * as z from "zod";

export const logout = async () => {
  const res = await serverApi.post("/auth/logout");
  return res.data;
};
