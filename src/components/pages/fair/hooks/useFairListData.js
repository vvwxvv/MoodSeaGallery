"use client";

import { useMemo, useCallback, useState } from "react";
import useData from "@/hooks/useData";
import { filterByLanguage } from "@/utils/filterByLanguage";
import {
  classifyFairs,
  sortFairsByDate,
} from "@/components/pages/fair/utils/fairDates";

/**
 * useFairListData
 *
 * Fetches fairs from /api/fair and classifies them
 * into current / past, filtered by language.
 *
 * Returns:
 *   fairs         – all language-filtered fairs, ordered by year/date (newest first)
 *   current       – currently active fairs, ordered by year/date (newest first)
 *   past          – past fairs, ordered by year/date (newest first)
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

  // 2. Classify into current/past
  const { current: currentByOrder, past: pastByOrder } = useMemo(
    () => classifyFairs(filtered),
    [filtered]
  );

  // Both lists re-sorted by year/date (newest first) instead of the `order` field
  const current = useMemo(() => sortFairsByDate(currentByOrder, "desc"), [currentByOrder]);
  const past = useMemo(() => sortFairsByDate(pastByOrder, "desc"), [pastByOrder]);

  // 3. All fairs, ordered by year/date — newest first
  const fairs = useMemo(() => sortFairsByDate(filtered, "desc"), [filtered]);

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