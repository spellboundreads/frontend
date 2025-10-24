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

