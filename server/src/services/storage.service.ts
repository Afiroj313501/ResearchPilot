import fs from "fs/promises";
import path from "path";

import {
  getStorageBucket,
  getSupabaseAdmin,
  isSupabaseStorageEnabled,
} from "../config/supabase";

const STORAGE_PREFIX = "supabase:";

export const isStoredInSupabase = (fileUrl: string): boolean => {
  return fileUrl.startsWith(STORAGE_PREFIX);
};

export const toStorageKey = (objectPath: string): string => {
  return `${STORAGE_PREFIX}${objectPath}`;
};

export const fromStorageKey = (fileUrl: string): string => {
  return fileUrl.slice(STORAGE_PREFIX.length);
};

export const storePdf = async (
  buffer: Buffer,
  objectPath: string
): Promise<string> => {
  if (!isSupabaseStorageEnabled()) {
    const uploadDir = path.join(process.cwd(), "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, path.basename(objectPath));
    await fs.writeFile(filePath, buffer);
    return filePath;
  }

  const { error } = await getSupabaseAdmin()
    .storage.from(getStorageBucket())
    .upload(objectPath, buffer, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload PDF to storage: ${error.message}`);
  }

  return toStorageKey(objectPath);
};

export const readPdf = async (fileUrl: string): Promise<Buffer> => {
  if (isStoredInSupabase(fileUrl)) {
    const { data, error } = await getSupabaseAdmin()
      .storage.from(getStorageBucket())
      .download(fromStorageKey(fileUrl));

    if (error || !data) {
      throw new Error(
        `Failed to download PDF from storage: ${error?.message || "empty file"}`
      );
    }

    return Buffer.from(await data.arrayBuffer());
  }

  return fs.readFile(fileUrl);
};

export const removePdf = async (fileUrl: string): Promise<void> => {
  if (isStoredInSupabase(fileUrl)) {
    const { error } = await getSupabaseAdmin()
      .storage.from(getStorageBucket())
      .remove([fromStorageKey(fileUrl)]);

    if (error) {
      console.error("Failed to delete PDF from storage:", error.message);
    }

    return;
  }

  await fs.unlink(fileUrl).catch(() => {});
};
