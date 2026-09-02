import api from "./api";

export interface Profile { id: string; name: string | null; email: string; createdAt: string; updatedAt: string; }

export const getProfile = async () => (await api.get<{ data: { user: Profile } }>("/users/profile")).data;
export const updateProfile = async (name: string) => (await api.patch<{ data: { user: Profile } }>("/users/profile", { name })).data;
