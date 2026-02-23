"use client";

import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { PROJECTS } from "./arch-data";
import { ArchNodeCard, GROUP_COLORS } from "./arch-node-card";
import { ConnectionLines } from "./connection-lines";
import { DetailPanel } from "./detail-panel";
import type { ArchGroup, ArchNodeData } from "./types";

const GROUP_ORDER: ArchGroup[] = ["client", "server", "data", "infra"];

type DetailSnapshot = {
  node: ArchNodeData;
  label: string;
  description: string;
  details: string;
  connectedTo: { node: ArchNodeData; label: string }[];
};

export function ArchitectureMap() {
  const t = useTranslations("archMapPage");
  const tStr = (key: string) => t(key as Parameters<typeof t>[0]) as string;

  const [selectedProject, setSelectedProject] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [detailSnapshot, setDetailSnapshot] = useState<DetailSnapshot | null>(
    null,
  );

  const project = PROJECTS[selectedProject];

  const getNodeLabel = (projectId: string, nodeId: string) =>
    tStr(`projects.${projectId}.nodes.${nodeId}.label`);
  const getNodeDescription = (projectId: string, nodeId: string) =>
    tStr(`projects.${projectId}.nodes.${nodeId}.description`);
  const getNodeDetails = (projectId: string, nodeId: string) =>
    tStr(`projects.${projectId}.nodes.${nodeId}.details`);

  const buildSnapshot = (node: ArchNodeData): DetailSnapshot => ({
    node,
    label: getNodeLabel(project.id, node.id),
    description: getNodeDescription(project.id, node.id),
    details: getNodeDetails(project.id, node.id),
    connectedTo: node.connections
      .map((id) => project.nodes.find((n) => n.id === id))
      .filter((n): n is ArchNodeData => !!n)
      .map((n) => ({ node: n, label: getNodeLabel(project.id, n.id) })),
  });

  const activeNodeData = project.nodes.find((n) => n.id === activeNode);

  const isConnected = (nodeId: string): boolean => {
    if (!activeNodeData) return false;
    return (
      activeNodeData.connections.includes(nodeId) ||
      (project.nodes
        .find((n) => n.id === nodeId)
        ?.connections.includes(activeNode ?? "") ??
        false)
    );
  };

  const handleSelectProject = (index: number) => {
    setSelectedProject(index);
    setActiveNode(null);
    setDetailSnapshot(null);
  };

  const handleNodeClick = (node: ArchNodeData) => {
    if (detailSnapshot?.node.id === node.id) {
      setDetailSnapshot(null);
    } else {
      setDetailSnapshot(buildSnapshot(node));
    }
  };

  const handleSelectConnected = (node: ArchNodeData) => {
    setDetailSnapshot(buildSnapshot(node));
  };

  const detailPanelShared = detailSnapshot
    ? {
        node: detailSnapshot.node,
        label: detailSnapshot.label,
        description: detailSnapshot.description,
        details: detailSnapshot.details,
        connectedTo: detailSnapshot.connectedTo,
        connectedToLabel: tStr("ui.connectedTo"),
        closeLabel: tStr("ui.close"),
        onClose: () => setDetailSnapshot(null),
        onSelectNode: handleSelectConnected,
      }
    : null;

  return (
    <div className="space-y-4">
      {/* Project selector — horizontal scroll on mobile, wrap on desktop */}
      <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:gap-3 md:pb-0">
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => handleSelectProject(i)}
            className={`shrink-0 rounded-xl border px-4 py-2.5 text-left transition-all md:shrink ${
              selectedProject === i
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
          >
            <span className="block text-sm font-semibold">
              {tStr(`projects.${p.id}.name`)}
            </span>
            <span className="block max-w-[180px] truncate text-xs text-muted-foreground">
              {tStr(`projects.${p.id}.description`)}
            </span>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        {GROUP_ORDER.map((group) => (
          <div key={group} className="flex items-center gap-1.5">
            <div
              className={`h-2.5 w-2.5 rounded-full ${GROUP_COLORS[group].bg} border ${GROUP_COLORS[group].border}`}
            />
            <span className="text-xs text-muted-foreground">
              {tStr(`ui.groups.${group}`)}
            </span>
          </div>
        ))}
      </div>

      {/* ── MOBILE: 2-col grid, without connection lines ── */}
      <div className="md:hidden">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-2 gap-2 p-3">
            {project.nodes.map((node, i) => (
              <ArchNodeCard
                key={node.id}
                node={node}
                label={getNodeLabel(project.id, node.id)}
                description={getNodeDescription(project.id, node.id)}
                isActive={activeNode === node.id}
                isConnected={isConnected(node.id)}
                isSelected={detailSnapshot?.node.id === node.id}
                animationDelay={i * 0.07}
                wrapperClassName="relative"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => handleNodeClick(node)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {detailPanelShared && (
              <DetailPanel
                key={detailPanelShared.node.id}
                node={detailPanelShared.node}
                label={detailPanelShared.label}
                description={detailPanelShared.description}
                details={detailPanelShared.details}
                connectedTo={detailPanelShared.connectedTo}
                connectedToLabel={detailPanelShared.connectedToLabel}
                closeLabel={detailPanelShared.closeLabel}
                onClose={detailPanelShared.onClose}
                onSelectNode={detailPanelShared.onSelectNode}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── DESKTOP: absolute canvas with connection lines ── */}
      <div className="hidden md:block">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden="true"
          />

          <div className="relative" style={{ minHeight: "420px" }}>
            <ConnectionLines nodes={project.nodes} activeNode={activeNode} />

            {project.nodes.map((node, i) => (
              <ArchNodeCard
                key={node.id}
                node={node}
                label={getNodeLabel(project.id, node.id)}
                description={getNodeDescription(project.id, node.id)}
                isActive={activeNode === node.id}
                isConnected={isConnected(node.id)}
                isSelected={detailSnapshot?.node.id === node.id}
                animationDelay={i * 0.07}
                wrapperClassName="absolute"
                wrapperStyle={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: "clamp(130px, 13%, 175px)",
                }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => handleNodeClick(node)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {detailPanelShared && (
              <DetailPanel
                key={detailPanelShared.node.id}
                node={detailPanelShared.node}
                label={detailPanelShared.label}
                description={detailPanelShared.description}
                details={detailPanelShared.details}
                connectedTo={detailPanelShared.connectedTo}
                connectedToLabel={detailPanelShared.connectedToLabel}
                closeLabel={detailPanelShared.closeLabel}
                onClose={detailPanelShared.onClose}
                onSelectNode={detailPanelShared.onSelectNode}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
