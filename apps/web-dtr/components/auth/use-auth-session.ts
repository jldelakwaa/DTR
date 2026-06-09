"use client";

import { getSupabaseBrowserClient } from "@dtr/shared";
import { useEffect, useState } from "react";

type AuthSession = {
  user: {
    email?: string | null;
  };
} | null;

export function useAuthSession() {
  const supabase = getSupabaseBrowserClient();
  const [session, setSession] = useState<AuthSession>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    void supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        setSession((data.session as AuthSession) ?? null);
        setLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setSession(null);
        setLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession((nextSession as AuthSession) ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { loading, session };
}
