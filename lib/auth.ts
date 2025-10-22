import { cookies } from "next/headers";
import apiClient from "./apiClient";
import { AuthResponse } from "@/types/api";
import { cache } from "react";
import { User } from "@/types/user";

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

export const getMe = cache(async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) return null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        headers: {
          Cookie: `token=${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (err) {
    return null;
  }
});
