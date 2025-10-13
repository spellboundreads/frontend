import { User } from "@/types/user";

export interface Review {
  id: string;
  user_id: string;
  work_id: string;
  rating: number;
  review_text: string | null;
  users: User;
  created_at: string;
  updated_at: string;
}
