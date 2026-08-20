"use client";

import { useState, useEffect, useRef } from "react";
import { filterByLanguage } from "@/utils/filterByLanguage";

const generateSlug = (text) => {
  if (!text) return "";
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\p{L}\p{N}_-]/gu, "");
};

export default function useArtworkSlugData(slugParam, isCn) {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    const rawSlug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
    const slug = rawSlug ? decodeURIComponent(rawSlug) : "";

    if (!slug) {
      setLoading(false);
      setError("No slug provided");
      return;
    }

    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchArtwork = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/artwork", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        const list = Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result)
          ? result
          : [];

        // Match by slug — only filter by language if the item has a language set
        const targetLang = isCn ? "CN" : "EN";

        const found = list.find((item) => {
          if (!item) return false;
          // Skip items that have a different language set (but keep items without any language)
          const lang = (item.language || "").toUpperCase();
          if (lang && lang !== targetLang) return false;
          // Match by _id or id (direct ID match)
          if (item._id === slug || item.id === slug) return true;
          // Match by title slug
          const titleSlug = generateSlug(item.title);
          if (titleSlug && titleSlug === slug) return true;
          return false;
        });

        if (found) {
          setArtwork(found);
        } else {
          setArtwork(null);
          setError("Artwork not found");
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        setArtwork(null);
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();

    return () => {
      controller.abort();
    };
  }, [slugParam, isCn]);

  return { artwork, loading, error };
}
