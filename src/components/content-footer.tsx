"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { GiscusComments } from "@/components/giscus-comments";
import { Reactions } from "@/components/reactions";

interface ContentFooterProps {
  path: string;
}

export function ContentFooter({ path }: ContentFooterProps) {
  const [showComments, setShowComments] = useState(false);

  // Mostra comentários se já reagiu — verifica sessionStorage (sessão atual)
  // e localStorage (sessões anteriores, via cache do Reactions)
  useEffect(() => {
    try {
      if (sessionStorage.getItem(`voted:${path}`)) {
        setShowComments(true);
        return;
      }
    } catch {}

    try {
      const cached = localStorage.getItem(`rx:${path}`);
      if (cached) {
        const entry = JSON.parse(cached) as { userVote: string | null };
        if (entry.userVote !== null) setShowComments(true);
      }
    } catch {}
  }, [path]);

  const handleVoted = useCallback(() => {
    try {
      sessionStorage.setItem(`voted:${path}`, "1");
    } catch {}
    setShowComments(true);
  }, [path]);

  return (
    <>
      <Reactions path={path} onVote={handleVoted} />

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <GiscusComments path={path} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
