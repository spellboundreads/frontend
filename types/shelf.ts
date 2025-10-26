import * as z from "zod";

export interface Shelf {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  user_id: string;
}

export const AddToShelfSchema = z.object({
  work_id: z.string().uuid(),
  shelf_id: z.string().uuid(),
});
