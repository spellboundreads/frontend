import { Work, SearchWorkEntry } from "@/types/work";
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

export interface GetAuthorWorkResponse extends AxiosResponse {
  data: {
    size: number;
    entries: AuthorWorkEntry[];
  };
}

export interface SearchWorkResponse extends AxiosResponse {
  data: { num_found: number; start: number; docs: SearchWorkEntry[] };
}
