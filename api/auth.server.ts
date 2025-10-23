import { cookies } from "next/headers";
import apiClient from "@/lib/apiClient.server";

export async function getMeServer() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";

  const res = await apiClient.get("/users/me", {
    headers: { Cookie: cookieHeader },
  });
  return res.data;
}
