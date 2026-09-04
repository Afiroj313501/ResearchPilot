import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export const isSupabaseStorageEnabled = (): boolean => {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
};

export const getStorageBucket = (): string => {
  return process.env.SUPABASE_STORAGE_BUCKET || "documents";
};

export const getSupabaseAdmin = (): SupabaseClient => {
  if (!isSupabaseStorageEnabled()) {
    throw new Error("Supabase storage is not configured");
  }

  if (!client) {
    client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );
  }

  return client;
};
