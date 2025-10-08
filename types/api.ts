import { Work, SearchWorkEntry } from "@/types/work";

export interface BaseResponse {
  status: string;
  data?: any;
  message?: string; // for error messages
}

export interface GetWorkResponse extends BaseResponse {
  data?: Work;
}

export interface SearchWorkResponse extends BaseResponse {
  data?: {
    numFound: number;
    start: number;
    docs: SearchWorkEntry[];
  };
}
