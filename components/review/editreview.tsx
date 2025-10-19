import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Rating from "@mui/material/Rating";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

export function EditReviewDialog({
  rating,
  reviewText,
  onChange,
  onUpdate,
}: {
  rating: number;
  reviewText: string;
  onChange: (rating: number, reviewText: string) => void;
  onUpdate: (rating: number, reviewText: string) => void;
}) {
  const [newRating, setNewRating] = useState(rating / 2);
  const [newReviewText, setNewReviewText] = useState(reviewText);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => {
            setNewRating(rating / 2);
            setNewReviewText(reviewText);
          }}
          className="bg-transparent text-xs text-gray-700 hover:underline w-fit text-left"
        >
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="rating">Rating</Label>
            <Rating
              size="medium"
              name="rating"
              value={newRating}
              precision={0.5}
              onChange={(_, value) => setNewRating(value || 0)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="grid gap-2">
            <Label htmlFor="reviewText">Review Text</Label>
            <Textarea
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => {
                onChange(newRating * 2, newReviewText);
                onUpdate(newRating * 2, newReviewText);
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
