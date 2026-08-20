"use client";

import { useMemo, useCallback, useState } from "react";
import useData from "@/hooks/useData";
import { filterByLanguage } from "@/utils/filterByLanguage";
import {
  classifyExhibitions,
  sortExhibitionsByDate,
} from "@/components/pages/exhibition/utils/exhibitionDates";

/**
 * useExhibitionListData
 *
 * Fetches exhibitions from /api/exhibition and classifies them
 * into current / past, filtered by language.
 *
 * Returns:
 *   exhibitions    – all language-filtered exhibitions, ordered by year/date (newest first)
 *   current        – currently active exhibitions, ordered by year/date (newest first)
 *   past           – past exhibitions, ordered by year/date (newest first)
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

  // 2. Classify into current/past
  const { current: currentByOrder, past: pastByOrder } = useMemo(
    () => classifyExhibitions(filtered),
    [filtered]
  );

  // Both lists re-sorted by year/date (newest first) instead of the `order` field
  const current = useMemo(() => sortExhibitionsByDate(currentByOrder, "desc"), [currentByOrder]);
  const past = useMemo(() => sortExhibitionsByDate(pastByOrder, "desc"), [pastByOrder]);

  // 3. All exhibitions, ordered by year/date — newest first
  const exhibitions = useMemo(() => sortExhibitionsByDate(filtered, "desc"), [filtered]);

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