"use client";

import { useMemo, useCallback } from "react";
import useData from "@/hooks/useData";
import { filterByLanguage } from "@/utils/filterByLanguage";

/**
 * useHomePageData
 * Fetches all data needed for the homepage — artworks, events, about, images.
 * Follows the same pattern as useArtworkData, useAboutData, etc.
 *
 * Returns:
 *   artworks, events, abouts, images
 *   isLoading, hasError, refetchAll
 *   filteredArtworks, filteredEvents  (language-filtered + order-sorted)
 */
export default function useHomePageData() {
  const {
    data: rawArtworks = [],
    isLoading: la,
    error: ea,
    refetch: ra,
  } = useData("/api/artwork");

  const {
    data: rawEvents = [],
    isLoading: le,
    error: ee,
    refetch: re,
  } = useData("/api/event");

  const {
    data: rawImages = [],
    isLoading: li,
    error: ei,
    refetch: ri,
  } = useData("/api/image");

  const {
    data: rawAbouts = [],
    isLoading: lab,
    error: eab,
    refetch: rab,
  } = useData("/api/about");

  const isLoading = la || le || li || lab;
  const hasError = !!(ea || ee || ei || eab);

  const refetchAll = useCallback(() => {
    ra?.();
    re?.();
    ri?.();
    rab?.();
  }, [ra, re, ri, rab]);

  return {
    rawArtworks,
    rawEvents,
    rawImages,
    rawAbouts,
    isLoading,
    hasError,
    refetchAll,
  };
}

/**
 * Filter and sort artworks by language + order.
 * Use inside a page component: useFilteredArtworks(rawArtworks, isCn)
 */
export function useFilteredArtworks(artworks, isCn) {
  return useMemo(() => {
    const byLang = filterByLanguage(artworks, isCn);
    return [...byLang].sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0));
  }, [artworks, isCn]);
}

/**
 * Filter and sort events by language + order.
 */
export function useFilteredEvents(events, isCn) {
  return useMemo(() => {
    const byLang = filterByLanguage(events, isCn);
    return [...byLang].sort((a, b) => (Number(a?.order) || 0) - (Number(b?.order) || 0));
  }, [events, isCn]);
}

/**
 * Filter about by language.
 */
export function useFilteredAbouts(abouts, isCn) {
  return useMemo(() => filterByLanguage(abouts, isCn), [abouts, isCn]);
}

/**
 * Get slider images (marked as 'slider').
 */
export function useSliderImages(images) {
  return useMemo(() => {
    if (!Array.isArray(images)) return [];
    return images.filter(
      (img) => img?.mark && ["slider", "Slider", "SLIDER"].includes(img.mark)
    );
  }, [images]);
}
