import {serverApiClient} from "@/lib/apiClient.server";
import { AuthResponse } from "@/types/api";

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
  const response = await serverApiClient.post<AuthResponse["data"]>(
    "/auth/register",
    data
  );
  return response;
};

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await serverApiClient.post<AuthResponse["data"]>(
    "/auth/login",
    data
  );
  return response;
};

export const logout = async () => {
  const res = await serverApiClient.post("/auth/logout");
  return res.data;
};
