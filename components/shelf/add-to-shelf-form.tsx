"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shelf } from "@/types/shelf";
import { useActionState } from "react";
import { addToShelves } from "@/app/actions/work";

export default function AddToShelfForm({
  shelves,
  workId,
}: {
  shelves: Shelf[];
  workId: string;
}) {
  const [state, action, pending] = useActionState(addToShelves, undefined);

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="work_id" value={workId} />
      {shelves.map((shelf) => (
        <div key={shelf.id} className="flex space-x-4">
          <Checkbox
            defaultChecked={true}
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
