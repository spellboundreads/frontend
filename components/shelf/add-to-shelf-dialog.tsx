import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Shelf } from "@/types/shelf";
import AddToShelfForm from "@/components/shelf/add-to-shelf-form";

export default function AddToShelfDialog({ shelves, workId }: { shelves: Shelf[]; workId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hidden sm:block rounded-4xl py-2 w-full font-semibold bg-white border-2 border-gray-500 active:bg-gray-200">
          Add to Shelf
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={`text-3xl text-center`}>
            Add to Shelf
          </DialogTitle>
          <DialogDescription className="text-black text-center mt-2 mb-6">
            Add this work to your shelf.
          </DialogDescription>
        </DialogHeader>
        <div className=" flex flex-col  items-center">
          <AddToShelfForm shelves={shelves} workId={workId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
