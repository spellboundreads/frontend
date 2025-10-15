import { Work, SearchWorkEntry } from "@/types/work";
import { AxiosResponse } from "axios";

export interface AuthResponse extends AxiosResponse {
  data: {
    accessToken: string;
  };
}

export interface GetWorkResponse extends AxiosResponse {
  data: Work;
}

export interface SearchWorkResponse extends AxiosResponse {
  data: Work[];
}
