"use client";

import React, {
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LanguageContext } from "@/components/contexts/LanguageContext";
import { DeviceContext } from "@/components/contexts/DeviceContext";
import useFont from "@/hooks/useFont";
import { useReverseTheme } from "@/hooks/useReverseTheme";
import PageSkeleton, { SkeletonBlock, SkeletonLine } from "@/components/skeletons/PageSkeleton";
import AlertInfo from "@/components/alerts/AlertInfo";
import useArtistListData from "@/components/pages/artists/hooks/useArtistListData";
import { useArtistHoverImage } from "@/components/pages/artists/hooks/useArtistHoverImage";
import { useRandomArtworkImage } from "@/components/pages/artists/hooks/useRandomArtworkImage";

// ============================================================================
// UI CONFIGURATION
// ============================================================================
const CONFIG = {
  PAGE: {
    PADDING_HORIZONTAL: 50,
    PADDING_HORIZONTAL_MOBILE: 20,
    PADDING_TOP_DESKTOP:10,
    PADDING_TOP_MOBILE: 24,
    PADDING_BOTTOM: 120,
    OFFSET_TOP: -10,
  },

  HEADING: {
    FONT_SIZE_DESKTOP: "24px",
    FONT_SIZE_MOBILE: "20px",
    FONT_WEIGHT: 500,
    LETTER_SPACING: "0.01em",
    OFFSET_LEFT: 28,
    OFFSET_TOP: 50,
    OFFSET_LEFT_MOBILE: 0,
    OFFSET_TOP_MOBILE: 0,
    ALIGN: "left",
    OFFSET_RIGHT: 0,
    TO_LIST_GAP_DESKTOP: 70,
    TO_LIST_GAP_MOBILE: 40,
  },

  LIST: {
    COLUMN_WIDTH: "46%",
    OFFSET_TOP: 0,
    ITEM_GAP_DESKTOP: 10,
    ITEM_GAP_MOBILE: 7,
    ITEM_FONT_SIZE_DESKTOP: "15px",
    ITEM_FONT_SIZE_MOBILE: "13px",
    ITEM_FONT_WEIGHT: 347,
    ITEM_LINE_HEIGHT: 1.4,
    ITEM_LETTER_SPACING: "0.02em",
    ITEM_COLOR: null,
    ITEM_COLOR_ACTIVE: null,
    UNDERLINE_COLOR: null,
    UNDERLINE_DURATION: 0.3,
  },

  PREVIEW: {
    COLUMN_WIDTH: "54%",
    MAX_WIDTH:450,
    // Fallback aspect ratio (width / height) used only until the first
    // image finishes loading and reports its real dimensions.
    FALLBACK_ASPECT_RATIO: 0.8,
    // Safety clamp so a very wide panorama or very tall image can't
    // blow out the sticky column — everything else uses the real ratio.
    MIN_ASPECT_RATIO: 0.5,
    MAX_ASPECT_RATIO: 1.6,
    STICKY_TOP: 90,
    OFFSET_TOP: 0,
    PLACEHOLDER_BG: "rgba(0,0,0,0.03)",
    // How often the idle (no-hover) preview swaps to a different artist.
    RANDOM_ROTATE_INTERVAL_MS: 5000,
  },

  EMPTY_STATE: {
    FONT_SIZE: "13px",
    OPACITY: 0.3,
    LETTER_SPACING: "0.1em",
  },

  TEXT: {
    HEADING: { en: "Artists", cn: "艺术家" },
    EMPTY: { en: "No artists", cn: "暂无艺术家" },
    ERROR_MESSAGE: { en: "Loading Failed", cn: "加载失败" },
    RETRY_BUTTON: { en: "Retry", cn: "重试" },
    PREVIEW_FALLBACK_ALT: { en: "Artwork preview", cn: "作品预览" },
  },
};

// ============================================================================
// Helpers
// ============================================================================
const pick = (isCn, pair) => (isCn ? pair.cn : pair.en);

const toSlug = (profile) =>
  String(profile?.name || profile?._id || profile?.id || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\p{L}\p{N}_-]/gu, "");

