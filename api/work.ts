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

export const getWork = async (id: string): Promise<Work> => {
  const response = await apiClient.get<Work>(`/works/${id}`);
  return response.data;
};

export const getImage = (path: string) => {
    return `https://covers.openlibrary.org/b/id/${path}-L.jpg`
}