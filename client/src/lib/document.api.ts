import api from "./api";

export interface Document {
  id: string;
  collectionId: string;
  title: string;
  originalName: string;
  fileUrl: string;
  mimeType: string;
  fileSize: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadDocumentResponse {
  success: boolean;
  message: string;
  data: {
    document: Document;
  };
}

export interface GetDocumentsResponse {
  success: boolean;
  message: string;
  data: {
    documents: Document[];
  };
}

export const uploadDocument = async (
  collectionId: string,
  file: File
): Promise<UploadDocumentResponse> => {
  const formData = new FormData();

  formData.append("collectionId", collectionId);
  formData.append("file", file);

  const response = await api.post<UploadDocumentResponse>(
    "/documents/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getCollectionDocuments = async (
  collectionId: string
): Promise<GetDocumentsResponse> => {
  const response = await api.get<GetDocumentsResponse>(
    `/documents/collection/${collectionId}`
  );

  return response.data;
};

export const deleteDocument = async (documentId: string) => {
  const response = await api.delete(`/documents/${documentId}`);
  return response.data;
};

export const updateDocumentTitle = async (documentId: string, title: string) =>
  (await api.patch(`/documents/${documentId}`, { title })).data;

export const downloadDocument = async (documentId: string, filename: string) => {
  const response = await api.get(`/documents/${documentId}/download`, { responseType: "blob" });
  const url = URL.createObjectURL(response.data);
  const link = window.document.createElement("a");
  link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
};
