import api from "./api";

export interface Profile { id: string; name: string | null; email: string; createdAt: string; updatedAt: string; }

export const getProfile = async () => (await api.get<{ data: { user: Profile } }>("/users/profile")).data;
export interface UpdateProfileInput { name?: string; email?: string; currentPassword?: string; newPassword?: string; }
export const updateProfile = async (data: UpdateProfileInput) => (await api.patch<{ data: { user: Profile } }>("/users/profile", data)).data;
