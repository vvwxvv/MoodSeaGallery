"use client";

import { useMemo, useCallback, useState } from "react";
import useData from "@/hooks/useData";
import { filterByLanguage } from "@/utils/filterByLanguage";
import { classifyFairs } from "@/components/pages/fair/utils/fairDates";

/**
 * useFairListData
 *
 * Fetches fairs from /api/fair and classifies them
 * into current / past, filtered by language.
 *
 * Returns:
 *   fairs         – all language-filtered fairs (sorted by order)
 *   current       – currently active fairs
 *   past          – past fairs
 *   activeTab     – "current" | "past"
 *   setActiveTab  – tab setter
 *   isLoading     – boolean
 *   hasError      – boolean
 *   refetch       – function
 */
export default function useFairListData(isCn) {
  const {
    data: rawData = [],
    isLoading,
    error,
    refetch,
  } = useData("/api/fair");

  const [activeTab, setActiveTab] = useState("current");

  // 1. Language filter
  const filtered = useMemo(
    () => filterByLanguage(rawData, isCn),
    [rawData, isCn]
  );

  // 2. Classify into current/past (sorted by order)
  const { current, past } = useMemo(
    () => classifyFairs(filtered),
    [filtered]
  );

  // 3. All fairs sorted by order
  const fairs = useMemo(
    () => [...filtered].sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0)),
    [filtered]
  );

  const handleRetry = useCallback(() => {
    refetch?.();
  }, [refetch]);

  return {
    fairs,
    current,
    past,
    activeTab,
    setActiveTab,
    isLoading,
    hasError: !!error,
    errorMessage: error?.message || null,
    refetch: handleRetry,
  };
}