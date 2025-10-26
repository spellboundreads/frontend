"use server";
import {
  CreateReviewFormSchema,
  CreateReviewFormState,
  EditReviewFormSchema,
} from "@/lib/definitions";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { serverApi } from "@/lib/api.server";
import { isAxiosError } from "axios";
import * as z from "zod";
import { redirect } from "next/navigation";

export async function createReview(
  state: CreateReviewFormState,
  formData: FormData,
) {
  const validateFields = CreateReviewFormSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token)
    return {
      message: "You need to log in to submit a review",
    };

  const formDataEntries = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${token.value}`,
    },
    body: JSON.stringify({
      ...formDataEntries,
      rating: formDataEntries.rating
        ? parseFloat(formDataEntries.rating) * 2
        : 0,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { errors: data.message };
  } else {
    revalidatePath("/");
  }
}

export type EditReviewFormState =
  | {
      errors?: {
        review_text?: string[];
        rating?: string[];
      };
      message?: string;
    }
  | undefined;

export async function editReview(
  state: EditReviewFormState,
  formData: FormData,
) {
  const validateFields = EditReviewFormSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validateFields.success) {
    const flattenErrors = z.flattenError(validateFields.error);
    return {
      errors: flattenErrors.fieldErrors,
    };
  }

  try {
    const review_text = formData.get("review_text")?.toString() || "";
    const rating = formData.get("rating");
    const reviewId = formData.get("review_id");
    const workId = formData.get("work_id");

    const response = await serverApi.patch(`/reviews/${reviewId}`, {
      review_text,
      rating: Number(rating) * 2,
    });
    return { message: "Success" };
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      if (error.response) {
        return { message: "Something wrong with the response" };
      } else if (error.request) {
        return { message: "Something wrong with the request" };
      } else {
        return { message: "Something went wrong" };
      }
    }
  }
}