const resolveListColors = (themeText) => {
  const base = CONFIG.LIST.ITEM_COLOR || themeText;
  const active = CONFIG.LIST.ITEM_COLOR_ACTIVE || base;
  const underline = CONFIG.LIST.UNDERLINE_COLOR || active;
  return { base, active, underline };
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const HEADING_ALIGN_RIGHT = CONFIG.HEADING.ALIGN === "right";

// ============================================================================
// Artist name row
// ============================================================================
const ArtistNameRow = React.memo(function ArtistNameRow({
  profile,
  index,
  isActive,
  isMobile,
  listColors,
  fontFamily,
  onActivate,
}) {
  const handleActivate = useCallback(
    () => onActivate(profile.name),
    [onActivate, profile.name]
  );

  const rowColor = isActive ? listColors.active : listColors.base;
  const itemGap = isMobile
    ? CONFIG.LIST.ITEM_GAP_MOBILE
    : CONFIG.LIST.ITEM_GAP_DESKTOP;

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: isMobile ? 0 : index * 0.04,
        duration: 0.45,
        ease: "easeOut",
      }}
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        textAlign: "center",
        marginBottom: `${itemGap}px`,
      }}
    >
      <Link
        href={`/artists/${toSlug(profile)}`}
        prefetch
        onMouseEnter={handleActivate}
        onFocus={handleActivate}
        aria-current={isActive ? "true" : undefined}
        style={{
          display: "inline-block",
          position: "relative",
          textDecoration: "none",
          color: rowColor,
          fontFamily,
          fontWeight: CONFIG.LIST.ITEM_FONT_WEIGHT,
          fontSize: isMobile
            ? CONFIG.LIST.ITEM_FONT_SIZE_MOBILE
            : CONFIG.LIST.ITEM_FONT_SIZE_DESKTOP,
          lineHeight: CONFIG.LIST.ITEM_LINE_HEIGHT,
          letterSpacing: CONFIG.LIST.ITEM_LETTER_SPACING,
          padding: "2px 2px 6px",
          outline: "none",
          WebkitTapHighlightColor: "transparent",
          transition: "color 0.2s ease",
        }}
      >
        {profile.name}
        <motion.span
          aria-hidden
          initial={false}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{
            duration: CONFIG.LIST.UNDERLINE_DURATION,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "1px",
            backgroundColor: listColors.underline,
            transformOrigin: "left",
            pointerEvents: "none",
          }}
        />
      </Link>
    </motion.li>
  );
});

// ============================================================================
// Artist list — left column
// ============================================================================
const ArtistList = React.memo(function ArtistList({
  profiles,
  activeName,
  isMobile,
  listColors,
  fontFamily,
  onActivate,
}) {
  return (
    <ul
      style={{
        width: isMobile ? "100%" : CONFIG.LIST.COLUMN_WIDTH,
        margin: 0,
        padding: 0,
        position: "relative",
        top: `${CONFIG.LIST.OFFSET_TOP}px`,
      }}
    >
      {profiles.map((profile, i) => (
        <ArtistNameRow
          key={profile.name}
          profile={profile}
          index={i}
          isActive={profile.name === activeName}
          isMobile={isMobile}
          listColors={listColors}
          fontFamily={fontFamily}
          onActivate={onActivate}
        />
      ))}
    </ul>
  );
});

