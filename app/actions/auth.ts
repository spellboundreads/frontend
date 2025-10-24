"use server";
import {
  RegisterFormState,
} from "@/lib/definitions";
import { LoginFormSchema } from "@/types/auth";
import { cookies } from "next/headers";
import { serverApiClient } from "@/lib/apiClient.server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as z from "zod";

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export async function login(state: LoginFormState, formData: FormData) {
  const validateFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validateFields.success) {
    const flattenErrors = z.flattenError(validateFields.error);
    return {
      errors: flattenErrors.fieldErrors,
    };
  }

  try {
    const response = await serverApiClient.post(
      `/auth/login`,
      Object.fromEntries(formData),
    );
    const setCookieHeader = response.headers["set-cookie"];
    console.log("cookieStore", setCookieHeader);
    const token = setCookieHeader
      ?.find((c) => c.startsWith("token="))
      ?.split("token=")[1]
      ?.split(";")[0];
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });
    redirect("/");
  } catch (error) {
    if (error.status === 404) {
      return {
        message: "No users registered with this email",
      };
    } else if (error.status === 401) {
      return { message: "Password is incorrect" };
    } else {
      return { message: "An error occurred while logging in" };
    }
  }
  redirect("/");
}

export async function register(state: RegisterFormState, formData: FormData) {
  const validateFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData),
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
    },
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
