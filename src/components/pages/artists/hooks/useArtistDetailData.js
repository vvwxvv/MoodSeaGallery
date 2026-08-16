"use client";

import { useMemo, useCallback } from "react";
import useData from "@/hooks/useData";
import { filterByLanguage } from "@/utils/filterByLanguage";

// Normalize a name for cross-collection matching
export const normalizeName = (s) =>
  String(s || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

/** 基于 id 或 _id 去重 */
function uniqueById(arr) {
  const seen = new Set();
  return arr.filter((item) => {
    const id = item?.id ?? item?._id;
    if (!id) return true; // 无 id 则保留（稳妥）
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function recordMatchesArtist(record, key) {
  const arr = record?.related_gallery_artist;
  if (Array.isArray(arr) && arr.some((n) => normalizeName(n) === key)) return true;
  const single = record?.participating_artists;
  if (typeof single === "string" && single.trim()) {
    const parts = single.split(/[,，、]/).map(normalizeName);
    if (parts.includes(key)) return true;
  }
  return false;
}

function eventMatchesArtist(event, key) {
  const arr = event?.related_artist;
  return Array.isArray(arr) && arr.some((n) => normalizeName(n) === key);
}

function sortByYearDesc(list) {
  return [...list].sort((a, b) => {
    const ay = parseInt(a?.year, 10) || 0;
    const by = parseInt(b?.year, 10) || 0;
    if (ay !== by) return by - ay;
    return (Number(a?.order) || 0) - (Number(b?.order) || 0);
  });
}

function buildArtistProfile(about, artworks, exhibitions, fairs, events) {
  const key = normalizeName(about?.artist);

  const artistArtworks = uniqueById(
    sortByYearDesc((artworks || []).filter((aw) => normalizeName(aw?.artist) === key))
  );
  const artistExhibitions = uniqueById(
    sortByYearDesc((exhibitions || []).filter((ex) => recordMatchesArtist(ex, key)))
  );
  const artistFairs = uniqueById(
    sortByYearDesc((fairs || []).filter((f) => recordMatchesArtist(f, key)))
  );
  const artistEvents = uniqueById(
    sortByYearDesc((events || []).filter((ev) => eventMatchesArtist(ev, key)))
  );

  return {
    id: about?.id || about?._id || null,
    artist: about?.artist || "",
    portrait_image_url: about?.portrait_image_url || null,
    caption: about?.caption || "",
    introductions: about?.introductions || [],
    pdf_url: about?.pdf_url || null,
    web_url: about?.web_url || null,
    language: about?.language || null,
    order: about?.order || null,
    mark: about?.mark || null,
    portrait_img_url: about?.portrait_image_url || null,
    artworks: artistArtworks,
    exhibitions: artistExhibitions,
    fairs: artistFairs,
    events: artistEvents,
  };
}

export default function useArtistDetailData(artistName, isCn) {
  const { data: rawAbouts = [], isLoading: la, error: ea, refetch: ra } = useData("/api/about");
  const { data: rawArtworks = [], isLoading: lw, error: ew, refetch: rw } = useData("/api/artwork");
  const { data: rawExhibitions = [], isLoading: lx, error: ex, refetch: rx } = useData("/api/exhibition");
  const { data: rawFairs = [], isLoading: lf, error: ef, refetch: rf } = useData("/api/fair");
  const { data: rawEvents = [], isLoading: le, error: ee, refetch: re } = useData("/api/event");

  const isLoading = la || lw || lx || lf || le;
  const hasError = !!(ea || ew || ex || ef || ee);

  const refetch = useCallback(() => {
    ra?.(); rw?.(); rx?.(); rf?.(); re?.();
  }, [ra, rw, rx, rf, re]);

  const abouts = useMemo(() => filterByLanguage(rawAbouts, isCn), [rawAbouts, isCn]);
  const artworksAll = useMemo(() => filterByLanguage(rawArtworks, isCn), [rawArtworks, isCn]);
  const exhibitionsAll = useMemo(() => filterByLanguage(rawExhibitions, isCn), [rawExhibitions, isCn]);
  const fairsAll = useMemo(() => filterByLanguage(rawFairs, isCn), [rawFairs, isCn]);
  const eventsAll = useMemo(() => filterByLanguage(rawEvents, isCn), [rawEvents, isCn]);

  const about = useMemo(() => {
    if (!artistName || !Array.isArray(abouts)) return null;
    const key = normalizeName(artistName);
    return abouts.find((a) => normalizeName(a?.artist) === key) || null;
  }, [abouts, artistName]);

  const profile = useMemo(() => {
    if (about) {
      return buildArtistProfile(about, artworksAll, exhibitionsAll, fairsAll, eventsAll);
    }
    if (artistName) {
      const key = normalizeName(artistName);
      const artistArtworks = uniqueById(
        sortByYearDesc((artworksAll || []).filter((aw) => normalizeName(aw?.artist) === key))
      );
      const artistExhibitions = uniqueById(
        sortByYearDesc((exhibitionsAll || []).filter((ex) => recordMatchesArtist(ex, key)))
      );
      const artistFairs = uniqueById(
        sortByYearDesc((fairsAll || []).filter((f) => recordMatchesArtist(f, key)))
      );
      const artistEvents = uniqueById(
        sortByYearDesc((eventsAll || []).filter((ev) => eventMatchesArtist(ev, key)))
      );

      if (
        artistArtworks.length ||
        artistExhibitions.length ||
        artistFairs.length ||
        artistEvents.length
      ) {
        return {
          id: null,
          artist: artistName,
          name: artistName,
          portrait_img_url: null,
          portrait_image_url: null,
          caption: "",
          introductions: [],
          pdf_url: null,
          web_url: null,
          language: null,
          order: null,
          mark: null,
          artworks: artistArtworks,
          exhibitions: artistExhibitions,
          fairs: artistFairs,
          events: artistEvents,
        };
      }
    }
    return null;
  }, [about, artistName, artworksAll, exhibitionsAll, fairsAll, eventsAll]);

  const notFound = !isLoading && !profile && !!artistName;

  return {
    profile,
    artworks: profile?.artworks || [],
    exhibitions: profile?.exhibitions || [],
    fairs: profile?.fairs || [],
    events: profile?.events || [],
    isLoading,
    hasError,
    refetch,
    notFound,
  };
}