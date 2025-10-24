import { Work } from "@/types/work";
import { AxiosResponse } from "axios";
import { Author, AuthorWorkEntry } from "@/types/author";
import * as z from "zod";

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
  first_publish_year?: number;
  key: string;
  language?: string[];
  title: string;
}

export const ErrorResponseSchema = z.object({
  message: z.string,
  statusCode: z.string,
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

export interface GetAuthorResponse extends AxiosResponse {
  data: Author;
}

interface AuthorsWork {
  title: string;
  key: string;
  description: string | null;
  covers: string[];
}

export interface GetAuthorsWorksResponse extends AxiosResponse {
  data: {
    size: number;
    entries: AuthorsWork[];
  };
}
