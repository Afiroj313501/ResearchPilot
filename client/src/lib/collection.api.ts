import api from "./api";

export interface Collection {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCollectionInput {
  name: string;
}

export interface UpdateCollectionInput {
  name: string;
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

export const getCollection = async (
  collectionId: string
) => {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: {
      collection: Collection;
    };
  }>(`/collections/${collectionId}`);

  return response.data;
};

export const createCollection = async (
  data: CreateCollectionInput
) => {
  const response = await api.post<{
    success: boolean;
    message: string;
    data: {
      collection: Collection;
    };
  }>("/collections", data);

  return response.data;
};

export const updateCollection = async (
  collectionId: string,
  data: UpdateCollectionInput
) => {
  const response = await api.patch<{
    success: boolean;
    message: string;
    data: {
      collection: Collection;
    };
  }>(`/collections/${collectionId}`, data);

  return response.data;
};

export const deleteCollection = async (
  collectionId: string
) => {
  const response = await api.delete<{
    success: boolean;
    message: string;
  }>(`/collections/${collectionId}`);

  return response.data;
};