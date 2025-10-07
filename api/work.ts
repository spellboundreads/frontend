import apiClient from "@/lib/apiClient";

export interface Work {
  data: {
    id: string;
    openlibrary_id: string;
    title: string;
    first_publish_date: string;
    covers: string[];
    description: string;
    excerpts: string[];
    created_at: string;
    updated_at: string;
    subjects: string[];
    works_authors: {
      authors: {
        name: string;
        photos: string[];
        bio: string;
      };
    };
  };
}

export interface SearchWorkResponse {
  data?: {
    numFound: number;
    start: number;
    docs: SearchWorkEntry[];
  };
}

export interface SearchWorkEntry {
  title: string;
  cover_i: string;
  author_name: string[];
  author_key: string[];
  first_publish_year?: number;
  key: string;
}

interface SearchWorkQuery {
  title?: string;
  language?: string;
  limit?: number;
  page?: number;
}

export const findWorks = async (query: string): Promise<SearchWorkResponse> => {
  const response = await apiClient.get<SearchWorkResponse>(`/works?${query}`);
  return response.data;
};

export const getWork = async (id: string): Promise<Work> => {
  const response = await apiClient.get<Work>(`/works/${id}`);
  return response.data;
};

export const getImage = (path: string) => {
  return `https://covers.openlibrary.org/b/id/${path}-L.jpg`;
};
