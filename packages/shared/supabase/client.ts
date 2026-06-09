import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type SupabaseEnv = {
  url: string;
  publicKey: string;
};

let browserClient: SupabaseClient | null = null;

function getSupabaseEnv(): SupabaseEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Add it to apps/web-dtr/.env.local.",
    );
  }

  if (!publicKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Add one of them to apps/web-dtr/.env.local.",
    );
  }

  return { url, publicKey };
}

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const { url, publicKey } = getSupabaseEnv();
  browserClient = createClient(url, publicKey);

  return browserClient;
}
