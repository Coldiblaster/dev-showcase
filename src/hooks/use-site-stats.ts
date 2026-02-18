"use client";

import { useCallback, useEffect, useState } from "react";

export interface SiteStats {
  views: number;
  visitors: number;
  topPages: Array<{ path: string; views: number }>;
}

const EMPTY: SiteStats = { views: 0, visitors: 0, topPages: [] };

/** Hook para buscar stats ao vivo da plataforma via /api/stats. */
export function useSiteStats() {
  const [stats, setStats] = useState<SiteStats>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/stats");
      if (!res.ok) throw new Error();
      setStats(await res.json());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, retry: fetchStats };
}
