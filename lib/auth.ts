import { cookies } from "next/headers";
import apiClient from "./apiClient";
import { AuthResponse } from "@/types/api";
import { cache } from "react";

interface RegisterDto {
  email: string;
  username: string;
  password: string;
  display_name: string;
}

interface LoginDto {
  email: string;
  password: string;
}

export const register = async (data: RegisterDto): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse["data"]>(
    "/auth/register",
    data
  );
  return response;
};

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse["data"]>(
    "/auth/login",
    data
  );
  return response;
};

export const logout = async () => {
  const res = await apiClient.post("/auth/logout");
  return res.data;
};

export const getMe = cache(async () => {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");

  if (!tokenCookie) return null;
  try {
    const res = await apiClient.get("/users/me", {
      headers: {
        Cookie: `token=${tokenCookie.value}`,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    return null;
  }
});
