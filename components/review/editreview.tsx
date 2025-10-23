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
import { Review } from "@/types/review";
import EditReviewForm from "./edit-review-form";

export function EditReviewDialog({ review }: { review: Review }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-transparent text-xs text-gray-700 hover:underline w-fit text-left">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">
            Edit Review
          </DialogTitle>
        </DialogHeader>
        <EditReviewForm review={review} />
        <DialogFooter className="flex gap-2 justify-center"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
