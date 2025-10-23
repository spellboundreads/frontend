"use server";
import {
  LoginFormSchema,
  LoginFormState,
  RegisterFormState,
} from "@/lib/definitions";
import { cookies } from "next/headers";
import { serverApiClient } from "@/lib/apiClient.server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(state: LoginFormState, formData: FormData) {
  const validateFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    if (data.statusCode === 404) {
      return {
        message: "No users registered with this email",
      };
    } else {
      return { message: await data.message };
    }
  }
  const rawCookies = response.headers.get("set-cookie");
  if (rawCookies) {
    const cookieStore = await cookies();
    cookieStore.set("token", rawCookies.split("=")[1].split(";")[0], {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });
  }

  redirect("/");
}

export async function register(state: RegisterFormState, formData: FormData) {
  const validateFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 409) {
      return { errors: `This ${data.fields[0]} has already been taken.` };
    } else {
      return { errors: data.message };
    }
  } else {
    redirect("/");
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("token");

    if (tokenCookie) {
      await serverApiClient.post("/auth/logout", null, {
        headers: {
          Cookie: `token=${tokenCookie.value}`,
        },
      });
    }

    cookieStore.delete("token");

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error: any) {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    revalidatePath("/", "layout");

    return { success: true };
  }
}
