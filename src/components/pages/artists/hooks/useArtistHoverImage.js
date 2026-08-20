"use client";

import { useState, useCallback, useMemo } from "react";

/**
 * useArtistHoverImage
 *
 * Given a list of artist profiles (from useArtistListData), tracks which
 * artist is hovered and returns that artist's cover image.
 *
 * Deterministic: always resolves to the same artist's own profile.image
 * (computed once in useArtistListData as the lowest-order cover_img_url).
 * No random pick — hovering the same artist always shows the same image,
 * and it's never blank just because a randomly-chosen work lacked a cover.
 *
 * Returns:
 *   hoveredName    – currently hovered artist name (null if none)
 *   hoverImage     – cover_img_url matched to the hovered artist
 *   onHover(name)  – call on mouse enter
 *   onLeave()      – call on mouse leave
 */
export function useArtistHoverImage(allProfiles) {
  const [hoveredName, setHoveredName] = useState(null);

  const onHover = useCallback((name) => setHoveredName(name), []);
  const onLeave = useCallback(() => setHoveredName(null), []);

  // Build a map: artist name → profile (so lookup is O(1) per hover)
  const profileByName = useMemo(() => {
    const map = new Map();
    if (!Array.isArray(allProfiles)) return map;
    for (const p of allProfiles) {
      if (p?.name) map.set(p.name, p);
    }
    return map;
  }, [allProfiles]);

  const hoveredProfile = hoveredName ? profileByName.get(hoveredName) : null;

  const hoverImage = hoveredProfile?.image || null;
  const hoverCount = hoveredProfile?.artworks?.length || 0;

  return { hoveredName, hoverImage, hoverCount, onHover, onLeave };
}