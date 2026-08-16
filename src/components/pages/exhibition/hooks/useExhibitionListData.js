"use client";

import { useMemo, useCallback, useState } from "react";
import useData from "@/hooks/useData";
import { filterByLanguage } from "@/utils/filterByLanguage";
import { classifyExhibitions } from "@/components/pages/exhibition/utils/exhibitionDates";

/**
 * useExhibitionListData
 *
 * Fetches exhibitions from /api/exhibition and classifies them
 * into current / past, filtered by language.
 *
 * Returns:
 *   exhibitions    – all language-filtered exhibitions (sorted by order)
 *   current        – currently active exhibitions
 *   past           – past exhibitions
 *   activeTab      – "current" | "past"
 *   setActiveTab   – tab setter
 *   isLoading      – boolean
 *   hasError       – boolean
 *   refetch        – function
 */
export default function useExhibitionListData(isCn) {
  const {
    data: rawData = [],
    isLoading,
    error,
    refetch,
  } = useData("/api/exhibition");

  const [activeTab, setActiveTab] = useState("current");

  // 1. Language filter
  const filtered = useMemo(
    () => filterByLanguage(rawData, isCn),
    [rawData, isCn]
  );

  // 2. Classify into current/past (sorted by order)
  const { current, past } = useMemo(
    () => classifyExhibitions(filtered),
    [filtered]
  );

  // 3. All exhibitions sorted by order
  const exhibitions = useMemo(
    () => [...filtered].sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0)),
    [filtered]
  );

  const handleRetry = useCallback(() => {
    refetch?.();
  }, [refetch]);

  return {
    exhibitions,
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
