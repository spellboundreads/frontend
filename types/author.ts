import { Work } from "./work";

export interface Author {
  id: string;
  openlibrary_id: string;
  name: string;
  birth_date: string | null;
  death_date: string | null;
  bio: string | null;
  portrait_url?: string | null;
  photos: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface AuthorWorkEntry {
  key: string;
  title: string;
  first_publish_year?: number;
  covers?: number[];
  description?: string;
}
