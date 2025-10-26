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
  shelves: Shelf[] | null;
  workId: string;
  shelvesWithWork: Shelf[] | null;
}) {
  const shelvesWithWorkIds = shelvesWithWork?.map((shelf) => shelf.id) ?? [];
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
      {shelves?.map((shelf) => (
        <div key={shelf.id} className="flex gap-4 items-start">
          <Checkbox
            defaultChecked={shelvesWithWorkIds.includes(shelf.id)}
            id={shelf.id}
            name={shelf.id}
            className="text-lg mt-1"
          />
          <div>
            <Label htmlFor={shelf.id} className="font-semibold">
              {shelf.name}
            </Label>
            <p className="text-gray-700 text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              elementum, nisl eget aliquam aliquet, nunc nisl aliquet nisl, eget
              aliquam nisl nisl eget nisl.
            </p>
          </div>
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
