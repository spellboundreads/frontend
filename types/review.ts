import { PublicUser } from "@/types/user";

export interface Review {
  id: string;
  content: string;
  rating: number;
  users: PublicUser;
  created_at: string;
  updated_at: string;
}

