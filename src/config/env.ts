const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? "development";

const isProd = APP_ENV === "production";

export const BACKEND_URL = isProd
  ? process.env.NEXT_PUBLIC_BACKEND_URL_PROD!
  : process.env.NEXT_PUBLIC_BACKEND_URL_DEV!;

export const SUPABASE_URL = isProd
  ? process.env.NEXT_PUBLIC_SUPABASE_URL_PROD!
  : process.env.NEXT_PUBLIC_SUPABASE_URL_DEV!;

export const SUPABASE_KEY = isProd
  ? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY_PROD!
  : process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY_DEV!;
