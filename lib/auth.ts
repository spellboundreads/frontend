import { cookies } from "next/headers";
import apiClient from "./apiClient";

export async function getMe() {
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
}
