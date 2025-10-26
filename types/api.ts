import { Work } from "@/types/work";
import { AxiosResponse } from "axios";
import { Author } from "@/types/author";
import { Shelf } from "@/types/shelf";

export interface AuthResponse extends AxiosResponse {
  data: {
    accessToken: string;
  };
}

export interface GetWorkResponse extends AxiosResponse {
  data: Work;
}

export interface SearchWorkResponse extends AxiosResponse {
  data: { num_found: number; start: number; docs: SearchWorkEntry[] | Work[] };
}

export interface SearchWorkEntry {
  author_key: string[];
  author_name: string[];
  cover_i?: number;
  edition_count: number;
  first_publish_year: string | null;
  key: string;
  language?: string[];
  title: string;
}

export interface GetAuthorResponse extends AxiosResponse {
  data: Author;
}

export interface AuthorsWork {
  title: string;
  key: string;
  description: string | null;
  covers: string[];
  first_publish_year: string | null;
}

export interface GetAuthorsWorksResponse extends AxiosResponse {
  data: {
    size: number;
    entries: AuthorsWork[];
  };
}

export interface CreateShelfResponse {
  data: Shelf;
}

export interface GetUserShelvesResponse extends AxiosResponse {
  data: {
    num_found: number;
    shelves: Shelf[] | null;
  };
}

export interface GetShelvesWithWorkResponse extends AxiosResponse {
  data: Shelf[] | null;
}

export interface AddWorkToShelfResponse extends AxiosResponse {
  data: Shelf | null;
}