// ============================================================================
// Artist preview — sticky right column
// ============================================================================
// Shows each image at its own natural aspect ratio (clamped to a sane
// range) instead of forcing every artist into the same fixed box.
// Swaps are instant — no crossfade / scale-up animation on hover, the
// new image is just shown directly.
const ArtistPreview = React.memo(function ArtistPreview({
  previewImage,
  previewArtist,
  isCn,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  // Ratio of the currently-loaded image; kept around across image
  // swaps so the container doesn't collapse before the new image loads.
  const [aspectRatio, setAspectRatio] = useState(
    CONFIG.PREVIEW.FALLBACK_ASPECT_RATIO
  );

  React.useEffect(() => {
    setImageFailed(false);
  }, [previewImage]);

  const handleImageError = useCallback(() => setImageFailed(true), []);

  const handleImageLoad = useCallback((e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (!naturalWidth || !naturalHeight) return;
    const ratio = clamp(
      naturalWidth / naturalHeight,
      CONFIG.PREVIEW.MIN_ASPECT_RATIO,
      CONFIG.PREVIEW.MAX_ASPECT_RATIO
    );
    setAspectRatio(ratio);
  }, []);

  const previewAlt = previewArtist?.name || pick(isCn, CONFIG.TEXT.PREVIEW_FALLBACK_ALT);

  return (
    <div
      style={{
        width: CONFIG.PREVIEW.COLUMN_WIDTH,
        display: "flex",
        justifyContent: "center",
        position: "relative",
        top: `${CONFIG.PREVIEW.OFFSET_TOP}px`,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: `${CONFIG.PREVIEW.STICKY_TOP}px`,
          width: "100%",
          maxWidth: `${CONFIG.PREVIEW.MAX_WIDTH}px`,
          aspectRatio,
          backgroundColor: CONFIG.PREVIEW.PLACEHOLDER_BG,
          overflow: "hidden",
        }}
      >
        {previewImage && (
          <Link
            href={previewArtist ? `/artists/${toSlug(previewArtist)}` : "#"}
            prefetch
            aria-label={previewAlt}
            style={{ display: "block", width: "100%", height: "100%" }}
          >
            {!imageFailed && (
              <img
                key={previewImage}
                src={previewImage}
                alt={previewArtist?.name || ""}
                loading="lazy"
                decoding="async"
                draggable={false}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                  width: "100%",
                  height: "100%",
                  // "contain" so the original framing is preserved —
                  // the box matches the image's own ratio, so "cover"
                  // would just crop for no reason.
                  objectFit: "contain",
                  display: "block",
                }}
              />
            )}
          </Link>
        )}
      </div>
    </div>
  );
});

// ============================================================================
// Empty state
// ============================================================================
const EmptyState = React.memo(function EmptyState({ isCn, fontFamily, text }) {
  return (
    <p
      style={{
        fontFamily,
        fontSize: CONFIG.EMPTY_STATE.FONT_SIZE,
        color: text,
        opacity: CONFIG.EMPTY_STATE.OPACITY,
        letterSpacing: CONFIG.EMPTY_STATE.LETTER_SPACING,
        textTransform: "uppercase",
        marginTop: `${CONFIG.HEADING.TO_LIST_GAP_DESKTOP}px`,
      }}
    >
      {pick(isCn, CONFIG.TEXT.EMPTY)}
    </p>
  );
});

