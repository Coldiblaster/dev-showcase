"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

export interface TreeNode {
  name: string;
  description?: string;
  children?: TreeNode[];
}

interface FileTreeProps {
  nodes: TreeNode[];
  className?: string;
}

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  const [showDesc, setShowDesc] = useState(false);
  const isFolder = !!node.children?.length;

  const toggle = useCallback(() => {
    if (isFolder) setOpen((p) => !p);
    else setShowDesc((p) => !p);
  }, [isFolder]);

  return (
    <div>
      <button
        onClick={toggle}
        className={cn(
          "group flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-left text-sm transition-colors hover:bg-primary/5",
          showDesc && !isFolder && "bg-primary/5",
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        aria-expanded={isFolder ? open : undefined}
      >
        {isFolder ? (
          <>
            <ChevronRight
              className={cn(
                "h-3 w-3 shrink-0 text-muted-foreground/50 transition-transform duration-200",
                open && "rotate-90",
              )}
            />
            {open ? (
              <FolderOpen className="h-4 w-4 shrink-0 text-primary/70" />
            ) : (
              <Folder className="h-4 w-4 shrink-0 text-primary/70" />
            )}
          </>
        ) : (
          <>
            <span className="w-3" />
            <File className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          </>
        )}
        <span className="truncate font-mono text-xs text-foreground/80 group-hover:text-foreground">
          {node.name}
        </span>
      </button>

      <AnimatePresence>
        {showDesc && !isFolder && node.description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <p
              className="pb-1 text-xs leading-relaxed text-muted-foreground"
              style={{ paddingLeft: `${depth * 16 + 36}px` }}
            >
              {node.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFolder && open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {node.description && (
              <p
                className="py-0.5 text-xs text-muted-foreground/60 italic"
                style={{ paddingLeft: `${(depth + 1) * 16 + 8}px` }}
              >
                {node.description}
              </p>
            )}
            {node.children!.map((child) => (
              <TreeItem key={child.name} node={child} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Árvore de arquivos interativa com expand/collapse e descrições. */
export function FileTree({ nodes, className }: FileTreeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card/50 p-3 backdrop-blur-sm",
        className,
      )}
      role="tree"
      aria-label="Project file tree"
    >
      {nodes.map((node) => (
        <TreeItem key={node.name} node={node} depth={0} />
      ))}
    </div>
  );
}
