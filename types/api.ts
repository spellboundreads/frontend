import { Work, SearchWorkEntry } from "@/types/work";
import { AxiosResponse } from "axios";
import { Author } from "@/types/author";

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

export interface SearchWorkResponse extends AxiosResponse {
  num_found: number;
  start: number;
  docs: SearchWorkEntry[];
}
