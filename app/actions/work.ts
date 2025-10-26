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

  const workId = formData.get("work_id");
  try {
    const response = await serverApi.post(`/works/${workId}/shelves`, {
      shelf_ids: shelfIds,
    });
    return {
      message: "Success",
    };
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
