"use server";
import {
  CreateReviewFormSchema,
  CreateReviewFormState,
} from "@/lib/definitions";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createReview(
  state: CreateReviewFormState,
  formData: FormData
) {
  const validateFields = CreateReviewFormSchema.safeParse(
    Object.fromEntries(formData)
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
