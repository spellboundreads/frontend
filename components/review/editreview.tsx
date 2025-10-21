import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Rating from "@mui/material/Rating";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Review } from "@/types/review";
import { updateReview } from "@/api/review";
import { toast } from "sonner";

export function EditReviewDialog({
  review,
  onUpdate,
}: {
  review: Review;
  onUpdate: (rating: number, reviewText: string) => void;
}) {
  const [newRating, setNewRating] = useState(review.rating / 2);
  const [newReviewText, setNewReviewText] = useState(review.review_text);

  async function handleReviewUpdateClick() {
    try {
      const response = await updateReview(
        review.id,
        newReviewText,
        newRating * 2
      );
      toast("Updated review successfully");
      onUpdate(response.data.rating, response.data.review_text);
    } catch (error) {
      toast("Failed to update review.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => {
            setNewRating(review.rating / 2);
            setNewReviewText(review.review_text);
          }}
          className="bg-transparent text-xs text-gray-700 hover:underline w-fit text-left"
        >
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Edit Review
          </DialogTitle>
        </DialogHeader>
        <div className="flex self-center gap-2">
          <div className="grid flex-1 text-center gap-2">
            <Rating
              size="large"
              name="rating"
              value={newRating}
              precision={0.5}
              onChange={(_, value) => setNewRating(value || 0)}
              className="self-center"
            />
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <div className="grid gap-2">
            <Textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              rows={5}
            />
          </div>
        </div>
        <DialogFooter className="flex gap-2 justify-center">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleReviewUpdateClick}
              disabled={
                newReviewText !== review.review_text ||
                newRating * 2 !== review.rating
                  ? false
                  : true
              }
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
