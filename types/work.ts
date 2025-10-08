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

export interface WorkAuthor {
  work_id: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  authors: Author;
}

export interface Work {
  id: string;
  openlibrary_id: string;
  title: string;
  first_published_date: string | null;
  covers: string[] | null;
  description: string | null;
  excerpts: string[] | null;
  created_at: string;
  updated_at: string;
  subjects: string[] | null;
  works_authors: WorkAuthor[];
}

export interface SearchWorkEntry {
  author_key: string[];
  author_name: string[];
  cover_i?: number;
  edition_count: number;
  first_publish_year?: number;
  key: string;
  language?: string[];
  title: string;
}
