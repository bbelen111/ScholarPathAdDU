import { hasSupabaseConfig, supabase } from './supabaseClient';

export const signInWithEmailPassword = async ({ email, password }) => {
  if (!hasSupabaseConfig || !supabase) {
    return {
      success: false,
      fallback: true,
      message: 'Supabase is not configured. Falling back to demo mode.',
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      fallback: false,
      message: error.message,
    };
  }

  return {
    success: true,
    fallback: false,
    user: data.user,
    session: data.session,
  };
};

export const signOutFromSupabase = async () => {
  if (!hasSupabaseConfig || !supabase) {
    return {
      success: true,
      fallback: true,
    };
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      fallback: false,
      message: error.message,
    };
  }

  return {
    success: true,
    fallback: false,
  };
};

export const getSupabaseSession = async () => {
  if (!hasSupabaseConfig || !supabase) {
    return {
      session: null,
      fallback: true,
    };
  }

  const { data: { session }, error } = await supabase.auth.getSession();

  if (error) {
    return {
      session: null,
      fallback: false,
      message: error.message,
    };
  }

  return {
    session,
    fallback: false,
  };
};
