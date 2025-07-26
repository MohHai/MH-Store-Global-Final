'use client';

import { supabase } from './supabaseClient';

export async function getCurrentUserId(): Promise<string | null> {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.error('فشل في جلب المستخدم:', error?.message);
    return null;
  }

  return data.user.id;
}
