import apiClient from "@/lib/apiClient";

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

interface AuthResponse {
  status: string;
  data: {
    access_token: string;
  };
}

export const register = async (data: RegisterDto): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/register", data);
  return response.data;
};

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const getMe = async (): Promise<any> => {
  const response = await apiClient.get<any>("/users/me");
  return response.data;
};