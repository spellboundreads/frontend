"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shelf } from "@/types/shelf";
import { useActionState } from "react";
import { addToShelves } from "@/app/actions/work";
import { ErrorMessage } from "@/components/form/error";
import { SuccessMessage } from "@/components/form/success";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AddToShelfForm({
  shelves,
  workId,
  shelvesWithWork,
}: {
  shelves: Shelf[];
  workId: string;
  shelvesWithWork: Shelf[];
}) {
  const shelvesWithWorkIds = shelvesWithWork.map((shelf) => shelf.id);
  const [state, action, pending] = useActionState(addToShelves, undefined);

  useEffect(() => {
    if (state?.message === "Success") {
      toast.success("Work added to shelves successfully");
      window.location.reload();
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      {state?.message && state.message !== "Success" && (
        <ErrorMessage message={state.message} />
      )}

      <input type="hidden" name="work_id" value={workId} />
      {shelves.map((shelf) => (
        <div key={shelf.id} className="flex space-x-4">
          <Checkbox
            defaultChecked={shelvesWithWorkIds.includes(shelf.id)}
            id={shelf.id}
            name={shelf.id}
            className="text-lg"
          />
          <Label htmlFor={shelf.id}>{shelf.name}</Label>
        </div>
      ))}
      <button
        aria-disabled={pending}
        type="submit"
        className={`rounded-sm border p-2 text-white w-full font-semibold uppercase ${
          pending ? "bg-gray-400 cursor-not-allowed" : "bg-black"
        }`}
      >
        {pending ? "Adding..." : "Add to Shelves"}
      </button>
    </form>
  );
}
