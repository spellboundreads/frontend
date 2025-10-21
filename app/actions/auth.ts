"use server";

import { cookies } from "next/headers";
import apiClient from "@/lib/apiClient";
import { revalidatePath } from "next/cache";
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

export async function loginAction(data: LoginDto) {
  try {
    const response = await apiClient.post<AuthResponse["data"]>(
      "/auth/login",
      data
    );

    // The backend returns accessToken in the response
    // We set it as an httpOnly cookie on the server side for security
    if (response.data?.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("token", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    // Revalidate the root layout to refresh all server components
    // This ensures the Header component re-runs getMe() and shows the user dropdown
    revalidatePath("/", "layout");

    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
      statusCode: error.response?.data?.statusCode,
    };
  }
}

export async function registerAction(data: RegisterDto) {
  try {
    const response = await apiClient.post<AuthResponse["data"]>(
      "/auth/register",
      data
    );

    // If the API returns a token, set it as a cookie
    if (response.data?.accessToken) {
      const cookieStore = await cookies();
      cookieStore.set("token", response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
    }

    // Revalidate all paths to refresh server components
    revalidatePath("/", "layout");

    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
      statusCode: error.response?.data?.statusCode,
    };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");

    if (tokenCookie) {
      // Call backend logout endpoint
      await apiClient.post("/auth/logout", null, {
        headers: {
          Cookie: `token=${tokenCookie.value}`,
        },
      });
    }

    // Delete the token cookie
    cookieStore.delete("token");

    // Revalidate all paths to refresh server components
    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: any) {
    // Even if the API call fails, delete the cookie
    const cookieStore = await cookies();
    cookieStore.delete("token");
    revalidatePath("/", "layout");

    return { success: true };
  }
}
