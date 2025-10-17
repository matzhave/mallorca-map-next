import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Universal Supabase client for Web (Next.js) and Mobile (React Native)
// Web: uses NEXT_PUBLIC_* env vars
// Mobile: uses EXPO_PUBLIC_* env vars or process.env fallback

function getEnv(key: string): string | undefined {
  // Next.js (web)
  if (typeof process !== 'undefined' && process.env) {
    const nextPublicKey = process.env[`NEXT_PUBLIC_${key}`];
    if (nextPublicKey) return nextPublicKey;
  }

  // Expo (mobile) - Constants.expoConfig?.extra
  // Falls in app.json/app.config.js konfiguriert
  try {
    // @ts-ignore
    if (typeof expo !== 'undefined' && expo?.Constants?.expoConfig?.extra) {
      // @ts-ignore
      const expoValue = expo.Constants.expoConfig.extra[key];
      if (expoValue) return expoValue;
    }
  } catch {}

  // Fallback for React Native (process.env)
  if (typeof process !== 'undefined' && process.env) {
    const value = process.env[key];
    if (value) return value;
  }

  return undefined;
}

const SUPABASE_URL = getEnv('SUPABASE_URL');
const SUPABASE_ANON_KEY = getEnv('SUPABASE_ANON_KEY');

if (!SUPABASE_URL) {
  throw new Error(
    'SUPABASE_URL is not configured. Set NEXT_PUBLIC_SUPABASE_URL (web) or configure in app.json (mobile).'
  );
}

if (!SUPABASE_ANON_KEY) {
  throw new Error(
    'SUPABASE_ANON_KEY is not configured. Set NEXT_PUBLIC_SUPABASE_ANON_KEY (web) or configure in app.json (mobile).'
  );
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Web uses localStorage, React Native needs AsyncStorage
    // We'll configure storage per platform in the app init
    persistSession: true,
    autoRefreshToken: true,
  },
});

