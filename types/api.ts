import { Work } from "@/types/work";
import { AxiosResponse } from "axios";
import { Author, AuthorWorkEntry } from "@/types/author";

export interface AuthResponse extends AxiosResponse {
  data: {
    accessToken: string;
  };
}

export interface GetWorkResponse extends AxiosResponse {
  data: Work;
}

export interface GetAuthorResponse extends AxiosResponse {
  data: Author;
}

export type GetAuthorWorkResponse =
  | {
      data: {
        size: number;
        entries: AuthorWorkEntry[];
      };
    }
  | {
      data: {
        size: number;
        entries: Work[];
      };
    };
export interface SearchWorkResponse extends AxiosResponse {
  data: { num_found: number; start: number; docs: SearchWorkEntry[] | Work[] };
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
