"use server";
import {
  CreateReviewFormSchema,
  CreateReviewFormState,
  EditReviewFormSchema,
  EditReviewFormState,
} from "@/lib/definitions";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { serverApi } from "@/lib/api.server";

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

export async function editReview(
  state: EditReviewFormState,
  formData: FormData,
) {
  const validateFields = EditReviewFormSchema.safeParse(
    Object.fromEntries(formData),
  );

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const formDataEntries = Object.fromEntries(formData) as Record<
    string,
    string
  >;

  const reviewId = formData.get("review_id")!.valueOf();
  try {
    const review_text = formData.get("review_text")?.toString() || "";
    const ratingStr = formData.get("rating")?.toString() || "0";
    const rating = parseFloat(ratingStr);

    const response = await serverApi.patch(`/reviews/${reviewId}`, {
      review_text,
      rating,
    });

    revalidatePath("/");

    return { message: "Review updated successfully", data: response.data };
  } catch (err: any) {
    console.error("Edit review error:", err.response || err);
    return {
      errors: err.response?.data || err.message || "Failed to update review",
    };
  }
}
