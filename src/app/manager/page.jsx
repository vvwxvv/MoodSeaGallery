"use client";

import { useEffect, useState, useContext, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { getManagerSections, getManagerModels } from "@/lib/managerMenu";
import AnimatedUnderline from "@/components/animations/AnimatedUnderline";

// ─── UI Text ────────────────────────────────────────────────────────────────
const UI_TEXT = {
  title:   { en: "MANAGEMENT",          cn: "管理系统" },
  loading: { en: "LOADING…",            cn: "加载中…" },
  sync:    { en: "SYNC",                cn: "同步" },
  error:   { en: "Error fetching data", cn: "获取数据时出错" },
};
const t = (node, isCn) => (isCn ? node.cn : node.en);

// ─── Data Row Component ─────────────────────────────────────────────────────
function DataRow({ item, count, rowIndex }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: "32px 1fr auto 20px",
        alignItems: "center",
        columnGap: "16px",
        padding: "14px 4px",
        borderBottom: "1px solid #000",
        textDecoration: "none",
        color: "#000",
      }}
    >
      <span style={{ fontFamily: "monospace", fontSize: 11, color: "#000" }}>
        {String(rowIndex).padStart(2, "0")}
      </span>

      <span
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#000",
        }}
      >
        {item.label}
      </span>

      <span
        style={{
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          fontWeight: 700,
          fontSize: 22,
          lineHeight: 1,
          color: "#000",
          textAlign: "right",
        }}
      >
        {count}
      </span>

      <span
        style={{
          fontSize: 16,
          textAlign: "right",
          color: "#000",
          transform: hovered ? "translateX(2px)" : "translateX(0)",
          transition: "transform 0.15s ease",
        }}
      >
        →
      </span>

      <AnimatedUnderline active={hovered} color="#000" />
    </Link>
  );
}

// ─── Section Group Component ──────────────────────────────────────────────
function SectionGroup({ section, stats, startRowIndex }) {
  const groupTotal = section.items.reduce(
    (sum, it) => sum + (stats[it.key] ?? 0),
    0
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "10px 4px",
          borderTop: "2px solid #000",
          borderBottom: "2px solid #000",
          backgroundColor: "#000",
        }}
      >
        <span
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#fff",
          }}
        >
          {section.label}
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#fff" }}>
          {groupTotal}
        </span>
      </div>

      {section.items.map((item, i) => (
        <DataRow
          key={item.key}
          item={item}
          count={stats[item.key] ?? 0}
          rowIndex={startRowIndex + i + 1}
        />
      ))}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
const SYNC_THROTTLE_MS = 800;

export default function ManagerPage() {
  const { isCn } = useContext(LanguageContext);

  const sections = useMemo(() => getManagerSections(isCn), [isCn]);
  const models = useMemo(() => getManagerModels(), []); // stable across language

  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(false);

  const isMountedRef = useRef(true);
  const isFetchingRef = useRef(false);
  const lastSyncAtRef = useRef(0);
  const requestIdRef = useRef(0);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchStats = useCallback(async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    const requestId = ++requestIdRef.current;

    if (isMountedRef.current) {
      setSyncing(true);
      setError(false);
    }

    try {
      const results = await Promise.allSettled(
        models.map((m) => fetch(`/api/${m.model}`).then((r) => r.json()))
      );

      if (requestId !== requestIdRef.current) return;
      if (!isMountedRef.current) return;

      const next = {};
      results.forEach((result, i) => {
        const { key } = models[i];
        if (result.status === "fulfilled" && result.value?.data) {
          next[key] = Array.isArray(result.value.data)
            ? result.value.data.length
            : result.value.pagination?.total ?? 0;
        } else {
          next[key] = 0;
        }
      });

      setStats(next);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
      if (isMountedRef.current) setError(true);
    } finally {
      if (requestId === requestIdRef.current) {
        isFetchingRef.current = false;
      }
      if (isMountedRef.current) {
        setIsLoading(false);
        setSyncing(false);
      }
    }
  }, [models]);

  const handleSyncClick = useCallback(() => {
    const now = Date.now();
    if (now - lastSyncAtRef.current < SYNC_THROTTLE_MS) return;
    if (isFetchingRef.current) return;
    lastSyncAtRef.current = now;
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // ─── Render logic ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
        <span style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.14em", color: "#000" }}>
          {t(UI_TEXT.loading, isCn)}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#fff", paddingTop: 58 }}>
        <div style={{ margin: "24px", padding: "16px", border: "2px solid #000", fontFamily: "monospace", fontSize: 13, color: "#000" }}>
          {t(UI_TEXT.error, isCn)}
        </div>
      </div>
    );
  }

  const totalModels = sections.reduce((n, s) => n + s.items.length, 0);
  const totalRecords = Object.values(stats).reduce((n, c) => n + c, 0);
  let cursor = 0; // running row index across sections

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", color: "#000", paddingTop: 58, paddingBottom: 48 }}>
      <div style={{ width: "min(90%, 720px)", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "3px solid #000", paddingBottom: 14, paddingTop: 6, flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: "0.1em", textTransform: "uppercase", color: "#000" }}>
            {t(UI_TEXT.title, isCn)}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 20, color: "#000" }}>
                {totalRecords}
              </span>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: "#000", letterSpacing: "0.08em" }}>
                REC / {totalModels} MDL
              </span>
            </div>

            <button
              onClick={handleSyncClick}
              style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", color: "#fff", backgroundColor: "#000", border: "1px solid #000", padding: "6px 12px", cursor: "pointer" }}
            >
              {syncing ? "···" : t(UI_TEXT.sync, isCn)}
            </button>
          </div>
        </div>

        {/* Sections */}
        <div>
          {sections.map((section) => {
            const startRowIndex = cursor;
            cursor += section.items.length;
            return (
              <SectionGroup
                key={section.key}
                section={section}
                stats={stats}
                startRowIndex={startRowIndex}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}