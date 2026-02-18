"use client";

import { useCallback, useEffect, useState } from "react";

export interface Contributor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  contributions: number;
}

/** Hook para buscar contribuidores do repositório via API. */
export function useContributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchContributors = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/github/contributors");
      if (!res.ok) throw new Error();
      setContributors(await res.json());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContributors();
  }, [fetchContributors]);

  return { contributors, loading, error, retry: fetchContributors };
}
