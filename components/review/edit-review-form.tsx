import { useActionState } from "react";
import Rating from "@mui/material/Rating";
import { Textarea } from "@/components/ui/textarea";
import { Review } from "@/types/review";
import { editReview } from "@/app/actions/review";

export default function EditReviewForm({ review }: { review: Review }) {
  const [state, action, pending] = useActionState(editReview, undefined);
  return (
    <form action={action} className="flex flex-col px-2 gap-4">
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
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <Textarea
          name="review_text"
          rows={5}
          defaultValue={review.review_text}
          className="outline-gray-700"
        />
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