// ============================================================================
// Skeleton
// ============================================================================
function ArtistsListSkeleton({ isMobile, bgColor }) {
  return (
    <PageSkeleton bgColor={bgColor}>
      <div
        style={{
          paddingTop: isMobile ? "24px" : "20px",
          paddingLeft: isMobile ? "20px" : "50px",
          paddingRight: isMobile ? "20px" : "50px",
          paddingBottom: "120px",
          marginTop: "-10px",
        }}
      >
        {/* Heading */}
        <SkeletonLine width="120px" height={30} style={{ marginLeft: isMobile ? 0 : "28px", marginBottom: isMobile ? "40px" : "70px" }} />
        {/* Two column layout */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "flex-start" }}>
          {/* Left: name list */}
          <div style={{ width: isMobile ? "100%" : "46%", display: "flex", flexDirection: "column", gap: "10px" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonLine key={i} width={`${55 + Math.random() * 40}%`} height={17} />
            ))}
          </div>
          {/* Right: preview image */}
          {!isMobile && (
            <div style={{ width: "54%", display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: "640px" }}>
                <SkeletonBlock width="100%" height={0} style={{ paddingBottom: "112%" }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageSkeleton>
  );
}

// ============================================================================
// Page component
// ============================================================================
export default function ArtistsPageComponent() {
  const { isCn } = useContext(LanguageContext);
  const { isMobile } = useContext(DeviceContext);
  const { fontFamily } = useFont();
  const { colors } = useReverseTheme();

  const text = colors.text;
  const bg = colors.background;

  const { allProfiles, isLoading, hasError, refetch } = useArtistListData(isCn);
  const profiles = allProfiles || [];

  const [activeName, setActiveName] = useState(null);
  const { hoveredName, hoverImage, onHover, onLeave } = useArtistHoverImage(profiles);

  // Idle-state rotation — a different artist's cover image every few
  // seconds, paused the instant something is actually hovered.
  const { randomArtist, randomImage } = useRandomArtworkImage(profiles, {
    paused: !!hoveredName,
    intervalMs: CONFIG.PREVIEW.RANDOM_ROTATE_INTERVAL_MS,
  });

  const listColors = useMemo(() => resolveListColors(text), [text]);

  const handleActivate = useCallback(
    (name) => {
      setActiveName(name);
      onHover(name);
    },
    [onHover]
  );

  const handleLeave = useCallback(() => {
    setActiveName(null);
    onLeave();
  }, [onLeave]);

  // Hover wins when present; otherwise fall back to the auto-rotating
  // random artist, then the first profile as a last resort.
  const previewArtist = useMemo(() => {
    if (hoveredName) {
      return profiles.find((p) => p.name === hoveredName) || null;
    }
    return randomArtist || profiles[0] || null;
  }, [hoveredName, profiles, randomArtist]);

  const previewImage = hoverImage || randomImage;

  if (isLoading) {
    return <ArtistsListSkeleton isMobile={isMobile} bgColor={bg} />;
  }

  if (hasError) {
    return (
      <AlertInfo
        message={pick(isCn, CONFIG.TEXT.ERROR_MESSAGE)}
        buttonText={pick(isCn, CONFIG.TEXT.RETRY_BUTTON)}
        onBack={refetch}
        isCn={isCn}
      />
    );
  }

  return (
    <div
      style={{
        backgroundColor: bg,
        color: text,
        minHeight: "100vh",
        boxSizing: "border-box",
        fontFamily,
        paddingTop: `${
          isMobile ? CONFIG.PAGE.PADDING_TOP_MOBILE : CONFIG.PAGE.PADDING_TOP_DESKTOP
        }px`,
        paddingLeft: `${
          isMobile
            ? CONFIG.PAGE.PADDING_HORIZONTAL_MOBILE
            : CONFIG.PAGE.PADDING_HORIZONTAL
        }px`,
        paddingRight: `${
          isMobile
            ? CONFIG.PAGE.PADDING_HORIZONTAL_MOBILE
            : CONFIG.PAGE.PADDING_HORIZONTAL
        }px`,
        paddingBottom: `${CONFIG.PAGE.PADDING_BOTTOM}px`,
        marginTop: `${CONFIG.PAGE.OFFSET_TOP}px`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          fontFamily,
          fontSize: isMobile
            ? CONFIG.HEADING.FONT_SIZE_MOBILE
            : CONFIG.HEADING.FONT_SIZE_DESKTOP,
          fontWeight: CONFIG.HEADING.FONT_WEIGHT,
          letterSpacing: CONFIG.HEADING.LETTER_SPACING,
          color: text,
          margin: 0,
          position: "relative",
          textAlign: HEADING_ALIGN_RIGHT ? "right" : "left",
          top: `${
            isMobile ? CONFIG.HEADING.OFFSET_TOP_MOBILE : CONFIG.HEADING.OFFSET_TOP
          }px`,
          left: HEADING_ALIGN_RIGHT
            ? undefined
            : `${
                isMobile
                  ? CONFIG.HEADING.OFFSET_LEFT_MOBILE
                  : CONFIG.HEADING.OFFSET_LEFT
              }px`,
          right: HEADING_ALIGN_RIGHT ? `${CONFIG.HEADING.OFFSET_RIGHT}px` : undefined,
        }}
      >
        {pick(isCn, CONFIG.TEXT.HEADING)}
      </motion.h1>

      {profiles.length === 0 ? (
        <EmptyState isCn={isCn} fontFamily={fontFamily} text={text} />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "flex-start",
            marginTop: `${
              isMobile
                ? CONFIG.HEADING.TO_LIST_GAP_MOBILE
                : CONFIG.HEADING.TO_LIST_GAP_DESKTOP
            }px`,
          }}
          onMouseLeave={handleLeave}
        >
          <ArtistList
            profiles={profiles}
            activeName={activeName}
            isMobile={isMobile}
            listColors={listColors}
            fontFamily={fontFamily}
            onActivate={handleActivate}
          />

          {!isMobile && (
            <ArtistPreview
              previewImage={previewImage}
              previewArtist={previewArtist}
              isCn={isCn}
            />
          )}
        </div>
      )}
    </div>
  );
}
