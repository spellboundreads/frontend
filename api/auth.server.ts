import { cookies } from "next/headers";
import { serverApi } from "@/lib/api.server";

export async function getMeServer() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";

  const res = await serverApi.get("/users/me", {
    headers: { Cookie: cookieHeader },
  });
  return res.data;
}
