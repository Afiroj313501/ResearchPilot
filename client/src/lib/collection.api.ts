import api from "./api";

export interface Collection {
  id: string;
  name: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const getCollections = async () => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: {
      collections: Collection[];
    };
  }>("/collections");

  return response.data;
};