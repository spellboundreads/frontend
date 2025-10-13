import apiClient from "@/lib/apiClient";
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

export const getMe = async (): Promise<any> => {
  const response = await apiClient.get<any>("/users/me");
  return response.data;
};
