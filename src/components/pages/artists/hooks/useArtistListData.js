"use client";

import { useMemo, useCallback } from "react";
import useData from "@/hooks/useData";
import { filterByLanguage } from "@/utils/filterByLanguage";

// ── Name normalization for matching About <-> Artwork ──
// Trims, lowercases, and collapses internal whitespace so minor
// formatting differences ("Wang Xin", " wang  xin ") still match.
function normalizeName(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

// ── First-letter sort key ──
// Grabs the first meaningful character of a name. Empty names sort
// last under "#" so they never break the ordering.
function firstLetterKey(name) {
  const ch = String(name || "").trim().charAt(0);
  return ch ? ch.toUpperCase() : "#";
}

// ── Locale-aware comparator ──
// Orders purely by name, starting from the first letter. For CN we use
// a pinyin-aware locale so Chinese names sort by their pinyin initial
// (A→Z); for EN it's a normal case-insensitive A→Z. Empty names ("#")
// always fall to the bottom.
function makeNameComparator(isCn) {
  const locale = isCn ? "zh-Hans-CN" : "en";
  return (a, b) => {
    const ka = firstLetterKey(a?.name);
    const kb = firstLetterKey(b?.name);

    const aEmpty = ka === "#";
    const bEmpty = kb === "#";
    if (aEmpty !== bEmpty) return aEmpty ? 1 : -1; // "#" sinks to the end

    return String(a?.name || "").localeCompare(String(b?.name || ""), locale, {
      sensitivity: "base",
      numeric: true,
    });
  };
}

/**
 * Map of normalized artist name -> best cover image + works count,
 * derived purely from Artwork rows. Used to *enrich* About-driven
 * profiles, never to filter them.
 */
function buildArtworkCoverMap(artworks) {
  const map = new Map();

  for (const aw of artworks || []) {
    const rawName = (aw?.artist || "").trim();
    if (!rawName) continue;
    const key = normalizeName(rawName);

    if (!map.has(key)) {
      map.set(key, {
        image: aw.cover_img_url || null,
        order: Number(aw.order) || 0,
        worksCount: 0,
      });
    }

    const entry = map.get(key);
    entry.worksCount += 1;

    if (!entry.image && aw.cover_img_url) {
      entry.image = aw.cover_img_url;
    } else if (aw.cover_img_url && (Number(aw.order) || 0) < entry.order) {
      entry.image = aw.cover_img_url;
      entry.order = Number(aw.order) || 0;
    }
  }

  return map;
}

/**
 * Builds one profile per unique artist found in the About collection.
 * This is the source of truth for who shows up in the artist list —
 * every unique About artist is included, regardless of whether a
 * matching Artwork row is found.
 *
 * The returned list is ordered by artist name's first letter (A→Z),
 * pinyin-aware when isCn is true.
 */
function buildArtistProfilesFromAbout(aboutRows, artworkCoverMap, isCn) {
  const byName = new Map();

  for (const row of aboutRows || []) {
    const name = (row?.artist || "").trim();
    if (!name) continue;
    const key = normalizeName(name);

    if (!byName.has(key)) {
      const artworkEntry = artworkCoverMap.get(key);

      byName.set(key, {
        id: name,
        name,
        // Prefer a cover image pulled from Artwork; fall back to the
        // artist's own About portrait if no Artwork match exists.
        image: artworkEntry?.image || row.portrait_image_url || null,
        order: Number(row.order) || 0,
        worksCount: artworkEntry?.worksCount || 0,
        caption: row.caption || null,
      });
    }
  }

  return Array.from(byName.values()).sort(makeNameComparator(isCn));
}

function groupArtistsByLetter(profiles, isCn) {
  const groups = new Map();
  for (const p of profiles) {
    const letter = firstLetterKey(p.name);
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter).push(p);
  }

  const locale = isCn ? "zh-Hans-CN" : "en";
  return Array.from(groups.entries())
    .sort(([a], [b]) => {
      if ((a === "#") !== (b === "#")) return a === "#" ? 1 : -1;
      return a.localeCompare(b, locale, { sensitivity: "base" });
    })
    .map(([letter, artists]) => ({ letter, artists }));
}

export default function useArtistListData(isCn) {
  const {
    data: rawArtworks = [],
    isLoading: isArtworkLoading,
    error: artworkError,
    refetch: refetchArtwork,
  } = useData("/api/artwork");

  const {
    data: rawAbout = [],
    isLoading: isAboutLoading,
    error: aboutError,
    refetch: refetchAbout,
  } = useData("/api/about");

  // ── Language-filter first, so EN/CN artist strings never mix ──
  const artworks = useMemo(
    () => filterByLanguage(rawArtworks, isCn),
    [rawArtworks, isCn]
  );

  const aboutRows = useMemo(
    () => filterByLanguage(rawAbout, isCn),
    [rawAbout, isCn]
  );

  // ── Cover image lookup, keyed by normalized artist name ──
  const artworkCoverMap = useMemo(
    () => buildArtworkCoverMap(artworks),
    [artworks]
  );

  // ── The list itself: every unique About artist, enriched with a
  //    cover image from Artwork where available, ordered by the first
  //    letter of the artist name ──
  const allProfiles = useMemo(
    () => buildArtistProfilesFromAbout(aboutRows, artworkCoverMap, isCn),
    [aboutRows, artworkCoverMap, isCn]
  );

  // ── Group by first letter ──
  const artistGroups = useMemo(
    () => groupArtistsByLetter(allProfiles, isCn),
    [allProfiles, isCn]
  );

  const isLoading = isArtworkLoading || isAboutLoading;
  const hasError = !!artworkError || !!aboutError;

  const refetch = useCallback(() => {
    refetchArtwork?.();
    refetchAbout?.();
  }, [refetchArtwork, refetchAbout]);

  return {
    artistGroups,
    allProfiles,
    isLoading,
    hasError,
    refetch,
  };
}
