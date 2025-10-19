import { Review } from "./review";
import { Author } from "./author";

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
  first_publish_year?: number;
  covers: string[] | null;
  description: string | null;
  excerpts: string[] | null;
  created_at: string;
  updated_at: string;
  subjects: string[] | null;
  works_authors: WorkAuthor[];
  reviews?: Review[];
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
