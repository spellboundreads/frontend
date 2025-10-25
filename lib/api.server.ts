import axios from "axios";
import { cookies } from "next/headers";

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    config.headers = config.headers || {};
    if (typeof config.headers === "object" && !("set" in config.headers)) {
      config.headers = new axios.AxiosHeaders(config.headers);
    }
    config.headers.set("Cookie", `token=${token}`);
  }
  return config;
});
