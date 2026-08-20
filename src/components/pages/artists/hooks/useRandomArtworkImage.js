"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const DEFAULT_INTERVAL_MS = 3500;

/**
 * Fisher–Yates shuffle, non-mutating. Inlined here instead of importing
 * from @/utils/shuffleArray to avoid depending on that module's export
 * shape (named vs default vs different signature).
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useRandomArtworkImage(
  allProfiles,
  { paused = false, intervalMs = DEFAULT_INTERVAL_MS } = {}
) {
  const eligible = useMemo(
    () => (Array.isArray(allProfiles) ? allProfiles.filter((p) => p?.image) : []),
    [allProfiles]
  );

  const queueRef = useRef([]);
  const lastNameRef = useRef(null);
  const [randomProfile, setRandomProfile] = useState(null);

  const drawNext = useCallback(() => {
    if (eligible.length === 0) {
      setRandomProfile(null);
      return;
    }
    if (eligible.length === 1) {
      setRandomProfile(eligible[0]);
      lastNameRef.current = eligible[0].name;
      return;
    }
    if (queueRef.current.length === 0) {
      let shuffled = shuffle(eligible);
      if (shuffled[0]?.name === lastNameRef.current) {
        [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
      }
      queueRef.current = shuffled;
    }
    const next = queueRef.current.shift();
    lastNameRef.current = next.name;
    setRandomProfile(next);
  }, [eligible]);

  useEffect(() => {
    queueRef.current = [];
    drawNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eligible.length]);

  useEffect(() => {
    if (paused || eligible.length <= 1) return;
    const id = setInterval(drawNext, intervalMs);
    return () => clearInterval(id);
  }, [paused, eligible.length, intervalMs, drawNext]);

  return {
    randomArtist: randomProfile,
    randomImage: randomProfile?.image || null,
  };
}