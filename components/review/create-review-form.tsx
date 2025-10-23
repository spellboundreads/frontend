"use client";
import Rating from "@mui/material/Rating";
import { Textarea } from "../ui/textarea";
import { useActionState } from "react";
import { createReview } from "@/app/actions/review";

interface CreateReviewFormProps {
  workId: string;
}

export default function CreateReviewForm({ workId }: CreateReviewFormProps) {
  const [state, action, pending] = useActionState(createReview, undefined);
  return (
    <div>
      <h2 className="text-2xl font-semibold">What do you think?</h2>
      <form className="mt-4 flex flex-col gap-2" action={action}>
        {state?.errors && (
          <div className="text-red-500 text-sm text-center">
            {typeof state.errors === "string" ? (
              state.errors
            ) : (
              <ul>
                {Object.entries(state.errors).map(([field, message]) => (
                  <li key={field}>
                    {field}: {String(message)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="text-center">
          <Rating size="large" name="rating" precision={0.5} />
        </div>

        <Textarea
          placeholder="Leave a review"
          rows={4}
          className="border-gray-500 "
          required
          name="review_text"
        ></Textarea>
        <input name="work_id" value={workId} readOnly className="hidden" />
        <button
          aria-disabled={pending}
          type="submit"
          className={`rounded-sm border p-2 text-white w-full font-semibold uppercase ${
            pending ? "bg-gray-400 cursor-not-allowed" : "bg-black"
          }`}
        >
          {pending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
