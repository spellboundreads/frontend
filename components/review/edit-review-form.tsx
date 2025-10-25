"use client";
import { useActionState } from "react";
import Rating from "@mui/material/Rating";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/types/review";
import { editReview } from "@/app/actions/review";
import { useState, useEffect } from "react";
import { FieldError, ErrorMessage } from "@/components/form/error";
import { useRouter } from "next/navigation";

export default function EditReviewForm({ review }: { review: Review }) {
  const [state, action, pending] = useActionState(editReview, undefined);

  return (
    <form action={action} className="flex flex-col px-2 gap-4">
      {state?.message && state.message !== "Success" && (
        <ErrorMessage message={state.message} />
      )}
      <input
        type="text"
        value={review.work_id}
        name="work_id"
        readOnly
        className="hidden"
      />
      <input
        type="text"
        value={review.id}
        name="review_id"
        readOnly
        className="hidden"
      />
      <div className="flex self-center gap-2">
        <div className="grid flex-1 text-center gap-2">
          <Rating
            size="large"
            name="rating"
            precision={0.5}
            className="self-center"
          />
          {state?.errors?.rating && (
            <FieldError>{state.errors.rating[0]}</FieldError>
          )}
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <Textarea
          name="review_text"
          rows={5}
          defaultValue={review.review_text}
          className="outline-gray-700"
        />
        {state?.errors?.review_text && (
          <FieldError>{state.errors.review_text.message[0]}</FieldError>
        )}
      </div>

      <button
        aria-disabled={pending}
        type="submit"
        className={`rounded-sm border p-2 text-white w-full font-semibold uppercase ${
          pending ? "bg-gray-400 cursor-not-allowed" : "bg-black"
        }`}
      >
        {pending ? "Saving..." : "Save review"}
      </button>
    </form>
  );
}
