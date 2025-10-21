"use client";
import Rating from "@mui/material/Rating";
import { Textarea } from "../ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { CreateReviewPayload } from "@/types/review";
import { toast } from "sonner";
import { createReview } from "@/api/review";

interface ReviewFormProps {
  workId: string;
}

export default function ReviewForm({ workId }: ReviewFormProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>("");

  async function handleReviewSubmitClick(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    if (!reviewText || !rating) {
      toast("Please provide both a rating and a review text.");
      return;
    }
    e.preventDefault();
    const formData: CreateReviewPayload = {
      rating: rating * 2,
      review_text: reviewText || "",
      work_id: workId,
    };

    try {
      await createReview(formData);
      toast.success("Review submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">What do you think?</h2>
      <form className="mt-4 flex flex-col gap-2">
        <div className="text-center">
          <Rating
            size="large"
            name="half-rating"
            precision={0.5}
            onChange={(_, value) => {
              setRating(value);
            }}
            value={rating || 0}
          />
        </div>

        <Textarea
          placeholder="Leave a review"
          rows={4}
          className="border-gray-500 "
          onChange={(e) => {
            setReviewText(e.target.value);
          }}
          value={reviewText || ""}
        ></Textarea>
        <Button
          type="submit"
          onClick={handleReviewSubmitClick}
          disabled={!reviewText || !rating}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
