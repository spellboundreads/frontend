"use server";
import { AddToShelfSchema } from "@/types/shelf";
import * as z from "zod";
import { serverApi } from "@/lib/api.server";
import { isAxiosError } from "axios";

export type AddToShelfFormState =
  | {
      errors?: {
        review_text?: string[];
        rating?: string[];
      };
      message?: string;
    }
  | undefined;

export async function addToShelves(
  state: AddToShelfFormState,
  formData: FormData,
) {
  const shelfIds = Object.keys(Object.fromEntries(formData)).filter(
    (key) => key !== "work_id",
  );

  if (!shelfIds.length) {
    return {
      errors: {
        shelf_ids: ["Please select at least one shelf"],
      },
    };
  }

  const workId = formData.get("work_id");
  try {
    const response = await serverApi.post(`/works/${workId}/shelves`, {
      shelf_ids: shelfIds,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        return { message: error.response.data };
      } else if (error.request) {
        return { message: error.request };
      } else {
        return { message: error.message };
      }
    } else {
      return { message: "Something went wrong" };
    }
  }
}
